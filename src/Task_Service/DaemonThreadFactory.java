package Task_Service;

import java.util.concurrent.ThreadFactory;

public class DaemonThreadFactory implements ThreadFactory {
    @Override
    public Thread newThread(Runnable r) {
        Thread D=new Thread(r);
        D.setDaemon(true);
        return D;
    }
}
