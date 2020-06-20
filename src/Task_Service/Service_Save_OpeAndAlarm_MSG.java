package Task_Service;

import DAO.MysqlDB;
import DAO.Mysql_Access_Data;
import Model.AlarmMessage;
import Model.AudioMessage;
import ToolUnits.JMS_Text_Service;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.net.URL;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import Bap.Device.BapDeviceAlarm;

public class Service_Save_OpeAndAlarm_MSG implements Runnable {
    private LinkedBlockingQueue<Object> msgqueue;
    private ServletContext servletContext;
    private static Logger logger = Logger.getLogger(Service_Save_OpeAndAlarm_MSG.class);
    private boolean needPushBap = false;

    public Service_Save_OpeAndAlarm_MSG(ServletContext servletContext, LinkedBlockingQueue<Object> msgqueue, boolean needPushBap) {
        this.msgqueue = msgqueue;
        this.servletContext = servletContext;
        this.needPushBap = needPushBap;
    }

    @Override
    public void run() {

        while (!Thread.currentThread().isInterrupted()) {

            try {
                Object alarmMessage = msgqueue.take();

                if (AlarmMessage.class.isInstance(alarmMessage)) {

                    try {
                        AlarmMessage msg = (AlarmMessage) alarmMessage;
                        if (needPushBap) {
                            java.lang.String eamCode = "3305";
                            java.lang.String sourceType = "BEAM2006/06";
                            java.lang.String faultInfoType = msg.getDeviceOrProcess().equals("Device") ? "BEAM029/05" : "BEAM029/07";
                            java.lang.String priority = "";
                            java.lang.String findStaffCode = "3305";
                            java.lang.String describe = "";
                            java.lang.Long findTime = msg.getGenertime().plus(0, ChronoUnit.HOURS).getEpochSecond() * 1000;

                            String regex = "(\\w*)";
                            Pattern pattern = Pattern.compile(regex);
                            Matcher mdevice = pattern.matcher(msg.getDevice());
                            if (mdevice.find()) {
                                eamCode += mdevice.group();
                            }
                            describe = msg.getProductline() + " " + msg.getDevice() + " " + msg.getCn() + " " + msg.getTag_value_after() + " ";
                            switch (msg.getDefaultcode()) {

                                case 0:
                                    describe += "低低报";
                                    priority = "BEAM2007/002";
                                    break;
                                case 1:
                                    describe += "低报";
                                    priority = "BEAM2007/001";
                                    break;
                                case 2:
                                    describe += "高报";
                                    priority = "BEAM2007/001";
                                    break;
                                case 3:
                                    describe += "高高报";
                                    priority = "BEAM2007/002";
                                    break;
                                case 4:
                                    describe += "变化率偏高";
                                    priority = "BEAM2007/001";
                                    break;
                                default:
                                    break;
                            }
                            String bapBackvalue = "";

                            bapBackvalue = new BapDeviceAlarm(new URL("file:\\" + servletContext.getRealPath("/WEB-INF") + "\\conf\\faultInfoRelevantService.wsdl")).PushAlarmMessage(
                                    eamCode,
                                    sourceType,
                                    faultInfoType,
                                    priority,
                                    findStaffCode,
                                    describe,
                                    findTime);


                            logger.info(bapBackvalue);
                            logger.info(describe);

                            regex = "<CODE>(.*)</CODE><RESULTINFO>(.*)</RESULTINFO>";

                            Pattern patternbap = Pattern.compile(regex);
                            Matcher mbap = patternbap.matcher(bapBackvalue);
                            if (mbap.find()) {
                                if (mbap.group(1).equals("SUCCESS")) {
                                    msg.setBapdefaultId(mbap.group(2));
                                }
                            }
                        }

                    } catch (Exception e) {
                        logger.error(e);
                    }
                    Mysql_Access_Data.save_msg(servletContext, MysqlDB.getConnection(servletContext), (AlarmMessage) alarmMessage);

                }

                if (AudioMessage.class.isInstance(alarmMessage)) {
//
                    //语音报警

                    AudioMessage audioMessage = (AudioMessage) alarmMessage;
                    int defaultcode = audioMessage.getDefaultcode();
                    String alarmconext = null;


                    switch (audioMessage.getDefaultcode()) {

                        case 0:
                            alarmconext = "低低报";
                            break;
                        case 1:
                            alarmconext = "低报";
                            break;
                        case 2:
                            alarmconext = "高报";
                            break;
                        case 3:
                            alarmconext = "高高报";
                            break;
                        case 4:
                            alarmconext = "变化率偏高";
                            break;
                        default:
                            break;
                    }

                    String plname = audioMessage.getProductline().replace("1#", "一线").replace("2#", "二线").replace("3#", "三线");
                    String cn = audioMessage.getCn().replace("1", "").replace("2", "").replace("3", "").replace("4", "");
//                            System.out.println(audioMessage.getProductline()+audioMessage.getDevice()+audioMessage.getCn()+alarmconext);
                    logger.info(plname + audioMessage.getDevice() + cn + alarmconext);
                    JMS_Text_Service.get_MesService().SenderTextMessages(plname + audioMessage.getDevice() + cn + alarmconext, audioMessage.getTopic());
                }


            } catch (InterruptedException e) {
                logger.error(e);

            } catch (Exception e) {
                logger.error(e);
            }

        }
    }
}
