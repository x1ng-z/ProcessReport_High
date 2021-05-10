package Task_Service;

import DAO.MesUrl;
import DAO.MesUrl_AccessData;
import Management.ProcessMgr;

import javax.servlet.ServletContext;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class FiredSystem_output implements Periodtask {


    private ExecutorService getexecutors=Executors.newFixedThreadPool(20);
    private   ServletContext servletContext;
    private int periodtime;


    public FiredSystem_output(ServletContext servletContext, int periodtime) {
        this.servletContext = servletContext;
        this.periodtime=periodtime;

    }


    @Override
    public void execute() {
        ProcessMgr.getProcessMgr_instance(servletContext).fill_fired_yeild();
//        MesUrl_AccessData.getMesripe_output(MesUrl.getMESUrl_httpclient(),"run",servletContext);
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
