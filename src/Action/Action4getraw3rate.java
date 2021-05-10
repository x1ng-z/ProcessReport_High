package Action;

import DAO.OracleMESdb_Access_Data;
import Management.ProcessMgr;
import Model.Firm;
import com.google.common.util.concurrent.ThreadFactoryBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author zzx
 * @version 1.0
 * @date 2020/9/3 8:33
 */
public class Action4getraw3rate implements Callable<JSONArray> {
    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;
    private String startdate;
    private String enddate;
    private Object lock=new Object();
    private AtomicInteger atomicInteger=new AtomicInteger(0);

    public Action4getraw3rate(HttpServletRequest httpServletRequest, ServletContext servletContext) {
        this.httpServletRequest = httpServletRequest;
        this.servletContext = servletContext;
         startdate=httpServletRequest.getParameter("startdate");
         enddate=httpServletRequest.getParameter("enddate");
    }

    @Override
    public JSONArray call() throws Exception {


       /** 阻塞队列：

        ArrayBlockingQueue ：一个由数组结构组成的有界阻塞队列。

        LinkedBlockingQueue ：一个由链表结构组成的有界阻塞队列。

        PriorityBlockingQueue ：一个支持优先级排序的无界阻塞队列。

        DelayQueue： 一个使用优先级队列实现的无界阻塞队列。

        SynchronousQueue： 一个不存储元素的阻塞队列。

        LinkedTransferQueue： 一个由链表结构组成的无界阻塞队列。

        LinkedBlockingDeque： 一个由链表结构组成的双向阻塞队列
        */

       long starttime=System.currentTimeMillis();

        ThreadFactory namedThreadFactory = new ThreadFactoryBuilder()
                .setNameFormat("exe-pool-%d").setDaemon(true).build();

        /**
         *new ThreadPoolExecutor.CallerRunsPolicy()是一个RejectedExecutorHandler
         *RejectedExecutionHandler：当线程池不能执行提交的线程任务时使用的策略
         * -DiscardOldestPolicy：丢弃最先提交到线程池的任务
         *-AbortPolicy： 中断此次提交，并抛出异常
         *-CallerRunsPolicy： 主线程自己执行此次任务
         *-DiscardPolicy： 直接丢弃此次任务，不抛出异常
         * */
        ExecutorService pool = new ThreadPoolExecutor(10/* 线程池维护的线程数量，即使其中有闲置线程*/, 100/*线程池能容纳的最大线程数量*/,
                60L/*当前线程数量超出CORE_POOL_SIZE时，过量线程在开始任务前的等待时间，超时将被关闭*/, TimeUnit.MILLISECONDS,/*KEEP_ALIVE_TIME的单位*/
                new LinkedBlockingQueue<Runnable>(1), namedThreadFactory,  new ThreadPoolExecutor.CallerRunsPolicy()/*当执行被阻塞时要使用的处理程序,因为达到了线程界限和队列容量*/);


        ProcessMgr processMgr = ProcessMgr.getProcessMgr_instance(servletContext);



        JSONArray  results=new JSONArray();
        for(Firm firm:processMgr.getFirmmmaping().values()){
            pool.execute(new Runnable() {
                @Override
                public void run() {
                    JSONObject firmresult=OracleMESdb_Access_Data.getraw3rate(firm,startdate,enddate);
                    if(firmresult.length()>1){
                        synchronized (lock){
                            results.put(firmresult);
                        }
                    }
                    atomicInteger.addAndGet(1);
                }
            });
        }

        while (atomicInteger.get()!=processMgr.getFirmmmaping().size()){
            TimeUnit.MILLISECONDS.sleep(500);
        }

        System.out.println(this.getClass()+" total cost time="+(System.currentTimeMillis()-starttime));;

        return results;
    }
}
