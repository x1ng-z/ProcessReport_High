package Task_Service;

import DAO.Influxdb_Access_Data;
import Management.ProcessMgr;
import Model.DefaultProductline;
import Model.FiredSystem;
import Model.Firm;
import Model.Tag4properties;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class test {
    public static void main(String[] args) {
//

        MonitorAllValueWithoutDynamicAlarm monitorDefaultDymaticAlarm= new MonitorAllValueWithoutDynamicAlarm(null,new LinkedBlockingQueue<>());


        Tag4properties tag=new Tag4properties();
        tag.setLowlowbase(0);
        tag.setLowbase(0);
        tag.setHighbase(2);
        tag.setHighhighbase(111111);
//        tag.setFix_changerate(0);
        tag.setMinvalues(Arrays.asList(5.2,4.3,2.83));
        tag.init();
        tag.setCn("");
        monitorDefaultDymaticAlarm.judgment(tag,null);





        List<Double> d=new ArrayList<>();

        d.add(1d);
        d.add(2d);
        d.add(3d);
        d.add(4d);
        d.add(5d);

        Double[] a=new Double[5];

        d.toArray(a);
        Double[] apick=Arrays.copyOfRange(a,0,3);
        ProcessMgr processMgr = ProcessMgr.getProcessMgr_instance(null);

        Map<String, Firm> firmmaping = processMgr.getFirmmmaping();


        Map<String, DefaultProductline> productlinemapping = firmmaping.get("1045").getProductlinemapping();

        DefaultProductline defaultProductline = productlinemapping.get("0001E110000000000EYU");

        Influxdb_Access_Data.get_Realtimedata(defaultProductline.getRegionfirm(), defaultProductline.getQulityTags(), null,24*60*60, defaultProductline, false
                ,3);
//
//
//            for (DefaultProductline defaultProductline : productlinemapping.values()) {
//
//
//                Influxdb_Access_Data.get_Realtimedata(measuerName, tags, servletContext,datalengthtime, defaultProductline, islimit
//
//                Updatetask(defaultProductline, defaultProductline.getQulityTags(),1*60*60,24*60*60,true,3);
//
//            }


//        String regex = "((.*)(\\w*))";
//        Pattern pattern=Pattern.compile(regex);
//
//        Matcher matcher=pattern.matcher(tagname);
//        while (matcher.find()){
//
//            System.out.println(matcher.group(2));
//            System.out.println(matcher.group(3));
//            System.out.println(matcher.group(1));
//            System.out.println(matcher.group());
//        }


    }
}
