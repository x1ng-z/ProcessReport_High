package Action;



import DAO.Influxdb_Access_Data;
import org.json.JSONObject;
import retrofit2.Call;

import javax.servlet.ServletContext;
import java.text.DecimalFormat;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

public class Action4Get_HistoryMoreRealdata implements Callable< JSONObject> {

    private String measureName;
    private String tagNames;
    private Long time_span;
    private ServletContext servletContext;
    private Instant endTime;

    public Action4Get_HistoryMoreRealdata(ServletContext servletContext, String measureName, String tagNames,Instant endTime, Long time_span) {
        this.measureName = measureName;
        this.tagNames = tagNames;
        this.time_span = time_span;
        this.servletContext=servletContext;
        this.endTime=endTime;
    }


    @Override
    public  JSONObject call() throws Exception {


//        String tagNames="L03G_PLJS_ZFK_PV, SampleLoading, LessThan_3um, Between_3um_32um, MoreThan_45um, MoreThan_80um";

        Map<String,Double> final_result=new LinkedHashMap<>();
        JSONObject jsonArray=new JSONObject();
        DecimalFormat df=new DecimalFormat("0.0");//设置保留位数

        //Instant.now().minusSeconds(60*time_span)
        Map<String,List> results=Influxdb_Access_Data.get_sometime(servletContext,measureName,tagNames,endTime.minusSeconds(60*time_span),endTime);


        jsonArray.put("data",results);

        return jsonArray;
    }
}
