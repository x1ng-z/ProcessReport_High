package DAO;

import Management.ProcessMgr;
import Model.*;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class test {
    public static void main(String[] args) {

        System.out.println("----------------String----------------");
        //String -> LocalDateTime
        LocalDateTime startToLocalDateTime =
                LocalDateTime.parse("2020-11-20 8:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


        LocalDateTime endLocalDateTime =
                LocalDateTime.parse("2020-08-01 8:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));



        Instant start=Instant.parse("2020-11-20T8:00:00.00Z");
        Instant end=Instant.parse("2007-11-20T7:55:00.00Z");


        Map<String, Firm> firmmaping = ProcessMgr.getProcessMgr_instance(null).getFirmmmaping();

        Firm firm = firmmaping.get("1002");

       Map<String, DefaultProductline> pls= firm.getProductlinemapping();
        DefaultProductline one=pls.get("0001E110000000000EYU");
        Influxdb_Access_Data.get_Realtimedata(one.getRegionfirm(),one.getTags(),null,60,one,false,0);

//            Map<String, Productline> productlinemapping = firm.getProductlinemapping();
//


    }
}