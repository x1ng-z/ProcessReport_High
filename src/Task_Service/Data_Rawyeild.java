package Task_Service;

import DAO.MysqlDB;
import Management.ProcessMgr;

import javax.servlet.ServletContext;

public class Data_Rawyeild implements Periodtask {


    private ServletContext servletContext;
    private int periodtime;
    public Data_Rawyeild(ServletContext servletContext, int periodtime) {
        this.servletContext=servletContext;
        this.periodtime=periodtime;
    }

    @Override
    public void execute() {
        ProcessMgr.getProcessMgr_instance(servletContext).fill_raw_yeild_data();
    }

    public int getPeriodtime() {
        return periodtime;
    }

    public void setPeriodtime(int periodtime) {
        this.periodtime = periodtime;
    }
}
