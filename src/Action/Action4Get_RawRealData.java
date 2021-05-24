package Action;

import DAO.MysqlDB;
import Management.ProcessMgr;
import Model.AlarmMessage;
import Model.Operate_Message;
import Model.RawSystem;
import Model.Tag4properties;
import Task_Service.Service4get_realdata;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

public class Action4Get_RawRealData implements Callable<JSONObject> {

    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;




    public Action4Get_RawRealData(HttpServletRequest httpServletRequest, ServletContext servletContext){

        this.httpServletRequest=httpServletRequest;
        this.servletContext=servletContext;

    }


    @Override
    public JSONObject call() throws Exception {
        String process=httpServletRequest.getParameter("process");
        String zh=httpServletRequest.getParameter("zh");
        if(process.trim().equals("raw")){

            if((zh==(null))){
                //System.out.println("into");

                ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);
                Map<String, RawSystem> rawsystemmaping= processMgr.get_RawmapingClone();
                List<AlarmMessage> rawoperatehistory=processMgr.getCurrent_raw_OAndA();

                JSONArray jsonArray=new JSONArray();
                Map<String,Map<String,Double>> total=new HashMap<String,Map<String,Double>>();

                for(RawSystem rawSystem:rawsystemmaping.values()){
//                System.out.println(rawSystem.getProductionline()+rawSystem.getSystemno());

                    String rawsystemno=rawSystem.getRawsystemno();
                    Map<String, Tag4properties> tags=rawSystem.getTagMapping();
                    Map<String,Double> realdatamapping=new HashMap<String,Double>();
                    for(Tag4properties tag4properties:tags.values()){
                        String tag=tag4properties.getTag();
                        realdatamapping.put(tag.replace(".","_").replace("-","_"),tag4properties.getValue());

                    }

                    //放入生料莫产量/细度

                    realdatamapping.put("raw02Fineness",rawSystem.getRaw02Fineness());
                    realdatamapping.put("rawdayyeild",rawSystem.getRawdayyeild());
                    realdatamapping.put("rawmonthyeild",rawSystem.getRawmonthyeild());

//                try {
//                    double teresult=Tools.div(kwh,t,1);
//                    list.put(ckwhttag[0]+ckwhttag[1],teresult);
//                } catch (Exception e) {
////                    e.printStackTrace();
////                    LogMgr.getLogMgr_instance(servletContext).WirteError(e);
//                    list.put(ckwhttag[0]+ckwhttag[1],0.0);
//                }
                    total.put(rawsystemno,realdatamapping);


                }
//            total.put("rawoperatehistory",rawoperatehistory)
                JSONObject jsonObject=new JSONObject();
                jsonObject.put( "data",total);

                List<String> stringhistory=new ArrayList<String>();
                for(AlarmMessage recordMysqlMessage :rawoperatehistory){
                    stringhistory.add(recordMysqlMessage.toString());
                }

                jsonObject.put("operatehistory",stringhistory);

                return jsonObject;


            }else if(zh.trim().toLowerCase().equals("ch")){

               // System.out.println("into");

                ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);
                Map<String, RawSystem> rawsystemmaping= processMgr.get_RawmapingClone();
                List<AlarmMessage> rawoperatehistory=processMgr.getCurrent_raw_OAndA();

                JSONArray jsonArray=new JSONArray();
                Map<String,Map<String,Double>> total=new HashMap<String,Map<String,Double>>();

                for(RawSystem rawSystem:rawsystemmaping.values()){
//                System.out.println(rawSystem.getProductionline()+rawSystem.getSystemno());

                    String rawsystemno=rawSystem.getRawsystemno();
                    Map<String, Tag4properties> tags=rawSystem.getTagMapping();
                    Map<String,Double> realdatamapping=new HashMap<String,Double>();

//                double kwh=0.0d;
//                double t=0.0d;
//                String[] ckwhttag=new String[2];
                    for(Tag4properties tag4properties:tags.values()){


                        String tagName=tag4properties.getCn();
                        realdatamapping.put(tag4properties.getDevice()+tagName,tag4properties.getValue());

                    }

                    //放入生料莫产量/细度

                    realdatamapping.put("raw02Fineness",rawSystem.getRaw02Fineness());
                    realdatamapping.put("rawdayyeild",rawSystem.getRawdayyeild());
                    realdatamapping.put("rawmonthyeild",rawSystem.getRawmonthyeild());

//
                    total.put(rawsystemno,realdatamapping);


                }
//            total.put("rawoperatehistory",rawoperatehistory)
                JSONObject jsonObject=new JSONObject();
                jsonObject.put( "data",total);

                List<String> stringhistory=new ArrayList<String>();
                for(AlarmMessage recordMysqlMessage :rawoperatehistory){
                    stringhistory.add(recordMysqlMessage.toString());
                }

                jsonObject.put("operatehistory",stringhistory);

                return jsonObject;


            }else {
                return null;
            }



        }else {

            return null;
        }



    }



}