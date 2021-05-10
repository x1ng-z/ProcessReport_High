package DAO;

import Model.*;
import ToolUnits.DatesUtil;
import ToolUnits.Tools;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.json.JsonArray;
import javax.json.JsonObject;
import java.math.BigDecimal;
import java.sql.*;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;


public class OracleMESdb_Access_Data {
    private static Logger logger = Logger.getLogger(OracleMESdb_Access_Data.class);

    public static void get_Raw_02Fineness(Connection oracle_connection, Map<String, Firm> firmmapping) {
        String sql = "select QAB_FIRM, QAB_FIXING, \"0.2细度\" from QF_ANALY_BASE2 where QAS_SETDATE=?";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = oracle_connection.prepareStatement(sql);
            preparedStatement.setString(1, Tools.get_nowHour());//
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String firmid = resultSet.getString("QAB_FIRM");
                String rawsystemid = resultSet.getString("QAB_FIXING");
                String pru02 = resultSet.getString(3);
                double raw02fineness = 0d;
                try {
                    raw02fineness = Double.parseDouble(pru02 == null ? "-1" : pru02);
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                }

                for (DefaultProductline defaultProductline : firmmapping.get(firmid).getProductlinemapping().values()) {

                    if (defaultProductline.getRawSystemmapping().containsKey(rawsystemid)) {
                        if (raw02fineness != -1d) {
                            defaultProductline.getRawSystemmapping().get(rawsystemid).setRaw02Fineness(raw02fineness);
                        }

                    }

                }


            }
        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Raw_02Fineness");
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (resultSet != null) {

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }

            if (oracle_connection != null) {
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables.getMessage(), throwables);
                }
            }

        }


    }


    public static void get_Raw_monthyield(Connection oracle_connection, RawSystem rawsystem) {

        java.util.Date beginDayOfMonth = DatesUtil.getBeginDayOfMonth();
        java.util.Date endDayOfMonth = DatesUtil.getEndDayOfMonth();

        SimpleDateFormat formatmonth = new SimpleDateFormat("yyyy-MM-dd");
        String begintime = formatmonth.format(beginDayOfMonth) + " 00:00:00";
        String endtime = formatmonth.format(endDayOfMonth) + " 00:00:00";

        SimpleDateFormat formattime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        java.util.Date begin = null;

        java.util.Date end = null;
        try {
            begin = formattime.parse(begintime);
            end = formattime.parse(endtime);
        } catch (ParseException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Raw_monthyield");
        }

        String sql = "select DAE_SETDATE, AOY_SUMYIELDMON from AT_OUTPUT_BASE2 where DAE_SETDATE>=? and DAE_SETDATE<=? and DAE_DEVICE=?";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = oracle_connection.prepareStatement(sql);
            preparedStatement.setDate(1, new java.sql.Date(begin.getTime()));
            preparedStatement.setDate(2, new java.sql.Date(end.getTime()));
            preparedStatement.setString(3, rawsystem.getRawsystem_id());
            resultSet = preparedStatement.executeQuery();
            double rawsystem_month_total = 0d;
            double rawsytem_day = 0d;

            Date yesterday = new java.sql.Date(Tools.get_yesterday().getTime());

            while (resultSet.next()) {
//                Date date=resultSet.getDate(1);
//                String firmid=resultSet.getString("DAE_FIRM");
//                String rawsystemid=resultSet.getString("DAE_DEVICE");
                double rawyeild = resultSet.getDouble("AOY_SUMYIELDMON");
                Date date = resultSet.getDate("DAE_SETDATE");
                if (date.equals(yesterday)) {
                    rawsytem_day = rawyeild;
                }

                rawsystem_month_total += rawyeild;
//                String productlineid=resultSet.getString("DAE_LINE");
//                firmmaping.get(firmid).getProductlinemapping().get(productlineid).getRawSystemmapping().get(rawsystemid).setRawdayyeild(rawyeild);

            }

            BigDecimal bigtotal = new BigDecimal(rawsystem_month_total);
            rawsystem_month_total = bigtotal.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
            rawsystem.setRawmonthyeild(rawsystem_month_total);
            rawsystem.setRawdayyeild(rawsytem_day);

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Raw_monthyield");
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (resultSet != null) {

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }

            if (oracle_connection != null) {
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables.getMessage(), throwables);
                }

            }


        }


    }


    public static void get_Raw_yield(Map<String, Firm> firmmaping) {
        for (Firm firm : firmmaping.values()) {
            Map<String, DefaultProductline> productlinemapping = firm.getProductlinemapping();
            for (DefaultProductline defaultProductline : productlinemapping.values()) {
                for (RawSystem rawSystem : defaultProductline.getRawSystemmapping().values()) {
                    get_Raw_monthyield(OracleMESDB.get212Connection(), rawSystem);
                }
            }
        }

    }


    /**
     * processcode 102生料 104回转窑
     */
    public static List<Map<String, String>> get_process_yield(Connection oracleconn211, String processcode) {


        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime yesterday = now.minusDays(1);
        LocalDateTime monthbegin = yesterday.with(TemporalAdjusters.firstDayOfMonth());
//        System.out.println(dateTimeFormatter.format(yesterday));
//        System.out.println(dateTimeFormatter.format(monthbegin));
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        List<Map<String, String>> results = new ArrayList();

        String sql = "Select pbf_name,Dae_Firm, Case " +
                "When Dae_Line='0001E110000000000EYU' Then '1001G110000000000NK2' " +
                "When Dae_Line='0001E110000000000EYV' Then '1001G110000000000NK4' " +
                "When Dae_Line='0001E110000000000EYW' Then '1001G110000000000NK5' " +
                "Else Dae_Line End As Dae_Line, " +
                "pcl_name, " +
                "Sum(Case When Dae_Setdate = To_Date(?, 'yyyy-mm-dd') Then Dae_Count Else 0 End) As Aoy_Sumyield, " +
                "Sum(Dae_Count) As Aoy_Sumyieldmon " +
                "From Dw_At_Data " +
                "Left Join Pb_Basic_Firm " +
                "On Dae_Firm = Pbf_Id " +
                "Left Join Pb_Code_Line " +
                "On Dae_Line = Pcl_Id " +
                "Where Dae_Origin = '102' " +
                "And Dae_Type = '103' " +
                "And Dae_Relation = ? " +//102生料 104回转窑
                "And Dae_Status = '1' " +
                "And Dae_Setdate >= To_Date(?, 'yyyy-mm-dd') " +
                "And Dae_Setdate <= To_Date(?, 'yyyy-mm-dd') " +
                "Group By pbf_name,Dae_Firm,Dae_Line,pcl_name " +
                "Order By Dae_Firm,Dae_Line ";

        try {
            preparedStatement = oracleconn211.prepareStatement(sql);
            preparedStatement.setString(1, dateTimeFormatter.format(yesterday));
            preparedStatement.setString(2, processcode);
            preparedStatement.setString(3, dateTimeFormatter.format(monthbegin));
            preparedStatement.setString(4, dateTimeFormatter.format(yesterday));

            resultSet = preparedStatement.executeQuery();


            while (resultSet.next()) {
                String pkproductline = resultSet.getString("DAE_LINE");
                String pkfirm = resultSet.getString("DAE_FIRM");

                double dayyeild = resultSet.getDouble("AOY_SUMYIELD");

                double monyield = resultSet.getDouble("AOY_SUMYIELDMON");
                Map<String, String> batchdata = new HashMap<String, String>();
                batchdata.put("pkproductline", pkproductline);
                batchdata.put("pkfirm", pkfirm);
                batchdata.put("dayyeild", dayyeild + "");
                batchdata.put("monyield", monyield + "");
                results.add(batchdata);
            }


        } catch (SQLException throwables) {
            logger.error(throwables.getMessage(), throwables);
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    logger.error(e.getMessage(), e);
                }
            }

            if (resultSet != null) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    logger.error(e.getMessage(), e);
                }
            }

            if (oracleconn211 != null) {
                try {
                    oracleconn211.close();
                } catch (SQLException e) {
                    logger.error(e.getMessage(), e);
                }

            }
        }

        return results;


    }


    public static void fill_Fired_yield(Map<String, Firm> firmmaping) {
        List<Map<String, String>> plfiredyeildlist = get_process_yield(OracleMESDB.get211Connection(), "104");

        for (Map<String, String> nobatch : plfiredyeildlist) {

            String pkproductline = nobatch.get("pkproductline");
            String pkfirm = nobatch.get("pkfirm");
            String dayyeild = nobatch.get("dayyeild");
            String monyield = nobatch.get("monyield");

            for (Firm firm : firmmaping.values()) {
                if (firm.getFirmid().equals(pkfirm)) {
                    Map<String, DefaultProductline> productlinemapping = firm.getProductlinemapping();
                    for (DefaultProductline defaultProductline : productlinemapping.values()) {
                        if (defaultProductline.getProductline_newid().equals(pkproductline)) {
                            for (Map.Entry<String, FiredSystem> entry : defaultProductline.getFiredSystemmapping().entrySet()) {
                                entry.getValue().setDay_output(Double.valueOf(dayyeild));
                                entry.getValue().setMonth_output(Double.valueOf(monyield));
                                break;
                            }
                            break;
                        }
                    }
                    firm.setIsupdate(true);
                    break;
                }
            }
        }

        for (Firm firm : firmmaping.values()) {
                Map<String, DefaultProductline> productlinemapping = firm.getProductlinemapping();
                for (DefaultProductline defaultProductline : productlinemapping.values()) {
                    if(!firm.isIsupdate()){
                        for (Map.Entry<String, FiredSystem> entry : defaultProductline.getFiredSystemmapping().entrySet()) {
                            entry.getValue().setDay_output(0d);
                            entry.getValue().setMonth_output(0d);
                        }
                    }
                }
            firm.setIsupdate(false);
        }
    }


    public static void get_simpledata_newst28daystrange(Connection oracle_connection, Quality_data quality_data) {
//        Tools.get_nowDay();
        String sql = "select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from (select* from hfpf_analy_ripe where \"抗压28\" is not null  order by HAR_PRODUDATE desc) where ROWNUM<=30";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        List<String> phar_analy = new ArrayList<String>();
        List<String> phar_produdate = new ArrayList<String>();
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


        try {
            preparedStatement = oracle_connection.prepareStatement(sql);
//            preparedStatement.setDate(1,new java.sql.Date(Tools.get_yesterday().getTime()));
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String har_produdate = resultSet.getString("HAR_PRODUDATE");
                String har_analy = resultSet.getString("HAR_ANALY");
                String loss = resultSet.getString("LOSS");
                String sio2 = resultSet.getString("SIO2");
                String al2O3 = resultSet.getString("AL2O3");
                String fe2O3 = resultSet.getString("FE2O3");
                String cao = resultSet.getString("CAO");
                String mgo = resultSet.getString("MGO");
                String fcao = resultSet.getString("FCAO");
                String kh = resultSet.getString("KH");
                String kh1 = resultSet.getString("KH1");
                String n = resultSet.getString("N");
                String p = resultSet.getString("P");
                String c3S = resultSet.getString("C3S");
                String c2S = resultSet.getString("C2S");
                String c3A = resultSet.getString("C3A");
                String c4AF = resultSet.getString("C4AF");
                String pr = resultSet.getString(18);

                phar_analy.add(har_analy);
                phar_produdate.add(har_produdate);
                ploss.add(Double.parseDouble(loss));
                psio2.add(Double.parseDouble(sio2));
                pal2o3.add(Double.parseDouble(al2O3));
                pfe2o3.add(Double.parseDouble(fe2O3));
                pcao.add(Double.parseDouble(cao));
                pmgo.add(Double.parseDouble(mgo));
                pfcao.add(Double.parseDouble(fcao));
                pkh.add(Double.parseDouble(kh));
                pkh1.add(Double.parseDouble(kh1));
                pn.add(Double.parseDouble(n));
                pp.add(Double.parseDouble(p));
                pc3s.add(Double.parseDouble(c3S));
                pc2s.add(Double.parseDouble(c2S));
                pc3a.add(Double.parseDouble(c3A));
                pc4af.add(Double.parseDouble(c4AF));
                pcompressive_pressure28.add(Double.parseDouble(pr));

            }

            quality_data.setAl2o3(pal2o3);
            quality_data.setHar_produdate(phar_produdate);
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
//            quality_data.setAl2o3(pal2o3);

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_simpledata_newst28daystrange");
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (resultSet != null) {

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (oracle_connection != null) {
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }
        }


    }


    public static void get_newstquality_Pending_prediction(Connection oracle_connection, Quality_data quality_data) {
//        Tools.get_nowDay();
        String sql = "select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from (select* from hfpf_analy_ripe   order by HAR_PRODUDATE desc) where ROWNUM<=1";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

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


        try {
            preparedStatement = oracle_connection.prepareStatement(sql);
//            preparedStatement.setString(1,T);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {

                String har_produdate = resultSet.getString("HAR_PRODUDATE");
                String har_analy = resultSet.getString("HAR_ANALY");
                String loss = resultSet.getString("LOSS");
                String sio2 = resultSet.getString("SIO2");
                String al2O3 = resultSet.getString("AL2O3");
                String fe2O3 = resultSet.getString("FE2O3");
                String cao = resultSet.getString("CAO");
                String mgo = resultSet.getString("MGO");
                String fcao = resultSet.getString("FCAO");
                String kh = resultSet.getString("KH");
                String kh1 = resultSet.getString("KH1");
                String n = resultSet.getString("N");
                String p = resultSet.getString("P");
                String c3S = resultSet.getString("C3S");
                String c2S = resultSet.getString("C2S");
                String c3A = resultSet.getString("C3A");
                String c4AF = resultSet.getString("C4AF");
                String pr = resultSet.getString(18);

                phar_produdate.add(har_produdate);
                phar_analy.add(har_analy);
                ploss.add(Double.parseDouble(loss));
                psio2.add(Double.parseDouble(sio2));
                pal2o3.add(Double.parseDouble(al2O3));
                pfe2o3.add(Double.parseDouble(fe2O3));
                pcao.add(Double.parseDouble(cao));
                pmgo.add(Double.parseDouble(mgo));
                pfcao.add(Double.parseDouble(fcao));
                pkh.add(Double.parseDouble(kh));
                pkh1.add(Double.parseDouble(kh1));
                pn.add(Double.parseDouble(n));
                pp.add(Double.parseDouble(p));
                pc3s.add(Double.parseDouble(c3S));
                pc2s.add(Double.parseDouble(c2S));
                pc3a.add(Double.parseDouble(c3A));
                pc4af.add(Double.parseDouble(c4AF));
                pcompressive_pressure28.add(Double.parseDouble(pr == null ? "0" : pr));

            }

            quality_data.setHar_produdate(phar_produdate);
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
//            quality_data.setAl2o3(pal2o3);

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_newstquality_Pending_prediction");
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (resultSet != null) {

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (oracle_connection != null) {
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }


    }


    public static void get_historyst_quality(Connection oracle_connection, Quality_data quality_data, String nonullltime) {
//        Tools.get_nowDay();
        String sql = "select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from  hfpf_analy_ripe  where HAR_PRODUDATE=?";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

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


        try {
            preparedStatement = oracle_connection.prepareStatement(sql);
            preparedStatement.setString(1, nonullltime);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {

                String har_produdate = resultSet.getString("HAR_PRODUDATE");
                String har_analy = resultSet.getString("HAR_ANALY");
                String loss = resultSet.getString("LOSS");
                String sio2 = resultSet.getString("SIO2");
                String al2O3 = resultSet.getString("AL2O3");
                String fe2O3 = resultSet.getString("FE2O3");
                String cao = resultSet.getString("CAO");
                String mgo = resultSet.getString("MGO");
                String fcao = resultSet.getString("FCAO");
                String kh = resultSet.getString("KH");
                String kh1 = resultSet.getString("KH1");
                String n = resultSet.getString("N");
                String p = resultSet.getString("P");
                String c3S = resultSet.getString("C3S");
                String c2S = resultSet.getString("C2S");
                String c3A = resultSet.getString("C3A");
                String c4AF = resultSet.getString("C4AF");
                String pr = resultSet.getString(18);

                phar_produdate.add(har_produdate);
                phar_analy.add(har_analy);
                ploss.add(Double.parseDouble(loss));
                psio2.add(Double.parseDouble(sio2));
                pal2o3.add(Double.parseDouble(al2O3));
                pfe2o3.add(Double.parseDouble(fe2O3));
                pcao.add(Double.parseDouble(cao));
                pmgo.add(Double.parseDouble(mgo));
                pfcao.add(Double.parseDouble(fcao));
                pkh.add(Double.parseDouble(kh));
                pkh1.add(Double.parseDouble(kh1));
                pn.add(Double.parseDouble(n));
                pp.add(Double.parseDouble(p));
                pc3s.add(Double.parseDouble(c3S));
                pc2s.add(Double.parseDouble(c2S));
                pc3a.add(Double.parseDouble(c3A));
                pc4af.add(Double.parseDouble(c4AF));
                pcompressive_pressure28.add(Double.parseDouble(pr == null ? "0" : pr));

            }

            quality_data.setAl2o3(pal2o3);
            quality_data.setHar_produdate(phar_produdate);
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
//            quality_data.setAl2o3(pal2o3);

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_historyst_quality");
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (resultSet != null) {

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (oracle_connection != null) {
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }


    }


    public static void get_simple_historyst_quality(Connection oracle_connection, Quality_data quality_data, String start, String end) {
//        Tools.get_nowDay();
        String sql = "select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from  hfpf_analy_ripe  where HAR_PRODUDATE>=? and HAR_PRODUDATE<=?";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

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


        try {
            preparedStatement = oracle_connection.prepareStatement(sql);
            preparedStatement.setString(1, start);
            preparedStatement.setString(2, end);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {

                String har_produdate = resultSet.getString("HAR_PRODUDATE");
                String har_analy = resultSet.getString("HAR_ANALY");
                String loss = resultSet.getString("LOSS");
                String sio2 = resultSet.getString("SIO2");
                String al2O3 = resultSet.getString("AL2O3");
                String fe2O3 = resultSet.getString("FE2O3");
                String cao = resultSet.getString("CAO");
                String mgo = resultSet.getString("MGO");
                String fcao = resultSet.getString("FCAO");
                String kh = resultSet.getString("KH");
                String kh1 = resultSet.getString("KH1");
                String n = resultSet.getString("N");
                String p = resultSet.getString("P");
                String c3S = resultSet.getString("C3S");
                String c2S = resultSet.getString("C2S");
                String c3A = resultSet.getString("C3A");
                String c4AF = resultSet.getString("C4AF");
                String pr = resultSet.getString(18);

                phar_produdate.add(har_produdate);
                phar_analy.add(har_analy);
                ploss.add(Double.parseDouble(loss));
                psio2.add(Double.parseDouble(sio2));
                pal2o3.add(Double.parseDouble(al2O3));
                pfe2o3.add(Double.parseDouble(fe2O3));
                pcao.add(Double.parseDouble(cao));
                pmgo.add(Double.parseDouble(mgo));
                pfcao.add(Double.parseDouble(fcao));
                pkh.add(Double.parseDouble(kh));
                pkh1.add(Double.parseDouble(kh1));
                pn.add(Double.parseDouble(n));
                pp.add(Double.parseDouble(p));
                pc3s.add(Double.parseDouble(c3S));
                pc2s.add(Double.parseDouble(c2S));
                pc3a.add(Double.parseDouble(c3A));
                pc4af.add(Double.parseDouble(c4AF));
                pcompressive_pressure28.add(Double.parseDouble(pr == null ? "0" : pr));

            }

            quality_data.setAl2o3(pal2o3);
            quality_data.setHar_produdate(phar_produdate);
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
//            quality_data.setAl2o3(pal2o3);

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_simple_historyst_quality");
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (resultSet != null) {

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (oracle_connection != null) {
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }


    }

    public static Map<String, Double> get_Pending_fillinto_Mysql_28Strong(Connection oracle_connection, List<String> date) {
//        Tools.get_nowDay();
        String sql = "select HAR_PRODUDATE,\"抗压28\" from  hfpf_analy_ripe  where HAR_PRODUDATE in(?,?,?,?,?,?,?,?,?,?) and \"抗压28\" is not null order by HAR_PRODUDATE DESC ";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        Map<String, Double> result = new LinkedHashMap<String, Double>();


        try {
            preparedStatement = oracle_connection.prepareStatement(sql);


            for (int index = 1; index <= date.size(); ++index) {

                preparedStatement.setString(index, date.get(index - 1));
//               System.out.println(date.get(index-1));
            }
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {

                String har_produdate = resultSet.getString("HAR_PRODUDATE");
                String pr = resultSet.getString(2);

                result.put(har_produdate, Double.valueOf(pr));

            }
            return result;

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Pending_fillinto_Mysql_28Strong");
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if (resultSet != null) {

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }

            if (oracle_connection != null) {
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }
        return null;


    }


    public static JSONObject getFiredSystemClAndCr(Firm firm, String startdate, String endate) {


        long starttime=System.currentTimeMillis();
        try {
            /**
             * [firmname:xx,data:[uvw:{}....]]
             *                        |
             *                        V
             *                   {detail:[{}],mean:xx}
             * */
            JSONObject result = new JSONObject();

            Map<String, JSONObject> pltext = new HashMap<>();
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONObject plcontext = new JSONObject();
                plcontext.put("detail", new JSONArray());
                plcontext.put("meancl", 0d);
                plcontext.put("meancr", 0d);
                plcontext.put("sizecl", 0);
                plcontext.put("sizecr", 0);

                pltext.put(productline.getProductline_newid(), plcontext);
                result.put("company", productline.getRegionfirm());
            }

            result.put("data", pltext);


            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                logger.warn("mesip=" + mesip + " can't connect");
                return result;
            }


            String sql = "SELECT har_analy,HAR_FIXING ,add_name, " +
                    "CASE WHEN har_proline='0001E110000000000EYU' THEN '1001G110000000000NK2' " +
                    "  WHEN har_proline='0001E110000000000EYV' THEN '1001G110000000000NK4' " +
                    "  WHEN har_proline='0001E110000000000EYW' THEN '1001G110000000000NK5'  " +
                    " else har_proline "+
                    "  END AS har_proline, " +
                    "HAR_PRODUDATE ,har_firm,har_temp12,har_temp56,HAR_Temp11 FROM ytsoft65.HF_ANALY_RIPE har  " +
                    "LEFT JOIN  ytsoft65.AT_DEVICE_DETAIL add2 ON HAR_FIXING=add_id " +
                    "WHERE to_date(HAR_PRODUDATE,'yyyy-mm-dd') >=TO_DATE(?,'yyyy-mm-dd') " +
                    "And to_date(HAR_PRODUDATE,'yyyy-mm-dd') <=TO_DATE(?,'yyyy-mm-dd')  " +
                    "Order By har_produdate,add_name";
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String har_analy = resultSet.getString("har_analy");
                    String HAR_FIXING = resultSet.getString("HAR_FIXING");
                    String add_name = resultSet.getString("add_name");
                    String har_proline = resultSet.getString("har_proline");
                    String HAR_PRODUDATE = resultSet.getString("HAR_PRODUDATE");
                    String har_firm = resultSet.getString("har_firm");
                    Double har_temp12 = resultSet.getDouble("har_temp12");//氯离子
                    Double har_temp56 = resultSet.getDouble("har_temp56");//六价铬
                    Double HAR_Temp11 = resultSet.getDouble("HAR_Temp11");//碱含量

                    if (har_proline == null) {
                        continue;
                    }


                    //{detail:[{}],mean:xx,qulified:XX}
                    JSONObject rowplcontext = pltext.get(har_proline);

                    JSONArray detaildata = (JSONArray) rowplcontext.get("detail");
                    if (detaildata != null) {
                        JSONObject row = new JSONObject();
                        row.put("har_analy", har_analy);
                        row.put("HAR_FIXING", HAR_FIXING);
                        row.put("add_name", add_name);
                        row.put("har_proline", har_proline);
                        row.put("HAR_PRODUDATE", HAR_PRODUDATE);
                        row.put("har_firm", har_firm);
                        row.put("har_temp12", har_temp12);
                        row.put("har_temp56", har_temp56);
                        row.put("HAR_Temp11", HAR_Temp11);
                        detaildata.put(row);
                        if (har_temp12 != null && har_temp12 != 0) {
                            rowplcontext.put("meancl", (double) rowplcontext.get("meancl") + har_temp12);
                            rowplcontext.put("sizecl", (int) rowplcontext.get("sizecl") + 1);
                        }
                        if (har_temp56 != null && har_temp56 != 0) {
                            rowplcontext.put("meancr", (double) rowplcontext.get("meancr") + har_temp56);
                            rowplcontext.put("sizecr", (int) rowplcontext.get("sizecr") + 1);
                        }

                    }

                }

                for (JSONObject jsonObject : pltext.values()) {
                    jsonObject.put("meancl", (double) jsonObject.get("meancl") / (((int) jsonObject.get("sizecl")) + 0.00000001));
                    jsonObject.put("meancr", (double) jsonObject.get("meancr") / (((int) jsonObject.get("sizecr")) + 0.00000001));
                }


            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {

            logger.debug(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));

        }
    }


    public static JSONObject getCCqua(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{plno:产线号1,data:[{class:品种1,data:{}}，..]}，{plno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }



            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }


            String sql2="Select paw_analy,paw_outdate As paw_produdate,paw_Intensity,pcm_name, " +
                    "CASE WHEN paw_temp24='0001E110000000000EYU' THEN '1001G110000000000NK2' " +
                    "  WHEN paw_temp24='0001E110000000000EYV' THEN '1001G110000000000NK4' " +
                    "  WHEN paw_temp24='0001E110000000000EYW' THEN '1001G110000000000NK5'  else paw_temp24 " +
                    "  END AS paw_temp24,paw_Temp55,paw_Temp56,paw_Temp60,paw_Temp2,paw_Surfacearea,paw_Temp19 " +
                    "from ytsoft65.pf_analy_outwork a " +
                    "Left Join  ytsoft65.pb_code_material c On a.PAW_Intensity=c.pcm_id  " +
                    "Where paw_del='0' " +
                    "And to_date(paw_outdate,'yyyy-mm-dd')>=to_date(?,'yyyy-mm-dd')-1 " +
                    "And to_date(paw_outdate,'yyyy-mm-dd')<=to_date(?,'yyyy-mm-dd')-1 " +
                    "Order By paw_outdate,pcm_name";
//            String sql ="Select paw_analy,paw_outdate As paw_produdate,paw_Intensity,pcm_name,  " +
//                    "CASE WHEN paw_temp24='0001E110000000000EYU' THEN '1001G110000000000NK2'  " +
//                    "  WHEN paw_temp24='0001E110000000000EYV' THEN '1001G110000000000NK4'  " +
//                    "  WHEN paw_temp24='0001E110000000000EYW' THEN '1001G110000000000NK5'   " +
//                    "  END AS paw_temp24,paw_Temp55,paw_Temp56,paw_Temp60,paw_Temp2,paw_Surfacearea,paw_Temp19  " +
//                    "from ytsoft65.pf_analy_outwork a  " +
//                    "Left Join  ytsoft65.pb_code_material c On a.PAW_Intensity=c.pcm_id   " +
//                    "Where paw_del='0'  " +
//                    "And to_date(paw_outdate,'yyyy-mm-dd')>=to_date(?,'yyyy-mm-dd')-1  " +
//                    "And to_date(paw_outdate,'yyyy-mm-dd')<=to_date(?,'yyyy-mm-dd')-1  " +
//                    "Order By paw_outdate,pcm_name";
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql2);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(4);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    /**品种*/
                    String pcm_name = resultSet.getString("pcm_name");
                    /**生产线id*/
                    String paw_temp24 = resultSet.getString("paw_temp24");

                    String PAW_PRODUDATE = resultSet.getString("PAW_PRODUDATE");
                    /**3d*/
                    Double PAW_TEMP55 = resultSet.getDouble("PAW_TEMP55");
                    /**28d*/
                    Double PAW_TEMP56 = resultSet.getDouble("PAW_TEMP56");

                    /**so3*/
                    Double PAW_TEMP60 = resultSet.getDouble("PAW_TEMP60");
                    /**loss*/
                    Double PAW_TEMP2 = resultSet.getDouble("PAW_TEMP2");

                    /**surfacearea*/
                    Double PAW_SURFACEAREA = resultSet.getDouble("PAW_SURFACEAREA");
                    /**45fine*/
                    Double PAW_TEMP19 = resultSet.getDouble("PAW_TEMP19");

                    JSONObject row = new JSONObject();
                    row.put("pcm_name", pcm_name);
                    row.put("paw_temp24", paw_temp24);
                    row.put("PAW_PRODUDATE", PAW_PRODUDATE);
                    row.put("PAW_TEMP55", PAW_TEMP55);
                    row.put("PAW_TEMP56", PAW_TEMP56);

                    row.put("PAW_TEMP60", PAW_TEMP60);
                    row.put("PAW_TEMP2", PAW_TEMP2);

                    row.put("PAW_SURFACEAREA", PAW_SURFACEAREA);
                    row.put("PAW_TEMP19", PAW_TEMP19);

                    if(pcm_name!=null&&paw_temp24!=null){
                        pltext.put(row);
                    }
                }


                /**key1=plno,key2=cementclass*/
                Map<String, Map<String, JSONArray>> devicecementclass = new HashMap<>();

                /**按照pl号分类数据*/
                //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息
                    String plid = jsonObject.getString("paw_temp24");//磨机号
                    String pcm_name = jsonObject.getString("pcm_name");//水泥品种
                    //                logger.info("i="+i+" "+deviceid+pcm_name);
                    //                i++;
                    Map<String, JSONArray> cementclassnext = devicecementclass.get(plid);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new HashMap<String, JSONArray>();
                        devicecementclass.put(plid, cementclassnext);

                        JSONArray corerowcontext = new JSONArray();
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    } else {
                        JSONArray corerowcontext = cementclassnext.get(pcm_name);
                        if (corerowcontext == null) {
                            corerowcontext = new JSONArray();
                        }
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
                 *                                                            |
                 *                                                            V
                 *                                                        {detail:[{}],mean:xx}
                 * */


                JSONArray firmdata = result.getJSONArray("data");


                for (Map.Entry<String, Map<String, JSONArray>> entrycemntclass : devicecementclass.entrySet()) {

                    String deviceno = entrycemntclass.getKey();
                    Map<String, JSONArray> cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("plno", deviceno);
                    JSONArray cementcontext = new JSONArray();
                    devicelayer.put("data", cementcontext);
                    firmdata.put(devicelayer);





                    for (Map.Entry<String, JSONArray> entrycementclazz : cementclass.entrySet()) {
                        double mean3d = 0;
                        double mean28d = 0;

                        double meanso3 = 0;
                        double meanloss= 0;

                        double meansurfacearea = 0;
                        double mean45fine = 0;

                        double size3d = 0;
                        double size28d = 0;

                        double sizeso3 = 0;
                        double sizeloss = 0;

                        double sizesurfacearea = 0;
                        double size45fine = 0;
                        /**水泥品种层*/
                        JSONObject cementclasslayer = new JSONObject();
                        cementcontext.put(cementclasslayer);

                        JSONArray detailconetxt = entrycementclazz.getValue();
                        String ceclass = entrycementclazz.getKey();
                        cementclasslayer.put("class", ceclass);
                        cementclasslayer.put("detail", detailconetxt);

                        for (Object corecontext : detailconetxt) {
                            JSONObject subdetail = (JSONObject) corecontext;



//                            row.put("PAW_TEMP55", PAW_TEMP55);
//                            row.put("PAW_TEMP56", PAW_TEMP56);
//
//                            row.put("PAW_TEMP60", PAW_TEMP60);
//                            row.put("PAW_TEMP2", PAW_TEMP2);
//
//                            row.put("PAW_SURFACEAREA", PAW_SURFACEAREA);
//                            row.put("PAW_TEMP19", PAW_TEMP19);


                            mean3d += subdetail.getDouble("PAW_TEMP55");
                            mean28d += subdetail.getDouble("PAW_TEMP56");

                            meanso3 += subdetail.getDouble("PAW_TEMP60");
                            meanloss += subdetail.getDouble("PAW_TEMP2");


                            meansurfacearea += subdetail.getDouble("PAW_SURFACEAREA");
                            mean45fine += subdetail.getDouble("PAW_TEMP19");



                            if (subdetail.getDouble("PAW_TEMP55") > 0) {
                                size3d++;
                            }

                            if (subdetail.getDouble("PAW_TEMP56") > 0) {
                                size28d++;
                            }

                            if (subdetail.getDouble("PAW_TEMP60") > 0) {
                                sizeso3++;
                            }

                            if (subdetail.getDouble("PAW_TEMP2") > 0) {
                                sizeloss++;
                            }


                            if (subdetail.getDouble("PAW_SURFACEAREA") > 0) {
                                sizesurfacearea++;
                            }

                            if (subdetail.getDouble("PAW_TEMP19") > 0) {
                                size45fine++;
                            }
                        }
                        cementclasslayer.put("mean3d",mean3d/(size3d+0.00000000001));
                        cementclasslayer.put("mean28d",mean28d/(size28d+0.00000000001));
                        cementclasslayer.put("meanso3",meanso3/(sizeso3+0.00000000001));
                        cementclasslayer.put("meanloss",meanloss/(sizeloss+0.00000000001));
                        cementclasslayer.put("meansurfacearea",meansurfacearea/(meansurfacearea+0.00000000001));
                        cementclasslayer.put("mean45fine",mean45fine/(mean45fine+0.00000000001));

                    }

                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));
        }
    }





    public static JSONObject getCemntpoutSystemClAndCr(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{plno:产线号1,data:[{class:品种1,data:{}}，..]}，{plno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }



            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }

            String sql ="Select paw_analy,PAW_OutDate,PAW_Intensity,pcm_name, " +
                    "CASE WHEN paw_temp24='0001E110000000000EYU' THEN '1001G110000000000NK2' " +
                    "  WHEN paw_temp24='0001E110000000000EYV' THEN '1001G110000000000NK4' " +
                    "  WHEN paw_temp24='0001E110000000000EYW' THEN '1001G110000000000NK5'  " +
                    " else paw_temp24 "+
                    "  END AS paw_temp24,PAW_Temp21,PAW_Temp68,PAW_Temp61  " +
                    "from  ytsoft65.pf_analy_outwork a " +
                    "Left Join  ytsoft65.pb_code_material c On a.PAW_Intensity=c.pcm_id  " +
                    "Where paw_del='0' " +
                    "And to_date(paw_MoldDate,'yyyy-mm-dd')>=to_date(?,'yyyy-mm-dd')-1  " +
                    "And to_date(paw_MoldDate,'yyyy-mm-dd')<=to_date(?,'yyyy-mm-dd')-1 " +
                    "Order By paw_MoldDate,pcm_name";
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(4);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    /**品种*/
                    String pcm_name = resultSet.getString("pcm_name");
                    /**生产线id*/
                    String paw_temp24 = resultSet.getString("paw_temp24");
                    /**氯离子*/
                    Double PAW_Temp21 = resultSet.getDouble("PAW_Temp21");
                    /**六价铬*/
                    Double PAW_Temp68 = resultSet.getDouble("PAW_Temp68");

                    String PAW_Temp61 = resultSet.getString("PAW_Temp61");

                    String PAW_OutDate = resultSet.getString("PAW_OutDate");


                    JSONObject row = new JSONObject();
                    row.put("pcm_name", pcm_name);
                    row.put("paw_temp24", paw_temp24);
                    row.put("PAW_Temp21", PAW_Temp21);
                    row.put("PAW_Temp68", PAW_Temp68);
                    row.put("PAW_Temp61", PAW_Temp61);
                    row.put("PAW_OutDate", PAW_OutDate);
                    if(pcm_name!=null&&paw_temp24!=null){
                        pltext.put(row);
                    }
                }


                /**key1=plno,key2=cementclass*/
                Map<String, Map<String, JSONArray>> devicecementclass = new HashMap<>();

                /**按照pl号分类数据*/
                //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息
                    String plid = jsonObject.getString("paw_temp24");//磨机号
                    String pcm_name = jsonObject.getString("pcm_name");//水泥品种
                    //                logger.info("i="+i+" "+deviceid+pcm_name);
                    //                i++;
                    Map<String, JSONArray> cementclassnext = devicecementclass.get(plid);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new HashMap<String, JSONArray>();
                        devicecementclass.put(plid, cementclassnext);

                        JSONArray corerowcontext = new JSONArray();
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    } else {
                        JSONArray corerowcontext = cementclassnext.get(pcm_name);
                        if (corerowcontext == null) {
                            corerowcontext = new JSONArray();
                        }
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
                 *                                                            |
                 *                                                            V
                 *                                                        {detail:[{}],mean:xx}
                 * */


                JSONArray firmdata = result.getJSONArray("data");


                for (Map.Entry<String, Map<String, JSONArray>> entrycemntclass : devicecementclass.entrySet()) {

                    String deviceno = entrycemntclass.getKey();
                    Map<String, JSONArray> cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("plno", deviceno);
                    JSONArray cementcontext = new JSONArray();
                    devicelayer.put("data", cementcontext);
                    firmdata.put(devicelayer);





                    for (Map.Entry<String, JSONArray> entrycementclazz : cementclass.entrySet()) {
                        double meancl = 0;
                        double meancr = 0;

                        double sizecl = 0;
                        double sizecr = 0;
                        /**水泥品种层*/
                        JSONObject cementclasslayer = new JSONObject();
                        cementcontext.put(cementclasslayer);

                        JSONArray detailconetxt = entrycementclazz.getValue();
                        String ceclass = entrycementclazz.getKey();
                        cementclasslayer.put("class", ceclass);
                        cementclasslayer.put("detail", detailconetxt);

                        for (Object corecontext : detailconetxt) {
                            JSONObject subdetail = (JSONObject) corecontext;
                            meancl += subdetail.getDouble("PAW_Temp21");
                            meancr += subdetail.getDouble("PAW_Temp68");
                            if (subdetail.getDouble("PAW_Temp21") > 0) {
                                sizecl++;
                            }

                            if (subdetail.getDouble("PAW_Temp68") > 0) {
                                sizecr++;
                            }
                        }
                        cementclasslayer.put("meancl",meancl/(sizecl+0.00000000001));
                        cementclasslayer.put("meancr",meancr/(sizecr+0.00000000001));
                    }

                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));
        }
    }





    public static JSONObject getRawFine(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{plno:产线号1,data:[{class:磨机号,data:{}}，..]}，{plno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }



            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }


            String sql2="Select pcl_name,nvl(pcl_newid,pcl_id) as pcl_newid,add_name,SUBSTR(qas_setdate,1,10) as setdate, " +
                    "case when  to_number(substr(qas_setdate,12,2) ) <8 then to_char(to_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') +1,'yyyy-mm-dd hh24:mi:ss') " +
                    "else qas_setdate end as qas_setdate,  " +
                    "qas_temp1 As fine80,qas_temp2 As fine200 " +
                    "from ytsoft65.QF_Analy_Base " +
                    "Left Join ytsoft65.QF_Analy_Swatch On qab_id=qas_base " +
                    "Left Join ytsoft65.at_device_detail On qab_fixing=add_id " +
                    "Left Join ytsoft65.pb_code_line On add_proline=pcl_id " +
                    "Where qab_form='303' " +
                    "And qab_del='0' " +
                    "And qas_del='0' " +
                    "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') >=To_date(?,'yyyy-mm-dd hh24:mi:ss')  " +
                    "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') <To_date(?,'yyyy-mm-dd hh24:mi:ss')  " +
                    "Order By qas_setdate";
//            String sql =
//                    "Select pcl_name,pcl_newid,add_name,SUBSTR(qas_setdate,1,10) as setdate,qas_setdate,  " +
//                    "qas_temp1 As fine80,qas_temp2 As fine200 " +
//                    "from ytsoft65.QF_Analy_Base " +
//                    "Left Join ytsoft65.QF_Analy_Swatch On qab_id=qas_base " +
//                    "Left Join ytsoft65.at_device_detail On qab_fixing=add_id " +
//                    "Left Join ytsoft65.pb_code_line On add_proline=pcl_id " +
//                    "Where qab_form='303' " +
//                    "And qab_del='0' " +
//                    "And qas_del='0' " +
//                    "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') >=To_date(?,'yyyy-mm-dd hh24:mi:ss')  " +
//                    "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') <To_date(?,'yyyy-mm-dd hh24:mi:ss')  " +
//                    "Order By qas_setdate";
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql2);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(4);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    /**生产线id*/
                    String pcl_newid = resultSet.getString("pcl_newid");
                    /**磨机号*/
                    String add_name = resultSet.getString("add_name");
                    /**时间*/
                    String qas_setdate = resultSet.getString("qas_setdate");
                    /**80细度*/
                    Double fine80 = resultSet.getDouble("fine80");
                    /**200细度*/
                    Double fine200 = resultSet.getDouble("fine200");



                    JSONObject row = new JSONObject();
                    row.put("pcl_newid", pcl_newid);
                    row.put("add_name", add_name);
                    row.put("qas_setdate", qas_setdate);
                    row.put("fine80", fine80);
                    row.put("fine200", fine200);
                    if(pcl_newid!=null&&add_name!=null){
                        pltext.put(row);
                    }
                }


                /**key1=plno,key2=磨机号*/
                Map<String, Map<String, JSONArray>> devicecementclass = new HashMap<>();

                /**按照pl号分类数据*/
                //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息
                    String plid = jsonObject.getString("pcl_newid");//产线
                    String pcm_name = jsonObject.getString("add_name");//磨机号

                    Map<String, JSONArray> cementclassnext = devicecementclass.get(plid);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new HashMap<String, JSONArray>();
                        devicecementclass.put(plid, cementclassnext);

                        JSONArray corerowcontext = new JSONArray();
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    } else {
                        JSONArray corerowcontext = cementclassnext.get(pcm_name);
                        if (corerowcontext == null) {
                            corerowcontext = new JSONArray();
                        }
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
                 *                                                            |
                 *                                                            V
                 *                                                        {detail:[{}],mean:xx}
                 * */


                JSONArray firmdata = result.getJSONArray("data");


                for (Map.Entry<String, Map<String, JSONArray>> entrycemntclass : devicecementclass.entrySet()) {

                    String deviceno = entrycemntclass.getKey();
                    Map<String, JSONArray> cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("plno", deviceno);
                    JSONArray cementcontext = new JSONArray();
                    devicelayer.put("data", cementcontext);
                    firmdata.put(devicelayer);




                    for (Map.Entry<String, JSONArray> entrycementclazz : cementclass.entrySet()) {

                        double meancl = 0;
                        double meancr = 0;

                        double sizecl = 0;
                        double sizecr = 0;
                        /**水泥品种层*/
                        JSONObject cementclasslayer = new JSONObject();
                        cementcontext.put(cementclasslayer);

                        JSONArray detailconetxt = entrycementclazz.getValue();
                        String ceclass = entrycementclazz.getKey();
                        cementclasslayer.put("deviceno", ceclass);
                        cementclasslayer.put("detail", detailconetxt);

                        for (Object corecontext : detailconetxt) {
                            JSONObject subdetail = (JSONObject) corecontext;
                            meancl += subdetail.getDouble("fine80");
                            meancr += subdetail.getDouble("fine200");
                            if (subdetail.getDouble("fine80") > 0) {
                                sizecl++;
                            }

                            if (subdetail.getDouble("fine200") > 0) {
                                sizecr++;
                            }
                        }
                        cementclasslayer.put("meanfine80",meancl/(sizecl+0.00000000001));
                        cementclasslayer.put("meanfine200",meancr/(sizecr+0.00000000001));
                    }

                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));
        }
    }



    public static JSONObject getraw3rate(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{plno:产线号1,data:[{class:磨机号,data:{}}，..]}，{plno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }



            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }


            String sql2="Select pcl_name,nvl(pcl_newid,pcl_id) as pcl_newid,add_name,SUBSTR(qas_setdate,1,10) as setdate, " +
                    "case when  to_number(substr(qas_setdate,12,2) ) <8 then to_char(to_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') +1,'yyyy-mm-dd hh24:mi:ss') " +
                    "else qas_setdate end as qas_setdate,  " +
                    "qas_temp20 As kh,qas_temp21 As sm,qas_temp22 As im " +
                    "from ytsoft65.QF_Analy_Base " +
                    "Left Join ytsoft65.QF_Analy_Swatch1 On qab_id=qas_base " +
                    "Left Join ytsoft65.at_device_detail On qab_fixing=add_id " +
                    "Left Join ytsoft65.pb_code_line On add_proline=pcl_id " +
                    "Where qab_form='308' " +
                    "And qab_del='0' " +
                    "And qas_del='0' " +
                    "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') >=To_date(?,'yyyy-mm-dd hh24:mi:ss')  " +
                    "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') <To_date(?,'yyyy-mm-dd hh24:mi:ss')  " +
                    "Order By qas_setdate";

//            String sql =
//                    "Select pcl_name,pcl_newid,add_name,SUBSTR(qas_setdate,1,10) as setdate,qas_setdate,   " +
//                            "qas_temp20 As kh,qas_temp21 As sm,qas_temp22 As im  " +
//                            "from ytsoft65.QF_Analy_Base  " +
//                            "Left Join ytsoft65.QF_Analy_Swatch1 On qab_id=qas_base  " +
//                            "Left Join ytsoft65.at_device_detail On qab_fixing=add_id  " +
//                            "Left Join ytsoft65.pb_code_line On add_proline=pcl_id  " +
//                            "Where qab_form='308'  " +
//                            "And qab_del='0'  " +
//                            "And qas_del='0'  " +
//                            "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') >=To_date(?,'yyyy-mm-dd hh24:mi:ss')   " +
//                            "And To_date(qas_setdate,'yyyy-mm-dd hh24:mi:ss') <To_date(?,'yyyy-mm-dd hh24:mi:ss')   " +
//                            "Order By qas_setdate";
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql2);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(6);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    /**生产线id*/
                    String pcl_newid = resultSet.getString("pcl_newid");
                    /**磨机号*/
                    String add_name = resultSet.getString("add_name");
                    /**时间*/
                    String qas_setdate = resultSet.getString("qas_setdate");
                    /**kh*/
                    Double kh = resultSet.getDouble("kh");
                    /**sm*/
                    Double sm = resultSet.getDouble("sm");
                    /**im*/
                    Double im = resultSet.getDouble("im");




                    JSONObject row = new JSONObject();
                    row.put("pcl_newid", pcl_newid);
                    row.put("add_name", add_name);
                    row.put("qas_setdate", qas_setdate);
                    row.put("kh", kh);
                    row.put("sm", sm);
                    row.put("im", im);
                    if(pcl_newid!=null&&add_name!=null){
                        pltext.put(row);
                    }
                }


                /**key1=plno,key2=磨机号*/
                Map<String, Map<String, JSONArray>> devicecementclass = new HashMap<>();

                /**按照pl号分类数据*/
                //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息
                    String plid = jsonObject.getString("pcl_newid");//产线
                    String pcm_name = jsonObject.getString("add_name");//磨机号

                    Map<String, JSONArray> cementclassnext = devicecementclass.get(plid);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new HashMap<String, JSONArray>();
                        devicecementclass.put(plid, cementclassnext);

                        JSONArray corerowcontext = new JSONArray();
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    } else {
                        JSONArray corerowcontext = cementclassnext.get(pcm_name);
                        if (corerowcontext == null) {
                            corerowcontext = new JSONArray();
                        }
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
                 *                                                            |
                 *                                                            V
                 *                                                        {detail:[{}],mean:xx}
                 * */


                JSONArray firmdata = result.getJSONArray("data");


                for (Map.Entry<String, Map<String, JSONArray>> entrycemntclass : devicecementclass.entrySet()) {

                    String deviceno = entrycemntclass.getKey();
                    Map<String, JSONArray> cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("plno", deviceno);
                    JSONArray cementcontext = new JSONArray();
                    devicelayer.put("data", cementcontext);
                    firmdata.put(devicelayer);




                    for (Map.Entry<String, JSONArray> entrycementclazz : cementclass.entrySet()) {
                        double meankh = 0;
                        double meansm = 0;
                        double meanim = 0;

                        double sizekh = 0;
                        double sizesm = 0;
                        double sizeim = 0;

                        /**水泥品种层*/
                        JSONObject cementclasslayer = new JSONObject();
                        cementcontext.put(cementclasslayer);

                        JSONArray detailconetxt = entrycementclazz.getValue();
                        String ceclass = entrycementclazz.getKey();
                        cementclasslayer.put("deviceno", ceclass);
                        cementclasslayer.put("detail", detailconetxt);

                        for (Object corecontext : detailconetxt) {
                            JSONObject subdetail = (JSONObject) corecontext;
                            meankh += subdetail.getDouble("kh");
                            meansm += subdetail.getDouble("sm");
                            meanim += subdetail.getDouble("im");
                            if (subdetail.getDouble("kh") > 0) {
                                sizekh++;
                            }

                            if (subdetail.getDouble("sm") > 0) {
                                sizesm++;
                            }

                            if (subdetail.getDouble("im") > 0) {
                                sizeim++;
                            }
                        }
                        cementclasslayer.put("meankh",meankh/(sizekh+0.00000000001));
                        cementclasslayer.put("meansm",meansm/(sizesm+0.00000000001));
                        cementclasslayer.put("meanim",meanim/(sizeim+0.00000000001));

                    }

                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));
        }
    }


    public static JSONObject getCMqua(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照线别的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }


//        plcontext.put("detail",new JSONArray());
//        plcontext.put("meancl",0d);
//        plcontext.put("meancr",0d);
//        plcontext.put("sizecl",0);
//        plcontext.put("sizecr",0);
//
//        pltext.put(productline.getProductline_newid(),plcontext);

            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }


            String sql2="Select pao_analy,PAO_MoldDate As pao_produdate,pao_fixing,add_name,PAO_Cement,pcm_name, " +
                    "CASE WHEN pao_temp56='0001E110000000000EYU' THEN '1001G110000000000NK2' " +
                    "  WHEN pao_temp56='0001E110000000000EYV' THEN '1001G110000000000NK4' " +
                    "  WHEN pao_temp56='0001E110000000000EYW' THEN '1001G110000000000NK5' " +
                    "else pao_temp56 " +
                    "  END AS pao_temp56,PAO_Temp54,PAO_Temp55,PAO_Temp67,PAO_Temp68,PAO_Surfacearea,PAO_Temp60 " +
                    "from ytsoft65.pf_analy_outgrind a " +
                    "LEFT JOIN  ytsoft65.AT_DEVICE_DETAIL b ON pao_FIXING=add_id " +
                    "Left Join  ytsoft65.pb_code_material c On a.pao_cement=c.pcm_id  " +
                    "Where pao_del='0' " +
                    "And to_date(PAO_MoldDate,'yyyy-mm-dd')>=to_date(?,'yyyy-mm-dd')-1  " +
                    "And to_date(PAO_MoldDate,'yyyy-mm-dd')<=to_date(?,'yyyy-mm-dd')-1 " +
                    "Order By PAO_MoldDate,pcm_name";

//            String sql = "Select pao_analy,PAO_MoldDate As pao_produdate,pao_fixing,add_name,PAO_Cement,pcm_name, " +
//                    "CASE WHEN pao_temp56='0001E110000000000EYU' THEN '1001G110000000000NK2' " +
//                    "  WHEN pao_temp56='0001E110000000000EYV' THEN '1001G110000000000NK4' " +
//                    "  WHEN pao_temp56='0001E110000000000EYW' THEN '1001G110000000000NK5'  " +
//                    "  END AS pao_temp56,PAO_Temp54,PAO_Temp55,PAO_Temp67,PAO_Temp68,PAO_Surfacearea,PAO_Temp60 " +
//                    "from ytsoft65.pf_analy_outgrind a " +
//                    "LEFT JOIN  ytsoft65.AT_DEVICE_DETAIL b ON pao_FIXING=add_id " +
//                    "Left Join  ytsoft65.pb_code_material c On a.pao_cement=c.pcm_id  " +
//                    "Where pao_del='0' " +
//                    "And to_date(PAO_MoldDate,'yyyy-mm-dd')>=to_date(?,'yyyy-mm-dd')-1  " +
//                    "And to_date(PAO_MoldDate,'yyyy-mm-dd')<=to_date(?,'yyyy-mm-dd')-1 " +
//                    "Order By PAO_MoldDate,pcm_name";
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql2);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(4);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String pao_analy = resultSet.getString("pao_analy");
                    String pao_produdate = resultSet.getString("pao_produdate");
                    String pao_fixing = resultSet.getString("pao_fixing");
                    String add_name = resultSet.getString("add_name");
                    String PAO_Cement = resultSet.getString("PAO_Cement");
                    /**class*/
                    String pcm_name = resultSet.getString("pcm_name");
                    /**生产线id*/
                    String pao_temp56 = resultSet.getString("pao_temp56");
                    /**3d*/
                    Double PAO_Temp54 = resultSet.getDouble("PAO_Temp54");
                    /**28d*/
                    Double PAO_Temp55 = resultSet.getDouble("PAO_Temp55");


                    /**so3*/
                    Double PAO_Temp67 = resultSet.getDouble("PAO_Temp67");
                    /**loss*/
                    Double PAO_Temp68 = resultSet.getDouble("PAO_Temp68");

                    /**surfacearea*/
                    Double PAO_SURFACEAREA = resultSet.getDouble("PAO_SURFACEAREA");
                    /**45fine*/
                    Double PAO_Temp60 = resultSet.getDouble("PAO_Temp60");

                    JSONObject row = new JSONObject();
                    row.put("pao_analy", pao_analy);//2BM200802
                    row.put("pao_produdate", pao_produdate);//2020-08-03
                    row.put("pao_fixing", pao_fixing);//10152014042440000003
                    row.put("add_name", add_name);//4#水泥磨
                    row.put("PAO_Cement", PAO_Cement);//	1001G21000000064HZNG
                    row.put("pcm_name", pcm_name);//红狮M 32.5水泥粉
                    row.put("pao_temp56", pao_temp56);//1001G110000000000NK4
                    row.put("PAO_Temp54", PAO_Temp54);//0.042
                    row.put("PAO_Temp55", PAO_Temp55);//2.45

                    row.put("PAO_Temp67", PAO_Temp67);//0.042
                    row.put("PAO_Temp68", PAO_Temp68);//2.45

                    row.put("PAO_SURFACEAREA", PAO_SURFACEAREA);//0.042
                    row.put("PAO_Temp60", PAO_Temp60);//2.45
                    if(pcm_name!=null&&add_name!=null&&pao_temp56!=null){
                        pltext.put(row);
                    }

                }


                /**key1=deviceno,key2=cementclass*/
                Map<String, Map<String, JSONArray>> devicecementclass = new HashMap<>();

                /**按照磨机号分类数据*/
                //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息
                    String plno = jsonObject.getString("pao_temp56");//磨机号
                    String pcm_name = jsonObject.getString("pcm_name");//水泥品种
                    //                logger.info("i="+i+" "+deviceid+pcm_name);
                    //                i++;
                    Map<String, JSONArray> cementclassnext = devicecementclass.get(plno);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new HashMap<String, JSONArray>();
                        devicecementclass.put(plno, cementclassnext);

                        JSONArray corerowcontext = new JSONArray();
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    } else {
                        JSONArray corerowcontext = cementclassnext.get(pcm_name);
                        if (corerowcontext == null) {
                            corerowcontext = new JSONArray();
                        }
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
                 *                                                            |
                 *                                                            V
                 *                                                        {detail:[{}],mean:xx}
                 * */


                JSONArray firmdata = result.getJSONArray("data");


                for (Map.Entry<String, Map<String, JSONArray>> entrycemntclass : devicecementclass.entrySet()) {

                    String plno = entrycemntclass.getKey();
                    Map<String, JSONArray> cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("plno", plno);
                    JSONArray cementcontext = new JSONArray();
                    devicelayer.put("data", cementcontext);
                    firmdata.put(devicelayer);







                    for (Map.Entry<String, JSONArray> entrycementclazz : cementclass.entrySet()) {
                        double mean3d = 0;
                        double mean28d = 0;

                        double meanso3 = 0;
                        double meanloss= 0;

                        double meansurfacearea = 0;
                        double mean45fine = 0;

                        double size3d = 0;
                        double size28d = 0;

                        double sizeso3 = 0;
                        double sizeloss = 0;

                        double sizesurfacearea = 0;
                        double size45fine = 0;
                        /**水泥品种层*/
                        JSONObject cementclasslayer = new JSONObject();
                        cementcontext.put(cementclasslayer);

                        JSONArray detailconetxt = entrycementclazz.getValue();
                        String ceclass = entrycementclazz.getKey();
                        cementclasslayer.put("class", ceclass);
                        cementclasslayer.put("detail", detailconetxt);

                        for (Object corecontext : detailconetxt) {
                            JSONObject subdetail = (JSONObject) corecontext;
                            mean3d += subdetail.getDouble("PAO_Temp54");
                            mean28d += subdetail.getDouble("PAO_Temp55");

                            meanso3 += subdetail.getDouble("PAO_Temp67");
                            meanloss += subdetail.getDouble("PAO_Temp68");


                            meansurfacearea += subdetail.getDouble("PAO_SURFACEAREA");
                            mean45fine += subdetail.getDouble("PAO_Temp60");



                            if (subdetail.getDouble("PAO_Temp54") > 0) {
                                size3d++;
                            }

                            if (subdetail.getDouble("PAO_Temp55") > 0) {
                                size28d++;
                            }

                            if (subdetail.getDouble("PAO_Temp67") > 0) {
                                sizeso3++;
                            }

                            if (subdetail.getDouble("PAO_Temp68") > 0) {
                                sizeloss++;
                            }


                            if (subdetail.getDouble("PAO_SURFACEAREA") > 0) {
                                sizesurfacearea++;
                            }

                            if (subdetail.getDouble("PAO_Temp60") > 0) {
                                size45fine++;
                            }
                        }
                        cementclasslayer.put("mean3d",mean3d/(size3d+0.00000000001));
                        cementclasslayer.put("mean28d",mean28d/(size28d+0.00000000001));
                        cementclasslayer.put("meanso3",meanso3/(sizeso3+0.00000000001));
                        cementclasslayer.put("meanloss",meanloss/(sizeloss+0.00000000001));
                        cementclasslayer.put("meansurfacearea",meansurfacearea/(meansurfacearea+0.00000000001));
                        cementclasslayer.put("mean45fine",mean45fine/(mean45fine+0.00000000001));
                    }

                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));
        }
    }


    public static JSONObject getCMqua2(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照线别的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }

            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }


            String sql2="select add_name,qab_fixing,pcm_name,qab_material,qao_temp11 as CaO,qao_temp3 as SO3, " +
                    "case when  to_number(substr(qao_setdate,12,2) ) <7 then to_char(to_date(qao_setdate,'yyyy-mm-dd hh24:mi:ss') +1,'yyyy-mm-dd hh24:mi:ss') else qao_setdate end as setdate  " +
                    "from ytsoft65.QF_ANALY_OUTGRIND qao  " +
                    "left join ytsoft65.QF_ANALY_BASE qab on qab_id=qao_base " +
                    "left join ytsoft65.PB_CODE_MATERIAL pcm on qab_material=pcm_id " +
                    "left join ytsoft65.AT_DEVICE_DETAIL add2 on add_id=QAB_FIXING  " +
                    "where qao_del='0' " +
                    "and to_date(QAO_SETDATE,'yyyy-mm-dd hh24:mi:ss')>=to_date(?,'yyyy-mm-dd hh24:mi:ss') " +
                    "and to_date(QAO_SETDATE,'yyyy-mm-dd hh24:mi:ss')< to_date(?,'yyyy-mm-dd hh24:mi:ss') " +
                    "order by qab_material,qab_fixing,to_date(QAO_SETDATE,'yyyy-mm-dd hh24:mi:ss')";

            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql2);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(4);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String ADD_NAME = resultSet.getString("ADD_NAME");//1#水泥磨
                    String PCM_NAME = resultSet.getString("PCM_NAME");//红狮P.C 42.5水泥粉
                    String CAO = resultSet.getString("CAO");//54.352
                    String SO3 = resultSet.getString("SO3");//2.14
                    String SETDATE = resultSet.getString("SETDATE");//2020-11-23 00:00:00


                    JSONObject row = new JSONObject();
                    row.put("ADD_NAME", ADD_NAME);//2BM200802
                    row.put("PCM_NAME", PCM_NAME);//2020-08-03
                    row.put("CAO", CAO);//10152014042440000003
                    row.put("SO3", SO3);//4#水泥磨
                    row.put("SETDATE", SETDATE);//	1001G21000000064HZNG

                    if(!(CAO==null&&SO3==null)&&ADD_NAME!=null){
                        pltext.put(row);
                    }

                }


                /**key1=deviceno*/
                Map<String,JSONArray> device = new HashMap<>();

                /**按照磨机号分类数据*/
                //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息
                    String ADD_NAME = jsonObject.getString("ADD_NAME");//磨机号

                    JSONArray cementclassnext = device.get(ADD_NAME);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new JSONArray();
                        device.put(ADD_NAME, cementclassnext);
                        cementclassnext.put(jsonObject);

                    } else {
                        cementclassnext.put(jsonObject);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{deviceno:磨机号1,data:[{}，..]},...]
                 *                                           |
                 *                                           V
                 *                                          {"add_name":1#水泥磨,....}
                 * */


                JSONArray firmdata = result.getJSONArray("data");

                for (Map.Entry<String, JSONArray> entrycemntclass : device.entrySet()) {

                    String devicenname = entrycemntclass.getKey();
                    JSONArray cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("deviceno", devicenname);

                    devicelayer.put("data", cementclass);
                    firmdata.put(devicelayer);
                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));
        }
    }



    public static JSONObject getcoat(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照线别的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }

            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }


            String sql2="select QAR_TEMP6 AS SO3,QAR_TEMP61 AS CL, " +
                    "case when to_number(substr(QAR_setdate,12,2) ) <7 then to_char(to_date(QAR_setdate,'yyyy-mm-dd hh24:mi:ss') +1,'yyyy-mm-dd hh24:mi:ss') else QAR_setdate end as QAR_setdate, " +
                    "case when qab_proline='0001E110000000000EYU' THEN '1001G110000000000NK2' " +
                    "     when qab_proline='0001E110000000000EYV' THEN '1001G110000000000NK4' " +
                    "     when qab_proline='0001E110000000000EYW' THEN '1001G110000000000NK5'  " +
                    "else qab_proline "+
                    "     end as qab_proline " +
                    "from ytsoft65.qf_analy_ripe join ytsoft65.QF_Analy_Base on qar_base = qab_id " +
                    "where qar_del=0  and  to_date(qab_produdate, 'yyyy-mm-dd') >=to_date(?, 'yyyy-mm-dd') " +
                    "and to_date(qab_produdate, 'yyyy-mm-dd') <=to_date(?, 'yyyy-mm-dd') ORDER BY QAR_SETDATE";

            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql2);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(4);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String SO3 = resultSet.getString("SO3");//1.65
                    String CL = resultSet.getString("CL");//0.86
                    String QAR_STDATE = resultSet.getString("QAR_SETDATE");//2020-12-01 10:00:00
                    String QAB_PROLINE = resultSet.getString("QAB_PROLINE");//1001G110000000000NK2

                    JSONObject row = new JSONObject();
                    row.put("SO3", SO3);
                    row.put("CL", CL);
                    row.put("QAR_STDATE", QAR_STDATE);
                    row.put("QAB_PROLINE", QAB_PROLINE);

                    if((!(SO3==null||CL==null)) && (QAB_PROLINE!=null)){
                        pltext.put(row);
                    }

                }


                /**key1=deviceno*/
                Map<String,JSONArray> device = new HashMap<>();

                /**按照磨机号分类数据*/
                //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息

                    String QAB_PROLINE = jsonObject.getString("QAB_PROLINE");//磨机号

                    JSONArray cementclassnext = device.get(QAB_PROLINE);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new JSONArray();
                        device.put(QAB_PROLINE, cementclassnext);
                        cementclassnext.put(jsonObject);

                    } else {
                        cementclassnext.put(jsonObject);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{pl:1001G110000000000NK2,data:[{}，..]},...]
                 *                                           |
                 *                                           V
                 *                                          {"add_name":1#水泥磨,....}
                 * */


                JSONArray firmdata = result.getJSONArray("data");

                for (Map.Entry<String, JSONArray> entrycemntclass : device.entrySet()) {

                    String devicenname = entrycemntclass.getKey();
                    JSONArray cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("pl", devicenname);

                    devicelayer.put("data", cementclass);
                    firmdata.put(devicelayer);
                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        }catch (Exception e){
            logger.error("the happend error firmid="+firm.getFirmid());
        }finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));

        }
        return result;
    }







    public static JSONObject getCemntSystemClAndCr(Firm firm, String startdate, String endate) {

        long starttime=System.currentTimeMillis();

        JSONObject result=null;
        try {
            /**
             * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
             *                                                            |
             *                                                            V
             *                                                        {detail:[{}],mean:xx}
             * */
            result= new JSONObject();
            result.put("data", new JSONArray());

            /**先暂时把数据按照线别的方式存储起来，最后在通过数据局加工进行分类*/
            JSONArray pltext = new JSONArray();

            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                JSONArray plcontext = new JSONArray();
                result.put("firmname", productline.getRegionfirm());
                break;
            }


//        plcontext.put("detail",new JSONArray());
//        plcontext.put("meancl",0d);
//        plcontext.put("meancr",0d);
//        plcontext.put("sizecl",0);
//        plcontext.put("sizecr",0);
//
//        pltext.put(productline.getProductline_newid(),plcontext);

            String mesip = null;
            for (DefaultProductline productline : firm.getProductlinemapping().values()) {
                mesip = productline.getMesip();
                break;
            }
            if (mesip == null) {
                return result;
            }

            Connection connection = OracleMESDB.getConnection(mesip);
            if (connection == null) {
                return result;
            }


            String sql = "Select pao_analy,PAO_MoldDate As pao_produdate,pao_fixing,add_name,PAO_Cement,pcm_name,  " +
                    "CASE WHEN pao_temp56='0001E110000000000EYU' THEN '1001G110000000000NK2'  " +
                    "  WHEN pao_temp56='0001E110000000000EYV' THEN '1001G110000000000NK4'  " +
                    "  WHEN pao_temp56='0001E110000000000EYW' THEN '1001G110000000000NK5'   " +
                    "else pao_temp56 "+
                    "  END AS pao_temp56,PAO_Temp64,PAO_Temp80   " +
                    "from ytsoft65.pf_analy_outgrind a  " +
                    "LEFT JOIN  ytsoft65.AT_DEVICE_DETAIL b ON pao_FIXING=add_id  " +
                    "Left Join  ytsoft65.pb_code_material c On a.pao_cement=c.pcm_id   " +
                    "Where pao_del='0'  " +
                    "And to_date(PAO_MoldDate,'yyyy-mm-dd')>=to_date(?,'yyyy-mm-dd')-1   " +
                    "And to_date(PAO_MoldDate,'yyyy-mm-dd')<=to_date(?,'yyyy-mm-dd')-1  " +
                    "Order By PAO_MoldDate,pcm_name";
            PreparedStatement preparedStatement = null;
            ResultSet resultSet = null;

            try {
                preparedStatement = connection.prepareStatement(sql);

                preparedStatement.setString(1, startdate);
                preparedStatement.setString(2, endate);
                preparedStatement.setQueryTimeout(4);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String pao_analy = resultSet.getString("pao_analy");
                    String pao_produdate = resultSet.getString("pao_produdate");
                    String pao_fixing = resultSet.getString("pao_fixing");
                    String add_name = resultSet.getString("add_name");
                    String PAO_Cement = resultSet.getString("PAO_Cement");
                    String pcm_name = resultSet.getString("pcm_name");
                    /**生产线id*/
                    String pao_temp56 = resultSet.getString("pao_temp56");
                    /**氯离子*/
                    Double PAO_Temp64 = resultSet.getDouble("PAO_Temp64");
                    /**六价铬*/
                    Double PAO_Temp80 = resultSet.getDouble("PAO_Temp80");

                    JSONObject row = new JSONObject();
                    row.put("pao_analy", pao_analy);//2BM200802
                    row.put("pao_produdate", pao_produdate);//2020-08-03
                    row.put("pao_fixing", pao_fixing);//10152014042440000003
                    row.put("add_name", add_name);//4#水泥磨
                    row.put("PAO_Cement", PAO_Cement);//	1001G21000000064HZNG
                    row.put("pcm_name", pcm_name);//红狮M 32.5水泥粉
                    row.put("pao_temp56", pao_temp56);//1001G110000000000NK4
                    row.put("PAO_Temp64", PAO_Temp64);//0.042
                    row.put("PAO_Temp80", PAO_Temp80);//2.45
                    if(pcm_name!=null&&add_name!=null){
                        pltext.put(row);
                    }

                }


                /**key1=deviceno,key2=cementclass*/
                Map<String, Map<String, JSONArray>> devicecementclass = new HashMap<>();

                /**按照磨机号分类数据*/
    //            int i=1;
                for (Object object : pltext) {
                    JSONObject jsonObject = (JSONObject) object;//详细的信息
                    String deviceid = jsonObject.getString("add_name");//磨机号
                    String pcm_name = jsonObject.getString("pcm_name");//水泥品种
    //                logger.info("i="+i+" "+deviceid+pcm_name);
    //                i++;
                    Map<String, JSONArray> cementclassnext = devicecementclass.get(deviceid);//把磨机下的数据容器获取下来
                    if (cementclassnext == null) {
                        cementclassnext = new HashMap<String, JSONArray>();
                        devicecementclass.put(deviceid, cementclassnext);

                        JSONArray corerowcontext = new JSONArray();
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    } else {
                        JSONArray corerowcontext = cementclassnext.get(pcm_name);
                        if (corerowcontext == null) {
                            corerowcontext = new JSONArray();
                        }
                        corerowcontext.put(jsonObject);
                        cementclassnext.put(pcm_name, corerowcontext);
                    }
                }

                /**将磨机号分类结果进行再按照品种进行数据分类*/

                /**
                 * [firmname:xx,data:[{deviceno:磨机号1,data:[{class:品种1,data:{}}，..]}，{deviceno:磨机号1, data:[品种1:{}，品种2:{}....]} ]
                 *                                                            |
                 *                                                            V
                 *                                                        {detail:[{}],mean:xx}
                 * */


                JSONArray firmdata = result.getJSONArray("data");


                for (Map.Entry<String, Map<String, JSONArray>> entrycemntclass : devicecementclass.entrySet()) {

                    String deviceno = entrycemntclass.getKey();
                    Map<String, JSONArray> cementclass = entrycemntclass.getValue();

                    JSONObject devicelayer = new JSONObject();

                    devicelayer.put("deviceno", deviceno);
                    JSONArray cementcontext = new JSONArray();
                    devicelayer.put("data", cementcontext);
                    firmdata.put(devicelayer);



                    for (Map.Entry<String, JSONArray> entrycementclazz : cementclass.entrySet()) {


                        double meancl = 0;
                        double meancr = 0;

                        double sizecl = 0;
                        double sizecr = 0;
                        /**水泥品种层*/
                        JSONObject cementclasslayer = new JSONObject();
                        cementcontext.put(cementclasslayer);

                        JSONArray detailconetxt = entrycementclazz.getValue();
                        String ceclass = entrycementclazz.getKey();
                        cementclasslayer.put("class", ceclass);
                        cementclasslayer.put("detail", detailconetxt);

                        for (Object corecontext : detailconetxt) {
                            JSONObject subdetail = (JSONObject) corecontext;
                            meancl += subdetail.getDouble("PAO_Temp64");
                            meancr += subdetail.getDouble("PAO_Temp80");
                            if (subdetail.getDouble("PAO_Temp64") > 0) {
                                sizecl++;
                            }

                            if (subdetail.getDouble("PAO_Temp80") > 0) {
                                sizecr++;
                            }
                        }
                        cementclasslayer.put("meancl",meancl/(sizecl+0.00000000001));
                        cementclasslayer.put("meancr",meancr/(sizecr+0.00000000001));
                    }

                }



            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            } finally {
                closesqlobject(connection, resultSet, preparedStatement);
            }

            return result;
        } finally {
            logger.info(firm.getFirmid()+" cost time="+(System.currentTimeMillis()-starttime));
        }
    }


    private static void closesqlobject(Connection connection, ResultSet resultSet, PreparedStatement preparedStatement) {
        if (preparedStatement != null) {
            try {
                preparedStatement.close();
            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            }
        }
        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            }
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException throwables) {
                logger.error(throwables.getMessage(), throwables);
            }
        }
    }


}
