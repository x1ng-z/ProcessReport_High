package Contrl;

import com.google.common.util.concurrent.ThreadFactoryBuilder;

import java.io.IOException;
import java.util.concurrent.*;

/**
 * @author zzx
 * @version 1.0
 * @date 2020/9/17 23:13
 */
public class threadtest {


    static class MyTask implements Runnable {
        private String name;

        public MyTask(String name) {
            this.name = name;
        }

        @Override
        public void run() {
            try {
                System.out.println(this.toString() + " is running!"+System.currentTimeMillis());
                Thread.sleep(3000); //让任务执行慢点
                System.out.println(this.toString() + " runn complete!"+System.currentTimeMillis());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        public String getName() {
            return name;
        }

        @Override
        public String toString() {
            return "MyTask [name=" + name + "]";
        }
    }

    public static void main(String[] args) {
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
        ExecutorService pool = new ThreadPoolExecutor(1/* 线程池维护的线程数量，即使其中有闲置线程*/, 1/*线程池能容纳的最大线程数量*/,
                60L/*当前线程数量超出CORE_POOL_SIZE时，过量线程在开始任务前的等待时间，超时将被关闭*/, TimeUnit.MILLISECONDS,/*KEEP_ALIVE_TIME的单位*/
                new LinkedBlockingQueue<Runnable>(1), namedThreadFactory,  new ThreadPoolExecutor.CallerRunsPolicy()/*当执行被阻塞时要使用的处理程序,因为达到了线程界限和队列容量*/);

        for(int i=0;i<5;i++){
            pool.execute(new MyTask(i+""));
        }


        try {
            System.in.read(); //阻塞主线程
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
//
//MyTask [name=2] is running!1600356422924
//MyTask [name=0] is running!160035642292
//MyTask [name=3] is running!1600356425925
//MyTask [name=1] is running!1600356425926
//MyTask [name=4] is running!1600356428926
//MyTask [name=2] runn complete!1600356425925
//MyTask [name=0] runn complete!1600356425926
//MyTask [name=3] runn complete!1600356428925
//MyTask [name=1] runn complete!1600356428926
//MyTask [name=4] runn complete!1600356431926

