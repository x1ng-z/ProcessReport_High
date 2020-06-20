package Action;

import DAO.MysqlDB;
import DAO.Mysql_Access_Data;
import Management.ProcessMgr;
import Model.AlarmMessage;
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


public class Action4SetMSGStatus implements Callable<String> {

    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;


    public Action4SetMSGStatus(HttpServletRequest httpServletRequest, ServletContext servletContext) {
        this.httpServletRequest = httpServletRequest;
        this.servletContext = servletContext;
    }


    @Override
    public String call() throws Exception {
        boolean isfind=false;
        String Sid = httpServletRequest.getParameter("id");
        String SprocessStatus = httpServletRequest.getParameter("processStatus");
        if (Sid != null && SprocessStatus != null) {
            int id = Integer.valueOf(Sid);
            int processStatus = Integer.valueOf(SprocessStatus);
            ProcessMgr processMgr = ProcessMgr.getProcessMgr_instance(servletContext);
            int lastprocessStatus=Mysql_Access_Data.getMSGProcessStatus(servletContext, MysqlDB.getConnection(servletContext),id);
            if(lastprocessStatus<processStatus){
                Mysql_Access_Data.updateMSGProcessStatus(servletContext, MysqlDB.getConnection(servletContext),id,processStatus);

                for(AlarmMessage alarmMessage:processMgr.getCurrent_fired_OAndA()){
                    if(alarmMessage.getId()==id){
                        alarmMessage.setProcessStatus(processStatus);
                        isfind=true;
                        break;
                    }
                }

                if(!isfind){
                    for(AlarmMessage alarmMessage:processMgr.getCurrent_raw_OAndA()){
                        if(alarmMessage.getId()==id){
                            alarmMessage.setProcessStatus(processStatus);
                            isfind=true;
                            break;
                        }
                    }

                }
                return "success";
            }else {
                return "faild";
            }



        }else {
            return "faild";
        }


    }


}
