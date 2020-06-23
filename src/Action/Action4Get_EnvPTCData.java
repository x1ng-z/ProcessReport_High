package Action;

import Management.ProcessMgr;
import Model.FiredSystem;
import Model.Firm;
import Model.Productline;
import Model.Tag4properties;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;

public class Action4Get_EnvPTCData implements Callable<JSONObject> {

    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;




    public Action4Get_EnvPTCData(HttpServletRequest httpServletRequest, ServletContext servletContext){
        this.httpServletRequest=httpServletRequest;
        this.servletContext=servletContext;
    }


    @Override
    public JSONObject call() throws Exception {

            ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);
        ;
            Map<String,Map<String,String>> total=new HashMap<String,Map<String,String>>();
            JSONObject jsonArray=new JSONObject();

            for(Firm firm:processMgr.getFirmmmaping().values()){



                for(Productline pl:firm.getProductlinemapping().values()){

                    Map<String,String> realtagdatamapping=new HashMap<String,String>();

                    for(FiredSystem fs:pl.getFiredSystemmapping().values()){

                        for(Tag4properties tag:fs.getEnvPtcSystemTags().values()){
                            realtagdatamapping.put(tag.getDevice()+tag.getCn(),tag.getValue()+"");
                        }
                        total.put(fs.getFiredsystemno(),realtagdatamapping);
                    }

                }

            }
            jsonArray.put("data",total);

            return jsonArray;






    }



}