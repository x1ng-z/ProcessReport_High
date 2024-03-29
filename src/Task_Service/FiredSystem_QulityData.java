package Task_Service;

import DAO.MesUrl;
import DAO.MesUrl_AccessData;

import javax.servlet.ServletContext;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class FiredSystem_QulityData implements Periodtask {


    private ExecutorService getexecutors=Executors.newFixedThreadPool(20);
    private   ServletContext servletContext;
    private int periodtime;


    public FiredSystem_QulityData(ServletContext servletContext,int periodtime) {
        this.servletContext = servletContext;
        this.periodtime=periodtime;

    }


    @Override
    public void execute() {

        MesUrl_AccessData.get_FiredsystemQuality(MesUrl.getMESUrl_httpclient(),"run",servletContext);

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
