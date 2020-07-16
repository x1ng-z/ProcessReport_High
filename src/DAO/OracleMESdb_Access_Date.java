package DAO;

import Model.Firm;
import Model.DefaultProductline;
import Model.Quality_data;
import Model.RawSystem;
import ToolUnits.DatesUtil;
import ToolUnits.Tools;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.math.BigDecimal;
import java.sql.*;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


public class OracleMESdb_Access_Date {
   private static  Logger logger=Logger.getLogger(OracleMESdb_Access_Date.class);
    public  static void  get_Raw_02Fineness(ServletContext servletContext,Connection oracle_connection, Map<String, Firm> firmmapping){
        String sql="select QAB_FIRM, QAB_FIXING, \"0.2细度\" from QF_ANALY_BASE2 where QAS_SETDATE=?";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;
        try {
            preparedStatement=oracle_connection.prepareStatement(sql);
            preparedStatement.setString(1,Tools.get_nowHour());//
            resultSet=preparedStatement.executeQuery();
            while(resultSet.next()){
                String firmid=resultSet.getString("QAB_FIRM");
                String rawsystemid=resultSet.getString("QAB_FIXING");
                String pru02=resultSet.getString(3);
                double raw02fineness= 0d;
                try {
                    raw02fineness = Double.parseDouble(pru02==null?"-1":pru02);
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                }

                for(DefaultProductline defaultProductline :firmmapping.get(firmid).getProductlinemapping().values()){

                    if(defaultProductline.getRawSystemmapping().containsKey(rawsystemid)){
                        if(raw02fineness!=-1d){
                            defaultProductline.getRawSystemmapping().get(rawsystemid).setRaw02Fineness(raw02fineness);
                        }

                    }

                }


            }
        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Raw_02Fineness");
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }

        }


    }



    public  static void get_Raw_monthyield(ServletContext servletContext,Connection oracle_connection, RawSystem rawsystem){

        java.util.Date beginDayOfMonth=DatesUtil.getBeginDayOfMonth();
        java.util.Date endDayOfMonth=DatesUtil.getEndDayOfMonth();

        SimpleDateFormat formatmonth = new SimpleDateFormat("yyyy-MM-dd");
        String begintime=formatmonth.format(beginDayOfMonth)+" 00:00:00";
        String endtime=formatmonth.format(endDayOfMonth)+" 00:00:00";

        SimpleDateFormat formattime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        java.util.Date begin=null;

        java.util.Date end=null;
        try {
             begin=formattime.parse(begintime);
             end=formattime.parse(endtime);
        } catch (ParseException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Raw_monthyield");
        }

        String sql="select DAE_SETDATE, AOY_SUMYIELDMON from AT_OUTPUT_BASE2 where DAE_SETDATE>=? and DAE_SETDATE<=? and DAE_DEVICE=?";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;
        try {
            preparedStatement=oracle_connection.prepareStatement(sql);
            preparedStatement.setDate(1,new java.sql.Date(begin.getTime()));
            preparedStatement.setDate(2,new java.sql.Date(end.getTime()));
            preparedStatement.setString(3,rawsystem.getRawsystem_id());
            resultSet=preparedStatement.executeQuery();
            double rawsystem_month_total=0d;
            double rawsytem_day=0d;

            Date yesterday=new java.sql.Date(Tools.get_yesterday().getTime());

            while(resultSet.next()){
//                Date date=resultSet.getDate(1);
//                String firmid=resultSet.getString("DAE_FIRM");
//                String rawsystemid=resultSet.getString("DAE_DEVICE");
                double rawyeild=resultSet.getDouble("AOY_SUMYIELDMON");
                Date date=resultSet.getDate("DAE_SETDATE");
                if(date.equals(yesterday)){
                    rawsytem_day=rawyeild;
                }

                rawsystem_month_total+=rawyeild;
//                String productlineid=resultSet.getString("DAE_LINE");
//                firmmaping.get(firmid).getProductlinemapping().get(productlineid).getRawSystemmapping().get(rawsystemid).setRawdayyeild(rawyeild);

            }

            BigDecimal bigtotal   =   new   BigDecimal(rawsystem_month_total);
            rawsystem_month_total=   bigtotal.setScale(2,   BigDecimal.ROUND_HALF_UP).doubleValue();
            rawsystem.setRawmonthyeild(rawsystem_month_total);
            rawsystem.setRawdayyeild(rawsytem_day);

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Raw_monthyield");
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }


        }



    }



    public  static void get_Raw_yield(ServletContext servletContext, Connection oracle_connection, Map<String,Firm> firmmaping){
//        Tools.get_nowDay();
//        String sql="select DAE_LINE,DAE_DEVICE,AOY_SUMYIELDMON,DAE_FIRM from AT_OUTPUT_BASE2 where DAE_SETDATE=?";
//        PreparedStatement preparedStatement=null;
//        ResultSet resultSet=null;

        for(Firm firm:firmmaping.values()){

            Map<String, DefaultProductline> productlinemapping=firm.getProductlinemapping();
            for(DefaultProductline defaultProductline :productlinemapping.values()){


                for(RawSystem rawSystem: defaultProductline.getRawSystemmapping().values()){

                    get_Raw_monthyield(servletContext,oracle_connection,rawSystem);

                }
            }
        }

//        try {
//            preparedStatement=oracle_connection.prepareStatement(sql);
//            preparedStatement.setDate(1,new java.sql.Date(Tools.get_yesterday().getTime()));
//            resultSet=preparedStatement.executeQuery();
//            while(resultSet.next()){
//                String firmid=resultSet.getString("DAE_FIRM");
//                String rawsystemid=resultSet.getString("DAE_DEVICE");
//                double rawyeild=resultSet.getDouble("AOY_SUMYIELDMON");
//                String productlineid=resultSet.getString("DAE_LINE");
//                RawSystem assignrawsystem=firmmaping.get(firmid).getProductlinemapping().get(productlineid).getRawSystemmapping().get(rawsystemid);
//                assignrawsystem.setRawdayyeild(rawyeild);
//
//                get_Raw_monthyield(servletContext,oracle_connection,assignrawsystem);
//
//            }
//        } catch (SQLException e) {
////            e.printStackTrace();
//            LogMgr.getLogMgr_instance(servletContext).WirteError(e);
//        }finally {
//            if (preparedStatement!=null){
//                try {
//                    preparedStatement.close();
//                } catch (SQLException e) {
////                    e.printStackTrace();
//                    LogMgr.getLogMgr_instance(servletContext).WirteError(e);
//                }
//            }
//            if(resultSet!=null){
//
//                try {
//                    resultSet.close();
//                } catch (SQLException e) {
////                    e.printStackTrace();
//                    LogMgr.getLogMgr_instance(servletContext).WirteError(e);
//                }
//            }
//
//
//        }


    }



    public  static void get_simpledata_newst28daystrange(ServletContext servletContext, Connection oracle_connection, Quality_data quality_data){
//        Tools.get_nowDay();
        String sql="select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from (select* from hfpf_analy_ripe where \"抗压28\" is not null  order by HAR_PRODUDATE desc) where ROWNUM<=30";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;

         List<String> phar_analy=new ArrayList<String>();
         List<String> phar_produdate=new ArrayList<String>();
         List<Double> ploss=new ArrayList<Double>();
         List<Double> psio2=new ArrayList<Double>();
         List<Double> pal2o3=new ArrayList<Double>();
         List<Double> pfe2o3=new ArrayList<Double>();
         List<Double> pcao=new ArrayList<Double>();
         List<Double> pmgo=new ArrayList<Double>();
         List<Double> pfcao=new ArrayList<Double>();
         List<Double> pkh=new ArrayList<Double>();
         List<Double> pkh1=new ArrayList<Double>();
         List<Double> pn=new ArrayList<Double>();
         List<Double> pp=new ArrayList<Double>();
         List<Double> pc3s=new ArrayList<Double>();
         List<Double> pc2s=new ArrayList<Double>();
         List<Double> pc3a=new ArrayList<Double>();
         List<Double> pc4af=new ArrayList<Double>();
         List<Double> pcompressive_pressure28=new ArrayList<Double>();


        try {
            preparedStatement=oracle_connection.prepareStatement(sql);
//            preparedStatement.setDate(1,new java.sql.Date(Tools.get_yesterday().getTime()));
            resultSet=preparedStatement.executeQuery();
            while(resultSet.next()){
                String har_produdate=resultSet.getString("HAR_PRODUDATE");
                String har_analy=resultSet.getString("HAR_ANALY");
                String loss=resultSet.getString("LOSS");
                String sio2=resultSet.getString("SIO2");
                String al2O3=resultSet.getString("AL2O3");
                String fe2O3=resultSet.getString("FE2O3");
                String cao=resultSet.getString("CAO");
                String mgo=resultSet.getString("MGO");
                String fcao=resultSet.getString("FCAO");
                String kh=resultSet.getString("KH");
                String kh1=resultSet.getString("KH1");
                String n=resultSet.getString("N");
                String p=resultSet.getString("P");
                String c3S=resultSet.getString("C3S");
                String c2S=resultSet.getString("C2S");
                String c3A=resultSet.getString("C3A");
                String c4AF=resultSet.getString("C4AF");
                String pr=resultSet.getString(18);

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
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(oracle_connection!=null){
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }


    }





    public  static void get_newstquality_Pending_prediction(ServletContext servletContext, Connection oracle_connection, Quality_data quality_data){
//        Tools.get_nowDay();
        String sql="select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from (select* from hfpf_analy_ripe   order by HAR_PRODUDATE desc) where ROWNUM<=1";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;

        List<String> phar_produdate=new ArrayList<String>();
        List<String> phar_analy=new ArrayList<String>();
        List<Double> ploss=new ArrayList<Double>();
        List<Double> psio2=new ArrayList<Double>();
        List<Double> pal2o3=new ArrayList<Double>();
        List<Double> pfe2o3=new ArrayList<Double>();
        List<Double> pcao=new ArrayList<Double>();
        List<Double> pmgo=new ArrayList<Double>();
        List<Double> pfcao=new ArrayList<Double>();
        List<Double> pkh=new ArrayList<Double>();
        List<Double> pkh1=new ArrayList<Double>();
        List<Double> pn=new ArrayList<Double>();
        List<Double> pp=new ArrayList<Double>();
        List<Double> pc3s=new ArrayList<Double>();
        List<Double> pc2s=new ArrayList<Double>();
        List<Double> pc3a=new ArrayList<Double>();
        List<Double> pc4af=new ArrayList<Double>();
        List<Double> pcompressive_pressure28=new ArrayList<Double>();


        try {
            preparedStatement=oracle_connection.prepareStatement(sql);
//            preparedStatement.setString(1,T);
            resultSet=preparedStatement.executeQuery();
            while(resultSet.next()){

                String har_produdate=resultSet.getString("HAR_PRODUDATE");
                String har_analy=resultSet.getString("HAR_ANALY");
                String loss=resultSet.getString("LOSS");
                String sio2=resultSet.getString("SIO2");
                String al2O3=resultSet.getString("AL2O3");
                String fe2O3=resultSet.getString("FE2O3");
                String cao=resultSet.getString("CAO");
                String mgo=resultSet.getString("MGO");
                String fcao=resultSet.getString("FCAO");
                String kh=resultSet.getString("KH");
                String kh1=resultSet.getString("KH1");
                String n=resultSet.getString("N");
                String p=resultSet.getString("P");
                String c3S=resultSet.getString("C3S");
                String c2S=resultSet.getString("C2S");
                String c3A=resultSet.getString("C3A");
                String c4AF=resultSet.getString("C4AF");
                String pr=resultSet.getString(18);

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
                pcompressive_pressure28.add(Double.parseDouble(pr==null?"0":pr));

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
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(oracle_connection!=null){
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }


    }




    public  static void get_historyst_quality(ServletContext servletContext, Connection oracle_connection, Quality_data quality_data,String nonullltime){
//        Tools.get_nowDay();
        String sql="select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from  hfpf_analy_ripe  where HAR_PRODUDATE=?";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;

        List<String> phar_produdate=new ArrayList<String>();
        List<String> phar_analy=new ArrayList<String>();
        List<Double> ploss=new ArrayList<Double>();
        List<Double> psio2=new ArrayList<Double>();
        List<Double> pal2o3=new ArrayList<Double>();
        List<Double> pfe2o3=new ArrayList<Double>();
        List<Double> pcao=new ArrayList<Double>();
        List<Double> pmgo=new ArrayList<Double>();
        List<Double> pfcao=new ArrayList<Double>();
        List<Double> pkh=new ArrayList<Double>();
        List<Double> pkh1=new ArrayList<Double>();
        List<Double> pn=new ArrayList<Double>();
        List<Double> pp=new ArrayList<Double>();
        List<Double> pc3s=new ArrayList<Double>();
        List<Double> pc2s=new ArrayList<Double>();
        List<Double> pc3a=new ArrayList<Double>();
        List<Double> pc4af=new ArrayList<Double>();
        List<Double> pcompressive_pressure28=new ArrayList<Double>();


        try {
            preparedStatement=oracle_connection.prepareStatement(sql);
            preparedStatement.setString(1,nonullltime);
            resultSet=preparedStatement.executeQuery();
            while(resultSet.next()){

                String har_produdate=resultSet.getString("HAR_PRODUDATE");
                String har_analy=resultSet.getString("HAR_ANALY");
                String loss=resultSet.getString("LOSS");
                String sio2=resultSet.getString("SIO2");
                String al2O3=resultSet.getString("AL2O3");
                String fe2O3=resultSet.getString("FE2O3");
                String cao=resultSet.getString("CAO");
                String mgo=resultSet.getString("MGO");
                String fcao=resultSet.getString("FCAO");
                String kh=resultSet.getString("KH");
                String kh1=resultSet.getString("KH1");
                String n=resultSet.getString("N");
                String p=resultSet.getString("P");
                String c3S=resultSet.getString("C3S");
                String c2S=resultSet.getString("C2S");
                String c3A=resultSet.getString("C3A");
                String c4AF=resultSet.getString("C4AF");
                String pr=resultSet.getString(18);

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
                pcompressive_pressure28.add(Double.parseDouble(pr==null?"0":pr));

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
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(oracle_connection!=null){
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }


    }



    public  static void get_simple_historyst_quality(ServletContext servletContext, Connection oracle_connection, Quality_data quality_data,String start,String end){
//        Tools.get_nowDay();
        String sql="select HAR_PRODUDATE,HAR_ANALY,LOSS,SIO2,AL2O3, FE2O3,CAO,MGO,FCAO,KH,KH1,N,P,C3S,C2S,C3A,C4AF,\"抗压28\" from  hfpf_analy_ripe  where HAR_PRODUDATE>=? and HAR_PRODUDATE<=?";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;

        List<String> phar_produdate=new ArrayList<String>();
        List<String> phar_analy=new ArrayList<String>();
        List<Double> ploss=new ArrayList<Double>();
        List<Double> psio2=new ArrayList<Double>();
        List<Double> pal2o3=new ArrayList<Double>();
        List<Double> pfe2o3=new ArrayList<Double>();
        List<Double> pcao=new ArrayList<Double>();
        List<Double> pmgo=new ArrayList<Double>();
        List<Double> pfcao=new ArrayList<Double>();
        List<Double> pkh=new ArrayList<Double>();
        List<Double> pkh1=new ArrayList<Double>();
        List<Double> pn=new ArrayList<Double>();
        List<Double> pp=new ArrayList<Double>();
        List<Double> pc3s=new ArrayList<Double>();
        List<Double> pc2s=new ArrayList<Double>();
        List<Double> pc3a=new ArrayList<Double>();
        List<Double> pc4af=new ArrayList<Double>();
        List<Double> pcompressive_pressure28=new ArrayList<Double>();


        try {
            preparedStatement=oracle_connection.prepareStatement(sql);
            preparedStatement.setString(1,start);
            preparedStatement.setString(2,end);
            resultSet=preparedStatement.executeQuery();
            while(resultSet.next()){

                String har_produdate=resultSet.getString("HAR_PRODUDATE");
                String har_analy=resultSet.getString("HAR_ANALY");
                String loss=resultSet.getString("LOSS");
                String sio2=resultSet.getString("SIO2");
                String al2O3=resultSet.getString("AL2O3");
                String fe2O3=resultSet.getString("FE2O3");
                String cao=resultSet.getString("CAO");
                String mgo=resultSet.getString("MGO");
                String fcao=resultSet.getString("FCAO");
                String kh=resultSet.getString("KH");
                String kh1=resultSet.getString("KH1");
                String n=resultSet.getString("N");
                String p=resultSet.getString("P");
                String c3S=resultSet.getString("C3S");
                String c2S=resultSet.getString("C2S");
                String c3A=resultSet.getString("C3A");
                String c4AF=resultSet.getString("C4AF");
                String pr=resultSet.getString(18);

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
                pcompressive_pressure28.add(Double.parseDouble(pr==null?"0":pr));

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
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(oracle_connection!=null){
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }


    }

    public  static  Map<String,Double> get_Pending_fillinto_Mysql_28Strong(ServletContext servletContext, Connection oracle_connection,List<String> date){
//        Tools.get_nowDay();
        String sql="select HAR_PRODUDATE,\"抗压28\" from  hfpf_analy_ripe  where HAR_PRODUDATE in(?,?,?,?,?,?,?,?,?,?) and \"抗压28\" is not null order by HAR_PRODUDATE DESC ";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;

        Map<String,Double> result=new LinkedHashMap<String,Double>();


        try {
            preparedStatement=oracle_connection.prepareStatement(sql);


           for(int index=1;index<=date.size();++index){

               preparedStatement.setString(index,date.get(index-1));
//               System.out.println(date.get(index-1));
           }
            resultSet=preparedStatement.executeQuery();
            while(resultSet.next()){

                String har_produdate=resultSet.getString("HAR_PRODUDATE");
                String pr=resultSet.getString(2);

                result.put(har_produdate,Double.valueOf(pr));

            }
            return result;

        } catch (SQLException e) {
//            e.printStackTrace();
            logger.error(e);
            logger.error("in get_Pending_fillinto_Mysql_28Strong");
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }

            if(oracle_connection!=null){
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }


        }
        return null;


    }









}
