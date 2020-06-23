package Action;

import Management.ProcessMgr;
import Model.*;
import ToolUnits.Tools;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

public class Action4Get_AllqulityData implements Callable<JSONObject> {

    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;




    public Action4Get_AllqulityData(HttpServletRequest httpServletRequest, ServletContext servletContext){
        this.httpServletRequest=httpServletRequest;
        this.servletContext=servletContext;
    }


    @Override
    public JSONObject call() throws Exception {
        String lang=httpServletRequest.getParameter("zh");

            ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);
        ;
            Map<String,Map<String,String>> total=new HashMap<String,Map<String,String>>();
            JSONObject jsonArray=new JSONObject();

            for(Firm firm:processMgr.getFirmmmaping().values()){

                Map<String,String> realtagdatamapping=new HashMap<String,String>();

                for(Productline pl:firm.getProductlinemapping().values()){
                    for(Tag4properties tag:pl.getQulityTags().values()){
                        realtagdatamapping.put(tag.getTag(),tag.getValue()+"");
                    }

                }

                total.put(firm.getFirmshortname(),realtagdatamapping);

            }
            jsonArray.put("data",total);

            return jsonArray;






    }



}