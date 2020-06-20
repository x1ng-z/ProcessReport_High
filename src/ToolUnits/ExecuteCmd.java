package ToolUnits;

import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
public class ExecuteCmd {
    private static Logger logger=Logger.getLogger(ExecuteCmd.class);


    public static String execute(ServletContext servletContext,String[] cmd, String... encoding) {
        BufferedReader bReader = null;
        InputStreamReader sReader = null;
        try {
            Process p = Runtime.getRuntime().exec(cmd);

            /* 为"错误输出流"单独开一个线程读取之,否则会造成标准输出流的阻塞 */
            Thread t = new Thread(new InputStreamRunnable(servletContext,p.getErrorStream(), "ErrorStream"));
            t.start();

            /* "标准输出流"就在当前方法中读取 */
            BufferedInputStream bis = new BufferedInputStream(p.getInputStream());

            if (encoding != null && encoding.length != 0) {
                sReader = new InputStreamReader(bis, encoding[0]);// 设置编码方式
            } else {
                sReader = new InputStreamReader(bis, "utf-8");
            }
            bReader = new BufferedReader(sReader);

            StringBuilder sb = new StringBuilder();
            String line;

            while ((line = bReader.readLine()) != null) {
                sb.append(line);
                sb.append("\n");
            }

            bReader.close();
            p.destroy();
            return sb.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

class InputStreamRunnable implements Runnable {
    private static Logger logger=Logger.getLogger(InputStreamRunnable.class);
    private BufferedReader bReader = null;
    private String _type;
    private ServletContext servletContext;

    public InputStreamRunnable(ServletContext servletContext,InputStream is, String _type) {
        try {
            this._type=_type;
            this.servletContext=servletContext;
            bReader = new BufferedReader(new InputStreamReader(new BufferedInputStream(is), "UTF-8"));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    public void run() {
        String line;
        int num = 0;
        try {
            while ((line = bReader.readLine()) != null) {
//                System.out.println("---->"+String.format("%02d",num++)+" "+line);
                logger.error("---->"+String.format("%02d",num++)+" "+line);
            }
            bReader.close();
        } catch (Exception ex) {
            ex.printStackTrace();

        }
    }

    public String get_type() {
        return _type;
    }
}
