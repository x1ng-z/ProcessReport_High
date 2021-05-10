package Model;

import ToolUnits.Tools;
import org.apache.log4j.Logger;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;


/**
 * defaultType:
 * +-----------|-------+
 * |   status  |    NO |
 * +-----------+-------+
 * |LowlowAlarm|    0  |
 * +-------------------+
 * |LowAlarm   |    1  |
 * +-------------------+
 * |HighAlarm  |    2  |
 * +-------------------+
 * |HHignAlarm |    3  |
 * +-------------------+
 * |ChangeRate |    4  |
 * +-------------------+
 */

public class Tag4properties implements BaseProperties {
    // measurepoint base properties
    private static Logger logger=Logger.getLogger(Tag4properties.class);
    private Long noAlarmtime =  3*60* 1000 + (System.currentTimeMillis());

    public static final int MAXLEVEL = 5;
    public static final double P_INITIAL = 1e-8;
    public static final double N_INITIAL = -1e-8;
    public static final String ALARMMONITOR = "alarm";
    public static final String OPERATEMONITOR = "operate";
    public static final String ALLVALUEMONITOR = "allvalue";
    public static final String ALLVALUENODYNAMICMONITOR = "allvaluenodynamic";
    public static final String NEGATIVEMODE = "negative_mode";
    private int id;
    private int LOWLOWALARM = 0;
    private int LOWALARM = 1;
    private int HIGHALARM = 2;
    private int HIGHHIGHALARM = 3;
    private int CHANGERATEALARM = 4;


    private String cn;
    private String tag;
    private double highhighbase;
    private double highbase;
    private double lowlowbase;
    private double lowbase;
    private String productlinename;
    private String device;
    private String systemno;
    private double value=0;
    private Date updatainstant;
    private int decision_delay;
    private double fix_changerate;
    private double currentchangerate;
    private double positive_operate_changerate;
    private double negative_operate_changerate;
    private String type;/**设备、工艺的编译*///device process
    //按照时间降序排列
    private List<Double> minvalues = new CopyOnWriteArrayList<Double>();
    private List<Date> mindates = new CopyOnWriteArrayList<Date>();
    private double tempchangerate;
    private String processtype;
    private Integer deviceAlarmJudgmentSrc;//设备的点号是否需要报警的判断点号，如回转窑的电流，没电流就回转窑上的位号都不需要报警了

    private int isrunvalide;//运行状态进行报警判断还是停机进行判断

    private Instant stoptimestep;//开机时间戳
    private Instant runtimestep;//关机时间戳


    private Double mean60sec=0d;
    //Dymatic AlarmLine properties:

    private int pointer_High = 0;

    private int pointer_Low = 0;

    private int poniter_HighHigh = 0;

    private int pointer_LowLow = 0;


    private double[] highlinepool;

    private double[] highhighlinepool;

    private double[] lowlinepool;

    private double[] lowlowlinepool;

    private long high_holdontime = 0l;

    private long highhigh_holdontime = 0l;

    private long low_holdontime = 0l;

    private long lowlow_holdontime = 0l;

    private Map<Integer,Instant> lastAlarmtimes;//key alarmcode value=最近一次的报警时间

    private String alarmtmonitor;//type operate or dynamic
    // type operate
    private double operate_range_limit;

    private boolean isaudio;
    private boolean isalarm;
    private String topic;
    private String alarm_mode;

    public Long getNoAlarmtime() {
        return noAlarmtime;
    }



    public String getAlarmtmonitor() {
        return alarmtmonitor;
    }

    public void setAlarmtmonitor(String alarmtmonitor) {
        this.alarmtmonitor = alarmtmonitor;
    }

    public double getOperate_range_limit() {
        return operate_range_limit;
    }

    public void setOperate_range_limit(double operate_range_limit) {
        this.operate_range_limit = operate_range_limit;
    }

    public boolean isIsaudio() {
        return isaudio;
    }

    public void setIsaudio(boolean isaudio) {
        this.isaudio = isaudio;
    }


    public String getCn() {
        return cn;
    }

    public void setCn(String cn) {
        this.cn = cn;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public double getHighhighbase() {
        return highhighbase;
    }

    public void setHighhighbase(double highhighbase) {
        this.highhighbase = highhighbase;
    }

    public double getHighbase() {
        return highbase;
    }

    public void setHighbase(double highbase) {
        this.highbase = highbase;
    }

    public double getLowlowbase() {
        return lowlowbase;
    }

    public void setLowlowbase(double lowlowbase) {
        this.lowlowbase = lowlowbase;
    }

    public double getLowbase() {
        return lowbase;
    }

    public void setLowbase(double lowbase) {
        this.lowbase = lowbase;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getSystemno() {
        return systemno;
    }

    public void setSystemno(String systemno) {
        this.systemno = systemno;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }


    public Tag4properties tagclone() {
        Tag4properties tag4properties = new Tag4properties();
        tag4properties.setTag(tag);
        tag4properties.setLowbase(lowbase);
        tag4properties.setLowlowbase(lowlowbase);
        tag4properties.setHighbase(highbase);
        tag4properties.setHighhighbase(highhighbase);
        tag4properties.setDevice(device);
        tag4properties.setProductlinename(productlinename);
        tag4properties.setSystemno(systemno);
        tag4properties.setCn(cn);
        tag4properties.setValue(value);
        tag4properties.setNegative_operate_changerate(negative_operate_changerate);
        tag4properties.setType(type);
        tag4properties.setPositive_operate_changerate(positive_operate_changerate);
        tag4properties.setFix_changerate(fix_changerate);
        tag4properties.setDecision_delay(decision_delay);

        tag4properties.setPointer_High(pointer_High);
        tag4properties.setPoniter_HighHigh(poniter_HighHigh);
        tag4properties.setPointer_Low(pointer_Low);
        tag4properties.setPointer_LowLow(pointer_LowLow);
        tag4properties.setHighlinepool(highlinepool);
        tag4properties.setHighhighlinepool(highhighlinepool);
        tag4properties.setLowlinepool(lowlinepool);
        tag4properties.setLowlowlinepool(lowlowlinepool);
        tag4properties.setHighhigh_holdontime(highhigh_holdontime);
        tag4properties.setHigh_holdontime(high_holdontime);
        tag4properties.setLow_holdontime(low_holdontime);
        tag4properties.setLowlow_holdontime(lowlow_holdontime);
        tag4properties.setAlarmtmonitor(alarmtmonitor);
        tag4properties.setOperate_range_limit(operate_range_limit);
        tag4properties.setIsaudio(isaudio);
        tag4properties.setIsalarm(isalarm);
        tag4properties.setCurrentchangerate(currentchangerate);
        tag4properties.setTopic(topic);
        tag4properties.setProcesstype(processtype);

        try {
            if (updatainstant == null) {
                tag4properties.setUpdatainstant(null);
            } else {
                tag4properties.setUpdatainstant((Date) updatainstant.clone());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tag4properties;
    }

    public Date getUpdatainstant() {
        return updatainstant;
    }

    public void setUpdatainstant(Date updatainstant) {
        this.updatainstant = updatainstant;
    }

    public int getDecision_delay() {
        return decision_delay;
    }

    public void setDecision_delay(int decision_delay) {
        this.decision_delay = decision_delay;
    }

    public double getFix_changerate() {
        return fix_changerate;
    }

    public void setFix_changerate(double fix_changerate) {
        this.fix_changerate = fix_changerate;
    }

    public double getPositive_operate_changerate() {
        return positive_operate_changerate;
    }

    public void setPositive_operate_changerate(double positive_operate_changerate) {
        this.positive_operate_changerate = positive_operate_changerate;
    }
    public void setMinvalues(List<Double> minvalues) {
        this.minvalues = minvalues;
    }

    public double getNegative_operate_changerate() {
        return negative_operate_changerate;
    }

    public void setNegative_operate_changerate(double negative_operate_changerate) {
        this.negative_operate_changerate = negative_operate_changerate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public int getPointer_High() {
        return pointer_High;
    }

    public void setPointer_High(int pointer_High) {
        this.pointer_High = pointer_High;
    }

    public int getPointer_Low() {
        return pointer_Low;
    }

    public void setPointer_Low(int pointer_Low) {
        this.pointer_Low = pointer_Low;
    }

    public int getPoniter_HighHigh() {
        return poniter_HighHigh;
    }

    public void setPoniter_HighHigh(int poniter_HighHigh) {
        this.poniter_HighHigh = poniter_HighHigh;
    }

    public int getPointer_LowLow() {
        return pointer_LowLow;
    }

    public void setPointer_LowLow(int pointer_LowLow) {
        this.pointer_LowLow = pointer_LowLow;
    }

    public double[] getHighlinepool() {
        return highlinepool;
    }

    public void setHighlinepool(double[] highlinepool) {
        this.highlinepool = highlinepool;
    }

    public double[] getHighhighlinepool() {
        return highhighlinepool;
    }

    public void setHighhighlinepool(double[] highhighlinepool) {
        this.highhighlinepool = highhighlinepool;
    }

    public double[] getLowlinepool() {
        return lowlinepool;
    }

    public void setLowlinepool(double[] lowlinepool) {
        this.lowlinepool = lowlinepool;
    }

    public double[] getLowlowlinepool() {
        return lowlowlinepool;
    }

    public void setLowlowlinepool(double[] lowlowlinepool) {
        this.lowlowlinepool = lowlowlinepool;
    }

    public long getHigh_holdontime() {
        return high_holdontime;
    }

    public void setHigh_holdontime(long high_holdontime) {
        this.high_holdontime = high_holdontime;
    }

    public long getHighhigh_holdontime() {
        return highhigh_holdontime;
    }

    public void setHighhigh_holdontime(long highhigh_holdontime) {
        this.highhigh_holdontime = highhigh_holdontime;
    }

    public long getLow_holdontime() {
        return low_holdontime;
    }

    public void setLow_holdontime(long low_holdontime) {
        this.low_holdontime = low_holdontime;
    }

    public long getLowlow_holdontime() {
        return lowlow_holdontime;
    }

    public void setLowlow_holdontime(long lowlow_holdontime) {
        this.lowlow_holdontime = lowlow_holdontime;
    }

    public String getProductlinename() {
        return productlinename;
    }

    public void setProductlinename(String productlinename) {
        this.productlinename = productlinename;
    }

    public void init() {

        lastAlarmtimes=new HashMap<>();

        lastAlarmtimes.put(LOWLOWALARM,null);
        lastAlarmtimes.put(LOWALARM,null);
        lastAlarmtimes.put(HIGHALARM,null);
        lastAlarmtimes.put(HIGHHIGHALARM,null);
        lastAlarmtimes.put(CHANGERATEALARM,null);


//        if((highhighbase>=highbase)&&(lowlowbase<=lowbase)){
        /**
         *
         * dynamic line High
         * */

        double dishigh = highhighbase - highbase;
        double[] highline = new double[Tag4properties.MAXLEVEL];

        if (dishigh > 0) {//如果这个不相等
            if (highbase == 0) {
                setHighbase(Tag4properties.P_INITIAL);
            }
            double percent = dishigh / highbase;
            highline[0] = highbase;
            highline[1] = highbase * (1.0f + percent * (0.33f));
            highline[2] = highbase * (1.0f + percent * (0.66f));
            highline[3] = highhighbase;
            highline[4] = (Double.MAX_VALUE);
        } else {//如果这个相等，权限交给高高限去判断
            highline[0] = (Double.MAX_VALUE);
            highline[1] = (Double.MAX_VALUE);
            highline[2] = (Double.MAX_VALUE);
            highline[3] = (Double.MAX_VALUE);
            highline[4] = (Double.MAX_VALUE);
        }
        setHighlinepool(highline);
        setPointer_High(0);
        setHigh_holdontime(0L);


        /**
         *
         * dynamic line HighHigh
         * */

        double[] hhighline = new double[Tag4properties.MAXLEVEL];

        if (highhighbase >= 0) {

            if (highhighbase == 0) {
                setHighhighbase(Tag4properties.P_INITIAL);
            }

            hhighline[0] = highhighbase;
            hhighline[1] = highhighbase * (1.0f + 0.1f);
            hhighline[2] = highhighbase * (1.0f + 0.2f);
            hhighline[3] = highhighbase * (1.0f + 0.5f);
            hhighline[4] = (Double.MAX_VALUE);
        } else {
            hhighline[0] = highhighbase;
            hhighline[1] = highhighbase * (1.0f - 0.1f);
            hhighline[2] = highhighbase * (1.0f - 0.2f);
            hhighline[3] = highhighbase * (1.0f - 0.5f);
            hhighline[4] = (Double.MAX_VALUE);
        }

        setHighhighlinepool(hhighline);
        setPoniter_HighHigh(0);
        setHighhigh_holdontime(0L);


        /**
         * dynamic line Low
         *
         * */

        double dislow = lowbase - lowlowbase;
        double[] lowline = new double[Tag4properties.MAXLEVEL];

        if (dislow > 0) {

            if (lowlowbase == 0) {
                setLowlowbase(Tag4properties.N_INITIAL);
            }
            double percent = dislow / lowlowbase;
            lowline[0] = lowbase;
            lowline[1] = lowlowbase * (1.0f + percent * (0.66));
            lowline[2] = lowlowbase * (1.0f + percent * (0.33));
            lowline[3] = lowlowbase;
            lowline[4] = -Double.MAX_VALUE;
        } else {
            lowline[0] = -Double.MAX_VALUE;
            lowline[1] = -Double.MAX_VALUE;
            lowline[2] = -Double.MAX_VALUE;
            lowline[3] = -Double.MAX_VALUE;
            lowline[4] = -Double.MAX_VALUE;
        }
        setLowlinepool(lowline);
        setPointer_Low(0);
        setLow_holdontime(0L);


        /**
         *
         * dynamic line lowlow
         * */

        double[] lowlowlinepool = new double[Tag4properties.MAXLEVEL];
        if (lowlowbase <= 0) {

            if (lowlowbase == 0) {
                setLowlowbase(Tag4properties.N_INITIAL);
            }
            lowlowlinepool[0] = lowlowbase;
            lowlowlinepool[1] = lowlowbase * (1.0f + 0.1f);
            lowlowlinepool[2] = lowlowbase * (1.0f + 0.2f);
            lowlowlinepool[3] = lowlowbase * (1.0f + 0.5f);
            lowlowlinepool[4] = -Double.MAX_VALUE;
        } else {
            lowlowlinepool[0] = lowlowbase;
            lowlowlinepool[1] = lowlowbase * (1.0f - 0.1f);
            lowlowlinepool[2] = lowlowbase * (1.0f - 0.2f);
            lowlowlinepool[3] = lowlowbase * (1.0f - 0.5f);
            lowlowlinepool[4] = -Double.MAX_VALUE;
        }

        setLowlowlinepool(lowlowlinepool);
        setPointer_LowLow(0);
        setLowlow_holdontime(0L);


    }


    public List<Double> getMinvalues() {
        return minvalues;
    }

    public void addMinvalues(Double minvalues) {
        this.minvalues.add(minvalues);
    }

    public List<Date> getMindates() {
        return mindates;
    }

    public void addMindates(Date mindates) {
        this.mindates.add(mindates);
    }


    public void clearMindates() {
        this.mindates.clear();
    }

    public void clearMinvalues() {
        this.minvalues.clear();

    }

    public boolean isIsalarm() {
        return isalarm;
    }

    public void setIsalarm(boolean isalarm) {
        this.isalarm = isalarm;
    }

    public Instant getLastAlarmtime(int alarmcode) {
        return lastAlarmtimes.get(alarmcode);
    }

    public void setLastAlarmtime(int alarmcode,Instant lastAlarmtime) {
        lastAlarmtimes.put(alarmcode,lastAlarmtime);
    }

    public synchronized void update() {

        if (minvalues.size() == 0) {
            return;
        }

        List<Double> newAndold = Tools.gettailAndheard(minvalues);

        if (newAndold == null || newAndold.size() != 2) {
            if(newAndold.size()==1){
                value = newAndold.get(0);
            }
            return;
        }

        try {
            value = newAndold.get(0);
        } catch (Exception e) {
            logger.error(e);
        }

        for (int i = 0; i < mindates.size(); ++i) {
            if (mindates.get(i) != null) {
                updatainstant = mindates.get(i);
                break;
            }
        }

        if (minvalues.size() != 0) {
            currentchangerate = Math.abs(newAndold.get(0) - newAndold.get(1));
        } else {
            currentchangerate = 0;
        }

    }

    public double getCurrentchangerate() {
        return currentchangerate;
    }

    public void setCurrentchangerate(double currentchangerate) {
        this.currentchangerate = currentchangerate;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public double getTempchangerate() {

        if (minvalues.size() != 0) {
            tempchangerate = Math.abs((minvalues.get(0) - minvalues.get(minvalues.size() - 1))/minvalues.get(minvalues.size() - 1)==0?Tag4properties.P_INITIAL:minvalues.get(minvalues.size() - 1));
            return tempchangerate;
        }
        return 0d;

    }

    public String getProcesstype() {
        return processtype;
    }

    public void setProcesstype(String processtype) {
        this.processtype = processtype;
    }

    public String getAlarm_mode() {
        return alarm_mode;
    }

    public void setAlarm_mode(String alarm_mode) {
        this.alarm_mode = alarm_mode;
    }

    public int getLOWLOWALARM() {
        return LOWLOWALARM;
    }

    public void setLOWLOWALARM(int LOWLOWALARM) {
        this.LOWLOWALARM = LOWLOWALARM;
    }

    public int getLOWALARM() {
        return LOWALARM;
    }

    public void setLOWALARM(int LOWALARM) {
        this.LOWALARM = LOWALARM;
    }

    public int getHIGHALARM() {
        return HIGHALARM;
    }

    public void setHIGHALARM(int HIGHALARM) {
        this.HIGHALARM = HIGHALARM;
    }

    public int getHIGHHIGHALARM() {
        return HIGHHIGHALARM;
    }

    public void setHIGHHIGHALARM(int HIGHHIGHALARM) {
        this.HIGHHIGHALARM = HIGHHIGHALARM;
    }

    public int getCHANGERATEALARM() {
        return CHANGERATEALARM;
    }

    public void setCHANGERATEALARM(int CHANGERATEALARM) {
        this.CHANGERATEALARM = CHANGERATEALARM;
    }

    public Integer getDeviceAlarmJudgmentSrc() {
        return deviceAlarmJudgmentSrc;
    }

    public void setDeviceAlarmJudgmentSrc(Integer deviceAlarmJudgmentSrc) {
        this.deviceAlarmJudgmentSrc = deviceAlarmJudgmentSrc;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIsrunvalide() {
        return isrunvalide;
    }

    public void setIsrunvalide(int isrunvalide) {
        this.isrunvalide = isrunvalide;
    }

    public Instant getStoptimestep() {
        return stoptimestep;
    }

    public void setStoptimestep(Instant stoptimestep) {
        this.stoptimestep = stoptimestep;
    }

    public Instant getRuntimestep() {
        return runtimestep;
    }

    public void setRuntimestep(Instant runtimestep) {
        this.runtimestep = runtimestep;
    }
}
