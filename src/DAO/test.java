package DAO;

import Management.ProcessMgr;
import Model.*;
import Task_Service.Service4get_realdata;
import ToolUnits.DynamicProxyHandler;
import ToolUnits.Tools;
import org.influxdb.InfluxDB;
import org.influxdb.dto.BoundParameterQuery;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class test {
    public static void main(String[] args) {

        Double mean60=4d;
        mean60=mean60/3;

//        List<Map<String,String>> jobs=OracleBapAccsessData.getJobs(OracleBap.getConnect());
//        JSONArray jsonObject= new JSONArray(jobs);
//        System.out.println(jsonObject.toString());


        Map<String, Firm> firmmaping = ProcessMgr.getProcessMgr_instance(null).getFirmmmaping();

        Influxdb_Access_Data.get_Realtimedata("SCCN",firmmaping.get("1021").getProductlinemapping().get("0001E110000000000EYU"),null);

//        AlarmMessage alarmMessage=new AlarmMessage();
//        alarmMessage.setGenertime(Instant.now());
//        Mysql_Access_Data.save_msg(null,MysqlDB.getConnection(null),alarmMessage);

//        Influxdb_Access_Data.get_Realtimedata("ZJLX",null,null);

//        Influxdb_Access_Data.get_sometime("ZJLX",Instant.now().minusSeconds(600),Instant.now());

//        RawSystem system=new RawSystem();
//                system.setRawsystem_id("10072014121140000003");
//
//                ;
////
//                Mysql_Access_Data.get_oldalarmhistory(null,MysqlDB.getConnection(null)
//                        ,new Timestamp(Tools.stringTodate("2018-11-24 00:00:00").getTime()),new Timestamp(Tools.stringTodate("2018-11-24 00:33:56").getTime()));
////
////        Oracledb_Access_Date.get_Raw_monthyield(OracleDB.getConnection(null),system);
//
//        String UTCTime="2018-11-10T03:11:39.26Z";
//        Tools.get_nowDay();
//
//
//        Date UTCDate;
//        Date lccat=null;
//        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
//
//        String localTimeStr = null ;
//        try {
//            UTCDate = format.parse(UTCTime);
//            format.setTimeZone(TimeZone.getTimeZone("GMT-8")) ;
//            localTimeStr = format.format(UTCDate) ;
//            lccat=format.parse(localTimeStr);
//
//
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//
//        Quality_data quality_data = new Quality_data();
//        Oracledb_Access_Date.get_simpledata_newst28daystrange(null, OracleDB.getConnection(null), quality_data);
//        System.out.println(quality_data.getAl2o3().toString());
//        LocalDate localDate = LocalDate.of(2019, 7, 3);
//
//        for (int i = 0; i < 100; i++) {
//
//
//            LocalDate localDate1 = null;
//            try {
//                localDate1 = localDate.minusDays(i);
//                ProcessMgr.getProcessMgr_instance(null, MysqlDB.getConnection(null)).history_predict(localDate1.getYear(), localDate1.getMonthValue(), localDate1.getDayOfMonth());
//            } catch (Exception e) {
//                e.printStackTrace();
//            }

//            System.out.println(localDate1.getYear()+"-"+localDate1.getMonthValue()+"-"+localDate1.getDayOfMonth());

//        Tools.ResolveJson_qulity("[[{\"FIRM\":\"1002\",\"DEVICE\":\"10152014041740000003\",\"FIRMNAME\":\"兰溪红狮\",\"DEVICENAME\":\"1#回转窑\",\"FCAO\":\"0\",\"KH\":\"0\"},{\"FIRM\":\"1002\",\"DEVICE\":\"10152014041740000007\",\"FIRMNAME\":\"兰溪红狮\",\"DEVICENAME\":\"2#回转窑\",\"FCAO\":\"0\",\"KH\":\"0\"},{\"FIRM\":\"1002\",\"DEVICE\":\"10152014041740000008\",\"FIRMNAME\":\"兰溪红狮\",\"DEVICENAME\":\"3#回转窑\",\"FCAO\":\"0\",\"KH\":\"0\"}]]");

            // start the threads


//         ExecutorService getexecutors=Executors.newCachedThreadPool();
//
//        MesUrl mesUrl=new MesUrl("debug",null);
//        MesUrl.GetTask[]  threads=mesUrl.getThreads();
//
//
//        for (int j = 0; j < threads.length; j++) {
//            getexecutors.execute(threads[j]);
//        }
//        ProcessMgr processMgr=ProcessMgr.getProcessMgr_instance(null,MysqlDB.getConnection(null));
//
////        Thread.yield();
//        try {
//            Thread.sleep(20000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//        System.out.println("complet");


//        MesUrl_AccessData.get_FiredsystemQuality(MesUrl.getMESUrl_httpclient(),"debug",null);
//        MesUrl_AccessData.getMesripe_output(MesUrl.getMESUrl_httpclient(),"debug",null);
//
//
//        ProcessMgr processMgr=ProcessMgr.getProcessMgr_instance(null,MysqlDB.getConnection(null));
//        System.out.println("complet");


//
//        ProcessMgr processMgr=ProcessMgr.getProcessMgr_instance(null,MysqlDB.getConnection(null));

//            InfluxDB influxDB = Influxdb.getConnect();
//
////        String psql=Tools.listToString(tagnames,',');
//
//            Query query = BoundParameterQuery.QueryBuilder.newQuery("select PA_441C5AT01.PV,DP17_1VF01_4.PV,AI421FN01F.PV,PA_441C3AT01.PV,PA_441C2AT01.PV,PA_441C4AT01.PV,PA_441C1AT01.PV,AI431RO01.PV,AI21_2P01.PV,TSFK_1.VALUE,PA_44101T02.PV,A471RB02.SP_IN,A361RP02HA_AI09,AI421FN01I.PV,ZYG_1.VALUE,A361RP01HA_AI09,AI421FNP01.PV,PA_441C4BP02,AI21_1T01,DP12-1SS01_3,AI21_1P01,SV461KL01MT01A,AI1391SB01L01,PBSB_5GD.VALUE,TSGD_1GD,A361RP02HA_AI10,AI27_2I.PV,A361RP02HA_AI13.PV,DP471RB02_SI,AI11_2P01.PV,DP17_2VF01_4.PV,SCP471HT02_AI02.PV,PA_441C3BT02.PV,SV431RO01.VALUE,AI431FM01,PA_44101P02.PV,PA_441C4BP01.PV,PA_441C3BP01.PV,SHISHIMEIHAO.IN,A361RP01HA_AI13.PV,ZDH_1.VALUE,SV421FN01.VALUE,DP431BE01_12,PA471RB01P01.PV,SCP471HT01_SSGD,PA_441C4AP02.PV,PA_441C5AP02.PV,PA_441PR01P02,PA_441C5BT01.PV,PA_441C3AP01.PV,AI11_1P01.PV,DP17_1VF01_3.PV,SV421FN02.VALUE,A361RP01HA_AI10,DP471RB02_II,SVM27_2VF01.VALUE,PA_441C5BP02.PV,PBSB_1GD,PA_441C1BT01.PV,DP761RS01_AI03,DP391BE01SS01_3.PV,AI27_2F,AI27_1F.PV,DP761RB04_SI.PV,A761RS03_GD.VALUE,DP12-2SS01_3,SV27_1.VALUE,AI11_1T01.PV,A361RP02HA_AI14.PV,PA471KH01T01.PV,TSGD_2GD.VALUE,AI421FN02F.PV,DP471RB01_SI,DP17_2VF01_3.PV,PA_441C4BT01.PV,AI27_1I.PV,PA_441C5AT02.PV,PA_441C2AP01.PV,PA_441C4AP01.PV,PA_441C2BT01.PV,TSFK_2.VALUE,PA_441C3AT02.PV,AI461KL01MT01A,AI461KL01MT01AI,AI421FN02I.PV,PA_44101T01.PV,PA471RB02P01.PV,ZDH_2.VALUE,A471RB01.SP_IN,SV431FM01.VALUE,PA_441C4BT02.PV,PA_441C1BP01.PV,PA_441C3AP02.PV,PA_441C2BP01.PV,PA_441C5BT02.PV,AI21_2T01,PA_441PR01T02.PV,AI21_2P01,PA_441C5BP01.PV,AI461KL01MT01BI,SVM27_1VF01.VALUE,DP471RB01_II,DP481DP01_II,PA_441C3BT01.PV,A761RS01_GD.VALUE,PA_441C1AP01.PV,PA_44101P01.PV,PA_441C3BP02.PV,SCP471HT02_SSGD,AI11_2T01.PV,DP761RS03_AI03,PA_441C4AT02.PV,AI761RB04P01,SV27_2,A361RP01HA_AI14.PV,DP431BE02_12,SCP471HT01_AI02.PV,ZYG_2.VALUE,DP391BE01SS02_3.PV,PA_441C5AP01.PV,AI21_1P01.PV  from JXYP where time> " + Instant.now().minusSeconds(60).toEpochMilli() + "000000" + " and  time<" + Instant.now().toEpochMilli() + "000000")// LIMIT 1
//                    .forDatabase("mydb")
//                    .create();
//
//            QueryResult queryResult = null;
//            try {
//                queryResult = influxDB.query(query);
//                System.out.println("");
//            } catch (Exception e) {
//                e.printStackTrace();
//                System.out.println("select PA_441C5AT01.PV,DP17_1VF01_4.PV,AI421FN01F.PV,PA_441C3AT01.PV,PA_441C2AT01.PV,PA_441C4AT01.PV,PA_441C1AT01.PV,AI431RO01.PV,AI21_2P01.PV,TSFK_1.VALUE,PA_44101T02.PV,A471RB02.SP_IN,A361RP02HA_AI09,AI421FN01I.PV,ZYG_1.VALUE,A361RP01HA_AI09,AI421FNP01.PV,PA_441C4BP02,AI21_1T01,DP12-1SS01_3,AI21_1P01,SV461KL01MT01A,AI1391SB01L01,PBSB_5GD.VALUE,TSGD_1GD,A361RP02HA_AI10,AI27_2I.PV,A361RP02HA_AI13.PV,DP471RB02_SI,AI11_2P01.PV,DP17_2VF01_4.PV,SCP471HT02_AI02.PV,PA_441C3BT02.PV,SV431RO01.VALUE,AI431FM01,PA_44101P02.PV,PA_441C4BP01.PV,PA_441C3BP01.PV,SHISHIMEIHAO.IN,A361RP01HA_AI13.PV,ZDH_1.VALUE,SV421FN01.VALUE,DP431BE01_12,PA471RB01P01.PV,SCP471HT01_SSGD,PA_441C4AP02.PV,PA_441C5AP02.PV,PA_441PR01P02,PA_441C5BT01.PV,PA_441C3AP01.PV,AI11_1P01.PV,DP17_1VF01_3.PV,SV421FN02.VALUE,A361RP01HA_AI10,DP471RB02_II,SVM27_2VF01.VALUE,PA_441C5BP02.PV,PBSB_1GD,PA_441C1BT01.PV,DP761RS01_AI03,DP391BE01SS01_3.PV,AI27_2F,AI27_1F.PV,DP761RB04_SI.PV,A761RS03_GD.VALUE,DP12-2SS01_3,SV27_1.VALUE,AI11_1T01.PV,A361RP02HA_AI14.PV,PA471KH01T01.PV,TSGD_2GD.VALUE,AI421FN02F.PV,DP471RB01_SI,DP17_2VF01_3.PV,PA_441C4BT01.PV,AI27_1I.PV,PA_441C5AT02.PV,PA_441C2AP01.PV,PA_441C4AP01.PV,PA_441C2BT01.PV,TSFK_2.VALUE,PA_441C3AT02.PV,AI461KL01MT01A,AI461KL01MT01AI,AI421FN02I.PV,PA_44101T01.PV,PA471RB02P01.PV,ZDH_2.VALUE,A471RB01.SP_IN,SV431FM01.VALUE,PA_441C4BT02.PV,PA_441C1BP01.PV,PA_441C3AP02.PV,PA_441C2BP01.PV,PA_441C5BT02.PV,AI21_2T01,PA_441PR01T02.PV,AI21_2P01,PA_441C5BP01.PV,AI461KL01MT01BI,SVM27_1VF01.VALUE,DP471RB01_II,DP481DP01_II,PA_441C3BT01.PV,A761RS01_GD.VALUE,PA_441C1AP01.PV,PA_44101P01.PV,PA_441C3BP02.PV,SCP471HT02_SSGD,AI11_2T01.PV,DP761RS03_AI03,PA_441C4AT02.PV,AI761RB04P01,SV27_2,A361RP01HA_AI14.PV,DP431BE02_12,SCP471HT01_AI02.PV,ZYG_2.VALUE,DP391BE01SS02_3.PV,PA_441C5AP01.PV,AI21_1P01.PV  from JXYP where time> " + Instant.now().minusSeconds(60).toEpochMilli() + "000000" + " and  time<" + Instant.now().toEpochMilli() + "000000");
////            LogMgr.getLogMgr_instance(servletContext).WirteError(e);
//                return;
//            }
//
//            return;


//        }


    }
}