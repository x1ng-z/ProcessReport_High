package Contrl;

import DAO.MysqlDB;
import Management.ProcessMgr;
import Task_Service.*;
import ToolUnits.Tools;

import javax.servlet.ServletContext;
import java.sql.Connection;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class servletinit {
    public static void main(String[] args) {
        ExecutorService intexecor = Executors.newCachedThreadPool();

        ServletContext servletContext =null;
       // Connection connection = MysqlDB.getConnection(servletContext);
        ProcessMgr processMgr = ProcessMgr.getProcessMgr_instance(servletContext);


        intexecor.execute(Service_Executor4Periodtask.getExecutor_periodtask(servletContext));

        intexecor.execute(new Service_Save_OpeAndAlarm_MSG(servletContext, processMgr.getMessageQueue(),false));

        Data_Rawfineness dataRawfineness = new Data_Rawfineness(servletContext, 1 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(dataRawfineness.getPeriodtime(), dataRawfineness));


        int firstdelay = Tools.getfirstupdate(9, 0, 0);
        Data_Rawyeild dateRawyeild = new Data_Rawyeild(servletContext, 1 * 24 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firstdelay, dateRawyeild));


        Quality_predict quality_predict = new Quality_predict(servletContext, 1 * 24 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firstdelay, quality_predict));

        FiredSystem_QulityData firedSystem_qulityData = new FiredSystem_QulityData(servletContext, 1 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firedSystem_qulityData.getPeriodtime(), firedSystem_qulityData));


        FiredSystem_output firedSystem_output = new FiredSystem_output(servletContext, 3 * 60 * 60 * 1000);
        Service_Executor4Periodtask.getExecutor_periodtask(servletContext).getQueue().put(new Carrior4periodtask(firedSystem_output.getPeriodtime(), firedSystem_output));

        //启动系统更新一次new Thread(new Runnable() {

        dataRawfineness.execute();
        dateRawyeild.execute();
        quality_predict.execute();
        firedSystem_qulityData.execute();
        firedSystem_output.execute();

//
        new Service4get_realdata(servletContext,intexecor).start();
        System.out.println("## System start!");

    }
}
