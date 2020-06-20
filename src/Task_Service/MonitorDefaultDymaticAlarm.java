package Task_Service;


import Model.AlarmMessage;
import Model.AudioMessage;
import Model.Productline;
import Model.Tag4properties;
import ToolUnits.Tools;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.Math.abs;


public class MonitorDefaultDymaticAlarm implements Monitor {
    private static Logger logger = Logger.getLogger(MonitorDefaultDymaticAlarm.class);
    public static final int HOLDONTIME = 20 * 60 * 1000;
    private LinkedBlockingQueue<Object> audiomessage;
    private final static String Model = "run";//standard or debug
    private ServletContext servletContext;


    public MonitorDefaultDymaticAlarm(ServletContext servletContext, LinkedBlockingQueue<Object> audiomessage) {
        this.servletContext = servletContext;
        this.audiomessage = audiomessage;
    }


    private void CheckAlarmLineLife(Tag4properties needdymatcitag, List<Double> result) {


        if (needdymatcitag.getHighhigh_holdontime() < System.currentTimeMillis()) {
            int poniter_HighHigh = needdymatcitag.getPoniter_HighHigh();


            if (Model.equals("debug") && (poniter_HighHigh != 0)) {
                logger.error("SHITDOWM High High" + "Tag_: " + result.get(0) + " CurrentPoint: " + needdymatcitag.getPoniter_HighHigh() + " CurrentDymatic_HighHigh" + needdymatcitag.getHighhighlinepool()[needdymatcitag.getPoniter_HighHigh()] + " CurrentLift_HighHigh: " + needdymatcitag.getHighhigh_holdontime());
            }
            needdymatcitag.setPoniter_HighHigh((poniter_HighHigh - 1) <= 0 ? 0 : (poniter_HighHigh - 1));
        }
        if (needdymatcitag.getHigh_holdontime() < System.currentTimeMillis()) {
            int poniter_High = needdymatcitag.getPointer_High();


            if (Model.equals("debug") && (poniter_High != 0)) {
                logger.error("SHITDOWM High" + "Tag_: " + result.get(0) + " CurrentPoint: " + needdymatcitag.getPointer_High() + " CurrentDymatic_High" + needdymatcitag.getHighlinepool()[needdymatcitag.getPointer_High()] + " CurrentLift_High: " + needdymatcitag.getHigh_holdontime());
            }
            needdymatcitag.setPointer_High((poniter_High - 1) <= 0 ? 0 : (poniter_High - 1));
        }

        if (needdymatcitag.getLowlow_holdontime() < System.currentTimeMillis()) {
            int poniter_LowLow = needdymatcitag.getPointer_LowLow();


            if (Model.equals("debug") && (poniter_LowLow != 0)) {
                logger.error("SHITDOWM LowLow" + "Tag_: " + result.get(0) + " CurrentPoint: " + needdymatcitag.getPointer_LowLow() + " CurrentDymatic_LowLow" + needdymatcitag.getLowlowlinepool()[needdymatcitag.getPointer_LowLow()] + " CurrentLift_LowLow: " + needdymatcitag.getLowlow_holdontime());
            }
            needdymatcitag.setPointer_LowLow((poniter_LowLow - 1) <= 0 ? 0 : (poniter_LowLow - 1));

        }

        if (needdymatcitag.getLow_holdontime() < System.currentTimeMillis()) {
            int poniter_Low = needdymatcitag.getPointer_Low();


            if (Model.equals("debug") && (poniter_Low != 0)) {
                logger.error("SHITDOWM Low" + "Tag_: " + result.get(0) + " CurrentPoint: " + needdymatcitag.getPointer_Low() + " CurrentDymatic_Low" + needdymatcitag.getLowlinepool()[needdymatcitag.getPointer_Low()] + " CurrentLift_Low: " + needdymatcitag.getLow_holdontime());
            }

            needdymatcitag.setPointer_Low((poniter_Low - 1) <= 0 ? 0 : (poniter_Low - 1));
        }


    }


    @Override
    synchronized public void judgment(Tag4properties needDynamicTag, Productline productline) {
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
        mean60 = mean60 / needDynamicTag.getMinvalues().size();

        BigDecimal bg = new BigDecimal(mean60);
        mean60 = bg.setScale(1, BigDecimal.ROUND_HALF_UP).doubleValue();

        CheckAlarmLineLife(needDynamicTag, result);


        /**write change rate
         *
         *
         * */

        double tempchangerate = 0;


        /***
         * 台时报警的话是不需正的变化率报警
         * */
        String tagname = needDynamicTag.getCn();
        ;//台时1 台时2  台时给定  台时给定1  台时给定2
        Pattern pattern = Pattern.compile(".*(台时).*");
        Matcher matcher = pattern.matcher(tagname);
        if (matcher.find()) {
            //台时报警
            tempchangerate = (result.get(0) - result.get(1)) / (result.get(1) == 0 ? Tag4properties.P_INITIAL : result.get(1));
            if (tempchangerate < 0) {
                tempchangerate=abs(tempchangerate);
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


        /**
         * High High  Alarm
         * */

        if (Tools.sub(mean60, needDynamicTag.getHighhighbase()) > Tag4properties.P_INITIAL) {


            /**
             *
             * value in alarm region
             *
             * */

            if (Tools.sub(mean60, needDynamicTag.getHighhighlinepool()[(needDynamicTag.getPoniter_HighHigh() - 1) >= 0 ? (needDynamicTag.getPoniter_HighHigh() - 1) : 0]) > Tag4properties.P_INITIAL) {
                needDynamicTag.setHighhigh_holdontime(System.currentTimeMillis() + HOLDONTIME);
                needDynamicTag.setHigh_holdontime(System.currentTimeMillis() + HOLDONTIME);
                if (Model.equals("debug")) {
                    logger.error("FEED High High and High " + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowlowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + needDynamicTag.getPoniter_HighHigh() + " CurrentDymatic_HighHigh" + needDynamicTag.getHighhighlinepool()[needDynamicTag.getPoniter_HighHigh()] + " CurrentLift_HighHigh: " + needDynamicTag.getHighhigh_holdontime());
                }

            }
            /**
             * value higher than the current dynamic alarm line
             * */
            if (Tools.sub(mean60, needDynamicTag.getHighhighlinepool()[needDynamicTag.getPoniter_HighHigh()]) > Tag4properties.P_INITIAL) {


                checkAndPut(mean60, needDynamicTag, needDynamicTag.getHIGHHIGHALARM(), productline);


                // adjust dymaticalarm line
                needDynamicTag.setPoniter_HighHigh((needDynamicTag.getPoniter_HighHigh() + 1) > (Tag4properties.MAXLEVEL - 1) ? Tag4properties.MAXLEVEL - 1 : (needDynamicTag.getPoniter_HighHigh() + 1));
                needDynamicTag.setHighhigh_holdontime(System.currentTimeMillis() + HOLDONTIME);
                // if acess dymatic_highhighline   highline directly set maxlevel

                needDynamicTag.setPointer_High((Tag4properties.MAXLEVEL - 1));
                needDynamicTag.setHigh_holdontime(System.currentTimeMillis() + HOLDONTIME);

                if (Model.equals("debug")) {
                    logger.error("ALARM " + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + result.get(0) + "\n" +
                            " CurrentDymatic_HighHigh" + needDynamicTag.getHighhighlinepool()[needDynamicTag.getPoniter_HighHigh()] + " CurrentLift_HighHigh: " + needDynamicTag.getHighhigh_holdontime() + "\n" +
                            " CurrentDymatic_High" + needDynamicTag.getHighlinepool()[needDynamicTag.getPointer_High()] + " CurrentLift_High: " + needDynamicTag.getHigh_holdontime() + "\n" +
                            " CurrentDymatic_LowLow" + needDynamicTag.getLowlowlinepool()[needDynamicTag.getPointer_LowLow()] + " CurrentLift_LowLow: " + needDynamicTag.getLowlow_holdontime() + "\n" +
                            " CurrentDymatic_Low" + needDynamicTag.getLowlinepool()[needDynamicTag.getPointer_Low()] + " CurrentLift_Low: " + needDynamicTag.getLow_holdontime());
                }


            }


        }

        /**
         * high
         * */

        else if ((Tools.sub(mean60, needDynamicTag.getHighbase()) > Tag4properties.P_INITIAL) && (Tools.sub(mean60, needDynamicTag.getHighhighbase()) < Tag4properties.N_INITIAL)) {

            /**
             * High  Alarm in high region and trigger high dynamic-line
             * */
            if (Tools.sub(mean60, needDynamicTag.getHighlinepool()[(needDynamicTag.getPointer_High() - 1) >= 0 ? (needDynamicTag.getPointer_High() - 1) : 0]) > Tag4properties.P_INITIAL) {
                needDynamicTag.setHigh_holdontime(System.currentTimeMillis() + HOLDONTIME);
                if (Model.equals("debug")) {
                    logger.error("FEED High " + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowlowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + needDynamicTag.getPointer_High() + " CurrentDymatic_High" + needDynamicTag.getHighlinepool()[needDynamicTag.getPointer_High()] + " CurrentLift_High: " + needDynamicTag.getHigh_holdontime());
                }

            }


            if ((Tools.sub(mean60, needDynamicTag.getHighlinepool()[needDynamicTag.getPointer_High()]) > Tag4properties.P_INITIAL)) {

                checkAndPut(mean60, needDynamicTag, needDynamicTag.getHIGHALARM(), productline);

                needDynamicTag.setPointer_High((needDynamicTag.getPointer_High() + 1) > Tag4properties.MAXLEVEL - 1 ? Tag4properties.MAXLEVEL - 1 : (needDynamicTag.getPointer_High() + 1));
                needDynamicTag.setHigh_holdontime(System.currentTimeMillis() + HOLDONTIME);

                if (Model.equals("debug")) {
                    logger.error("ALARM " + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + result.get(0) + "\n" +
                            " CurrentDymatic_HighHigh" + needDynamicTag.getHighhighlinepool()[needDynamicTag.getPoniter_HighHigh()] + " CurrentLift_HighHigh: " + needDynamicTag.getHighhigh_holdontime() + "\n" +
                            " CurrentDymatic_High" + needDynamicTag.getHighlinepool()[needDynamicTag.getPointer_High()] + " CurrentLift_High: " + needDynamicTag.getHigh_holdontime() + "\n" +
                            " CurrentDymatic_LowLow" + needDynamicTag.getLowlowlinepool()[needDynamicTag.getPointer_LowLow()] + " CurrentLift_LowLow: " + needDynamicTag.getLowlow_holdontime() + "\n" +
                            " CurrentDymatic_Low" + needDynamicTag.getLowlinepool()[needDynamicTag.getPointer_Low()] + " CurrentLift_Low: " + needDynamicTag.getLow_holdontime());
                }
            }


        }


        /**
         * LowLow  Alarm
         * */
        else if (Tools.sub(mean60, needDynamicTag.getLowlowbase()) < Tag4properties.N_INITIAL) {

            if (Tools.sub(mean60, needDynamicTag.getLowlowlinepool()[needDynamicTag.getPointer_LowLow() - 1 >= 0 ? (needDynamicTag.getPointer_LowLow() - 1) : 0]) < Tag4properties.N_INITIAL) {
                needDynamicTag.setLowlow_holdontime(System.currentTimeMillis() + HOLDONTIME);
                needDynamicTag.setLow_holdontime(System.currentTimeMillis() + HOLDONTIME);
                if (Model.equals("debug")) {
                    logger.error("FEED LowLow  and low" + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowlowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + needDynamicTag.getPointer_LowLow() + " CurrentDymatic_lowlow" + needDynamicTag.getLowlowlinepool()[needDynamicTag.getPointer_LowLow()] + " CurrentLift_lowlow: " + needDynamicTag.getLowlow_holdontime());
                }


            }


            if ((Tools.sub(mean60, needDynamicTag.getLowlowlinepool()[needDynamicTag.getPointer_LowLow()]) < Tag4properties.N_INITIAL)) {

                checkAndPut(mean60, needDynamicTag, needDynamicTag.getLOWLOWALARM(), productline);


                needDynamicTag.setPointer_LowLow((needDynamicTag.getPointer_LowLow() + 1) > Tag4properties.MAXLEVEL - 1 ? (Tag4properties.MAXLEVEL - 1) : (needDynamicTag.getPointer_LowLow() + 1));
                needDynamicTag.setLowlow_holdontime(System.currentTimeMillis() + HOLDONTIME);


                needDynamicTag.setPointer_Low(Tag4properties.MAXLEVEL - 1);
                needDynamicTag.setLow_holdontime(System.currentTimeMillis() + HOLDONTIME);

                if (Model.equals("debug")) {
                    logger.error("ALARM " + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + result.get(0) + "\n" +
                            " CurrentDymatic_HighHigh" + needDynamicTag.getHighhighlinepool()[needDynamicTag.getPoniter_HighHigh()] + " CurrentLift_HighHigh: " + needDynamicTag.getHighhigh_holdontime() + "\n" +
                            " CurrentDymatic_High" + needDynamicTag.getHighlinepool()[needDynamicTag.getPointer_High()] + " CurrentLift_High: " + needDynamicTag.getHigh_holdontime() + "\n" +
                            " CurrentDymatic_LowLow" + needDynamicTag.getLowlowlinepool()[needDynamicTag.getPointer_LowLow()] + " CurrentLift_LowLow: " + needDynamicTag.getLowlow_holdontime() + "\n" +
                            " CurrentDymatic_Low" + needDynamicTag.getLowlinepool()[needDynamicTag.getPointer_Low()] + " CurrentLift_Low: " + needDynamicTag.getLow_holdontime());
                }


            }

        }
        /**
         * Low  Alarm
         * */
        else if ((Tools.sub(mean60, needDynamicTag.getLowbase()) < Tag4properties.N_INITIAL) && (Tools.sub(mean60, needDynamicTag.getLowlowbase()) > Tag4properties.P_INITIAL)) {

            if (Tools.sub(mean60, needDynamicTag.getLowlinepool()[(needDynamicTag.getPointer_Low() - 1) >= 0 ? (needDynamicTag.getPointer_Low() - 1) : 0]) < Tag4properties.N_INITIAL) {
                needDynamicTag.setLow_holdontime(System.currentTimeMillis() + HOLDONTIME);
                if (Model.equals("debug")) {
                    logger.error("FEED Low " + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowlowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + needDynamicTag.getPointer_Low() + " CurrentDymatic_low" + needDynamicTag.getLowlinepool()[needDynamicTag.getPointer_Low()] + " CurrentLift_low: " + needDynamicTag.getLow_holdontime());
                }

            }
            if (Tools.sub(mean60, needDynamicTag.getLowlinepool()[needDynamicTag.getPointer_Low()]) < Tag4properties.N_INITIAL) {

                checkAndPut(mean60, needDynamicTag, needDynamicTag.getLOWALARM(), productline);

                needDynamicTag.setPointer_Low((needDynamicTag.getPointer_Low() + 1) > (Tag4properties.MAXLEVEL - 1) ? Tag4properties.MAXLEVEL - 1 : (needDynamicTag.getPointer_Low() + 1));
                needDynamicTag.setLow_holdontime(System.currentTimeMillis() + HOLDONTIME);

                if (Model.equals("debug")) {
                    logger.error("ALARM " + "Tagnem: " + needDynamicTag.getTag() + " CH:" + needDynamicTag.getProductlinename() + needDynamicTag.getDevice() + needDynamicTag.getCn() + " currentValue: " + result.get(0) + " Lowlowlimit: " + needDynamicTag.getLowbase() + " Lowlimit: " + needDynamicTag.getLowbase() + " Highlimit: " + needDynamicTag.getHighbase() +
                            " HighHighlimit: " + needDynamicTag.getHighhighbase() + " CurrentPoint: " + result.get(0) + "\n" +
                            " CurrentDymatic_HighHigh" + needDynamicTag.getHighhighlinepool()[needDynamicTag.getPoniter_HighHigh()] + " CurrentLift_HighHigh: " + needDynamicTag.getHighhigh_holdontime() + "\n" +
                            " CurrentDymatic_High" + needDynamicTag.getHighlinepool()[needDynamicTag.getPointer_High()] + " CurrentLift_High: " + needDynamicTag.getHigh_holdontime() + "\n" +
                            " CurrentDymatic_LowLow" + needDynamicTag.getLowlowlinepool()[needDynamicTag.getPointer_LowLow()] + " CurrentLift_LowLow: " + needDynamicTag.getLowlow_holdontime() + "\n" +
                            " CurrentDymatic_Low" + needDynamicTag.getLowlinepool()[needDynamicTag.getPointer_Low()] + " CurrentLift_Low: " + needDynamicTag.getLow_holdontime());
                }

            }

        }

    }


    private void checkAndPut(double newvalue, Tag4properties needDynamicTag, int defaultcode, Productline productline) {


        try {
            if (needDynamicTag.getLastAlarmtime(defaultcode) == (null)) {

                putInQ(needDynamicTag, defaultcode, newvalue, productline);

            } else {
                Duration duration = Duration.between(Instant.now(), needDynamicTag.getLastAlarmtime(defaultcode));

                if (abs(duration.getSeconds()) > Monitor.ALARMINTERVAL) {
                    putInQ(needDynamicTag, defaultcode, newvalue, productline);
                }

            }
        } catch (InterruptedException e) {
            logger.error(e);
        }


    }

    private void putInQ(Tag4properties needDynamicTag, int defaultcode, double newvalue, Productline productline) throws InterruptedException {

        needDynamicTag.setLastAlarmtime(defaultcode,Instant.now());
        if (needDynamicTag.isIsaudio() && needDynamicTag.isIsalarm()) {
            AudioMessage audioMessage = new AudioMessage();
            audioMessage.setDefaultcode(defaultcode);
            audioMessage.setTag_value_after(newvalue);
            audioMessage.setTag_value_before(needDynamicTag.getValue());
            audioMessage.setProductline(needDynamicTag.getProductlinename());
            audioMessage.setDevice(needDynamicTag.getDevice());
            audioMessage.setTag(needDynamicTag.getTag());
            audioMessage.setCn(needDynamicTag.getCn());
            audioMessage.setTopic(needDynamicTag.getTopic());
            audioMessage.setSystemno(needDynamicTag.getSystemno());
            audioMessage.setGenertime(Instant.now());
            audioMessage.setProcesstype(needDynamicTag.getProcesstype());
            audioMessage.setDeviceOrProcess(needDynamicTag.getType());

            if (needDynamicTag.getNoAlarmtime() < System.currentTimeMillis()) {//系统刚起的3分钟内，不进行报警

                if (needDynamicTag.getProcesstype().equals("raw")) {
                    productline.addCurrent_raw_alarm(audioMessage);
                } else if (needDynamicTag.getProcesstype().equals("fired")) {
                    productline.addCurrent_fired_alarm(audioMessage);
                }
                audiomessage.put(audioMessage);
            }


        } else if (needDynamicTag.isIsalarm()) {
            AlarmMessage alarmMessage = new AlarmMessage();
            alarmMessage.setDefaultcode(defaultcode);
            alarmMessage.setTag_value_after(newvalue);
            alarmMessage.setTag_value_before(needDynamicTag.getValue());
            alarmMessage.setProductline(needDynamicTag.getProductlinename());
            alarmMessage.setDevice(needDynamicTag.getDevice());
            alarmMessage.setTag(needDynamicTag.getTag());
            alarmMessage.setCn(needDynamicTag.getCn());
            alarmMessage.setSystemno(needDynamicTag.getSystemno());
            alarmMessage.setGenertime(Instant.now());
            alarmMessage.setProcesstype(needDynamicTag.getProcesstype());
            alarmMessage.setDeviceOrProcess(needDynamicTag.getType());
            if (needDynamicTag.getNoAlarmtime() < System.currentTimeMillis()) {

                if (needDynamicTag.getProcesstype().equals("raw")) {

                    productline.getCurrent_raw_alarm().add(alarmMessage);
                } else if (needDynamicTag.getProcesstype().equals("fired")) {
                    productline.getCurrent_fired_alarm().add(alarmMessage);

                }


                audiomessage.put(alarmMessage);
            }


        }


    }


}
