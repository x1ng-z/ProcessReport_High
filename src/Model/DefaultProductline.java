package Model;

import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Collectors;

public class DefaultProductline implements Productline {
    private final static int MESSAGESIZE = 5;
    private String productline_cn;
    private String ip;
    private String mesip;
    private String region;
    private String productline_id;
    private String productline_newid;
    private String regionfirm;
    private ConcurrentLinkedQueue<Operate_Message> current_raw_operate = new ConcurrentLinkedQueue<Operate_Message>();
    private ConcurrentLinkedQueue<AlarmMessage> current_raw_alarm = new ConcurrentLinkedQueue<AlarmMessage>();
    private ConcurrentLinkedQueue<Operate_Message> current_fired_operate = new ConcurrentLinkedQueue<Operate_Message>();
    private ConcurrentLinkedQueue<AlarmMessage> current_fired_alarm = new ConcurrentLinkedQueue<AlarmMessage>();
    //水泥磨
    private ConcurrentLinkedQueue<Operate_Message> current_cement_operate = new ConcurrentLinkedQueue<Operate_Message>();
    private ConcurrentLinkedQueue<AlarmMessage> current_cement_alarm = new ConcurrentLinkedQueue<AlarmMessage>();

    //质量报警
    private ConcurrentLinkedQueue<AlarmMessage> current_quality_alarm = new ConcurrentLinkedQueue<AlarmMessage>();
    private ConcurrentLinkedQueue<AlarmMessage> current_envptc_alarm = new ConcurrentLinkedQueue<AlarmMessage>();

    //余热发电
    private ConcurrentLinkedQueue<AlarmMessage> current_power_alarm = new ConcurrentLinkedQueue<AlarmMessage>();

    //保存用于判断是否需要报警的依据位号，key=device名称
    private Map<String, Tag4properties> raw_judgerelu = new HashMap<>();//用于判定是否需要判断报警，生料磨机电流为0，不需要判断
    private Map<String, List<Tag4properties>> fired_judgerelu = new HashMap<>();//用于判定是否需要判断报警，回转窑电流为0，不需要判断
    private Map<String, Tag4properties> cement_judgerelu = new HashMap<>();
    private Map<String, Tag4properties> power_judgerelu = new HashMap<>();//余热发电


    /**
     * 用于保存设备是否需要报警判断位号、如：位号的设备名称：辊压机，且deviceAlarmJudgmentSrc是为1的，那么意思就是辊压机的位号
     */
    private Map<String, Tag4properties> deviceAlarmjudgeRsc = new HashMap<>();

    private List<String> alltagnameInpruductline = null;


    //生料系统
    private Map<String, RawSystem> rawSystemmapping;
    //烧成系统
    private Map<String, FiredSystem> firedSystemmapping;
    //水泥磨系统
    private Map<String, CementSystem> cementSystemmapping;
    //质量系统
    private Map<String, Tag4properties> qulityTags = new HashMap<>();
    //余热发电
    private Map<String, PowerSystem> powerSystemmapping;

    @Override
    public void addDeviceAlarmjudgeRsc(String deviceName, Tag4properties tag) {
        deviceAlarmjudgeRsc.put(deviceName, tag);
    }

    @Override
    public void removeDeviceAlarmjudgeRsc(String deviceName) {
        deviceAlarmjudgeRsc.remove(deviceName);
    }

    @Override
    public Double findDeviceAlarmjudgeRsc(String deviceName) {
        Tag4properties tag = deviceAlarmjudgeRsc.get(deviceName);
        if (tag == null) {
            return null;
        } else {
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
    public List<String> tagnamesInproductline() {

        if (alltagnameInpruductline == null) {

            alltagnameInpruductline = new LinkedList<String>();

            Map<String, Tag4properties> tag4propertiesMap = getTags();

            for (Tag4properties tag : tag4propertiesMap.values()) {
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
            alltags.putAll(firedSystem.getTagMapping());//烧成
        }

        for (CementSystem cementSystem : cementSystemmapping.values()) {
            alltags.putAll(cementSystem.getTagMapping());//水泥磨
        }

        for (PowerSystem powerSystem : powerSystemmapping.values()) {
            alltags.putAll(powerSystem.getTagMapping());
        }


        return alltags;
    }


    public DefaultProductline productlineclone() {
        DefaultProductline tempproduct = new DefaultProductline();
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
        Map<String, PowerSystem> tempowerSystem = new HashMap<>();

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

        powerSystemmapping.forEach((k, v) -> {
            tempowerSystem.put(k, v.powerClone());
        });
        tempproduct.setPowerSystemmapping(tempowerSystem);
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


    public void addCurrent_fired_opt(Operate_Message operate_message) {
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

    public void addCurrent_fired_opt(AlarmMessage alarmMessage) {
        while (current_fired_alarm.size() > MESSAGESIZE) {
            current_fired_alarm.poll();
        }
        current_fired_alarm.add(alarmMessage);

    }

    public void addCurrent_cement_alarm(AlarmMessage alarmMessage) {
        while (current_cement_alarm.size() > MESSAGESIZE) {
            current_cement_alarm.poll();
        }
        current_cement_alarm.add(alarmMessage);
    }


    public void addCurrent_power_alarm(AlarmMessage alarmMessage) {
        while (current_power_alarm.size() > MESSAGESIZE) {
            current_power_alarm.poll();
        }
        current_power_alarm.add(alarmMessage);
    }


    public void addCurrent_cement_opt(Operate_Message alarmMessage) {
        while (current_cement_operate.size() > MESSAGESIZE) {
            current_cement_operate.poll();
        }
        current_cement_operate.add(alarmMessage);
    }


    public void addCurrent_quality_alarm(AlarmMessage alarmMessage) {
        while (current_quality_alarm.size() > MESSAGESIZE) {
            current_quality_alarm.poll();
        }
        current_quality_alarm.add(alarmMessage);
    }


    public void addCurrent_envptc_alarm(AlarmMessage alarmMessage) {
        while (current_envptc_alarm.size() > MESSAGESIZE) {
            current_envptc_alarm.poll();
        }
        current_envptc_alarm.add(alarmMessage);
    }

    @Override
    public Map<String, Tag4properties> getRaw_judgerelu() {
        return raw_judgerelu;
    }

    @Override
    public void addRaw_judgerelu(String device, Tag4properties raw_judgerelu) {
        this.raw_judgerelu.put(device, raw_judgerelu);
    }

    @Override
    public Map<String, List<Tag4properties>> getFired_judgerelu() {
        return fired_judgerelu;
    }


    public Tag4properties getFiredSepcielTag(String device, String cn) {
        List<Tag4properties> reluTags = fired_judgerelu.get(device);
        if (reluTags != null) {
            List<Tag4properties> rules = reluTags.stream().filter(tag -> tag.getCn().equals(cn)).collect(Collectors.toList());
            if (rules.size() == 0) {
                return null;
            } else {
                return rules.get(0);
            }
        }
        return null;
    }


    @Override
    public void addFired_judgerelu(Tag4properties fired_judgerelu) {
        List<Tag4properties> list = this.fired_judgerelu.get(fired_judgerelu.getDevice());
        if (null != list) {
            list.add(fired_judgerelu);
        } else {
            list = new ArrayList<>();
            list.add(fired_judgerelu);
            this.fired_judgerelu.put(fired_judgerelu.getDevice(), list);
        }
    }


    public Map<String, Tag4properties> getQulityTags() {
        return qulityTags;
    }

    public void setQulityTags(Map<String, Tag4properties> qulityTags) {
        this.qulityTags = qulityTags;
    }


    public ConcurrentLinkedQueue<AlarmMessage> getCurrent_quality_alarm() {
        return current_quality_alarm;
    }

    public ConcurrentLinkedQueue<AlarmMessage> getCurrent_envptc_alarm() {
        return current_envptc_alarm;
    }

    public Map<String, CementSystem> getCementSystemmapping() {
        return cementSystemmapping;
    }

    public void setCementSystemmapping(Map<String, CementSystem> cementSystemmapping) {
        this.cementSystemmapping = cementSystemmapping;
    }

    public ConcurrentLinkedQueue<Operate_Message> getCurrent_cement_operate() {
        return current_cement_operate;
    }

    public ConcurrentLinkedQueue<AlarmMessage> getCurrent_cement_alarm() {
        return current_cement_alarm;
    }

    @Override
    public Map<String, Tag4properties> getCement_judgerelu() {
        return cement_judgerelu;
    }

    @Override
    public void addCement_judgerelu(String device, Tag4properties cement_judgerelu) {
        this.cement_judgerelu.put(device, cement_judgerelu);
    }

    public String getProductline_newid() {
        return productline_newid;
    }

    public void setProductline_newid(String productline_newid) {
        this.productline_newid = productline_newid;
    }

    public String getMesip() {
        return mesip;
    }

    public void setMesip(String mesip) {
        this.mesip = mesip;
    }

    public Map<String, PowerSystem> getPowerSystemmapping() {
        return powerSystemmapping;
    }

    public void setPowerSystemmapping(Map<String, PowerSystem> powerSystemmapping) {
        this.powerSystemmapping = powerSystemmapping;
    }

    public Map<String, Tag4properties> getPower_judgerelu() {
        return power_judgerelu;
    }

    @Override
    public void addPower_judgerelu(String device, Tag4properties power_judgerelu) {
        this.power_judgerelu.put(device,power_judgerelu) ;
    }

    public ConcurrentLinkedQueue<AlarmMessage> getCurrent_power_alarm() {
        return current_power_alarm;
    }

    public void setCurrent_power_alarm(ConcurrentLinkedQueue<AlarmMessage> current_power_alarm) {
        this.current_power_alarm = current_power_alarm;
    }
}
