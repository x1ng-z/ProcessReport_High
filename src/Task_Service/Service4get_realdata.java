package Task_Service;

import DAO.Influxdb_Access_Data;
import Model.Firm;
import Model.Productline;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

public class Service4get_realdata {
    private static Logger logger=Logger.getLogger(Service4get_realdata.class);
    private static final int EXECTE_RATIO = 3;
    private ServletContext servletContext;
    private Management.ProcessMgr ProcessMgr;
    private ExecutorService realdate_service;
    private List<Updatetask> works=new LinkedList<Updatetask>();


    public Service4get_realdata(ServletContext servletContext,ExecutorService realdate_service) {
        this.servletContext = servletContext;
        this.realdate_service=realdate_service;
        //Connection connection = MysqlDB.getConnection(servletContext);
        ProcessMgr = Management.ProcessMgr.getProcessMgr_instance(servletContext);
        inite_works();

    }

    private   void inite_works() {

        Map<String, Firm> firmmaping = ProcessMgr.getFirmmmaping();
        for (Firm firm : firmmaping.values()) {

            Map<String, Productline> productlinemapping = firm.getProductlinemapping();
            for (Productline productline : productlinemapping.values()) {
                works.add(new Updatetask(productline));
            }

        }
    }

    public void  start(){
        for(Updatetask work:works){
        realdate_service.execute(work);
        }

    }




    private class Updatetask implements Runnable {
        private String measuerName;
        private Productline productline;

        public Updatetask( Productline productline) {
            this.measuerName = productline.getRegionfirm();
            this.productline = productline;
        }


        @Override
        public void run() {
            while (!Thread.currentThread().isInterrupted()) {

//                System.out.println(Instant.now().toString() +"i'm get real data");

                try {
                    Influxdb_Access_Data.get_Realtimedata(measuerName, productline, servletContext);
                } catch (Exception e) {
//                    e.printStackTrace();
                    logger.error(Thread.currentThread().toString() + "when get realdata");
                    if (InterruptedException.class.isInstance(e)) {
                        return;
                    }
                }


                try {
                    TimeUnit.SECONDS.sleep(EXECTE_RATIO);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return;
                }


            }


        }


    }


}
