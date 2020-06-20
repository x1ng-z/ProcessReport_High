package Action;

import Management.ProcessMgr;
import Model.AlarmMessage;
import ToolUnits.Tools;
import org.apache.log4j.Logger;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

public class Action4GetalarmHistoryData implements Callable<JSONObject> {
    private static Logger logger= org.apache.log4j.Logger.getLogger(Action4GetalarmHistoryData.class);
    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;




    public Action4GetalarmHistoryData(HttpServletRequest httpServletRequest, ServletContext servletContext){

        this.httpServletRequest=httpServletRequest;
        this.servletContext=servletContext;

    }


    @Override
    public JSONObject call() throws Exception {
        String process=httpServletRequest.getParameter("process");

//            System.out.println("into");

            ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);

            String start=httpServletRequest.getParameter("start");
            String end=httpServletRequest.getParameter("end");
            List<AlarmMessage> operatehistories=null;
            try {
                if(process.trim().equals("raw")||process.trim().equals("fired")){
                    operatehistories=processMgr.get_oldalarmhistory(Tools.stringTodate(start),Tools.stringTodate(end),process.trim(),servletContext);
                }else {
                    return null;
                }
            } catch (Exception e) {
                logger.error(e);
            }
            List<String> result=new ArrayList<String>();
            for(AlarmMessage recordMysqlMessage :operatehistories){
                result.add(recordMysqlMessage.toString());
            }


            JSONObject jsonObject=new JSONObject();


            jsonObject.put( "operatehistory",result);

            return jsonObject;



        }



    }


