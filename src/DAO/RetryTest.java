package DAO;

import ToolUnits.Tools;
import org.apache.http.HttpEntity;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpRequest;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLException;
import java.io.*;
import java.net.UnknownHostException;
import java.util.Map;

public class RetryTest {
    public static void main(String[] args){


        HttpRequestRetryHandler myRetryHandler = new HttpRequestRetryHandler() {

            public boolean retryRequest(
                    IOException exception,
                    int executionCount,
                    HttpContext context) {
                if (executionCount >= 4) {
                    // Do not retry if over max retry count
                    return false;
                }
                if (exception instanceof InterruptedIOException) {
                    // Timeout
                    return true;
                }
                if (exception instanceof UnknownHostException) {
                    // Unknown host
                    return false;
                }
                if (exception instanceof ConnectTimeoutException) {
                    // Connection refused
                    return false;
                }
                if (exception instanceof SSLException) {
                    // SSL handshake exception
                    return false;
                }
                HttpClientContext clientContext = HttpClientContext.adapt(context);
                HttpRequest request = clientContext.getRequest();
                boolean idempotent = !(request instanceof HttpEntityEnclosingRequest);
                if (idempotent) {
                    // Retry if the request is considered idempotent
                    return true;
                }
                return false;
            }

        };

        RequestConfig requestConfig = RequestConfig.custom()
                .setSocketTimeout(5000)
                .setConnectTimeout(5000)
                .setConnectionRequestTimeout(5000)
                .build();
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
        cm.setMaxTotal(10);


        CloseableHttpClient httpclient = HttpClients.custom()
                .setRetryHandler(myRetryHandler)
                .setConnectionManager(cm)
                .setDefaultRequestConfig(requestConfig)
                .build();


        String model="debug";
        String filepath = null;
        try {
            if(model.equals("debug")){

                filepath = System.getProperty("user.dir") + "\\conf\\mesurl._ripequality.xml";
            }else {
//                filepath=servletContext.getRealPath("/WEB-INF")+"/conf/mesurl._ripequality.xml";
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



// create a thread for each URI
        GetThread[] threads = new GetThread[urls.size()];
        int i = 0;
        for (Map.Entry<String, String> stringStringEntry:urls.entrySet()) {
            HttpGet httpget = new HttpGet(stringStringEntry.getValue());
            threads[i++] = new GetThread(httpclient, httpget,stringStringEntry.getKey());
        }

// start the threads
        for (int j = 0; j < threads.length; j++) {
            threads[j].start();
        }

// join the threads
        for (int j = 0; j < threads.length; j++) {
            try {
                threads[j].join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }



    }




    static class GetThread extends Thread {

        private final CloseableHttpClient httpClient;
        private final HttpContext context;
        private final HttpGet httpget;
        private String id;

        public GetThread(CloseableHttpClient httpClient, HttpGet httpget,String id) {
            this.httpClient = httpClient;
            this.context = HttpClientContext.create();
            this.httpget = httpget;
            this.id=id;
        }

        @Override
        public void run() {
            try {
                CloseableHttpResponse response = httpClient.execute(
                        httpget, context);
                try {
                    HttpEntity entity = response.getEntity();
                    System.out.println(id+EntityUtils.toString(entity,"utf-8"));


                } finally {
                    response.close();
                }
            } catch (ClientProtocolException ex) {
                // Handle protocol errors
            } catch (IOException ex) {
                // Handle I/O errors
            }
        }

    }


}
