package Task_Service;

import DAO.MysqlDB;
import Management.ProcessMgr;

import javax.servlet.ServletContext;

public class Data_Rawfineness implements Periodtask {
    private ServletContext servletContext;
    private int periodtime;
    /**
     * @param periodtime millisecond
     * */
    public Data_Rawfineness(ServletContext servletContext, int periodtime) {
        this.servletContext=servletContext;
        this.periodtime=periodtime;
    }

    @Override
    public void execute() {
        ProcessMgr.getProcessMgr_instance(servletContext).fill_raw_02fineness_data();
    }

    public int getPeriodtime() {
        return periodtime;
    }

    public void setPeriodtime(int periodtime) {
        this.periodtime = periodtime;
    }
}
