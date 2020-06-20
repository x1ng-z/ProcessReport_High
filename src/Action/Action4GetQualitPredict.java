package Action;

import Management.ProcessMgr;
import Model.Quality_data;
import org.apache.log4j.Logger;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;


public class Action4GetQualitPredict implements Callable<JSONObject> {
    private static Logger logger= org.apache.log4j.Logger.getLogger(Action4GetQualitPredict.class);
    private HttpServletRequest httpServletRequest;
    private ServletContext servletContext;




    public Action4GetQualitPredict(HttpServletRequest httpServletRequest, ServletContext servletContext){

        this.httpServletRequest=httpServletRequest;
        this.servletContext=servletContext;

    }


    @Override
    public JSONObject call() throws Exception {



            ProcessMgr processMgr =ProcessMgr.getProcessMgr_instance(servletContext);
            Quality_data quality_data=null;
            try {
                quality_data=processMgr.get28Strong();
            } catch (Exception e) {
                logger.error(e);
            }
            List<String> result=new ArrayList<String>();


            List<Double> compressive_pressure28=quality_data.getCompressive_pressure28();
            List<Double> fcao=quality_data.getFcao();
            List<Double> mgo=quality_data.getMgo();
            List<Double> cao=quality_data.getCao();
            List<Double> fe2o3=quality_data.getFe2o3();
            List<Double> al2o3=quality_data.getAl2o3();
            List<Double> sio2=quality_data.getSio2();
            List<Double> loss=quality_data.getLoss();
            List<String> har_analy=quality_data.getHar_analy();
            List<Double> c2s=quality_data.getC2s();
            List<Double> c3a=quality_data.getC3a();
            List<Double> c3s=quality_data.getC3s();
            List<Double> c4af=quality_data.getC4af();
            List<String> har_produdate=quality_data.getHar_produdate();
            List<Double> kh=quality_data.getKh();
            List<Double> kh1=quality_data.getKh1();
            List<Double> n=quality_data.getN();
            List<Double> p=quality_data.getP();
            List<Double> predict=quality_data.getPredict();

        List<String> histtory =new ArrayList<String>();
        List<String> real=new ArrayList<String>();

        for(int i=1;i<compressive_pressure28.size();i++){

            String temp =har_analy.get(i)+"%"+loss.get(i)+
                    "%"+sio2.get(i)+"%"+al2o3.get(i)+"%"+fe2o3.get(i)+"%"+cao.get(i)+"%"+mgo.get(i)+
                    "%"+fcao.get(i)+"%"+kh.get(i)+"%"+kh1.get(i)+"%"+n.get(i)+"%"+p.get(i)+"%"+c3s.get(i)+
                    "%"+c2s.get(i)+"%"+c3a.get(i)+"%"+c4af.get(i)+"%"+compressive_pressure28.get(i)+"%"+predict.get(i);
            histtory.add(temp);

        }


        for(int i=0;i<1;i++){

            String temp =har_analy.get(i)+"%"+loss.get(i)+
                    "%"+sio2.get(i)+"%"+al2o3.get(i)+"%"+fe2o3.get(i)+"%"+cao.get(i)+"%"+mgo.get(i)+
                    "%"+fcao.get(i)+"%"+kh.get(i)+"%"+kh1.get(i)+"%"+n.get(i)+"%"+p.get(i)+"%"+c3s.get(i)+
                    "%"+c2s.get(i)+"%"+c3a.get(i)+"%"+c4af.get(i)+"%"+compressive_pressure28.get(i)+"%"+predict.get(i);
            real.add(temp);

        }


            JSONObject jsonObject=new JSONObject();


            jsonObject.put( "real",real);
            jsonObject.put( "history",histtory);

            return jsonObject;





    }



}