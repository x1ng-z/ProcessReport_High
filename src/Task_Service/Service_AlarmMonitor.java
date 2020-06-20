package Task_Service;

import javax.servlet.ServletContext;
import java.util.Map;
import java.util.concurrent.*;

public class Service_AlarmMonitor {
   private ConcurrentHashMap<String,Monitor> monitors=new ConcurrentHashMap<String,Monitor>();

   private ServletContext servletContext;


    public Service_AlarmMonitor(ServletContext servletContext) {
        this.servletContext = servletContext;
    }



    public  Map<String,Monitor> getMonitors() {
        return monitors;
    }

    public void registerMonitor(String monitorname,Monitor monitor) {
        this.monitors.put(monitorname,monitor);

    }


}
