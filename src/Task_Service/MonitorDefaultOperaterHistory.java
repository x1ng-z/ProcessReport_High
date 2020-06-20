package Task_Service;

import Model.Operate_Message;
import Model.Productline;
import Model.Tag4properties;
import ToolUnits.Tools;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;

public class MonitorDefaultOperaterHistory implements Monitor {
    private static Logger logger=Logger.getLogger(MonitorDefaultOperaterHistory.class);
    private  LinkedBlockingQueue<Object> operatemessageQueue = null;
    private ServletContext servletContext;

    public MonitorDefaultOperaterHistory(ServletContext servletContext, LinkedBlockingQueue<Object> operatemessageQueue) {
        this.servletContext=servletContext;
        this.operatemessageQueue=operatemessageQueue;
    }

    @Override
    public void judgment(Tag4properties tag, Productline productline) {
        if(tag.getMinvalues().size()==0){
            return;
        }

        List<Double> result=Tools.gettailAndheard(tag.getMinvalues());
        if (result==null||result.size()!=2){
            return;
        }


        double diff = Tools.division(result.get(0) - tag.getValue(), tag.getValue() == 0 ? Tag4properties.P_INITIAL : tag.getValue());
        if (Math.abs(diff)>=tag.getOperate_range_limit()) {
            Operate_Message operate_message = new Operate_Message();

            operate_message.setTag(tag.getTag());
            operate_message.setSystemno(tag.getSystemno());
            operate_message.setCn(tag.getCn());
            operate_message.setDevice(tag.getDevice());
            operate_message.setProductline(tag.getProductlinename());
            operate_message.setTag_value_after(result.get(0));
            operate_message.setTag_value_before(tag.getValue());
            operate_message.setGenertime(Instant.now());
            operate_message.setProcesstype(tag.getProcesstype());
            operate_message.setDefaultcode(10);

            if(tag.getProcesstype().equals("raw")){

                productline.addCurrent_raw_operate(operate_message);

            }else if(tag.getProcesstype().equals("fired")){

                productline.addCurrent_fired_alarm(operate_message);

            }


            try {
                operatemessageQueue.put(operate_message);
            } catch (InterruptedException e) {
                logger.error(e);
            }
        }
//        }


    }



}
