package DAO;

import Management.ProcessMgr;
import ToolUnits.Tools;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;

import javax.servlet.ServletContext;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Map;

public class MesUrl_AccessData {

   public static  void  get_FiredsystemQuality(CloseableHttpClient httpclient, String mode, ServletContext servletContext){

         MesUrl.GetTask[] threads;

        String filepath = null;
        try {
            if(mode.equals("debug")){

                filepath = System.getProperty("user.dir") + "\\conf\\mesurl._ripequality.xml";
            }else {
                filepath=servletContext.getRealPath("/WEB-INF")+"/conf/mesurl._ripequality.xml";
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        Map<String, String> urls = null;

        try {
            BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream(new File(filepath)));

            urls = (Map<String, String>) Tools.ReadXML(bufferedInputStream, Tools.MESCONFIG);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        try {
            threads = new MesUrl.GetTask[urls.size()];
            int i = 0;
            for (Map.Entry<String, String> stucts : urls.entrySet()) {
                HttpGet httpget = new HttpGet(stucts.getValue());
                threads[i++] = new MesUrl.GetTask(httpclient, httpget, stucts.getKey()){
                    @Override
                    public void hook(List<String> context) {
                        ProcessMgr.updateFiredSystem_quality(context);
                    }
                };
            }


            for (int j = 0; j < threads.length; j++) {
                threads[j].start();
            }

            for (int j = 0; j < threads.length; j++) {
                try {
                    threads[j].join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }


        }catch (Exception e){
            e.printStackTrace();
        }

    }

   public static void getMesripe_output(CloseableHttpClient httpclient,String mode,ServletContext servletContext){


       MesUrl.GetTask[] threads;

       String filepath = null;
       try {
           if(mode.equals("debug")){

               filepath = System.getProperty("user.dir") + "\\conf\\mesurl_ripeoutput.xml";
           }else {
               filepath=servletContext.getRealPath("/WEB-INF")+"/conf/mesurl_ripeoutput.xml";
           }
       } catch (Exception e) {
           e.printStackTrace();

       }
       Map<String, String> urls = null;

       try {
           BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream(new File(filepath)));

           urls = (Map<String, String>) Tools.ReadXML(bufferedInputStream, Tools.MESCONFIG);
       } catch (FileNotFoundException e) {
           e.printStackTrace();
       }

       try {
           threads = new MesUrl.GetTask[urls.size()];
           int i = 0;
           for (Map.Entry<String, String> stucts : urls.entrySet()) {
               HttpGet httpget = new HttpGet(stucts.getValue());
               threads[i++] = new MesUrl.GetTask(httpclient, httpget, stucts.getKey()){
                   @Override
                   public void hook(List<String> context) {
                       ProcessMgr.updateFiredSystem_output(context);
                   }
               };
           }


           for (int j = 0; j < threads.length; j++) {
               threads[j].start();
           }

           for (int j = 0; j < threads.length; j++) {
               try {
                   threads[j].join();
               } catch (InterruptedException e) {
                   e.printStackTrace();
               }
           }


       }catch (Exception e){
           e.printStackTrace();
       }





    }


}
