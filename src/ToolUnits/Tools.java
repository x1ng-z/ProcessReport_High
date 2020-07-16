package ToolUnits;

import Model.FiredSystem;
import Model.Firm;
import Model.Productline;
import Model.DefaultProductline;


import org.json.JSONArray;
import org.json.JSONException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class Tools {

    public static final String MESCONFIG = "config";
    public static final String MESDATA = "DATA";

    public static Date adjustTimeZone(String UTCTime) {


        Date UTCDate;
        UTCTime = UTCTime.substring(0, 19);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

        try {
            UTCDate = format.parse(UTCTime);
            format.setTimeZone(TimeZone.getTimeZone("GMT+16"));
            String localTimeStr = format.format(UTCDate);
            format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            return format.parse(localTimeStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;


    }


    public static String get_nowHour() {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String fulltime = format.format(new Date(System.currentTimeMillis()));
//        System.out.println(fulltime.replaceAll("\\d\\d:\\d\\d$","00:00"));

        return fulltime.replaceAll("\\d\\d:\\d\\d$", "00:00");

    }


    public static Date get_nowDay() {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String fulltime = format.format(new Date(System.currentTimeMillis()));

        try {
            return format.parse(fulltime.replaceAll("\\d\\d:\\d\\d:\\d\\d$", "00:00:00"));
//            System.out.println(format.parse(fulltime.replaceAll("\\d\\d:\\d\\d:\\d\\d$","00:00:00")));;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
//        System.out.println(fulltime.replaceAll("\\d\\d:\\d\\d$","00:00"))

    }

    public static String get_nowYMD() {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(new Date(System.currentTimeMillis()));

    }


    public static Date get_yesterday() {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String fulltime = format.format(DatesUtil.getBeginDayOfYesterday());

        try {
//            System.out.println(format.parse(fulltime.replaceAll("\\d\\d:\\d\\d:\\d\\d$","00:00:00")));;
            return format.parse(fulltime.replaceAll("\\d\\d:\\d\\d:\\d\\d$", "00:00:00"));
//
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;

    }

    public static int getfirstupdate(int hour, int minute, int second) {

        LocalDateTime time = LocalDateTime.now();

        LocalTime localTime = time.toLocalTime();

        LocalTime specialtime = LocalTime.of(hour, minute, second);
        long firstdelay = 0;

        if (localTime.isBefore(specialtime)) {

            Duration duration = Duration.between(localTime, specialtime);
            firstdelay = duration.toMillis();
        } else {


            LocalDateTime secondday = LocalDateTime.of(time.toLocalDate().plusDays(1), LocalTime.of(hour, minute, second));
            firstdelay = Duration.between(time, secondday).toMillis();
        }
        return (int) firstdelay;
    }


    public static String[] get_next_month_dateSE(int year, int month, int day) {

        LocalDate localDate = LocalDate.of(year, month, day);

        LocalDate enddate = localDate.minusDays(30);
        LocalDate startdate = localDate.minusDays(60);

        String end = enddate.format(DateTimeFormatter.ISO_LOCAL_DATE);

        String start = startdate.format(DateTimeFormatter.ISO_LOCAL_DATE);
        String[] result = new String[2];
        result[0] = start;
        result[1] = end;


        return result;
    }


    public static Date stringTodate(String d) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        try {
            return format.parse(d);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }


    public static LocalDateTime getminsMonth(LocalDateTime localDateTime, long month_number) {

        return localDateTime.minusMonths(month_number);

    }

    public static LocalDateTime getminsDays(LocalDateTime localDateTime, long day_number) {
        return localDateTime.minusDays(day_number);
    }


    public static String InstanttoString(Instant instant) {
        DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                .withZone(ZoneId.systemDefault());

        return DATE_TIME_FORMATTER.format(instant);


    }


    public static List<Double> gettailAndheard(List<Double> list) {
        List<Double> result = null;
        try {
            result = new ArrayList<Double>();
            for (Double h : list) {
                if (h != null) {
                    result.add(h);
                    break;
                }
            }

            for (int i = list.size() - 1; i >= 0; --i) {

                if (list.get(i) != null) {
                    result.add(list.get(i));
                    break;
                }
            }
        } catch (Exception e) {
            return null;
        }

        return result;
    }


    public static Double div(Double v1, Double v2, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");
        }
        BigDecimal b1 = new BigDecimal(v1.toString());
        BigDecimal b2 = new BigDecimal(v2.toString());
        return b1.divide(b2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    public static Double myround(String a, int scale) {

        BigDecimal bg = new BigDecimal(a);
        return bg.setScale(scale, BigDecimal.ROUND_HALF_UP).doubleValue();

    }

    public static Double myround(double a, int scale) {

        BigDecimal bg = new BigDecimal(a);
        return bg.setScale(scale, BigDecimal.ROUND_HALF_UP).doubleValue();

    }


    public static Double myround(int a, int scale) {

        BigDecimal bg = new BigDecimal(a);
        return bg.setScale(scale, BigDecimal.ROUND_HALF_UP).doubleValue();

    }

    public static double division(double d1, double d2) {
        BigDecimal bd1 = new BigDecimal(Double.toString(d1));
        BigDecimal bd2 = new BigDecimal(Double.toString(d2));
        return bd1.divide(bd2, 2, BigDecimal.ROUND_HALF_DOWN).doubleValue();
    }


    public static double sub(double d1, double d2) {
        BigDecimal bd1 = new BigDecimal(Double.toString(d1));
        BigDecimal bd2 = new BigDecimal(Double.toString(d2));
        return bd1.subtract(bd2).doubleValue();
    }

    public static double sum(double d1, double d2) {
        BigDecimal bd1 = new BigDecimal(Double.toString(d1));
        BigDecimal bd2 = new BigDecimal(Double.toString(d2));
        return bd1.add(bd2).doubleValue();
    }


    public static Object ReadXML(InputStream in, String model) {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        dbf.setIgnoringElementContentWhitespace(true);

        try {
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse(in);

            if (model.equals(MESCONFIG)) {
                Map<String, String> contexts = new LinkedHashMap<String, String>();
                NodeList sonlist = doc.getElementsByTagName("mesurl");
                for (int i = 0; i < sonlist.getLength(); i++)//production_line
                {
                    if (sonlist.item(i) instanceof Element) {
                        Element ProductionLine = (Element) sonlist.item(i);

                        for (Node node = ProductionLine.getFirstChild(); node != null; node = node.getNextSibling()) {// F0212_212_dwe
                            if (node.getNodeType() == Node.ELEMENT_NODE) {
                                String tagname = node.getNodeName();
                                //Observe (Tagname) nodename

                                String firmname = ((Element) node).getAttribute("name");
                                String url = ((Element) node).getAttribute("url");
//                                System.out.println(firmname+"--"+url);
                                contexts.put(firmname, url);

                            }
                        }
                    }
                }

                return contexts;
            }

            if (model.equals(MESDATA)) {
                List<String> contexts = new LinkedList<String>();
                NodeList bookList2 = doc.getElementsByTagName("string");
                contexts.add(bookList2.item(0).getTextContent());
                return contexts;

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }

    public static void ResolveJson_qulity(String json_string, Map<String, Firm> firmmapping) {
        if (json_string.equals("[]")) {
            return;
        }
        JSONArray jsonArray = null;
        try {
            jsonArray = new JSONArray(json_string);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        for (int i = 0; i < jsonArray.length(); i++) {

            try {
                String firmname = jsonArray.getJSONObject(i).getString("FIRMNAME");
                String devicename = jsonArray.getJSONObject(i).getString("DEVICENAME");
                double fcao = jsonArray.getJSONObject(i).getDouble("FCAO");
                double kh = jsonArray.getJSONObject(i).getDouble("KH");
                String firmid = jsonArray.getJSONObject(i).getString("FIRM");

                if (fcao != 0 || kh != 0) {

                    FiredSystem firedSystem = null;
                    Firm firm = firmmapping.get(firmid);
                    if(firm==null){
                            continue;
                    }

                    switch (devicename) {
                        case "1#回转窑":
                            Productline productline1 = firm.getProductlinemapping().get("0001E110000000000EYU");
                            if(productline1!=null){
                                for (Map.Entry<String, FiredSystem> firedSystemEntry : ((DefaultProductline) productline1).getFiredSystemmapping().entrySet()) {
                                    firedSystem = firedSystemEntry.getValue();
                                }
                            }

                            break;
                        case "2#回转窑":
                            Productline productline2 = firm.getProductlinemapping().get("0001E110000000000EYV");
                            if(productline2!=null){
                                for (Map.Entry<String, FiredSystem> firedSystemEntry : ((DefaultProductline) productline2).getFiredSystemmapping().entrySet()) {
                                    firedSystem = firedSystemEntry.getValue();
                                }
                            }

                            break;
                        case "3#回转窑":
                            Productline productline3 = firm.getProductlinemapping().get("0001E110000000000EYW");
                            if(productline3!=null){
                                for (Map.Entry<String, FiredSystem> firedSystemEntry : ((DefaultProductline) productline3).getFiredSystemmapping().entrySet()) {
                                    firedSystem = firedSystemEntry.getValue();
                                }
                            }

                            break;
                        case "回转窑":
                            Productline productline4 = firm.getProductlinemapping().get("0001E110000000000EYU");
                            if(productline4!=null){
                                for (Map.Entry<String, FiredSystem> firedSystemEntry : ((DefaultProductline) productline4).getFiredSystemmapping().entrySet()) {
                                    firedSystem = firedSystemEntry.getValue();
                                }
                            }

                            break;

                        default:
                            throw new RuntimeException(firmname.toString()+devicename + "no tag match");

                    }
                    if (firedSystem != null) {

                        if (fcao != 0) {
                            firedSystem.setFcao(fcao);
                        }
                        if (kh != 0) {
                            firedSystem.setKh(kh);
                        }
                    }


                }

            } catch (JSONException e) {
//                System.out.println(jsonArray);
                e.printStackTrace();
            }
        }

    }


    public static void ResolveJson_output(String json_string, Map<String, Firm> firmmapping) {
        if (json_string.equals("[]")) {
            return;
        }
        JSONArray jsonArray = null;
        try {
            jsonArray = new JSONArray(json_string);
        } catch (JSONException e) {
            e.printStackTrace();
        }
//        System.out.println(json_string);
        for (int i = 0; i < jsonArray.length(); i++) {

            try {
                String productline_cn = jsonArray.getJSONObject(i).getString("PBF_SHORTNAME");
                double day_ripeout = jsonArray.getJSONObject(i).getDouble("AOY_SUMYIELD");
                double month_ripeout = jsonArray.getJSONObject(i).getDouble("AOY_SUMYIELDMON");
                double day_coalconsum = jsonArray.getJSONObject(i).getDouble("DAYDEPLETE");
                double month_coalconsum = jsonArray.getJSONObject(i).getDouble("MONDEPLETE");
                double day_powergen = jsonArray.getJSONObject(i).getDouble("YUYIELD");
                double month_powergen = jsonArray.getJSONObject(i).getDouble("YUYIELDMON");
                double month_run_min = jsonArray.getJSONObject(i).getDouble("AOY_COURSEMON");
                double month_totalhour = jsonArray.getJSONObject(i).getDouble("MONRUN");
                double month_run_day = jsonArray.getJSONObject(i).getDouble("TOTALRUNDAY");
                String firmid = jsonArray.getJSONObject(i).getString("DAE_FIRM");

//                if (fcao!=0&&kh!=0) {

                FiredSystem firedSystem = null;
                Firm firm = firmmapping.get(firmid);
                if(firm==null){
                    continue;
                }
                for (DefaultProductline pl : firm.getProductlinemapping().values()) {
                    if (pl.getProductline_cn().equals(productline_cn) || pl.getProductline_cn().equals("浙江" + productline_cn)
                            || pl.getProductline_cn().equals(productline_cn + "红狮")
                            || pl.getProductline_cn().equals("江西" + productline_cn)
                            || pl.getProductline_cn().equals("尼泊尔" + productline_cn)
                            || pl.getProductline_cn().equals("广西" + productline_cn)
                            || pl.getProductline_cn().equals("宁远" + productline_cn)||pl.getProductline_cn().equals("老挝" + productline_cn)) {
                        for (Map.Entry<String, FiredSystem> firedSystemEntry : ((DefaultProductline) pl).getFiredSystemmapping().entrySet()) {
                            firedSystem = firedSystemEntry.getValue();
                        }
                        if (firedSystem != null) {
                            firedSystem.setDay_output(day_ripeout);
                            firedSystem.setMonth_output(month_ripeout);
                            firedSystem.setDay_coalconsum(day_coalconsum);
                            firedSystem.setMonth_coalconsum(month_coalconsum);
                            firedSystem.setDay_powergen(day_powergen);
                            firedSystem.setMonth_powergen(month_powergen);
                            firedSystem.setMonth_run_day(month_run_day);
                            firedSystem.setMonth_run_min(month_run_min);
                            firedSystem.setMonth_totalhour(month_totalhour);
                        }

                    }

                }

//                }

            } catch (JSONException e) {
//                System.out.println(jsonArray);
                e.printStackTrace();
            }
        }

    }


    public static String listToString(List<String> list, char separator) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            sb.append(macheneregular(list.get(i))).append(separator);
        }
        return sb.toString().substring(0, sb.toString().length() - 1);
    }

    public  static String macheneregular(String s){
        if((s.indexOf(".IN")!=-1)||(s.indexOf(".PV")!=-1)||(s.indexOf(".VALUE")!=-1)){

            s="\""+s+"\"";
        }


        return s;



    }


}
