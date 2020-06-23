package Management;

import DAO.*;
import Model.*;
import Task_Service.*;
import ToolUnits.ExecuteCmd;
import ToolUnits.Tools;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ProcessMgr {

    private static Logger logger= Logger.getLogger(Management.ProcessMgr.class);
    private Map<String, Firm> firmmmaping = null;
    private volatile static ProcessMgr processMgr = null;
    private static ServletContext servletContext;

    //    private Quality_data cuurentquality_data;
    private Quality_data current_history_quality_data;

    private Service_AlarmMonitor service_alarmMonitor;
    private LinkedBlockingQueue<Object> messageQueue = new LinkedBlockingQueue<>();


    private ProcessMgr(ServletContext servletContext) {
        this.servletContext = servletContext;
        firmmmaping = Mysql_Access_Data.getAllfirm(servletContext, MysqlDB.getConnection(servletContext));

        this.service_alarmMonitor = new Service_AlarmMonitor(servletContext);
        service_alarmMonitor.registerMonitor(Tag4properties.OPERATEMONITOR, new MonitorDefaultOperaterHistory(servletContext, messageQueue));
        service_alarmMonitor.registerMonitor(Tag4properties.ALARMMONITOR, new MonitorDefaultDymaticAlarm(servletContext, messageQueue));
        service_alarmMonitor.registerMonitor(Tag4properties.ALLVALUEMONITOR,new MonitorAllValue(servletContext,messageQueue));
        service_alarmMonitor.registerMonitor(Tag4properties.ALLVALUENODYNAMICMONITOR,new MonitorAllValueWithoutDynamic(servletContext,messageQueue));

    }


    public List<Tag4properties> deviceData(String firmname, String device,String productlineno) {
        List<Tag4properties> results = new ArrayList();
        for (Map.Entry<String, Firm> firmEntry : getFirmmmaping().entrySet()) {

            Firm subfirm = firmEntry.getValue();
            Map<String, Productline> productlinemapping = subfirm.getProductlinemapping();
            for (Map.Entry<String, Productline> productlineEntry : productlinemapping.entrySet()) {

                Productline productline = productlineEntry.getValue();
                if (productline.getRegionfirm().equals(firmname)) {
                    if(productlineno!=null){
                        if(productline.getProductline_id().equals(productlineno)){

                            for (Map.Entry<String, Tag4properties> tag4propertiesEntry : productline.getTags().entrySet()) {
                                Tag4properties tag4property = tag4propertiesEntry.getValue();
                                if (tag4property.getDevice().equals(device)) {
                                    results.add(tag4property.tagclone());
                                }

                            }
                            break;

                        }
                    }else{

                        if(productline.getProductline_id().equals("0001E110000000000EYU")){
                            for (Map.Entry<String, Tag4properties> tag4propertiesEntry : productline.getTags().entrySet()) {
                                Tag4properties tag4property = tag4propertiesEntry.getValue();
                                if (tag4property.getDevice().equals(device)) {
                                    results.add(tag4property.tagclone());
                                }

                            }
                            break;
                        }

                    }



                }

            }


        }

        return results;


    }


    public synchronized static ProcessMgr getProcessMgr_instance(ServletContext servletContext) {
        if (processMgr == null) {
            processMgr = new ProcessMgr(servletContext);
        }
        return processMgr;

    }


    public static void updateFiredSystem_quality(List<String> content, ServletContext servletContext) {

        Tools.ResolveJson_qulity(content.get(0), getProcessMgr_instance(servletContext).getFirmmmaping());


    }


    public static void updateFiredSystem_quality(List<String> content) {

        updateFiredSystem_quality(content, servletContext);


    }


    public static void updateFiredSystem_output(List<String> content) {

        updateFiredSystem_output(content, servletContext, MysqlDB.getConnection(servletContext));


    }

    public static void updateFiredSystem_output(List<String> content, ServletContext servletContext, Connection mysql_conn) {

        Tools.ResolveJson_output(content.get(0).toString(), getProcessMgr_instance(servletContext).getFirmmmaping());


    }


    public void fill_raw_yeild_data() {
        Map<String, Firm> firmmaping = getFirmmmaping();

        OracleMESdb_Access_Date.get_Raw_yield(servletContext, OracleMESDB.getConnection(servletContext), firmmaping);

    }


    public void fill_raw_02fineness_data() {
        Map<String, Firm> firmmaping = getFirmmmaping();

        OracleMESdb_Access_Date.get_Raw_02Fineness(servletContext, OracleMESDB.getConnection(servletContext), firmmaping);

    }


    public Map<String, Firm> getAllfirmmapingClone() {
        try {
            Map<String, Firm> firmmapping = this.allclone();
            return firmmapping;
        } catch (Exception e) {
            logger.error(e);
        }
        return null;
    }


    public Map<String, RawSystem> get_RawmapingClone() {
        try {
            Map<String, Firm> firmmapping = this.allclone();
            Map<String, RawSystem> rawmapping = new HashMap<String, RawSystem>();

            for (Firm firm : firmmapping.values()) {

                for (Productline productline : firm.getProductlinemapping().values()) {


                    for (RawSystem rawSystem : productline.getRawSystemmapping().values()) {

                        rawmapping.put(rawSystem.getRawsystemno(), rawSystem);

                    }

                }
            }
            return rawmapping;
        } catch (Exception e) {
            logger.error(e);
        }
        return null;
    }


    public Map<String, FiredSystem> get_FiredmapingClone() {
        try {
            Map<String, Firm> firmmapping = this.allclone();
            Map<String, FiredSystem> firedmapping = new HashMap<String, FiredSystem>();

            for (Firm firm : firmmapping.values()) {

                for (Productline productline : firm.getProductlinemapping().values()) {


                    for (FiredSystem firedSystem : productline.getFiredSystemmapping().values()) {

                        firedmapping.put(firedSystem.getFiredsystemno(), firedSystem);

                    }

                }
            }
            return firedmapping;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


//


    public Map<String, Firm> allclone() {
        Map<String, Firm> tempMapping = new HashMap<String, Firm>();

        Set<Map.Entry<String, Firm>> entries = firmmmaping.entrySet();
        for (Map.Entry<String, Firm> entry : entries) {
            tempMapping.put(entry.getKey(), entry.getValue().firmclone());
        }
        return tempMapping;
    }


    public Map<String, Firm> getFirmmmaping() {
        return firmmmaping;
    }


    public Quality_data getpredicthistory() {

        return Mysql_Access_Data.get_predicthistory(servletContext, MysqlDB.getConnection(servletContext));

    }


    public List<AlarmMessage> getCurrent_raw_OAndA() {


        List<AlarmMessage> raw_operAndAlarm = new ArrayList<AlarmMessage>();

        for (Map.Entry<String, Firm> firmEntry : firmmmaping.entrySet()) {

//            firmEntry.getKey();
            Firm firm = firmEntry.getValue();
            for (Map.Entry<String, Productline> productlineEntry : firm.getProductlinemapping().entrySet()) {

                raw_operAndAlarm.addAll(productlineEntry.getValue().getCurrent_raw_operate());
                raw_operAndAlarm.addAll(productlineEntry.getValue().getCurrent_raw_alarm());
            }


        }


        return raw_operAndAlarm;
    }


    /**
     * get the operate and alarm message
     */
    public List<AlarmMessage> getCurrent_fired_OAndA() {


        List<AlarmMessage> fired_operAndAlarm = new ArrayList<AlarmMessage>();

        for (Map.Entry<String, Firm> firmEntry : firmmmaping.entrySet()) {

//            firmEntry.getKey();
            Firm firm = firmEntry.getValue();
            for (Map.Entry<String, Productline> productlineEntry : firm.getProductlinemapping().entrySet()) {
                fired_operAndAlarm.addAll(productlineEntry.getValue().getCurrent_fired_operate());
                fired_operAndAlarm.addAll(productlineEntry.getValue().getCurrent_fired_alarm());
//                logger.info("getCurrent_fired_OAndA"+productlineEntry.getValue().getCurrent_fired_alarm().toString());
            }


        }


        return fired_operAndAlarm;
    }


    public List<AlarmMessage> get_oldalarmhistory(Date start, Date end, String processtype,ServletContext servletContext) {
        return Mysql_Access_Data.get_oldalarmhistory(servletContext, MysqlDB.getConnection(servletContext), new Timestamp(start.getTime()), new Timestamp(end.getTime()), processtype);


    }


    /**
     * @function predict 28strong and save in mysql
     */

    public void real_pridect() {

        Quality_data simple_quality_data = new Quality_data();
        Quality_data predict_quality_data = new Quality_data();
        OracleMESdb_Access_Date.get_simpledata_newst28daystrange(servletContext, OracleMESDB.getConnection(servletContext), simple_quality_data);
        OracleMESdb_Access_Date.get_newstquality_Pending_prediction(servletContext, OracleMESDB.getConnection(servletContext), predict_quality_data);


        List<Double> predict = new ArrayList<Double>();

        predict.addAll(predict_quality_data.getLoss());
        predict.addAll(predict_quality_data.getSio2());
        predict.addAll(predict_quality_data.getAl2o3());
        predict.addAll(predict_quality_data.getFe2o3());
        predict.addAll(predict_quality_data.getCao());
        predict.addAll(predict_quality_data.getMgo());
        predict.addAll(predict_quality_data.getFcao());


        String filepath = null;

        try {
            if (servletContext == null) {
                filepath = System.getProperty("user.dir") + "/conf/Predict.properties";
            } else {

                filepath = servletContext.getRealPath("/WEB-INF") + "/conf/Predict.properties";

            }
//
        } catch (Exception e) {

            e.printStackTrace();


        }
        String pyhthon_home = null;
        String model_home = null;

        try {
            FileInputStream fileInputStream = new FileInputStream(new File(filepath));
            Properties prop = new Properties();
            prop.load(fileInputStream);


            pyhthon_home = prop.getProperty("pyhthon_home");
            model_home = prop.getProperty("comput_model");
        } catch (IOException e) {
            logger.error(e);
        }


        String[] args = new String[]{pyhthon_home, model_home,
                simple_quality_data.getLoss().toString(),
                simple_quality_data.getSio2().toString(),
                simple_quality_data.getAl2o3().toString(),
                simple_quality_data.getFe2o3().toString(),
                simple_quality_data.getCao().toString(),
                simple_quality_data.getMgo().toString(),
                simple_quality_data.getFcao().toString(),
                simple_quality_data.getCompressive_pressure28().toString(),
                predict.toString()};

        String result = ExecuteCmd.execute(servletContext, args);

        Pattern pattern = Pattern.compile("\\[\\[(.*)\\]\\]");
        Matcher matcher = pattern.matcher(result);
        while (matcher.find()) {
            predict_quality_data.setPredict(Arrays.asList(Tools.myround(matcher.group(1), 2)));

        }

       logger.info("predict resulit: " + result);

        Mysql_Access_Data.save_predict(servletContext, MysqlDB.getConnection(servletContext), predict_quality_data);

    }


    /**
     * @function check null 28realStrong in mysql and fill it
     */
    public void fill_into_mysqldb_real28Strong() {
        //mysql null 28strong har_produdate

        List<String> list = Mysql_Access_Data.get_nullreal28Strong(servletContext, MysqlDB.getConnection(servletContext));
        //find har_produdate's28Strang
        Map<String, Double> pending_fillinto_mysql_28Strong = null;
        logger.info(list.toString());
        if (list.size() ==10) {
            pending_fillinto_mysql_28Strong = OracleMESdb_Access_Date.get_Pending_fillinto_Mysql_28Strong(servletContext, OracleMESDB.getConnection(servletContext), list);
        }

        //fill null 28 Strong
        if (pending_fillinto_mysql_28Strong!=null&&pending_fillinto_mysql_28Strong.size() != 0) {
            Mysql_Access_Data.fill_nullreal28Strong(servletContext, MysqlDB.getConnection(servletContext), pending_fillinto_mysql_28Strong);

        }


    }


    /**
     * @function get predict history  and fill to RAM
     */

    public void fill_real28Strong() {

        Quality_data quality_data = Mysql_Access_Data.get_predicthistory(servletContext, MysqlDB.getConnection(servletContext));
        setCurrent_history_quality_data(quality_data);

    }

    public Quality_data get28Strong() {
        return getCurrent_history_quality_data();


    }


    public void history_predict(int year, int month, int day) {

        Quality_data simple_quality_data = new Quality_data();
        Quality_data predict_quality_data = new Quality_data();

        OracleMESdb_Access_Date.get_historyst_quality(servletContext, OracleMESDB.getConnection(servletContext), predict_quality_data, year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day));

        String[] delay = Tools.get_next_month_dateSE(year, month, day);
        String start = delay[0];
        String end = delay[1];

        OracleMESdb_Access_Date.get_simple_historyst_quality(servletContext, OracleMESDB.getConnection(servletContext), simple_quality_data, start, end);
        List<Double> predict = new ArrayList<Double>();

        predict.addAll(predict_quality_data.getLoss());
        predict.addAll(predict_quality_data.getSio2());
        predict.addAll(predict_quality_data.getAl2o3());
        predict.addAll(predict_quality_data.getFe2o3());
        predict.addAll(predict_quality_data.getCao());
        predict.addAll(predict_quality_data.getMgo());
        predict.addAll(predict_quality_data.getFcao());


        String[] args = new String[]{"C:\\Users\\zaixz\\venv\\Scripts\\python.exe", "E:\\ProcessReport\\src\\ToolUnits\\Jperdict_day.py",
                simple_quality_data.getLoss().toString(),
                simple_quality_data.getSio2().toString(),
                simple_quality_data.getAl2o3().toString(),
                simple_quality_data.getFe2o3().toString(),
                simple_quality_data.getCao().toString(),
                simple_quality_data.getMgo().toString(),
                simple_quality_data.getFcao().toString(),
                simple_quality_data.getCompressive_pressure28().toString(),
                predict.toString()};


        String result = ExecuteCmd.execute(servletContext, args);

        Pattern pattern = Pattern.compile("\\[\\[(.*)\\]\\]");
        Matcher matcher = pattern.matcher(result);
        while (matcher.find()) {
            predict_quality_data.setPredict(Arrays.asList(Tools.myround(matcher.group(1), 2)));

        }


        Mysql_Access_Data.save_predict(servletContext, MysqlDB.getConnection(servletContext), predict_quality_data);


    }


    public Quality_data getCurrent_history_quality_data() {
        return current_history_quality_data;
    }

    public void setCurrent_history_quality_data(Quality_data current_history_quality_data) {
        this.current_history_quality_data = current_history_quality_data;
    }

    public Service_AlarmMonitor getService_alarmMonitor() {
        return service_alarmMonitor;
    }

    public LinkedBlockingQueue<Object> getMessageQueue() {
        return messageQueue;
    }
}
