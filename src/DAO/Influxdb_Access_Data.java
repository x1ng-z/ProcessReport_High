package DAO;

import Management.ProcessMgr;
import Model.*;
import ToolUnits.DynamicProxyHandler;
import ToolUnits.Tools;
import org.apache.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.BoundParameterQuery;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;

import javax.servlet.ServletContext;
import java.time.Instant;
import java.util.*;



public class Influxdb_Access_Data {
    private static Logger logger= Logger.getLogger(Influxdb_Access_Data.class);


    public static  void get_Realtimedata(String measureName, Product product, ServletContext servletContext) {

        InfluxDB influxDB = Influxdb.getConnect(servletContext);

//        String psql=Tools.listToString(tagnames,',');

        Query query = BoundParameterQuery.QueryBuilder.newQuery("SELECT * FROM " + measureName + " WHERE time > $start AND time < $end ORDER BY time DESC")// LIMIT 1
                .forDatabase("mydb")
                .bind("start", Instant.now().minusSeconds(60))
                .bind("end", Instant.now())
                .create();

        QueryResult queryResult = null;
        try {
            queryResult = influxDB.query(query);
        } catch (Exception e) {
            logger.error(e);
            return;
        }

        List<QueryResult.Result> queryResultResults = queryResult.getResults();
        for (QueryResult.Result result : queryResultResults) {
            if (result.getSeries() == null) {
                logger.error(measureName + "have no data");
                return;
            }
            boolean first = true;
            for (QueryResult.Series serie : result.getSeries()) {
//               System.out.println(serie.getColumns());

                for (List<Object> list : serie.getValues()) {

                    for (int i = 1; i < serie.getColumns().size(); ++i) {
                        Tag4properties tag4properties = null;

                        tag4properties = product.getTags().get(serie.getColumns().get(i));
                        if (tag4properties == null) {
                            continue;
                        }
                        if (first) {
                            tag4properties.clearMindates();
                            tag4properties.clearMinvalues();

                        }

                        if(list.get(i)!=null){

                            tag4properties.addMinvalues((Double) list.get(i));
//                                      System.out.println((String)list.get(0)+"--"+(Double) list.get(i));
                            tag4properties.addMindates(Tools.adjustTimeZone((String) list.get(0)));
//                            System.out.println((Tools.adjustTimeZone((String)list.get(0)))+"");

                        }

                    }
                    first=false;
                }

                for (int i = 1; i < serie.getColumns().size(); ++i) {
                    Tag4properties tag4properties = null;
                    tag4properties = product.getTags().get(serie.getColumns().get(i));
                    if (tag4properties == null) {
                        continue;
                    }
                    MyProperties proxytag = (MyProperties) DynamicProxyHandler.bind(tag4properties, "ToolUnits.RealDateInterceptorImp", "update", ProcessMgr.getProcessMgr_instance(servletContext).getService_alarmMonitor(), (Productline) product);
                    proxytag.update();


                }


            }


        }


    }

    public static  Map<String,List> get_sometime(ServletContext servletContext,String measureName,String tagNames, Instant starttime, Instant endtime) {

        InfluxDB influxDB = Influxdb.getConnect(servletContext);
//        System.out.println("SELECT "+tagNames+" FROM " + measureName);
        Map<String,List> timeorderData=new LinkedHashMap<>();
        Query query = BoundParameterQuery.QueryBuilder.newQuery("SELECT "+tagNames+" FROM " + measureName + " WHERE time > $start AND time < $end ORDER BY time DESC")
                .forDatabase("mydb")
                .bind("start", starttime)
                .bind("end", endtime)
                .create();

        QueryResult results = influxDB.query(query);
        List<QueryResult.Result> resultlists = results.getResults();
        for (QueryResult.Result result : resultlists) {

            for (QueryResult.Series serie : result.getSeries()) {


//                System.out.println(serie.getColumns());

                for(int i=1;i<serie.getColumns().size();i++){
                    timeorderData.put(serie.getColumns().get(i),new ArrayList());
                }

                for (List<Object> list : serie.getValues()){
                    int j=1;
                    for(String tag:timeorderData.keySet()){
                        timeorderData.get(tag).add(list.get(j++));
                    }
                }


            }

        }

        return timeorderData;


    }


}
