package Action;

import DAO.MysqlDB;
import Management.ProcessMgr;
import Model.AlarmMessage;
import Model.FiredSystem;
import Model.Operate_Message;
import Model.Tag4properties;
import Task_Service.Service4get_realdata;
import ToolUnits.Tools;
import org.json.JSONObject;


import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import java.util.Map;
import java.util.concurrent.Callable;

public class Action4Get_FriedRealData implements Callable<JSONObject> {

    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;




    public Action4Get_FriedRealData(HttpServletRequest httpServletRequest, ServletContext servletContext){
        this.httpServletRequest=httpServletRequest;
        this.servletContext=servletContext;
    }


    @Override
    public JSONObject call() throws Exception {
        String process=httpServletRequest.getParameter("process");
        String lang=httpServletRequest.getParameter("zh");

        if(process.trim().equals("fired")){
//            System.out.println("into");


            ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);
            Map<String, FiredSystem> firedsystemmaping= processMgr.get_FiredmapingClone();
            List<AlarmMessage> firedoperateAndalarmhistory=processMgr.getCurrent_fired_OAndA();

            Map<String,Map<String,Double>> total=new HashMap<String,Map<String,Double>>();
            Map<String,String> time=new HashMap<>();
            JSONObject jsonArray=new JSONObject();

            for(FiredSystem firedSystem:firedsystemmaping.values()){

                String firedsystemno=firedSystem.getFiredsystemno();
                Map<String, Tag4properties> tags=firedSystem.getTagMapping();
                Map<String,Double> realtagdatamapping=new HashMap<String,Double>();
//                JSONObject jsonObject=new JSONObject();
                Tag4properties temp=null;
                for(Tag4properties tag4properties:tags.values()){
                    String cn=tag4properties.getCn();
                    temp=tag4properties;
                    if(lang!=null&&lang.equals("en")){
                        realtagdatamapping.put(temp.getTag().replace(".","_").replace("-","_"),tag4properties.getValue());

                    }else {
                        realtagdatamapping.put(tag4properties.getDevice()+cn.replace(".","_").replace("-","_"),tag4properties.getValue());
                    }


                }

                realtagdatamapping.put("kh",firedSystem.getKh());
                realtagdatamapping.put("day_output",firedSystem.getDay_output());
                realtagdatamapping.put("month_output",firedSystem.getMonth_output());
                realtagdatamapping.put("fcao",firedSystem.getFcao());
                realtagdatamapping.put("coal_consum",firedSystem.getRipe_coalconsump_pre_out());
                realtagdatamapping.put("type",Tools.myround(firedSystem.getType(),1));
                total.put(firedSystem.getFiredsystemno(),realtagdatamapping);
                if(temp!=null){
                    time.put(firedsystemno,temp.getUpdatainstant()==null?0l+"":temp.getUpdatainstant().getTime()+"");
                }else {
                    time.put(firedsystemno,0l+"");
                }



            }
            jsonArray.put("data",total);

             List<String> stringhistory=new ArrayList<String>();
             for(AlarmMessage alarmMessage:firedoperateAndalarmhistory){
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