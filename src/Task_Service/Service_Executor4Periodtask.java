package Task_Service;

import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.util.concurrent.DelayQueue;

public class Service_Executor4Periodtask implements Runnable {
    private static Logger logger=Logger.getLogger(Service_Executor4Periodtask.class);
    private volatile static Service_Executor4Periodtask serviceExecutor4Periodtask =null;
    private DelayQueue<Carrior4periodtask> queue=new DelayQueue<Carrior4periodtask>();
    private ServletContext servletContext;



    private Service_Executor4Periodtask(ServletContext servletContext) {
        this.servletContext=servletContext;

    }

    public synchronized static Service_Executor4Periodtask getExecutor_periodtask(ServletContext servletContext){
        if(serviceExecutor4Periodtask ==null){
            serviceExecutor4Periodtask =new Service_Executor4Periodtask(servletContext);
        }
        return serviceExecutor4Periodtask;
    }

    @Override
    public void run() {

        while(!Thread.currentThread().isInterrupted()){
            try {
                Carrior4periodtask carrior4Periodtask =queue.take();

                try {
                    carrior4Periodtask.getTask().execute();
                } catch (Exception e) {
                    logger.error(e);
                    if(e instanceof InterruptedException){
                        return;
                    }
                }

//                System.out.println(new Date(System.currentTimeMillis()).toString()+ carrior4Periodtask.getDalta());
                //放回任务，循环执行
                queue.put(new Carrior4periodtask(carrior4Periodtask.getTask().getPeriodtime(), carrior4Periodtask.getTask()));

            }catch (Exception e){

                logger.error(e);

                if(e instanceof InterruptedException){
                    return;
                }
            }



        }



    }

    public synchronized  DelayQueue<Carrior4periodtask> getQueue() {
        return queue;
    }


}
