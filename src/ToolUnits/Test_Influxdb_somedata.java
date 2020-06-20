package ToolUnits;

import DAO.Influxdb;
import DAO.Influxdb_Access_Data;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Test_Influxdb_somedata {


    public static void main(String[] args) {


        String tagNames="M52101aAI,M52101bAI";

        Map<String,Double> final_result=new LinkedHashMap<>();
        DecimalFormat df=new DecimalFormat("0.00");//设置保留位数


        String bengin="2019-03-28T00:00:00Z";
        String end="2019-03-30T00:00:00Z";

        System.out.println(Instant.parse(bengin).minusSeconds(8*60*60)+"   "+Instant.parse(end).minusSeconds(8*60*60)+"  "+Instant.now());

        Map<String,List> results=Influxdb_Access_Data.get_sometime(null,"YNLL",tagNames,Instant.parse(bengin).minusSeconds(8*60*60),Instant.parse(end).minusSeconds(8*60*60));

        for(Map.Entry<String, List> ss:results.entrySet()){

            double sum=0;

//
            for(Double sub:(List<Double>)ss.getValue()){
                sum+=sub;
            }
            System.out.println(ss.getKey()+" "+sum/ss.getValue().size());



        }


//        for(Map.Entry<String, List> stringListEntry:results.entrySet()){
//
//            String tag=stringListEntry.getKey();
//            List<Double> sub_re=stringListEntry.getValue();
//            if(!tag.equals("L03G_PLJS_ZFK_PV")){
//
//                Double temp_sum=0d;
//                for(Double timed:sub_re){
//                    temp_sum+=timed;
//                }
//
//                final_result.put(tag,Double.valueOf(df.format(temp_sum/sub_re.size())));
//
//            }else {
//
//                final_result.put("L03G_PLJS_ZFK_PV",sub_re.get(0));
//
//            }
//
//
//        }




    }

}
