package Model;

import ToolUnits.Tools;

import java.time.Instant;

public class AlarmMessage {


    /**
     defaultType:
     +-----------|-------+
     |   processStatus  |    NO |
     +-----------+-------+
     |LowlowAlarm|    0  |
     +-------------------+
     |LowAlarm   |    1  |
     +-------------------+
     |HighAlarm  |    2  |
     +-------------------+
     |HHignAlarm |    3  |
     +-------------------+
     |ChangeRate |    4  |
     +-------------------+
     */

//    private String production_Linename;
//    private String production_LineId;
//    private String fix_devicename;//0主机设备（DEV_NAME）
//    private String fix_deviceNo;//1主机设备编号（DEV_NO ）
//    private String fix_union_tagname;//3位号说明编号（ DEV_TAG_NO）
//    private String fix_tagname;//4位号	           DEV_TAG
//    private String fix_ch_comment;//2位号说明	   DEV_TAGCH
//    private List<String> fix_de_te_el;//设备|工艺|电气	   DE_TE_EL
//    private String fix_process;//工序	           DEV_PRO
    private int id;

    private String productline;
    private String systemno;
    private String device;
    private String cn;
    private String tag;
    private double fix_hhi_lim;//高高限	           HHI_LIM
    private double fix_hign_lim;//高限	           HIGH_LIM
    private double fix_llo_lim;//低低限	           LLO_LIM
    private double fix_low_lim;//低限	           LOW_LIM
    private double fix_change_rate;//变化率

    private double currentchangeRate;
    private double tag_value_before;
    private double tag_value_after;
    private int defaultcode;
    private Instant genertime;
    private String processtype;//工艺类型对应数据中的type
    private String deviceOrProcess;//报警类型，工艺还是设备,电器
    private String bapdefaultId;//bap工单id

    /**
     * status报警信息处理状态
     * 0 -> 未发
     * 1 -> 已发
     * 2 -> 已确认
     * 3 -> 已处理
     * 4 -> 未处理
     * */
    private int processStatus;



    public String getProductline() {
        return productline;
    }

    public void setProductline(String productline) {
        this.productline = productline;
    }

    public String getSystemno() {
        return systemno;
    }

    public void setSystemno(String systemno) {
        this.systemno = systemno;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
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

    public Instant getGenertime() {
        return genertime;
    }

    public void setGenertime(Instant genertime) {
        this.genertime = genertime;
    }

    public double getCurrentchangeRate() {
        return currentchangeRate;
    }

    public void setCurrentchangeRate(double currentchangeRate) {
        this.currentchangeRate = currentchangeRate;
    }


    public double getFix_hhi_lim() {
        return fix_hhi_lim;
    }

    public void setFix_hhi_lim(double fix_hhi_lim) {
        this.fix_hhi_lim = fix_hhi_lim;
    }

    public double getFix_hign_lim() {
        return fix_hign_lim;
    }

    public void setFix_hign_lim(double fix_hign_lim) {
        this.fix_hign_lim = fix_hign_lim;
    }

    public double getFix_llo_lim() {
        return fix_llo_lim;
    }

    public void setFix_llo_lim(double fix_llo_lim) {
        this.fix_llo_lim = fix_llo_lim;
    }

    public double getFix_low_lim() {
        return fix_low_lim;
    }

    public void setFix_low_lim(double fix_low_lim) {
        this.fix_low_lim = fix_low_lim;
    }

    public double getFix_change_rate() {
        return fix_change_rate;
    }

    public void setFix_change_rate(double fix_change_rate) {
        this.fix_change_rate = fix_change_rate;
    }

    public int getDefaultcode() {
        return defaultcode;
    }

    public void setDefaultcode(int defaultcode) {
        this.defaultcode = defaultcode;
    }

    public double getTag_value_before() {
        return tag_value_before;
    }

    public void setTag_value_before(double tag_value_before) {
        this.tag_value_before = tag_value_before;
    }

    public double getTag_value_after() {
        return tag_value_after;
    }

    public void setTag_value_after(double tag_value_after) {
        this.tag_value_after = tag_value_after;
    }

    public String getProcesstype() {
        return processtype;
    }

    public void setProcesstype(String processtype) {
        this.processtype = processtype;
    }

    @Override
    public String toString() {

        return this.getClass().getSimpleName()+"%"+Tools.InstanttoString(genertime)+"%"+productline+"%"+device+"%"+cn+"%"+tag_value_before+"%"+tag_value_after+"%"+defaultcode+"%"+id+"%"+processStatus+"%"+deviceOrProcess+"%"+bapdefaultId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProcessStatus() {
        return processStatus;
    }

    public void setProcessStatus(int processStatus) {
        this.processStatus = processStatus;
    }

    public String getDeviceOrProcess() {
        return deviceOrProcess;
    }

    public void setDeviceOrProcess(String deviceOrProcess) {
        this.deviceOrProcess = deviceOrProcess;
    }

    public String getBapdefaultId() {
        return bapdefaultId;
    }

    public void setBapdefaultId(String bapdefaultId) {
        this.bapdefaultId = bapdefaultId;
    }
}
