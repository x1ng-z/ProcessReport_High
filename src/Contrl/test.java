package Contrl;

import DAO.*;
import Management.ProcessMgr;
import Model.Firm;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DecimalFormat;
import java.time.*;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static java.util.concurrent.TimeUnit.NANOSECONDS;

public class test {
    private static ProcessMgr processMgr;

    public static void main(String[] args){


        long aa=NANOSECONDS.convert(1000,MILLISECONDS);
        processMgr = ProcessMgr.getProcessMgr_instance(null);

        Firm firm=processMgr.getFirmmmaping().get("1002");




        JSONObject  object=OracleMESdb_Access_Data.getCMqua2(firm,"2020-11-21 07:00:00","2020-11-23 07:00:00");
//        List<Map<String, String>> plfiredyeildlist = OracleMESdb_Access_Data. get_process_yield(OracleMESDB.get211Connection(), "104");

        System.out.println(object.toString());

        String device="回转窑";

        String regex = "((\\w*)(.*))";

        Pattern pattern=Pattern.compile(regex);
        Matcher m = pattern.matcher(device);
        while(m.find()){
            System.out.println(m.group());
            System.out.println(m.group(0));
            System.out.println(m.group(1));
            System.out.println(m.group(2));
            System.out.println(m.group(3));
        }




        Map<String,Double> final_result=new LinkedHashMap<>();
        JSONObject jsonArray=new JSONObject();
        DecimalFormat df=new DecimalFormat("0.0");//设置保留位数



        String[] tag_index={
                "SNTSFK_1.VALUE","SN1_loading","SN1_3","SN1_3_32","SN1_45","SN1_80",
                "SNTSFK_2.VALUE","SN2_loading","SN2_3","SN2_3_32","SN2_45","SN2_80",
                "SNTSFK_3.VALUE","SN3_loading","SN3_3","SN3_3_32","SN3_45","SN3_80",
                "YLSNTSFK_1","slloading","sl80","sl200","sl120","sl150"
        };

        String combox="";
        for(String test:tag_index){
            combox+=test+",";
        }

        System.out.println(combox.substring(0,combox.length()-1));



        Map<String,List> results=Influxdb_Access_Data.get_sometime(null,"YNHQ",(combox.substring(0,combox.length()-1)),Instant.now().minusSeconds(60*20),Instant.now());

        for(Map.Entry<String, List> stringListEntry:results.entrySet()){

            String tag=stringListEntry.getKey();
            List<Double> sub_re=stringListEntry.getValue();

            Double temp_sum=0d;
            for(Double timed:sub_re){
                temp_sum+=timed;
            }
            final_result.put(tag,Double.valueOf(df.format(temp_sum/sub_re.size())));

        }

        try {
            jsonArray.put("particle",final_result);


            System.out.println(jsonArray.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }


//        Connection connection=MysqlDB.getConnection(null);
//        processMgr =ProcessMgr.getProcessMgr_instance(null,connection);
//
////        Map<String, Tag4properties> tags=processMgr.getFirmmmaping().get("1002").getProductlinemapping().get("0001E110000000000EYU").getTags();
////
//
//
//        ExecutorService executorService=Executors.newCachedThreadPool();
//        new Service4get_realdata(null,Executors.newCachedThreadPool()).start(); ;
//        System.out.println("");


//
//        Connection connection=MysqlDB.getConnection(null);
//        oldProcessMgr=old_ProcessMgr.getProcessMgr_instance(null,connection);
//
//        new Thread(new Service4get_realdata(null)).start();

//        Map<String, Firm> rawsystemmaping=Mysql_Access_Data.getAllfirm(null,MysqlDB.getConnection(null));
//
//        System.out.println("SS"+Tools.adjustTimeZone("2018-11-10T08:01:19Z").toLocaleString());
//        try {
//            double re=Tools.div(0.0,0.0,1);
//            System.out.println(re);
//        }catch (Exception e){
//            e.printStackTrace();
//
//        }


//        LocalDateTime time = LocalDateTime.now();
//
//        LocalTime localTime=time.toLocalTime();
//
//        LocalTime specialtime=LocalTime.of(9,0,0);
//        long firstdelay=0;
//
//        if(localTime.isBefore(specialtime)){
//
//            Duration duration=Duration.between(localTime,specialtime);
//            firstdelay=duration.toMillis();
//        }else {
//
//
//           LocalDateTime secondday=LocalDateTime.of(time.toLocalDate().plusDays(1), LocalTime.of(9,0,0));
//            firstdelay=Duration.between(time,secondday).toMillis();
//        }
//
//        System.out.println(firstdelay/3600000);



//        ProcessMgr.getProcessMgr_instance(null,MysqlDB.getConnection(null)).real_pridect();
        //check null 28realStrong in mysql and fill it



//        ProcessMgr.getProcessMgr_instance(null,MysqlDB.getConnection(null)).fill_into_mysqldb_real28Strong();
//        //update 28string in RAM
//        ProcessMgr.getProcessMgr_instance(null,MysqlDB.getConnection(null)).fill_real28Strong();




    }


}
