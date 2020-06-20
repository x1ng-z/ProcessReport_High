package Action;

import Management.ProcessMgr;
import Model.Tag4properties;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

public class Action4GetZipper implements Callable<JSONObject> {


    private ServletContext servletContext;
    private String firname;
    private String devicename;
    private String productline;


    public Action4GetZipper( ServletContext servletContext, String firname, String devicename,String productline) {
        this.servletContext = servletContext;
        this.devicename = devicename;
        this.firname = firname;
        this.productline=productline;

    }


    @Override
    public JSONObject call() throws Exception {

            ProcessMgr processMgr = ProcessMgr.getProcessMgr_instance(servletContext);
            List<Tag4properties> firedsyste_devicedata = processMgr.deviceData(firname, devicename ,productline);

            Map<String, Double> explain_data = new HashMap<String, Double>();


            for (Tag4properties tag4property : firedsyste_devicedata) {

                explain_data.put(tag4property.getCn(), tag4property.getValue());
            }


            JSONObject jsonArray = new JSONObject();


            jsonArray.put("data", explain_data);



          if(!firedsyste_devicedata.isEmpty()){
              jsonArray.put("time", firedsyste_devicedata.get(0).getUpdatainstant().getTime());
          }

            return jsonArray;




    }
}
