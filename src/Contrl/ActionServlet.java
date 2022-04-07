package Contrl;

import Action.*;
import Bap.Device.BapDeviceAlarm;
import DAO.*;

import Management.ProcessMgr;
import Model.AlarmMessage;
import Model.Firm;
import Model.DefaultProductline;
import Model.Tag4properties;
import Task_Service.*;
import ToolUnits.JMS_Text_Service;
import ToolUnits.Tools;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


public class ActionServlet extends HttpServlet {
    private static Logger logger = Logger.getLogger(ActionServlet.class);
    private static ProcessMgr processMgr;
    private ExecutorService requestexec = Executors.newCachedThreadPool();
    private ServletContext servletContext;
    ExecutorService exeThreadPool = null;
    private static String filepath = null;
    private static boolean DEBUG = true;


    @Override
    public void destroy() {
        super.destroy();
        try {

            System.out.println("####END");

            requestexec.shutdownNow();
            exeThreadPool.shutdownNow();


            MysqlDB.getConnection(servletContext).close();
            Influxdb.getConnect(servletContext).close();
            MesUrl.CloseClient();
            JMS_Text_Service.get_MesService().close();

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
        }
    }

    @Override
    public void init() throws ServletException {
        super.init();
        servletContext = getServletContext();

        try {
            if (DEBUG) {

                filepath = getServletContext().getRealPath("/WEB-INF") + "/conf/log4j.properties";
            } else {

                filepath = System.getProperty("user.dir") + "/conf/log4j.properties";
            }

            PropertyConfigurator.configure(filepath);
        } catch (Exception exception) {
            System.out.println(exception.toString());
        }


        exeThreadPool = Executors.newCachedThreadPool(new DaemonThreadFactory());
        //Connection connection = MysqlDB.getConnection(servletContext);
        processMgr = ProcessMgr.getProcessMgr_instance(servletContext);

        /**定时执行任务池*/
        exeThreadPool.execute(Service_Executor4Periodtask.getExecutor_periodtask(servletContext));

        exeThreadPool.execute(new Service_Save_OpeAndAlarm_MSG(servletContext, processMgr.getMessageQueue(), false));


        Data_Rawfineness dataRawfineness = new Data_Rawfineness(servletContext, 1 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(dataRawfineness.getPeriodtime(), dataRawfineness));


        int firstdelay = Tools.getfirstupdate(15, 10, 0);
        Data_Rawyeild dateRawyeild = new Data_Rawyeild(servletContext, 1 * 24 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firstdelay, dateRawyeild));


        //Quality_predict quality_predict = new Quality_predict(servletContext, 1 * 24 * 60 * 60 * 1000);
        //Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firstdelay, quality_predict));

        FiredSystem_QulityData firedSystem_qulityData = new FiredSystem_QulityData(servletContext, 1 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firedSystem_qulityData.getPeriodtime(), firedSystem_qulityData));

        int firedyieldfirstdelay = Tools.getfirstupdate(7, 30, 0);
        FiredSystem_output firedSystem_output = new FiredSystem_output(servletContext, 1 * 24 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firedyieldfirstdelay, firedSystem_output));

        firedSystem_qulityData.execute();
        firedSystem_output.execute();

        Thread tempthread = new Thread(new Runnable() {
            @Override
            public void run() {
                dataRawfineness.execute();
                dateRawyeild.execute();
//                quality_predict.execute();

            }
        });
        tempthread.setDaemon(true);
        tempthread.start();

        /**实时数据更新服务*/
        new Service4get_realdata(servletContext, exeThreadPool).start();
        System.out.println("## System start!");


    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//
//        InitialContext initialContext=new InitialContext();
//        initialContext.lookup()

        String method = request.getParameter("method");
        if (method.trim().equals("RD")) {

            try {

                Future<JSONObject> jsonArrayFuture = requestexec.submit(new Action4Get_RawRealData(request, servletContext));

                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();
                out.println(jsonArrayFuture.get().toString());

                // alwaysexec.shutdown();

            } catch (InterruptedException e) {
                logger.error(e);
            } catch (ExecutionException e) {
                logger.error(e);
            }


        }
        if (method.trim().equals("HD")) {//operate or alarm data

            try {

                Future<JSONObject> jsonArrayFuture = requestexec.submit(new Action4GetalarmHistoryAlarmData(request, servletContext));

                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();
                out.println(jsonArrayFuture.get().toString());

                // alwaysexec.shutdown();

            } catch (InterruptedException e) {
                logger.error(e);
            } catch (ExecutionException e) {
                logger.error(e);
            }


        }


        if (method.trim().equals("quality")) {

            try {

                Future<JSONObject> jsonArrayFuture = requestexec.submit(new Action4GetQualitPredict(request, servletContext));

                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();
                out.println(jsonArrayFuture.get().toString());

                // alwaysexec.shutdown();

            } catch (InterruptedException e) {
                logger.error(e);
            } catch (ExecutionException e) {
                logger.error(e);
            }

        }

        if (method.trim().equals("allquality")) {

            try {

                Future<JSONObject> jsonArrayFuture = requestexec.submit(new Action4Get_AllqulityData(request, servletContext));

                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();
                out.println(jsonArrayFuture.get().toString());

                // alwaysexec.shutdown();

            } catch (InterruptedException e) {
                logger.error(e);
            } catch (ExecutionException e) {
                logger.error(e);
            }

        }

        if (method.trim().equals("envptc")) {

            try {

                Future<JSONObject> jsonArrayFuture = requestexec.submit(new Action4Get_EnvPTCData(request, servletContext));

                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();
                out.println(jsonArrayFuture.get().toString());

                // alwaysexec.shutdown();

            } catch (InterruptedException e) {
                logger.error(e);
            } catch (ExecutionException e) {
                logger.error(e);
            }

        }


        if (method.trim().equals("FiredRD")) {//real data

            try {


                Future<JSONObject> jsonArrayFuture = requestexec.submit(new Action4Get_FriedRealData(request, servletContext));

                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();

//                System.out.println("##" + jsonArrayFuture.get().toString());
                out.println(jsonArrayFuture.get().toString());

                // alwaysexec.shutdown();

            } catch (Exception e) {
                logger.error(e);
                ;

            }


        }

        if (method.trim().equals("CementRD")) {//real data

            try {

                Future<JSONObject> jsonArrayFuture = requestexec.submit(new Action4Get_CementRealData(request, servletContext));
                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();
//                System.out.println("##" + jsonArrayFuture.get().toString());
                out.println(jsonArrayFuture.get().toString());

                // alwaysexec.shutdown();

            } catch (Exception e) {
                logger.error(e);
                ;

            }


        }

        if (method.trim().equals("PD")) {

            List<String> production = new LinkedList<>();
            Set<String> device = new HashSet<>();

            for (Firm firm : processMgr.getFirmmmaping().values()) {

                for (DefaultProductline defaultProductline : firm.getProductlinemapping().values()) {
                    production.add(defaultProductline.getProductline_cn());
                    for (Tag4properties tag : defaultProductline.getTags().values()) {
                        device.add(tag.getDevice());
                    }
                }


            }


            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            JSONObject json = new JSONObject();
            try {
                json.put("production", production);
                json.put("device", device);
            } catch (JSONException e) {
                logger.error(e);
            }


//                System.out.println("##" + jsonArrayFuture.get().toString());
            out.println(json.toString());

        }
        if (method.trim().equals("filter")) {

            System.out.println("pro: " + request.getParameter("production") +
                    " device: " + request.getParameter("device") +
                    " tag: " + request.getParameter("tag"));
            Set<String> devices = new HashSet<>();
            List<String> tags = new LinkedList<>();

            if (request.getParameter("device").equals("All")) {

                if (!request.getParameter("production").equals("All")) {


                    for (Firm firm : processMgr.getFirmmmaping().values()) {

                        for (DefaultProductline defaultProductline : firm.getProductlinemapping().values()) {
                            String pln = "";


                            if (request.getParameter("production").contains("1") || request.getParameter("production").contains("2") || request.getParameter("production").contains("3")) {
                                pln += request.getParameter("production") + "#";
                            } else {
                                pln = request.getParameter("production");
                            }

                            if (defaultProductline.getProductline_cn().equals(pln)) {
                                for (Tag4properties tag : defaultProductline.getTags().values()) {
                                    devices.add(tag.getDevice());
                                }

                            }
                        }


                    }


                }


            } else {

                if (request.getParameter("tag").equals("All")) {
                    for (Firm firm : processMgr.getFirmmmaping().values()) {

                        for (DefaultProductline defaultProductline : firm.getProductlinemapping().values()) {

                            if (request.getParameter("production").equals("All")) {

                                for (Tag4properties tag : defaultProductline.getTags().values()) {

                                    if (request.getParameter("device").equals(tag.getDevice())) {
                                        tags.add(tag.getProductlinename() + "%" + tag.getDevice() + "%" + tag.getCn() + "%" + tag.getTag() + "%" + tag.getHighhighbase() + "%" + tag.getHighbase() + "%" + tag.getLowbase() + "%" + tag.getLowlowbase() + "%" + tag.getFix_changerate() + "%" + tag.isIsalarm() + "%" + tag.isIsaudio() + "%" + tag.getAlarm_mode() + "%" + tag.getAlarmtmonitor());
                                    }
                                }


                            } else {

                                String pln = "";
                                if (request.getParameter("production").contains("1") || request.getParameter("production").contains("2") || request.getParameter("production").contains("3")) {
                                    pln += request.getParameter("production") + "#";
                                    System.out.println(pln);
                                } else {
                                    pln = request.getParameter("production");
                                }
                                if (pln.equals(defaultProductline.getProductline_cn())) {
                                    for (Tag4properties tag : defaultProductline.getTags().values()) {
                                        if (request.getParameter("device").equals(tag.getDevice())) {
                                            tags.add(tag.getProductlinename() + "%" + tag.getDevice() + "%" + tag.getCn() + "%" + tag.getTag() + "%" + tag.getHighhighbase() + "%" + tag.getHighbase() + "%" + tag.getLowbase() + "%" + tag.getLowlowbase() + "%" + tag.getFix_changerate() + "%" + tag.isIsalarm() + "%" + tag.isIsaudio() + "%" + tag.getAlarm_mode() + "%" + tag.getAlarmtmonitor());
                                        }
                                    }

                                }


                            }


                        }

                    }


                } else {
                    String pln = "";
                    if (request.getParameter("production").contains("1") || request.getParameter("production").contains("2") || request.getParameter("production").contains("3")) {
                        pln += request.getParameter("production") + "#";
                    } else {
                        pln = request.getParameter("production");
                    }

                    for (Firm firm : processMgr.getFirmmmaping().values()) {

                        for (DefaultProductline defaultProductline : firm.getProductlinemapping().values()) {
                            if (pln.equals(defaultProductline.getProductline_cn())) {

                                for (Tag4properties tag : defaultProductline.getTags().values()) {

                                    if (request.getParameter("device").equals(tag.getDevice()) && (tag.getCn().equals(request.getParameter("tag")))) {
                                        tags.add(tag.getProductlinename() + "%" + tag.getDevice() + "%" + tag.getCn() + "%" + tag.getTag() + "%" + tag.getHighhighbase() + "%" + tag.getHighbase() + "%" + tag.getLowbase() + "%" + tag.getLowlowbase() + "%" + tag.getFix_changerate() + "%" + tag.isIsalarm() + "%" + tag.isIsaudio() + "%" + tag.getAlarm_mode() + "%" + tag.getAlarmtmonitor());
                                    }
                                }

                            }


                        }

                    }


                }


            }


            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            JSONObject json = new JSONObject();
            try {
                json.put("tag", tags);
                json.put("device", devices);
            } catch (JSONException e) {
                logger.error(e);
            }


//                System.out.println("##" + jsonArrayFuture.get().toString());
            out.println(json.toString());


        }
        if (method.trim().equals("particle")) {
            String combox = "";
            for (String test : request.getParameterValues("tagName")) {
                combox += test + ",";
            }

            System.out.println(combox.substring(0, combox.length() - 1));
            String measurement = request.getParameter("measurement");
            Long timespan = Long.valueOf(request.getParameter("timespan"));

            Future<JSONObject> results = requestexec.submit(new Action4Get_Particle_moredata(servletContext, measurement, combox.substring(0, combox.length() - 1), timespan));
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        }


        if (method.trim().equals("finddevice")) {

            String devicename = request.getParameter("device");
            String firmname = request.getParameter("firmname");
            String productline = request.getParameter("productline");


            Future<JSONObject> results = requestexec.submit(new Action4GetZipper(servletContext, firmname, devicename, productline));
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        }


        if (method.trim().equals("moredata")) {
            StringJoiner combox=new StringJoiner(",","\"","\"") ;
            for (String test : request.getParameterValues("tagName")) {
                combox.add(test) ;
            }
            Instant endTime=null;
            DateTimeFormatter dateTimeFormatter=DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").withZone(ZoneId.systemDefault());
            String measurement = request.getParameter("measurement");
            Long timespan = Long.valueOf(request.getParameter("timespan"));

            String paraEndTime=Optional.ofNullable(request.getParameter("endTime")).orElseGet(()->{
                LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.now(), ZoneId.of("UTC"));
                return localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            });

            try {
                endTime=LocalDateTime.parse(paraEndTime,dateTimeFormatter).toInstant(ZoneOffset.UTC);
            } catch (Exception e) {
                logger.error("time parse error.time context="+paraEndTime);

                response.setContentType("text/json; charset=UTF-8");
                response.setHeader("Cache-Control", "no-store"); //HTTP1.1
                response.setHeader("Pragma", "no-cache"); //HTTP1.0
                response.setDateHeader("Expires", 0);
                PrintWriter out = response.getWriter();
                JSONObject outContext=new JSONObject();
                outContext.put("message","time parse error.time context="+paraEndTime);
                outContext.put("status",500);
                out.print(outContext.toString());
                return;
            }
            Instant a=Instant.now();
//            Future<JSONObject> results = requestexec.submit();
            try {
                new Action4Get_HistoryMoreRealdata(getServletContext(), measurement, combox.toString(), endTime,timespan).call();
            } catch (Exception e) {
                e.printStackTrace();
            }
            Future<JSONObject> results = requestexec.submit(new Action4Get_HistoryMoreRealdata(getServletContext(), measurement, combox.toString(), endTime,timespan));
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                JSONObject resjson = results.get();
                if (resjson != null) {
                    out.print(resjson.toString());
                }
            } catch (InterruptedException e) {
                logger.error("moredata 执行异常");
            } catch (ExecutionException e) {
                logger.error("moredata 执行异常");
            }catch (Exception e){
                logger.error("moredata 执行异常");
            }
        }

        if (method.trim().equals("setprocessStatus")) {

            Future<String> results = requestexec.submit(new Action4SetMSGStatus(request, servletContext));

            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                String res = results.get();
                out.print(res);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        }


        if (method.trim().equals("getfiredtag")) {
            String firedsystemno = request.getParameter("firedsystemno");
            logger.info(firedsystemno);
            List<Map<String, String>> tagproperties = Mysql_Access_Data.get_firedallTags(getServletContext(), MysqlDB.getConnection(getServletContext()), firedsystemno);
            JSONArray jsonObject = new JSONArray(tagproperties);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            out.print(jsonObject.toString());
        }

        //生料tag获取--by lang
        if (method.trim().equals("getrawtag")) {
            String rawsystemno = request.getParameter("rawsystemno");
            logger.info(rawsystemno);
            List<Map<String, String>> tagproperties = Mysql_Access_Data.get_rawallTags(getServletContext(), MysqlDB.getConnection(getServletContext()), rawsystemno);
            JSONArray jsonObject = new JSONArray(tagproperties);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            out.print(jsonObject.toString());
        }


        if (method.trim().equals("setfiredlimit")) {
            int id = Integer.valueOf(request.getParameter("id"));
            double highhighlimit = Double.valueOf(request.getParameter("highhighlimit"));
            double highlimit = Double.valueOf(request.getParameter("highlimit"));
            double lowlowlimit = Double.valueOf(request.getParameter("lowlowlimit"));
            double lowlimit = Double.valueOf(request.getParameter("lowlimit"));

            String result = Mysql_Access_Data.updatafiredtagslimit(MysqlDB.getConnection(getServletContext()), id, highhighlimit, highlimit, lowlowlimit, lowlimit);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            out.print(result);
        }

        //生料报警限设置--by lang
        if (method.trim().equals("setrawlimit")) {
            int id = Integer.valueOf(request.getParameter("id"));
            double highhighlimit = Double.valueOf(request.getParameter("highhighlimit"));
            double highlimit = Double.valueOf(request.getParameter("highlimit"));
            double lowlowlimit = Double.valueOf(request.getParameter("lowlowlimit"));
            double lowlimit = Double.valueOf(request.getParameter("lowlimit"));

            String result = Mysql_Access_Data.updatarawtagslimit(MysqlDB.getConnection(getServletContext()), id, highhighlimit, highlimit, lowlowlimit, lowlimit);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            out.print(result);
        }

        if (method.trim().equals("getJobs")) {
            List<Map<String, String>> jobs = OracleBapAccsessData.getJobs(OracleBap.getConnect(getServletContext()));
            JSONArray jsonObject = new JSONArray(jobs);

            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();

            out.print(jsonObject.toString());
        }

        if (method.trim().equals("postJob")) {
            String msg_id = request.getParameter("msg_id");
            String device_name = request.getParameter("device_name");
            String alarm_describe = request.getParameter("alarm_describe");
            String alarm_time = request.getParameter("alarm_time");
            String alarm_level = request.getParameter("alarm_level");
            String alarm_type = request.getParameter("alarm_type");
            logger.info(msg_id + device_name + alarm_describe + alarm_time);
            String eamCode = "3305";
            String regex = "(\\w*)";
            Pattern pattern = Pattern.compile(regex);
            Matcher mdevice = pattern.matcher(device_name);
            if (mdevice.find()) {
                eamCode += mdevice.group();
            }

            String priority = "";

            String bapBackvalue = "";
            String result = "failed";
            try {
                String strReqDelTime = alarm_time;
                Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(strReqDelTime);
                Instant reqInstant = date.toInstant();
                bapBackvalue = new BapDeviceAlarm(new URL("file:\\" + getServletContext().getRealPath("/WEB-INF") + "\\conf\\faultInfoRelevantService.wsdl")).PushAlarmMessage(
                        eamCode,
                        "BEAM2006/06",
                        alarm_type.equals("05") ? "BEAM029/05" : "BEAM029/07",
                        "BEAM2007/" + alarm_level,
                        "3305",
                        alarm_describe,
                        reqInstant.toEpochMilli());
                regex = "<CODE>(.*)</CODE><RESULTINFO>(.*)</RESULTINFO>";

                Pattern patternbap = Pattern.compile(regex);
                Matcher mbap = patternbap.matcher(bapBackvalue);
                if (mbap.find()) {
                    if (mbap.group(1).equals("SUCCESS")) {
                        Mysql_Access_Data.updataAlarmHistBapJobId(MysqlDB.getConnection(servletContext), mbap.group(2), Integer.valueOf(msg_id));
                        result = "success";
                    } else {
                        //..
                    }
                }
            } catch (MalformedURLException e) {
                logger.error(e);
            } catch (ParseException e) {

                logger.error(e);
            } catch (Exception e) {
                logger.error(e);
            }

            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            JSONObject r = new JSONObject();
            try {
                r.put("msg", result);
            } catch (JSONException e) {
                logger.error(e);
            }
            out.print(r.toString());


        }
        if (method.trim().equals("getSLharm")) {

            Action4GetFiredClAndCr action4GetClAndCr = new Action4GetFiredClAndCr(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4GetClAndCr);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }


        if (method.trim().equals("getCMharm")) {

            Action4GetCemntClAndCr action4GetClAndCr = new Action4GetCemntClAndCr(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4GetClAndCr);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }

        if (method.trim().equals("getCCharm")) {

            Action4GetCemntPOutClAndCr action4GetClAndCr = new Action4GetCemntPOutClAndCr(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4GetClAndCr);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }

        if (method.trim().equals("getrawfine")) {

            Action4GetRawFine action4GetRawFine = new Action4GetRawFine(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4GetRawFine);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }


        if (method.trim().equals("getraw3rate")) {

            Action4getraw3rate action4getraw3rate = new Action4getraw3rate(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4getraw3rate);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }


        if (method.trim().equals("getCMqua")) {

            Action4getCMqua action4getCMqua = new Action4getCMqua(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4getCMqua);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }

        if (method.trim().equals("getCMqua2")) {

            Action4getCMqua2 action4getCMqua = new Action4getCMqua2(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4getCMqua);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }

        //Action4getCoat
        if (method.trim().equals("getcoat")) {

            Action4getCoat action4getCMqua = new Action4getCoat(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4getCMqua);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }


        if (method.trim().equals("getCCqua")) {

            Action4getCCqua action4getCMqua = new Action4getCCqua(request, servletContext);
            Future<JSONArray> results = requestexec.submit(action4getCMqua);
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            try {
                out.print(results.get().toString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

        }


        if (method.trim().equals("powerRD")) {
            String range = request.getParameter("range");//all 所以子公司,或公司id
            String en = request.getParameter("en");//ch 中文cn 或者 en tag
            JSONObject res = new JSONObject();
            res.put("timestamp", System.currentTimeMillis());
            JSONArray data = new JSONArray();
            res.put("data", data);
            List<AlarmMessage> oh=new ArrayList<>();

            if (range != null) {
                if (range.equals("all")) {
                    processMgr.getFirmmmaping().values().forEach(f -> {

                        f.getProductlinemapping().values().forEach(p -> {


                            p.getPowerSystemmapping().values().forEach(s -> {
                                JSONObject sysCell = new JSONObject();
                                data.put(sysCell);
                                JSONObject frimcelldata = new JSONObject();
                                sysCell.put(s.getYuresystemno(), frimcelldata);
                                s.getTagMapping().values().forEach(tag -> {
                                    if (en != null && (!en.equals(""))) {
                                        if (en.equals("en")) {
                                            frimcelldata.put(tag.getTag(), tag.getValue());
                                        } else if (en.equals("ch")) {
                                            frimcelldata.put(tag.getDevice() + tag.getCn(), tag.getValue());
                                        } else {
                                            frimcelldata.put(tag.getTag(), tag.getValue());
                                        }
                                    } else {
                                        frimcelldata.put(tag.getTag(), tag.getValue());
                                    }
                                });
                            });
                            //add alarm
                            oh.addAll(p.getCurrent_power_alarm());
                        });
                    });
                } else {
                    Firm firm = processMgr.getFirmmmaping().get(range);
                    if (firm != null) {

                        firm.getProductlinemapping().values().forEach(p -> {
                            p.getPowerSystemmapping().values().forEach(s -> {

                                JSONObject sysCell = new JSONObject();
                                data.put(sysCell);
                                JSONObject frimcelldata = new JSONObject();
                                sysCell.put(s.getYuresystemno(), frimcelldata);

                                s.getTagMapping().values().forEach(tag -> {
                                    if (en != null && (!en.equals(""))) {
                                        if (en.equals("en")) {
                                            frimcelldata.put(tag.getTag(), tag.getValue());
                                        } else if (en.equals("ch")) {
                                            frimcelldata.put(tag.getDevice() + tag.getCn(), tag.getValue());
                                        } else {
                                            frimcelldata.put(tag.getTag(), tag.getValue());
                                        }
                                    } else {
                                        frimcelldata.put(tag.getTag(), tag.getValue());
                                    }
                                });
                            });
                        });


                    }
                }


            }


            res.put("operatehistory",oh.stream().map(AlarmMessage::toString).collect(Collectors.toList()));
            response.setContentType("text/json; charset=UTF-8");
            response.setHeader("Cache-Control", "no-store"); //HTTP1.1
            response.setHeader("Pragma", "no-cache"); //HTTP1.0
            response.setDateHeader("Expires", 0);
            PrintWriter out = response.getWriter();
            out.print(res.toString());
        }



    }
}
