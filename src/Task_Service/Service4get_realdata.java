package Task_Service;

import DAO.Influxdb_Access_Data;
import Model.FiredSystem;
import Model.Firm;
import Model.Productline;
import Model.Tag4properties;
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
                works.add(new Updatetask(productline));//烧成、生料实时数据更新
                if((productline.getQulityTags()!=null)&&(productline.getQulityTags().size()!=0)){//质量数据获取
                    works.add(new Updatetask(productline,productline.getQulityTags(),1*60*60,24*60*60,true,3));
                }
                if(productline.getFiredSystemmapping()!=null){
                    for(FiredSystem firedSystem:productline.getFiredSystemmapping().values()){
                        if((firedSystem.getEnvPtcSystemTags()!=null)&&(firedSystem.getEnvPtcSystemTags().size()!=0)){
                            works.add(new Updatetask(productline,firedSystem.getEnvPtcSystemTags(),5*60,5*60,false,0));//环保数据获取
                        }
                    }

                }


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
        private int sampletimeinterval;//间隔多少时间判断一次
        private int datalengthtime=60;//一次获取多长的数据进行判断
        private Map<String, Tag4properties> tags;//要采集那些tag进行判断
        private boolean islimit;
        private int limitcount;

        /**
         * 默认的是采集生料、回转窑系统的实时数据
         * */
        public Updatetask( Productline productline) {
            this.measuerName = productline.getRegionfirm();
            this.productline = productline;
            this.tags=productline.getTags();
            this.sampletimeinterval=3;
            this.datalengthtime=60;
            this.islimit=false;
        }

        public Updatetask( Productline productline,Map<String, Tag4properties> tags,int sampletimeinterval,int datalengthtime,boolean islimit,int limitcount) {
            this.measuerName = productline.getRegionfirm();
            this.productline = productline;
            this.sampletimeinterval=sampletimeinterval;
            this.datalengthtime=datalengthtime;
            this.islimit=islimit;
            this.limitcount=limitcount;
            this.tags=tags;
        }

        @Override
        public void run() {
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    Influxdb_Access_Data.get_Realtimedata(measuerName, tags, servletContext,datalengthtime,productline, islimit
                    ,limitcount);
                } catch (Exception e) {
//
                    logger.error(Thread.currentThread().toString() + "when get realdata");
                    if (InterruptedException.class.isInstance(e)) {
                        return;
                    }
                }


                try {
                    TimeUnit.SECONDS.sleep(sampletimeinterval);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return;
                }


            }


        }


    }


}
