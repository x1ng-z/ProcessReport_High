package Task_Service;

import DAO.MysqlDB;
import Management.ProcessMgr;

import javax.servlet.ServletContext;

public class  Quality_predict implements Periodtask{

    private ServletContext servletContext;
    private int periodtime;

    public Quality_predict(ServletContext servletContext, int periodtime) {
        this.servletContext = servletContext;
        this.periodtime = periodtime;
    }


    @Override
    public void execute() {
        //predict 28strong and save in mysql
        ProcessMgr.getProcessMgr_instance(servletContext).real_pridect();
        //check null 28realStrong in mysql and fill it
        ProcessMgr.getProcessMgr_instance(servletContext).fill_into_mysqldb_real28Strong();
        //update 28string in RAM
        ProcessMgr.getProcessMgr_instance(servletContext).fill_real28Strong();

    }

    @Override
    public int getPeriodtime() {
        return periodtime;
    }

    @Override
    public void setPeriodtime(int periodtime) {
        this.periodtime=periodtime;

    }
}
