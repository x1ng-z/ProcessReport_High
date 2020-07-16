package Action;

import Management.ProcessMgr;
import Model.AlarmMessage;
import Model.CementSystem;
import Model.FiredSystem;
import Model.Tag4properties;
import ToolUnits.Tools;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

public class Action4Get_CementRealData implements Callable<JSONObject> {

    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;
    public Action4Get_CementRealData(HttpServletRequest httpServletRequest, ServletContext servletContext){
        this.httpServletRequest=httpServletRequest;
        this.servletContext=servletContext;
    }


    @Override
    public JSONObject call() throws Exception {
        String process=httpServletRequest.getParameter("process");
        String lang=httpServletRequest.getParameter("zh");

        if(process.trim().equals("cement")){
            ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);
            Map<String, CementSystem> cementsystemmaping= processMgr.get_CementmapingClone();
            List<AlarmMessage> currentCementOAndA=processMgr.getCurrent_cement_OAndA();

            Map<String,Map<String,Double>> total=new HashMap<String,Map<String,Double>>();
            Map<String,String> time=new HashMap<>();
            JSONObject jsonArray=new JSONObject();

            for(CementSystem cementSystem:cementsystemmaping.values()){

                String cementsystemno=cementSystem.getCementsystemno();
                Map<String, Tag4properties> tags=cementSystem.getTagMapping();
                Map<String,Double> realtagdatamapping=new HashMap<String,Double>();
//                JSONObject jsonObject=new JSONObject();
                Tag4properties partoftag=null;
                for(Tag4properties tag4properties:tags.values()){
                    String cn=tag4properties.getCn();
                    partoftag=tag4properties;
                    if(lang!=null&&lang.equals("en")){
                        realtagdatamapping.put(partoftag.getTag().replace(".","_").replace("-","_"),tag4properties.getValue());

                    }else {
                        realtagdatamapping.put(tag4properties.getDevice()+cn.replace(".","_").replace("-","_"),tag4properties.getValue());
                    }
                }

                realtagdatamapping.put("type",Tools.myround(cementSystem.getType(),1));
                total.put(cementSystem.getCementsystemno(),realtagdatamapping);
                if(partoftag!=null){
                    time.put(cementsystemno,partoftag.getUpdatainstant()==null?0l+"":partoftag.getUpdatainstant().getTime()+"");
                }else {
                    time.put(cementsystemno,0l+"");
                }
            }
            jsonArray.put("data",total);

             List<String> stringhistory=new ArrayList<String>();
             for(AlarmMessage alarmMessage:currentCementOAndA){
                 stringhistory.add(alarmMessage.toString());
             }
            jsonArray.put("operatehistory",stringhistory);
             jsonArray.put("time",time);
            return jsonArray;
        }else {

            return null;
        }



    }



}