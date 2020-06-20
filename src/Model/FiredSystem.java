package Model;

import ToolUnits.Tools;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class FiredSystem {
    private String productline;
    private String firedsystemno;
    private int type;
    private double ripe_coalconsump_pre_out;
    private double fcao;
    private double kh;
    private double day_output;
    private double month_output;


    private double day_coalconsum;
    private double month_coalconsum;
    private double day_powergen;
    private double month_powergen;
    private double month_run_min;
    private double month_totalhour;
    private double month_run_day;


    /**烧成系统位号：key:tagName;value object for Tag4properties*/
    private Map<String,Tag4properties> TagMapping;



    public String getProductline() {
        return productline;
    }

    public void setProductline(String productline) {
        this.productline = productline;
    }

    public String getFiredsystemno() {
        return firedsystemno;
    }

    public void setFiredsystemno(String firedsystemno) {
        this.firedsystemno = firedsystemno;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public double getRipe_coalconsump_pre_out() {

        if(day_output!=0){
            setRipe_coalconsump_pre_out(Tools.myround(day_coalconsum/day_output*1000d,1));
        }else {
            setRipe_coalconsump_pre_out(0);
        }

        return ripe_coalconsump_pre_out;
    }

    public void setRipe_coalconsump_pre_out(double ripe_coalconsump_pre_out) {
        this.ripe_coalconsump_pre_out = ripe_coalconsump_pre_out;
    }



    public double getKh() {
        return kh;
    }

    public void setKh(double kh) {
        this.kh = kh;
    }

    public double getDay_output() {
        return day_output;
    }

    public void setDay_output(double day_output) {
        this.day_output = day_output;
    }

    public double getMonth_output() {
        return month_output;
    }

    public void setMonth_output(double month_output) {
        this.month_output = month_output;
    }

    public Map<String, Tag4properties> getTagMapping() {
        return TagMapping;
    }

    public void setTagMapping(Map<String, Tag4properties> tagMapping) {
        TagMapping = tagMapping;
    }





    public FiredSystem firedclone()  {
        FiredSystem temp=new FiredSystem();
        temp.setDay_output(day_output);
        temp.setFiredsystemno(firedsystemno);
        temp.setFcao(fcao);
        temp.setMonth_output(month_output);
        temp.setProductline(productline);
        temp.setRipe_coalconsump_pre_out(ripe_coalconsump_pre_out);
        temp.setKh(kh);
        temp.setType(type);
        temp.setDay_powergen(day_powergen);

        temp.setMonth_powergen(month_powergen);

        temp.setMonth_totalhour(month_totalhour);
        temp.setMonth_run_min(month_run_min);
        temp.setMonth_run_day(month_run_day);

        temp.setDay_coalconsum(day_coalconsum);
        temp.setMonth_coalconsum(month_coalconsum);

        Map<String,Tag4properties> submapping=new HashMap<String,Tag4properties>();

        Set<Map.Entry<String, Tag4properties>> entries=TagMapping.entrySet();

        for(Map.Entry<String, Tag4properties> entry:entries){
            submapping.put(entry.getKey(),entry.getValue().tagclone());
        }

        temp.setTagMapping(submapping);
        return temp;
    }

    public double getFcao() {
        return fcao;
    }

    public void setFcao(double fcao) {
        this.fcao = fcao;
    }

    public double getDay_coalconsum() {
        return day_coalconsum;
    }

    public void setDay_coalconsum(double day_coalconsum) {
        this.day_coalconsum = day_coalconsum;
    }

    public double getMonth_coalconsum() {
        return month_coalconsum;
    }

    public void setMonth_coalconsum(double month_coalconsum) {
        this.month_coalconsum = month_coalconsum;
    }

    public double getDay_powergen() {
        return day_powergen;
    }

    public void setDay_powergen(double day_powergen) {
        this.day_powergen = day_powergen;
    }

    public double getMonth_powergen() {
        return month_powergen;
    }

    public void setMonth_powergen(double month_powergen) {
        this.month_powergen = month_powergen;
    }

    public double getMonth_run_min() {
        return month_run_min;
    }

    public void setMonth_run_min(double month_run_min) {
        this.month_run_min = month_run_min;
    }

    public double getMonth_totalhour() {
        return month_totalhour;
    }

    public void setMonth_totalhour(double month_totalhour) {
        this.month_totalhour = month_totalhour;
    }

    public double getMonth_run_day() {
        return month_run_day;
    }

    public void setMonth_run_day(double month_run_day) {
        this.month_run_day = month_run_day;
    }
}
