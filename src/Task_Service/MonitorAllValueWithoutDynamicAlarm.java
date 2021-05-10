package Task_Service;

import Model.DefaultProductline;
import Model.Tag4properties;
import ToolUnits.Tools;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.Math.abs;

/**
 * @author zzx
 * @version 1.0
 * @date 2020/6/22 11:20
 */
public class MonitorAllValueWithoutDynamicAlarm extends MonitorDefaultDymaticAlarm {
    private static Logger logger = Logger.getLogger(MonitorAllValueWithoutDynamicAlarm.class);

    public MonitorAllValueWithoutDynamicAlarm(ServletContext servletContext, LinkedBlockingQueue<Object> audiomessage) {
        super(servletContext, audiomessage);
    }

    @Override
    public synchronized void judgment(Tag4properties needDynamicTag, DefaultProductline defaultProductline) {
//        super.judgment(needDynamicTag, productline);

        List<Double> result = Tools.gettailAndheard(needDynamicTag.getMinvalues());
        Double mean60 = 0d;//计算60sec内的平均值
        if (result == null || result.size() != 2) {
            return;
        }
        if (needDynamicTag.getMinvalues().size() == 0) {
            return;
        }
        for (Double oneofpoint : needDynamicTag.getMinvalues()) {
            mean60 += oneofpoint;
        }

        CheckAlarmLineLife(needDynamicTag, result);

        double tempchangerate = 0;

        String tagname = needDynamicTag.getCn();
        ;//台时1 台时2  台时给定  台时给定1  台时给定2
        Pattern pattern = Pattern.compile(".*(台时).*");
        Matcher matcher = pattern.matcher(tagname);
        if (matcher.find()) {
            //台时报警
            tempchangerate = (result.get(0) - result.get(1)) / (result.get(1) == 0 ? Tag4properties.P_INITIAL : result.get(1));
            if (tempchangerate < 0) {
                tempchangerate = abs(tempchangerate);
                if (Tools.sub(tempchangerate, needDynamicTag.getFix_changerate()) > Tag4properties.P_INITIAL && (needDynamicTag.getFix_changerate() != 0)) {
                    //result.get(0) 是实时值
                    checkAndPut(result.get(0), needDynamicTag, needDynamicTag.getCHANGERATEALARM(), defaultProductline);
                }
            }


        } else {
            //非台时报警
            tempchangerate = abs((result.get(0) - result.get(1)) / (result.get(1) == 0 ? Tag4properties.P_INITIAL : result.get(1)));
            if (abs(Tools.sub(tempchangerate, needDynamicTag.getFix_changerate())) > Tag4properties.P_INITIAL && (needDynamicTag.getFix_changerate() != 0)) {
                //result.get(0) 是实时值
                checkAndPut(result.get(0), needDynamicTag, needDynamicTag.getCHANGERATEALARM(), defaultProductline);
            }

        }
        if(needDynamicTag.getMinvalues().size()>=3){
            Double[] toarray = new Double[needDynamicTag.getMinvalues().size()];
            needDynamicTag.getMinvalues().toArray(toarray);
            alarmjudgewithoutdynamic(Arrays.copyOfRange(toarray,0,3),needDynamicTag, defaultProductline);
        }

    }


    public void alarmjudgewithoutdynamic(Double[] values, Tag4properties needDynamicTag, DefaultProductline defaultProductline) {

        if (compared(BIG, values, needDynamicTag.getHighhighbase())) {
            //高高报
            checkAndPut(values[0], needDynamicTag, needDynamicTag.getHIGHHIGHALARM(), defaultProductline);
            logger.info(""+needDynamicTag.getProductlinename()+needDynamicTag.getTag()+needDynamicTag.getProcesstype()
                    +" datalength="+values.length+"contect="+(values.length>=3?values[0]+""+values[1]+""+values[2]:values[0]+""+values[1]));
        } else if (compared(SMALL, values, needDynamicTag.getHighhighbase())
                &&
                compared(BIG, values, needDynamicTag.getHighbase())) {
            //高报
            logger.info(""+needDynamicTag.getProductlinename()+needDynamicTag.getTag()+needDynamicTag.getProcesstype()
                    +" datalength="+values.length+"contect="+(values.length>=3?values[0]+""+values[1]+""+values[2]:values[0]+""));

            checkAndPut(values[0], needDynamicTag, needDynamicTag.getHIGHALARM(), defaultProductline);
        } else if (compared(SMALL, values, needDynamicTag.getLowbase())
                && compared(BIG, values, needDynamicTag.getLowlowbase())
        ) {
            //低报
            checkAndPut(values[0], needDynamicTag, needDynamicTag.getLOWALARM(), defaultProductline);
            logger.info(""+needDynamicTag.getProductlinename()+needDynamicTag.getTag()+needDynamicTag.getProcesstype()
                    +" datalength="+values.length+"contect="+(values.length>=3?values[0]+""+values[1]+""+values[2]:values[0]+""+values[1]));
        } else if (compared(SMALL, values, needDynamicTag.getLowbase())) {
            //低低报
            checkAndPut(values[0], needDynamicTag, needDynamicTag.getLOWLOWALARM(), defaultProductline);
            logger.info(""+needDynamicTag.getProductlinename()+needDynamicTag.getTag()+needDynamicTag.getProcesstype()
                    +" datalength="+values.length+"contect="+(values.length>=3?values[0]+""+values[1]+""+values[2]:values[0]+""+values[1]));
        }
    }
}
