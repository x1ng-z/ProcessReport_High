package DAO;

import Model.*;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.sql.*;
import java.util.*;

public class Mysql_Access_Data {
    //窑上取数用代理模式就可以
    private static Logger logger = Logger.getLogger(Mysql_Access_Data.class);


    public static Map<String, Firm> getAllfirm(ServletContext servletContext, Connection mysql_connection) {
        Map<String, Firm> frimmapping = new HashMap<String, Firm>();

        String sql = "select * from firm";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {

                String firmid = resultSet.getString("firmid");
                String firmname = resultSet.getString("firmname");
                String firmshortname = resultSet.getString("firmshortname");
                Firm firm = new Firm();
                firm.setFirmid(firmid);
                firm.setFirmname(firmname);
                firm.setFirmshortname(firmshortname);
                firm.setProductlinemapping(get_specificproductline(servletContext, MysqlDB.getConnection(servletContext), firmid));


                frimmapping.put(firmid, firm);
            }
            return frimmapping;

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;


    }


    private static Map<String, Productline> get_specificproductline(ServletContext servletContext, Connection mysql_connection, String firm_id) {
        Map<String, Productline> productlineMap = new HashMap<String, Productline>();

        String sql = "select * from webfactoryip where firm_id=? ";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, firm_id);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {

                String productline = resultSet.getString("productline");
                String ip = resultSet.getString("ip");
                String region = resultSet.getString("region");
                String regionfirm = resultSet.getString("regionfirm");
                String productline_id = resultSet.getString("productline_id");
                Productline productlineclazz = new Productline();
                productlineclazz.setIp(ip);
                productlineclazz.setProductline_cn(productline);
                productlineclazz.setProductline_id(productline_id);
                productlineclazz.setRegion(region);
                productlineclazz.setRegionfirm(regionfirm);

                productlineclazz.setRawSystemmapping(getAllrawstem(productlineclazz, MysqlDB.getConnection(servletContext), productline, productlineclazz, servletContext));
                productlineclazz.setFiredSystemmapping(getAllfiredsystem(servletContext, productlineclazz, MysqlDB.getConnection(servletContext), productline, productlineclazz));

                productlineclazz.setQulityTags(getqulitysystemTags(productlineclazz,MysqlDB.getConnection(servletContext)));

                productlineMap.put(productline_id, productlineclazz);
            }
            return productlineMap;

        } catch (SQLException e) {
            logger.error(e);
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;

    }


    public static Map<String, RawSystem> getAllrawstem(Productline productline, Connection mysql_connection, String productlinename, Product product, ServletContext servletContext) {
        Map<String, RawSystem> rawSystemMap = new HashMap<String, RawSystem>();

        String sql = "select * from rawsystem_process where productline=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, productlinename);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String productlineId = resultSet.getString("productline");
                String rawsystemno = resultSet.getString("rawsystemno");
                String type = resultSet.getString("type");
                String rawsystem_id = resultSet.getString("rawsystem_id");
                RawSystem rawSystem = new RawSystem();
                rawSystem.setRawsystem_id(rawsystem_id);
                rawSystem.setProductionline(productlineId);
                rawSystem.setRawsystemno(rawsystemno);
                rawSystem.setType(type);
                rawSystem.setTagMapping(getRawsystemTags(productline, MysqlDB.getConnection(servletContext), rawsystemno, productlinename, product));
                rawSystemMap.put(rawsystem_id, rawSystem);
            }

            return rawSystemMap;
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;

    }


    public static Map<String, FiredSystem> getAllfiredsystem(ServletContext servletContext, Productline productline, Connection mysql_connection, String productlinename, Product product) {
        Map<String, FiredSystem> firedSystemMap = new HashMap<String, FiredSystem>();

        String sql = "select * from firedsystem where productline=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, productlinename);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String productlineId = resultSet.getString("productline");
                String firedsystemno = resultSet.getString("firedsystemno");
                int type = resultSet.getInt("type");
                FiredSystem firedSystem = new FiredSystem();
                firedSystem.setProductline(productlineId);
                firedSystem.setFiredsystemno(firedsystemno);
                firedSystem.setType(type);
                firedSystem.setTagMapping(getFiredsystemTags(productline, MysqlDB.getConnection(servletContext), firedsystemno, productlinename, product));
                firedSystem.setEnvPtcSystemTags(getenvptcsystemTags(firedsystemno,MysqlDB.getConnection(servletContext)));
                firedSystemMap.put(firedsystemno, firedSystem);
            }

            return firedSystemMap;
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;

    }

    public static Map<String, Tag4properties> getFiredsystemTags(Productline productline, Connection mysql_connection, String firedsystemnon, String productlinename, Product product) {

        Map<String, Tag4properties> firedtags = new HashMap<String, Tag4properties>();

        String sql = "select * from firedtag where firedsystemno=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, firedsystemnon);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {

                String firedsystemno = resultSet.getString("firedsystemno");
                String cn = resultSet.getString("cn");
                String tag = resultSet.getString("tag");
                double hhighlimit = resultSet.getDouble("hhighlimit");
                double highlimit = resultSet.getDouble("highlimit");
                double llowlimit = resultSet.getDouble("llowlimit");
                double lowlimit = resultSet.getDouble("lowlimit");
                String device = resultSet.getString("device");
                int decision_delay = resultSet.getInt("decision_delay");
                double changerate = resultSet.getDouble("changerate");
                double positive_operate_changerate = resultSet.getDouble("positive_operate_changerate");
                double negative_operate_changerate = resultSet.getDouble("negative_operate_changerate");
                String type = resultSet.getString("type");

                String alarmmonitor = resultSet.getString("alarmmonitor");
                double limit = resultSet.getDouble("operate_range_limit");

                boolean isaudio = resultSet.getBoolean("isaudio");
                boolean isalarm = resultSet.getBoolean("isalarm");
                String topic = resultSet.getString("topic");
                String alarm_mode = resultSet.getString("alarm_mode");
                Tag4properties tag4properties = new Tag4properties();
                try {
                    Integer deviceAlarmJudgmentSrc = resultSet.getInt("deviceAlarmJudgmentSrc");
                    /**tag have that properties*/
                    if ((deviceAlarmJudgmentSrc != null) && (deviceAlarmJudgmentSrc.equals(1))) {
                        productline.addDeviceAlarmjudgeRsc(device, tag4properties);
                        tag4properties.setDeviceAlarmJudgmentSrc(deviceAlarmJudgmentSrc);
                    }
                } catch (SQLException throwables) {
                    /**tag have no that properties*/


                }


                String processtype = "fired";


                tag4properties.setCn(cn);
                tag4properties.setSystemno(firedsystemno);
                tag4properties.setDevice(device);
                tag4properties.setHighhighbase(hhighlimit);
                tag4properties.setHighbase(highlimit);
                tag4properties.setLowlowbase(llowlimit);
                tag4properties.setLowbase(lowlimit);
                tag4properties.setTag(tag);
                tag4properties.setDecision_delay(decision_delay);
                tag4properties.setFix_changerate(changerate);
                tag4properties.setPositive_operate_changerate(positive_operate_changerate);
                tag4properties.setNegative_operate_changerate(negative_operate_changerate);
                tag4properties.setProductlinename(productlinename);
                tag4properties.setType(type);
                tag4properties.setIsalarm(isalarm);
                tag4properties.setAlarmtmonitor(alarmmonitor);
                tag4properties.setOperate_range_limit(limit);
                tag4properties.setIsaudio(isaudio);
                tag4properties.setProcesstype(processtype);
                tag4properties.setTopic(topic);
                tag4properties.setAlarm_mode(alarm_mode);
                tag4properties.init();

                if (alarm_mode != null) {
                    if (alarm_mode.equals(Tag4properties.NEGATIVEMODE)) {
                        tag4properties.setLOWLOWALARM(3);
                        tag4properties.setLOWALARM(2);
                        tag4properties.setHIGHALARM(1);
                        tag4properties.setHIGHHIGHALARM(0);

                    }

                }


                if (tag4properties.getDevice().equals("回转窑") && tag4properties.getCn().equals("电流1")) {
                    product.setFired_judgerelu(tag4properties);
                }
                firedtags.put(tag, tag4properties);


            }
            return firedtags;
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;


    }


    public static Map<String, Tag4properties> getRawsystemTags(Productline productline, Connection mysql_connection, String rawsystemnoname, String productlinename, Product product) {


        Map<String, Tag4properties> rawtags = new HashMap<String, Tag4properties>();

        String sql = "select * from rawtag_process where rawsystemno=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, rawsystemnoname);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {


                String rawsystemno = resultSet.getString("rawsystemno");
                String cn = resultSet.getString("cn");
                String tag = resultSet.getString("tag");
                double hhighlimit = resultSet.getDouble("hhighlimit");
                double highlimit = resultSet.getDouble("highlimit");
                double llowlimit = resultSet.getDouble("llowlimit");
                double lowlimit = resultSet.getDouble("lowlimit");
                String device = resultSet.getString("device");
                int decision_delay = resultSet.getInt("decision_delay");
                double changerate = resultSet.getDouble("changerate");
                double positive_operate_changerate = resultSet.getDouble("positive_operate_changerate");
                double negative_operate_changerate = resultSet.getDouble("negative_operate_changerate");
                String type = resultSet.getString("type");
                String alarmmonitor = resultSet.getString("alarmmonitor");
                double limit = resultSet.getDouble("operate_range_limit");
                boolean isaudio = resultSet.getBoolean("isaudio");
                boolean isalarm = resultSet.getBoolean("isalarm");
                String topic = resultSet.getString("topic");
                String alarm_mode = resultSet.getString("alarm_mode");
                Tag4properties tag4properties = new Tag4properties();

                try {
                    Integer deviceAlarmJudgmentSrc = resultSet.getInt("deviceAlarmJudgmentSrc");
                    /**tag have that properties*/
                    if ((deviceAlarmJudgmentSrc != null) && (deviceAlarmJudgmentSrc.equals(1))) {
                        productline.addDeviceAlarmjudgeRsc(device, tag4properties);
                        tag4properties.setDeviceAlarmJudgmentSrc(deviceAlarmJudgmentSrc);
                    }
                } catch (SQLException throwables) {
                    /**tag have no that properties*/


                }


                String processtype = "raw";


                tag4properties.setCn(cn);
                tag4properties.setSystemno(rawsystemno);
                tag4properties.setDevice(device);
                tag4properties.setHighhighbase(hhighlimit);
                tag4properties.setHighbase(highlimit);
                tag4properties.setLowlowbase(llowlimit);
                tag4properties.setLowbase(lowlimit);
                tag4properties.setTag(tag);
                tag4properties.setDecision_delay(decision_delay);
                tag4properties.setFix_changerate(changerate);
                tag4properties.setPositive_operate_changerate(positive_operate_changerate);
                tag4properties.setNegative_operate_changerate(negative_operate_changerate);
                tag4properties.setType(type);
                tag4properties.setProductlinename(productlinename);

                tag4properties.setIsalarm(isalarm);
                tag4properties.setAlarmtmonitor(alarmmonitor);
                tag4properties.setOperate_range_limit(limit);
                tag4properties.setIsaudio(isaudio);
                tag4properties.setProcesstype(processtype);
                tag4properties.setTopic(topic);
                tag4properties.setAlarm_mode(alarm_mode);
                ;
                tag4properties.init();
                if (alarm_mode != null) {

                    if (alarm_mode.equals(Tag4properties.NEGATIVEMODE)) {
                        tag4properties.setLOWLOWALARM(3);
                        tag4properties.setLOWALARM(2);
                        tag4properties.setHIGHALARM(1);
                        tag4properties.setHIGHHIGHALARM(0);

                    }
                }

                if (tag4properties.getDevice().equals("磨机") && tag4properties.getCn().equals("主电机电流1")) {
                    product.setRaw_judgerelu(tag4properties);
                }


                rawtags.put(tag, tag4properties);
            }
            return rawtags;
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }


            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;

    }




    public static Map<String, Tag4properties> getqulitysystemTags(Productline productline, Connection mysql_connection) {

        Map<String, Tag4properties> qulitytags = new HashMap<String, Tag4properties>();
        String sql = "select * from qulitytag where productline=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, productline.getProductline_cn());
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String processtype="qulity";
                String productlineindex = resultSet.getString("productline");
                String cn = resultSet.getString("cn");
                String tag = resultSet.getString("tag");
                double hhighlimit = resultSet.getDouble("hhighlimit");
                double highlimit = resultSet.getDouble("highlimit");
                double llowlimit = resultSet.getDouble("llowlimit");
                double lowlimit = resultSet.getDouble("lowlimit");
                int id = resultSet.getInt("id");
                double changerate = resultSet.getDouble("changerate");
                String type = resultSet.getString("type");
                String alarmmonitor = resultSet.getString("alarmonitor");
                boolean isaudio = resultSet.getBoolean("isaudio");
                boolean isalarm = resultSet.getBoolean("isalarm");
                String topic = resultSet.getString("topic");
                Tag4properties tag4properties = new Tag4properties();
                try {
                    Integer deviceAlarmJudgmentSrc = resultSet.getInt("deviceAlarmJudgmentSrc");
                    /**tag have that properties*/
                    if ((deviceAlarmJudgmentSrc != null) && (deviceAlarmJudgmentSrc.equals(1))) {
//                        productline.addDeviceAlarmjudgeRsc(device, tag4properties);
                        tag4properties.setDeviceAlarmJudgmentSrc(deviceAlarmJudgmentSrc);
                    }
                } catch (SQLException throwables) {
                    /**tag have no that properties*/
                }

                tag4properties.setCn(cn);
                tag4properties.setHighhighbase(hhighlimit);
                tag4properties.setHighbase(highlimit);
                tag4properties.setLowlowbase(llowlimit);
                tag4properties.setLowbase(lowlimit);
                tag4properties.setTag("Q"+productline.getProductline_id().substring(productline.getProductline_id().length() - 1, productline.getProductline_id().length())+tag);
                tag4properties.setId(id);
                tag4properties.setFix_changerate(changerate);
                tag4properties.setType(type);
                tag4properties.setProductlinename(productlineindex);

                tag4properties.setIsalarm(isalarm);
                tag4properties.setAlarmtmonitor(alarmmonitor);
                tag4properties.setIsaudio(isaudio);
                tag4properties.setProcesstype(processtype);
                tag4properties.setTopic(topic);
                tag4properties.init();
                qulitytags.put("Q"+productline.getProductline_id().substring(productline.getProductline_id().length() - 1, productline.getProductline_id().length())+tag, tag4properties);
            }
            return qulitytags;
        } catch (SQLException e) {
            logger.error(e.getMessage(),e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e.getMessage(),e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                   logger.error(e.getMessage(),e);
                }
            }


            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
               logger.error(throwables.getMessage(),throwables);
            }
        }
        return null;
    }




    public static Map<String, Tag4properties> getenvptcsystemTags(String firedsystemno, Connection mysql_connection) {

        Map<String, Tag4properties> qulitytags = new HashMap<String, Tag4properties>();
        String sql = "select * from envprotecttag where firedsystemno=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, firedsystemno);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String cn = resultSet.getString("cn");
                String tag = resultSet.getString("tag");
                double hhighlimit = resultSet.getDouble("hhighlimit");
                double highlimit = resultSet.getDouble("highlimit");
                double llowlimit = resultSet.getDouble("llowlimit");
                double lowlimit = resultSet.getDouble("lowlimit");
                String processtype = resultSet.getString("processtype");
                int id = resultSet.getInt("id");
                double changerate = resultSet.getDouble("changerate");
                String type = resultSet.getString("type");
                String alarmmonitor = resultSet.getString("alarmmonitor");
                boolean isaudio = resultSet.getBoolean("isaudio");
                boolean isalarm = resultSet.getBoolean("isalarm");
                String topic = resultSet.getString("topic");
                Tag4properties tag4properties = new Tag4properties();
                try {
                    Integer deviceAlarmJudgmentSrc = resultSet.getInt("deviceAlarmJudgmentSrc");
                    /**tag have that properties*/
                    if ((deviceAlarmJudgmentSrc != null) && (deviceAlarmJudgmentSrc.equals(1))) {
//                        productline.addDeviceAlarmjudgeRsc(device, tag4properties);
                        tag4properties.setDeviceAlarmJudgmentSrc(deviceAlarmJudgmentSrc);
                    }
                } catch (SQLException throwables) {
                    /**tag have no that properties*/
                }

                tag4properties.setCn(cn);
                tag4properties.setHighhighbase(hhighlimit);
                tag4properties.setHighbase(highlimit);
                tag4properties.setLowlowbase(llowlimit);
                tag4properties.setLowbase(lowlimit);
                tag4properties.setTag(tag);
                tag4properties.setId(id);
                tag4properties.setFix_changerate(changerate);
                tag4properties.setType(type);

                tag4properties.setIsalarm(isalarm);
                tag4properties.setAlarmtmonitor(alarmmonitor);
                tag4properties.setIsaudio(isaudio);
                tag4properties.setProcesstype(processtype);
                tag4properties.setTopic(topic);
                tag4properties.setProcesstype("envptc");
                tag4properties.init();
                qulitytags.put(tag, tag4properties);
            }
            return qulitytags;
        } catch (SQLException e) {
            logger.error(e.getMessage(),e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e.getMessage(),e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e.getMessage(),e);
                }
            }


            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(),throwables);
            }
        }
        return null;
    }






    public static List<AlarmMessage> get_oldalarmhistory(ServletContext servletContext, Connection mysql_connection, Timestamp start, Timestamp end, String processtype) {


        List<AlarmMessage> operatehistories = new ArrayList<AlarmMessage>();

        String sql = "select * from operatehistory where (genertime>=? and genertime<=? )and type=? ORDER BY genertime DESC";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setTimestamp(1, start);
            preparedStatement.setTimestamp(2, end);
            preparedStatement.setString(3, processtype);
//            preparedStatement.setString(1,rawsystemnoname);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {


                String productline = resultSet.getString("productline");
                String systemno = resultSet.getString("systemno");
                String device = resultSet.getString("device");
                String cn = resultSet.getString("cn");
                String tag = resultSet.getString("tag");
                double tag_value_before = resultSet.getDouble("tag_value_before");
                double tag_value_after = resultSet.getDouble("tag_value_after");
                Timestamp genertime = resultSet.getTimestamp("genertime");
//                double positive_operate_changerate=resultSet.getDouble("positive_operate_changerate");
//                double negative_operate_changerate=resultSet.getDouble("negative_operate_changerate");
                String type = resultSet.getString("type");
                int alarmtype = resultSet.getInt("alarmtype");
                int msgId = resultSet.getInt("id");
                int processStatus = resultSet.getInt("processStatus");

                String bapdefaultId = resultSet.getString("bapdefaultId");

                String deviceOrProcess = null;
                try {
                    deviceOrProcess = resultSet.getString("deviceOrProcess");
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }

                if (alarmtype == 10) {
                    Operate_Message recordMysqlMessage1 = new Operate_Message();
                    recordMysqlMessage1.setProductline(productline);
                    recordMysqlMessage1.setSystemno(systemno);
                    recordMysqlMessage1.setDevice(device);
                    recordMysqlMessage1.setCn(cn);
                    recordMysqlMessage1.setTag(tag);
                    recordMysqlMessage1.setTag_value_before(tag_value_before);
                    recordMysqlMessage1.setTag_value_after(tag_value_after);
                    recordMysqlMessage1.setGenertime(genertime.toInstant());
                    recordMysqlMessage1.setProcesstype(type);
                    recordMysqlMessage1.setDefaultcode(alarmtype);
                    recordMysqlMessage1.setId(msgId);
                    recordMysqlMessage1.setProcessStatus(processStatus);
                    recordMysqlMessage1.setDeviceOrProcess(deviceOrProcess);
                    recordMysqlMessage1.setBapdefaultId(bapdefaultId);
                    operatehistories.add(recordMysqlMessage1);


                } else {

                    AlarmMessage recordMysqlMessage1 = new AlarmMessage();
                    recordMysqlMessage1.setProductline(productline);
                    recordMysqlMessage1.setSystemno(systemno);
                    recordMysqlMessage1.setDevice(device);
                    recordMysqlMessage1.setCn(cn);
                    recordMysqlMessage1.setTag(tag);
                    recordMysqlMessage1.setTag_value_before(tag_value_before);
                    recordMysqlMessage1.setTag_value_after(tag_value_after);
                    recordMysqlMessage1.setGenertime(genertime.toInstant());
                    recordMysqlMessage1.setProcesstype(type);
                    recordMysqlMessage1.setDefaultcode(alarmtype);
                    recordMysqlMessage1.setId(msgId);
                    recordMysqlMessage1.setProcessStatus(processStatus);
                    recordMysqlMessage1.setDeviceOrProcess(deviceOrProcess);
                    recordMysqlMessage1.setBapdefaultId(bapdefaultId);
                    operatehistories.add(recordMysqlMessage1);

                }


            }

//            processMgr.setCurrent_raw_operate(operatehistories);
            return operatehistories;
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;

    }


    public static void save_predict(ServletContext servletContext, Connection mysql_connection, Quality_data quality_data) {


        if (isExitpredict(servletContext, mysql_connection, quality_data)) {


            List<Operate_Message> operatehistories = new ArrayList<Operate_Message>();
            String sql = "insert into predict(har_analy ,loss, sio2, al2o3 , fe2o3 , cao , mgo , fcao, kh , kh1, n , p , c3s , c2s , c3a , c4af , compressive_pressure28, predict28,har_produdate ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            ResultSet resultSet = null;
            PreparedStatement preparedStatement = null;
            try {
                preparedStatement = mysql_connection.prepareStatement(sql);
                preparedStatement.setString(1, quality_data.getHar_analy().get(0));
                preparedStatement.setDouble(2, quality_data.getLoss().get(0));
                preparedStatement.setDouble(3, quality_data.getSio2().get(0));
                preparedStatement.setDouble(4, quality_data.getAl2o3().get(0));
                preparedStatement.setDouble(5, quality_data.getFe2o3().get(0));
                preparedStatement.setDouble(6, quality_data.getCao().get(0));
                preparedStatement.setDouble(7, quality_data.getMgo().get(0));
                preparedStatement.setDouble(8, quality_data.getFcao().get(0));
                preparedStatement.setDouble(9, quality_data.getKh().get(0));
                preparedStatement.setDouble(10, quality_data.getKh1().get(0));
                preparedStatement.setDouble(11, quality_data.getN().get(0));
                preparedStatement.setDouble(12, quality_data.getP().get(0));
                preparedStatement.setDouble(13, quality_data.getC3s().get(0));
                preparedStatement.setDouble(14, quality_data.getC2s().get(0));
                preparedStatement.setDouble(15, quality_data.getC3a().get(0));
                preparedStatement.setDouble(16, quality_data.getC4af().get(0));
                preparedStatement.setDouble(17, quality_data.getCompressive_pressure28().get(0));
                preparedStatement.setDouble(18, quality_data.getPredict().get(0));
                preparedStatement.setString(19, quality_data.getHar_produdate().get(0));

                preparedStatement.execute();
//            processMgr.setCurrent_raw_operate(operatehistories);
            } catch (SQLException e) {
                logger.error(e);

            } finally {
                if (resultSet != null) {
                    try {
                        resultSet.close();
                    } catch (SQLException e) {
                        logger.error(e);
                    }
                }

                if (preparedStatement != null) {

                    try {
                        preparedStatement.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                }

                try {
                    if (mysql_connection != null) {
                        mysql_connection.close();
                    }
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        }

    }


    public static boolean isExitpredict(ServletContext servletContext, Connection mysql_connection, Quality_data quality_data) {


        List<Operate_Message> operatehistories = new ArrayList<Operate_Message>();
        String sql = "select  count(*) as number from predict where har_analy=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, quality_data.getHar_analy().get(0));
            resultSet = preparedStatement.executeQuery();


            while (resultSet.next()) {
                if (resultSet.getInt("number") != 0) {
                    return false;
                } else {
                    return true;

                }

            }
//            processMgr.setCurrent_raw_operate(operatehistories);
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

        }
        return true;

    }

    public static void save_msg(ServletContext servletContext, Connection mysql_connection, AlarmMessage msg) {
        String sql = "insert into operatehistory(productline, systemno, device, cn, tag, tag_value_before, tag_value_after, genertime, alarmtype ,type,deviceOrProcess,bapdefaultId) values (?,?,?,?,?,?,?,?,?,?,?,?)";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, msg.getProductline());
            preparedStatement.setString(2, msg.getSystemno());
            preparedStatement.setString(3, msg.getDevice());
            preparedStatement.setString(4, msg.getCn());
            preparedStatement.setString(5, msg.getTag());
            preparedStatement.setDouble(6, msg.getTag_value_before());
            preparedStatement.setDouble(7, msg.getTag_value_after());
            preparedStatement.setTimestamp(8, new Timestamp(msg.getGenertime().toEpochMilli()));
            preparedStatement.setInt(9, Operate_Message.class.isInstance(msg) ? 10 : msg.getDefaultcode());
            preparedStatement.setString(10, msg.getProcesstype());
            preparedStatement.setString(11, msg.getDeviceOrProcess());
            preparedStatement.setString(12, msg.getBapdefaultId());
            preparedStatement.execute();


            resultSet = preparedStatement.getGeneratedKeys();

            if (resultSet.next()) {
                msg.setId(resultSet.getInt(1));
            } else {
                //do notihng
            }
        } catch (SQLException e) {
            logger.error(e);
            try {
                mysql_connection.rollback();
            } catch (SQLException e1) {
                logger.error(e);
            }

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }


    }


    public static int getMSGProcessStatus(ServletContext servletContext, Connection mysql_connection, int msgId) {
        String sql = "select processStatus from operatehistory where id=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        int processStatus = 0;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setInt(1, msgId);

            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                processStatus = resultSet.getInt("processStatus");
            }
            return processStatus;
        } catch (SQLException e) {
            logger.error(e);
            try {
                mysql_connection.rollback();
            } catch (SQLException e1) {
                logger.error(e);
            }

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }

        return 0;
    }


    public static void updateMSGProcessStatus(ServletContext servletContext, Connection mysql_connection, int msgId, int processStatus) {
        String sql = "update operatehistory set processStatus=? where id=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setInt(1, processStatus);
            preparedStatement.setInt(2, msgId);
            preparedStatement.execute();
        } catch (SQLException e) {
            logger.error(e);
            try {
                mysql_connection.rollback();
            } catch (SQLException e1) {
                logger.error(e);
            }

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }


    }


    public static Quality_data get_predicthistory(ServletContext servletContext, Connection mysql_connection) {


        List<Operate_Message> operatehistories = new ArrayList<Operate_Message>();
        String sql = "select * from predict order by har_analy desc limit 100";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        Quality_data quality_data = new Quality_data();


        List<String> phar_produdate = new ArrayList<String>();
        List<String> phar_analy = new ArrayList<String>();
        List<Double> ploss = new ArrayList<Double>();
        List<Double> psio2 = new ArrayList<Double>();
        List<Double> pal2o3 = new ArrayList<Double>();
        List<Double> pfe2o3 = new ArrayList<Double>();
        List<Double> pcao = new ArrayList<Double>();
        List<Double> pmgo = new ArrayList<Double>();
        List<Double> pfcao = new ArrayList<Double>();
        List<Double> pkh = new ArrayList<Double>();
        List<Double> pkh1 = new ArrayList<Double>();
        List<Double> pn = new ArrayList<Double>();
        List<Double> pp = new ArrayList<Double>();
        List<Double> pc3s = new ArrayList<Double>();
        List<Double> pc2s = new ArrayList<Double>();
        List<Double> pc3a = new ArrayList<Double>();
        List<Double> pc4af = new ArrayList<Double>();
        List<Double> pcompressive_pressure28 = new ArrayList<Double>();
        List<Double> ppredict = new ArrayList<Double>();


        try {
            preparedStatement = mysql_connection.prepareStatement(sql);

            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                String har_analy = resultSet.getString("har_analy");
                double loss = resultSet.getDouble("loss");
                double sio2 = resultSet.getDouble("sio2");
                double al2o3 = resultSet.getDouble("al2o3");
                double fe2o3 = resultSet.getDouble("fe2o3");
                double cao = resultSet.getDouble("cao");
                double mgo = resultSet.getDouble("mgo");
                double fcao = resultSet.getDouble("fcao");
                double kh = resultSet.getDouble("kh");
                double kh1 = resultSet.getDouble("kh1");
                double n = resultSet.getDouble("n");
                double p = resultSet.getDouble("p");
                double c3s = resultSet.getDouble("c3s");
                double c2s = resultSet.getDouble("c2s");
                double c3a = resultSet.getDouble("c3a");
                double c4af = resultSet.getDouble("c4af");
                double compressive_pressure28 = resultSet.getDouble("compressive_pressure28");
                double predict28 = resultSet.getDouble("predict28");
                String har_produdate = resultSet.getString("har_produdate");


                phar_analy.add(har_analy);
                phar_produdate.add(har_produdate);
                ploss.add(loss);
                psio2.add(sio2);
                pal2o3.add(al2o3);
                pfe2o3.add(fe2o3);
                pcao.add(cao);
                pmgo.add(mgo);
                pfcao.add(fcao);
                pkh.add(kh);
                pkh1.add(kh1);
                pn.add(n);
                pp.add(p);
                pc3s.add(c3s);
                pc2s.add(c2s);
                pc3a.add(c3a);
                pc4af.add(c4af);
                pcompressive_pressure28.add(compressive_pressure28);
                ppredict.add(predict28);

            }


            quality_data.setAl2o3(pal2o3);
            quality_data.setC2s(pc2s);
            quality_data.setC3a(pc3a);
            quality_data.setC3s(pc3s);
            quality_data.setC4af(pc4af);
            quality_data.setCao(pcao);
            quality_data.setCompressive_pressure28(pcompressive_pressure28);
            quality_data.setFcao(pfcao);
            quality_data.setHar_analy(phar_analy);
            quality_data.setKh(pkh);
            quality_data.setKh1(pkh1);
            quality_data.setSio2(psio2);
            quality_data.setLoss(ploss);
            quality_data.setFe2o3(pfe2o3);
            quality_data.setMgo(pmgo);
            quality_data.setN(pn);
            quality_data.setP(pp);
            quality_data.setPredict(ppredict);
            quality_data.setHar_produdate(phar_produdate);
            return quality_data;

//            processMgr.setCurrent_raw_operate(operatehistories);
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;

    }


    public static List<String> get_nullreal28Strong(ServletContext servletContext, Connection mysql_connection) {

        String sql = "select * from predict where compressive_pressure28=0 or compressive_pressure28 is null order by har_analy ASC limit 10";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;


        List<String> phar_produdate = new ArrayList<String>();


        try {
            preparedStatement = mysql_connection.prepareStatement(sql);

            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                String har_produdate = resultSet.getString("har_produdate");

                phar_produdate.add(har_produdate);
            }


            return phar_produdate;

//            processMgr.setCurrent_raw_operate(operatehistories);
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;

    }


    public static void fill_nullreal28Strong(ServletContext servletContext, Connection mysql_connection, Map<String, Double> pendingfill28) {

        String sql = "update predict set compressive_pressure28=? where har_produdate=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;

        String[] keys = new String[10];
        pendingfill28.keySet().toArray(keys);
        String onedate = keys[0];
        Double presure = pendingfill28.get(onedate);


        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setDouble(1, presure);
            preparedStatement.setString(2, onedate);

            preparedStatement.execute();

//            processMgr.setCurrent_raw_operate(operatehistories);
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }


    }


    /**
     * BapJobid BAP工单
     * alarmID  报警ID
     */
    public static void updataAlarmHistBapJobId(Connection mysql_connection, String BapJobid, int alarmId) {

        String sql = "update operatehistory set bapdefaultId=? where id=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, BapJobid);
            preparedStatement.setInt(2, Integer.valueOf(alarmId));
            preparedStatement.execute();
        } catch (SQLException e) {
            logger.error(e);
        } catch (Exception e) {
            logger.error(e);
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }


    }


    public static String updatafiredtagslimit(Connection mysql_connection, int id, double highhighlimit, double highlimit, double lowlowlimit, double lowlimit) {
        String sql = "update firedtag set hhighlimit=?,highlimit=?,llowlimit=?,lowlimit=?where id=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setDouble(1, highhighlimit);
            preparedStatement.setDouble(2, highlimit);
            preparedStatement.setDouble(3, lowlowlimit);
            preparedStatement.setDouble(4, lowlimit);
            preparedStatement.setInt(5, id);
            preparedStatement.execute();
            return "success";
        } catch (SQLException e) {
            logger.error(e);
            return "failed";
        } catch (Exception e) {
            logger.error(e);
            return "failed";
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
    }


    public static List<Map<String, String>> get_firedallTags(ServletContext servletContext, Connection mysql_connection, String firedsystemno) {
        String sql = "select * from firedtag where firedsystemno=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        List<Map<String, String>> results = new ArrayList<>();
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, firedsystemno);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Map<String, String> tagpropert = new HashMap<String, String>();
                tagpropert.put("id", resultSet.getString("id"));
                tagpropert.put("tag", resultSet.getString("tag"));
                tagpropert.put("cn", resultSet.getString("cn"));
                tagpropert.put("hhighlimit", resultSet.getString("hhighlimit"));
                tagpropert.put("highlimit", resultSet.getString("highlimit"));
                tagpropert.put("llowlimit", resultSet.getString("llowlimit"));
                tagpropert.put("lowlimit", resultSet.getString("lowlimit"));
                tagpropert.put("changerate", resultSet.getString("changerate"));
                tagpropert.put("device", resultSet.getString("device"));
                tagpropert.put("type", resultSet.getString("type"));
                tagpropert.put("alarmmonitor", resultSet.getString("alarmmonitor"));
                tagpropert.put("isaudio", resultSet.getString("isaudio"));
                tagpropert.put("isalarm", resultSet.getString("isalarm"));
                tagpropert.put("topic", resultSet.getString("topic"));
                tagpropert.put("alarm_mode", resultSet.getString("alarm_mode"));
                results.add(tagpropert);
            }
            return results;
//            processMgr.setCurrent_raw_operate(operatehistories);
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;
    }

    /**------生料系统配置表参数设置---by lang-----**/
    public static String updatarawtagslimit(Connection mysql_connection, int id, double highhighlimit, double highlimit, double lowlowlimit, double lowlimit) {
        String sql = "update rawtag_process set hhighlimit=?,highlimit=?,llowlimit=?,lowlimit=?where id=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setDouble(1, highhighlimit);
            preparedStatement.setDouble(2, highlimit);
            preparedStatement.setDouble(3, lowlowlimit);
            preparedStatement.setDouble(4, lowlimit);
            preparedStatement.setInt(5, id);
            preparedStatement.execute();
            return "success";
        } catch (SQLException e)                                 {
            logger.error(e);
            return "failed";
        } catch (Exception e) {
            logger.error(e);
            return "failed";
        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
    }

/**------生料系统参数配置表获取---by lang-----**/
    public static List<Map<String, String>> get_rawallTags(ServletContext servletContext, Connection mysql_connection, String rawsystemno) {
        String sql = "select * from rawtag_process where rawsystemno=?";
        ResultSet resultSet = null;
        PreparedStatement preparedStatement = null;
        List<Map<String, String>> results = new ArrayList<>();
        try {
            preparedStatement = mysql_connection.prepareStatement(sql);
            preparedStatement.setString(1, rawsystemno);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Map<String, String> tagpropert = new HashMap<String, String>();
                tagpropert.put("id", resultSet.getString("id"));
                tagpropert.put("tag", resultSet.getString("tag"));
                tagpropert.put("cn", resultSet.getString("cn"));
                tagpropert.put("hhighlimit", resultSet.getString("hhighlimit"));
                tagpropert.put("highlimit", resultSet.getString("highlimit"));
                tagpropert.put("llowlimit", resultSet.getString("llowlimit"));
                tagpropert.put("lowlimit", resultSet.getString("lowlimit"));
                tagpropert.put("changerate", resultSet.getString("changerate"));
                tagpropert.put("device", resultSet.getString("device"));
                tagpropert.put("type", resultSet.getString("type"));
                tagpropert.put("alarmmonitor", resultSet.getString("alarmmonitor"));
                tagpropert.put("isaudio", resultSet.getString("isaudio"));
                tagpropert.put("isalarm", resultSet.getString("isalarm"));
                tagpropert.put("topic", resultSet.getString("topic"));
                tagpropert.put("alarm_mode", resultSet.getString("alarm_mode"));
                results.add(tagpropert);
            }
            return results;
//            processMgr.setCurrent_raw_operate(operatehistories);
        } catch (SQLException e) {
            logger.error(e);

        } finally {
            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e);
                }
            }

            if (preparedStatement != null) {

                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            try {
                if (mysql_connection != null) {
                    mysql_connection.close();
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        return null;
    }


}
