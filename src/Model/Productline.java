package Model;

import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;

public class Productline implements Product {
    private final static int MESSAGESIZE=5;
    private String productline_cn;
    private String ip;
    private String region;
    private String productline_id;
    private String regionfirm;
    private ConcurrentLinkedQueue<Operate_Message> current_raw_operate = new ConcurrentLinkedQueue<Operate_Message>();
    private ConcurrentLinkedQueue<AlarmMessage> current_raw_alarm = new ConcurrentLinkedQueue<AlarmMessage>();
    private ConcurrentLinkedQueue<Operate_Message> current_fired_operate = new ConcurrentLinkedQueue<Operate_Message>();
    private ConcurrentLinkedQueue<AlarmMessage> current_fired_alarm = new ConcurrentLinkedQueue<AlarmMessage>();
    private Tag4properties raw_judgerelu;//用于判定是否需要判断报警，生料磨机电流为0，不需要判断
    private Tag4properties fired_judgerelu;//用于判定是否需要判断报警，回转窑电流为0，不需要判断
    private List<String> alltagnameInpruductline=null;



    private Map<String, RawSystem> rawSystemmapping;
    private Map<String, FiredSystem> firedSystemmapping;

    /**用于保存设备是否需要报警判断位号、如：位号的设备名称：辊压机，且deviceAlarmJudgmentSrc是为1的，那么意思就是辊压机的位号*/
    private Map<String,Tag4properties> deviceAlarmjudgeRsc=new HashMap<>();


    public void addDeviceAlarmjudgeRsc(String deviceName,Tag4properties tag){
        deviceAlarmjudgeRsc.put(deviceName,tag);
    }

    public void removeDeviceAlarmjudgeRsc(String deviceName){
        deviceAlarmjudgeRsc.remove(deviceName);
    }

    public Double findDeviceAlarmjudgeRsc(String deviceName){
        Tag4properties tag=deviceAlarmjudgeRsc.get(deviceName);
        if(tag==null){
            return null;
        }else {
            return tag.getValue();
        }


    }

    public String getProductline_cn() {
        return productline_cn;
    }

    public void setProductline_cn(String productline_cn) {
        this.productline_cn = productline_cn;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Map<String, RawSystem> getRawSystemmapping() {
        return rawSystemmapping;
    }

    public void setRawSystemmapping(Map<String, RawSystem> rawSystemmapping) {
        this.rawSystemmapping = rawSystemmapping;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getProductline_id() {
        return productline_id;
    }

    public void setProductline_id(String productline_id) {
        this.productline_id = productline_id;
    }

    public String getRegionfirm() {
        return regionfirm;
    }

    public void setRegionfirm(String regionfirm) {
        this.regionfirm = regionfirm;
    }

    @Override
    public  List<String> tagnamesInproductline() {

        if(alltagnameInpruductline==null){

            alltagnameInpruductline=new LinkedList<String>();

            Map<String,Tag4properties> tag4propertiesMap=getTags();

            for(Tag4properties tag:tag4propertiesMap.values()){
                alltagnameInpruductline.add(tag.getTag());
            }

        }

        return alltagnameInpruductline;

        }

    @Override
    public Map<String, Tag4properties> getTags() {
        Map<String, Tag4properties> alltags = new HashMap<String, Tag4properties>();

        for (RawSystem rawSystem : rawSystemmapping.values()) {
            alltags.putAll(rawSystem.getTagMapping());
        }


        for (FiredSystem firedSystem : firedSystemmapping.values()) {
            alltags.putAll(firedSystem.getTagMapping());
        }


        return alltags;
    }


    public Productline productlineclone() {
        Productline tempproduct = new Productline();
        tempproduct.setRegion(region);
        tempproduct.setProductline_id(productline_id);
        tempproduct.setProductline_cn(productline_cn);
        tempproduct.setIp(ip);
        tempproduct.setRegionfirm(regionfirm);


        tempproduct.setCurrent_raw_operate(current_raw_operate);
        tempproduct.setCurrent_raw_alarm(current_raw_alarm);
//        tempproduct.setRaw02Fineness(raw02Fineness);


        Map<String, RawSystem> temrawSystemMap = new HashMap<String, RawSystem>();
        Map<String, FiredSystem> temfiredSystem = new HashMap<String, FiredSystem>();

        for (Map.Entry<String, RawSystem> stringRawSystemEntry : rawSystemmapping.entrySet()) {

            RawSystem rawSystem = stringRawSystemEntry.getValue();
            temrawSystemMap.put(stringRawSystemEntry.getKey(), rawSystem.rawclone());
        }
        tempproduct.setRawSystemmapping(temrawSystemMap);


        for (Map.Entry<String, FiredSystem> firedSystemEntry : firedSystemmapping.entrySet()) {

            FiredSystem firedSystem = firedSystemEntry.getValue();
            temfiredSystem.put(firedSystemEntry.getKey(), firedSystem.firedclone());
        }
        tempproduct.setFiredSystemmapping(temfiredSystem);


        return tempproduct;

    }


    public Map<String, FiredSystem> getFiredSystemmapping() {
        return firedSystemmapping;
    }

    public void setFiredSystemmapping(Map<String, FiredSystem> firedSystemmapping) {
        this.firedSystemmapping = firedSystemmapping;
    }


    public ConcurrentLinkedQueue<Operate_Message> getCurrent_raw_operate() {
        return current_raw_operate;
    }

    public void setCurrent_raw_operate(ConcurrentLinkedQueue<Operate_Message> current_raw_operate) {
        this.current_raw_operate = current_raw_operate;
    }

    public void addCurrent_raw_operate(Operate_Message operate_message) {
        while (current_raw_operate.size() > MESSAGESIZE) {
            current_raw_operate.poll();
        }
        current_raw_operate.add(operate_message);

    }

    public ConcurrentLinkedQueue<AlarmMessage> getCurrent_raw_alarm() {
        return current_raw_alarm;
    }

    public void setCurrent_raw_alarm(ConcurrentLinkedQueue<AlarmMessage> current_raw_alarm) {
        this.current_raw_alarm = current_raw_alarm;
    }


    public void addCurrent_raw_alarm(AlarmMessage alarmMessage) {
        while (current_raw_alarm.size() > MESSAGESIZE) {
            current_raw_alarm.poll();
        }
        current_raw_alarm.add(alarmMessage);

    }



    public ConcurrentLinkedQueue<Operate_Message> getCurrent_fired_operate() {
        return current_fired_operate;
    }

    public void setCurrent_fired_operate(ConcurrentLinkedQueue<Operate_Message> current_fired_operate) {
        this.current_fired_operate = current_fired_operate;
    }


    public void addCurrent_fired_alarm(Operate_Message operate_message) {
        while (current_fired_operate.size() > MESSAGESIZE) {
            current_fired_operate.poll();
        }
        current_fired_operate.add(operate_message);

    }





    public ConcurrentLinkedQueue<AlarmMessage> getCurrent_fired_alarm() {
        return current_fired_alarm;
    }

    public void setCurrent_fired_alarm(ConcurrentLinkedQueue<AlarmMessage> current_fired_alarm) {
        this.current_fired_alarm = current_fired_alarm;
    }

    public void addCurrent_fired_alarm(AlarmMessage alarmMessage) {
        while (current_fired_alarm.size() > MESSAGESIZE) {
            current_fired_alarm.poll();
        }
        current_fired_alarm.add(alarmMessage);

    }


    public Tag4properties getRaw_judgerelu() {
        return raw_judgerelu;
    }

    public void setRaw_judgerelu(Tag4properties raw_judgerelu) {
        this.raw_judgerelu = raw_judgerelu;
    }

    public Tag4properties getFired_judgerelu() {
        return fired_judgerelu;
    }

    public void setFired_judgerelu(Tag4properties fired_judgerelu) {
        this.fired_judgerelu = fired_judgerelu;
    }
}
