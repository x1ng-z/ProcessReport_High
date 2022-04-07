package DAO;

import Management.ProcessMgr;
import Model.*;
import ToolUnits.DynamicProxyHandler;
import ToolUnits.Tools;
import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.*;

import javax.servlet.ServletContext;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class test {

    public static void get_Realtimedata() {
        InfluxDB influxDB ;//= InfluxDBFactory.connect("http://192.168.10.212:8086", "admin", "admin");
//        influxDB.setDatabase("mydb");
//        influxDB.setRetentionPolicy("2year");
//        Point.Builder point=Point.measurement("test2")
//                .time(Instant.now().toEpochMilli(), TimeUnit.MILLISECONDS);
//        point.addField("itime",System.currentTimeMillis());
//        point.addField("tagname","apc.pv");
//        point.addField("tagvalue",1.2);
//        influxDB.write(point.build());


         influxDB = InfluxDBFactory.connect("http://192.168.147.180:8086", "root", "ims3d#Prod!#influx#");
        Query query = null;
        query = BoundParameterQuery.QueryBuilder.newQuery("SELECT * FROM \"node_run_data\" WHERE time > now() - 5m")// LIMIT 1
                .forDatabase("apc_data")
                .create();
        QueryResult queryResult = null;
        try {
            queryResult = influxDB.query(query);
        } catch (Exception e) {
            return;
        }
        List<QueryResult.Result> queryResultResults = queryResult.getResults();
        for (QueryResult.Result result : queryResultResults) {
            if (result.getSeries() == null) {
                return;
            }
            boolean first = true;
            for (QueryResult.Series serie : result.getSeries()) {
                Map<String,String> tags=serie.getTags();
                List<List<Object>> values=serie.getValues();
                List<String> cols=serie.getColumns();
            }


        }


    }

    public static void main(String[] args) {

        get_Realtimedata();
        System.out.println("----------------String----------------");
        //String -> LocalDateTime
        LocalDateTime startToLocalDateTime =
                LocalDateTime.parse("2020-11-20 8:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


        LocalDateTime endLocalDateTime =
                LocalDateTime.parse("2020-08-01 8:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


        Instant start = Instant.parse("2020-11-20T8:00:00.00Z");
        Instant end = Instant.parse("2007-11-20T7:55:00.00Z");


        Map<String, Firm> firmmaping = ProcessMgr.getProcessMgr_instance(null).getFirmmmaping();

        Firm firm = firmmaping.get("1002");

        Map<String, DefaultProductline> pls = firm.getProductlinemapping();
        DefaultProductline one = pls.get("0001E110000000000EYU");
        Influxdb_Access_Data.get_Realtimedata(one.getRegionfirm(), one.getTags(), null, 60, one, false, 0);

//            Map<String, Productline> productlinemapping = firm.getProductlinemapping();
//


    }
}