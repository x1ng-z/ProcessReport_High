package Task_Service;

import DAO.Influxdb_Access_Data;
import Model.FiredSystem;
import Model.Firm;
import Model.DefaultProductline;
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
    private Management.ProcessMgr processMgr;
    private ExecutorService realdate_service;
    private List<Updatetask> works=new LinkedList<Updatetask>();


    public Service4get_realdata(ServletContext servletContext,ExecutorService realdate_service) {
        this.servletContext = servletContext;
        this.realdate_service=realdate_service;
        //Connection connection = MysqlDB.getConnection(servletContext);
        processMgr = Management.ProcessMgr.getProcessMgr_instance(servletContext);
        inite_works();

    }

    private   void inite_works() {

        Map<String, Firm> firmmaping = processMgr.getFirmmmaping();
        for (Firm firm : firmmaping.values()) {

            Map<String, DefaultProductline> productlinemapping = firm.getProductlinemapping();
            for (DefaultProductline defaultProductline : productlinemapping.values()) {
                works.add(new Updatetask(defaultProductline));//烧成、生料、粉磨实时数据更新
                if((defaultProductline.getQulityTags()!=null)&&(defaultProductline.getQulityTags().size()!=0)){//质量数据获取
                    works.add(new Updatetask(defaultProductline, defaultProductline.getQulityTags(),1*60*60,24*60*60,false,0));
                }
                if(defaultProductline.getFiredSystemmapping()!=null){
                    for(FiredSystem firedSystem: defaultProductline.getFiredSystemmapping().values()){
                        if((firedSystem.getEnvPtcSystemTags()!=null)&&(firedSystem.getEnvPtcSystemTags().size()!=0)){
                            works.add(new Updatetask(defaultProductline,firedSystem.getEnvPtcSystemTags(),10*60,10*60,false,0));//环保数据获取
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




    public class Updatetask implements Runnable {
        private String measuerName;
        private DefaultProductline defaultProductline;
        private int sampletimeinterval;//间隔多少时间判断一次
        private int datalengthtime=60;//一次获取多长的数据进行判断
        private Map<String, Tag4properties> tags;//要采集那些tag进行判断
        private boolean islimit;
        private int limitcount;

        /**
         * 默认的是采集生料、回转窑系统的实时数据
         * */
        public Updatetask( DefaultProductline defaultProductline) {
            this.measuerName = defaultProductline.getRegionfirm();
            this.defaultProductline = defaultProductline;
            this.tags= defaultProductline.getTags();
            this.sampletimeinterval=3;
            this.datalengthtime=60;
            this.islimit=false;
        }

        public Updatetask(DefaultProductline defaultProductline, Map<String, Tag4properties> tags, int sampletimeinterval, int datalengthtime, boolean islimit, int limitcount) {
            this.measuerName = defaultProductline.getRegionfirm();
            this.defaultProductline = defaultProductline;
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
                    Influxdb_Access_Data.get_Realtimedata(measuerName, tags, servletContext,datalengthtime, defaultProductline, islimit
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
                   logger.error(e.getMessage(),e);
                    return;
                }


            }


        }


    }


}
