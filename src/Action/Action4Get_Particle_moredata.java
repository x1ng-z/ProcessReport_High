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

public class Action4Get_Particle_moredata implements Callable< JSONObject> {

    private String measureName;
    private String tagNames;
    private Long time_span;
    private ServletContext context;

    public Action4Get_Particle_moredata(ServletContext servletContext, String measureName, String tagNames, Long time_span) {
        this.measureName = measureName;
        this.tagNames = tagNames;
        this.time_span = time_span;
        this.context=servletContext;
    }


    @Override
    public  JSONObject call() throws Exception {


//        String tagNames="L03G_PLJS_ZFK_PV, SampleLoading, LessThan_3um, Between_3um_32um, MoreThan_45um, MoreThan_80um";

        Map<String,Double> final_result=new LinkedHashMap<>();
        JSONObject jsonArray=new JSONObject();
        DecimalFormat df=new DecimalFormat("0.0");//设置保留位数


        Map<String,List> results=Influxdb_Access_Data.get_sometime(context,measureName,tagNames,Instant.now().minusSeconds(60*time_span),Instant.now());

        for(Map.Entry<String, List> stringListEntry:results.entrySet()){

            String tag=stringListEntry.getKey();
            List<Double> sub_re=stringListEntry.getValue();

                Double temp_sum=0d;
                for(Double timed:sub_re){
                    temp_sum+=timed;
                }
                final_result.put(tag,Double.valueOf(df.format(temp_sum/sub_re.size())));

        }
        jsonArray.put("particle",final_result);

        return jsonArray;
    }
}
