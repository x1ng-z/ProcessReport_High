package Task_Service;

import Model.Productline;
import Model.Tag4properties;
import ToolUnits.Tools;

import javax.servlet.ServletContext;
import java.math.BigDecimal;
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
public class MonitorAllValueWithoutDynamic extends MonitorDefaultDymaticAlarm {

    public MonitorAllValueWithoutDynamic(ServletContext servletContext, LinkedBlockingQueue<Object> audiomessage) {
        super(servletContext, audiomessage);
    }

    @Override
    public synchronized void judgment(Tag4properties needDynamicTag, Productline productline) {
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
                    checkAndPut(result.get(0), needDynamicTag, needDynamicTag.getCHANGERATEALARM(), productline);
                }
            }


        } else {
            //非台时报警
            tempchangerate = abs((result.get(0) - result.get(1)) / (result.get(1) == 0 ? Tag4properties.P_INITIAL : result.get(1)));
            if (abs(Tools.sub(tempchangerate, needDynamicTag.getFix_changerate())) > Tag4properties.P_INITIAL && (needDynamicTag.getFix_changerate() != 0)) {
                //result.get(0) 是实时值
                checkAndPut(result.get(0), needDynamicTag, needDynamicTag.getCHANGERATEALARM(), productline);
            }

        }

        Double[] pickalldatas = new Double[needDynamicTag.getMinvalues().size()];
        needDynamicTag.getMinvalues().toArray(pickalldatas);
        alarmjudgewithoutdynamic(pickalldatas,needDynamicTag,productline);
    }


    public void alarmjudgewithoutdynamic(Double[] values, Tag4properties needDynamicTag, Productline productline) {

        if (compared(BIG, values, needDynamicTag.getHighhighbase())) {
            //高高报
            checkAndPut(values[0], needDynamicTag, needDynamicTag.getHIGHHIGHALARM(), productline);

        } else if (compared(SMALL, values, needDynamicTag.getHighhighbase())
                &&
                compared(BIG, values, needDynamicTag.getHighbase())) {
            //高报
            checkAndPut(values[0], needDynamicTag, needDynamicTag.getHIGHALARM(), productline);
        } else if (compared(SMALL, values, needDynamicTag.getLowbase())
                && compared(BIG, values, needDynamicTag.getLowlowbase())
        ) {
            //低报
            checkAndPut(values[0], needDynamicTag, needDynamicTag.getLOWALARM(), productline);

        } else if (compared(SMALL, values, needDynamicTag.getLowbase())) {
            //低低报
            checkAndPut(values[0], needDynamicTag, needDynamicTag.getLOWLOWALARM(), productline);

        }
    }
}
