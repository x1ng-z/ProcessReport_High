package DAO;

import Management.ProcessMgr;
import ToolUnits.Tools;
import org.apache.http.HttpEntity;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpRequest;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;

import javax.net.ssl.SSLException;
import javax.servlet.ServletContext;
import java.io.*;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MesUrl {

    private static volatile CloseableHttpClient httpclient=null;
    private int retryCount=3;

    private MesUrl( ){
        this(3);
    }


    private MesUrl(int retryCount) {
        this.retryCount=retryCount;
        HttpRequestRetryHandler myRetryHandler = new HttpRequestRetryHandler() {
            public boolean retryRequest(
                    IOException exception,
                    int executionCount,
                    HttpContext context) {
                if (executionCount >= MesUrl.this.retryCount) {
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
                    return true;
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
                .setSocketTimeout(15000)
                .setConnectTimeout(15000)
                .setConnectionRequestTimeout(15000)
                .build();
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
        cm.setMaxTotal(40);

        httpclient = HttpClients.custom()
                .setRetryHandler(myRetryHandler)
                .setConnectionManager(cm)
                .setDefaultRequestConfig(requestConfig)
                .build();

    }

    public static synchronized CloseableHttpClient getMESUrl_httpclient(){

        if(httpclient==null){
            new MesUrl();
        }

            return httpclient;


    }



   public static void CloseClient(){
        try {
            if(httpclient!=null){
                httpclient.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static  class GetTask extends Thread implements Hook {

        private final CloseableHttpClient httpClient;
        private final HttpContext context;
        private final HttpGet httpget;
        private final String id;

        @Override
        public void hook(List<String> context) {

            System.out.println("do nothing");
        }

        public GetTask(CloseableHttpClient httpClient, HttpGet httpget, String id) {
            this.httpClient = httpClient;
            this.context = new BasicHttpContext();
            this.httpget = httpget;
            this.id = id;

        }

        /**
         * Executes the GetMethod and prints some status information.
         */
        @Override
        public void run() {
            try {
                CloseableHttpResponse response = httpClient.execute(httpget, context);

                int status = response.getStatusLine().getStatusCode();
                if (status >= 200 && status < 300) {

                    try {
                        HttpEntity entity = response.getEntity();
                        if (entity != null) {
//                            System.out.println(id);
                            List<String> content=(List<String>) Tools.ReadXML(entity.getContent(),Tools.MESDATA);
                            hook(content);
                        }
                    }catch (Exception e){
                        e.printStackTrace();
                    }finally {
                        response.close();
                    }

                }

            } catch (Exception e) {
                System.out.println(id + " - error: " + e);
                e.printStackTrace();
            }
        }

    }



}

