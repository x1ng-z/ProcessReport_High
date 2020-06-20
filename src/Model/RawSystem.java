package Model;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class RawSystem {
    private String rawsystemno;
    private String productionline;
//    private String region;
//    private String regionfirm;
    private double raw02Fineness;
    private String type;
    private String rawsystem_id;
    private double rawdayyeild;
    private double rawmonthyeild;
    private Map<String,Tag4properties> TagMapping;


    public String getRawsystemno() {
        return rawsystemno;
    }

    public void setRawsystemno(String rawsystemno) {
        this.rawsystemno = rawsystemno;
    }

    public String getProductionline() {
        return productionline;
    }

    public void setProductionline(String productionline) {
        this.productionline = productionline;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Tag4properties> getTagMapping() {
        return TagMapping;
    }

    public void setTagMapping(Map<String, Tag4properties> tagMapping) {
        TagMapping = tagMapping;
    }


    public RawSystem rawclone()  {
        RawSystem temp=new RawSystem();

        temp.setType(type);
        temp.setRawsystemno(rawsystemno);
        temp.setProductionline(productionline);
        temp.setRawsystem_id(rawsystem_id);
        temp.setRaw02Fineness(raw02Fineness);
        temp.setRawdayyeild(rawdayyeild);
        temp.setRawmonthyeild(rawmonthyeild);


        Map<String,Tag4properties> submapping=new HashMap<String,Tag4properties>();

        Set<Map.Entry<String, Tag4properties>>  entries=TagMapping.entrySet();

        for(Map.Entry<String, Tag4properties> entry:entries){
            submapping.put(entry.getKey(),entry.getValue().tagclone());
        }

        temp.setTagMapping(submapping);
        return temp;
    }

    public String getRawsystem_id() {
        return rawsystem_id;
    }

    public void setRawsystem_id(String rawsystem_id) {
        this.rawsystem_id = rawsystem_id;
    }

    public double getRaw02Fineness() {
        return raw02Fineness;
    }

    public void setRaw02Fineness(double raw02Fineness) {
        this.raw02Fineness = raw02Fineness;
    }

    public double getRawdayyeild() {
        return rawdayyeild;
    }

    public void setRawdayyeild(double rawdayyeild) {
        this.rawdayyeild = rawdayyeild;
    }

    public double getRawmonthyeild() {
        return rawmonthyeild;
    }

    public void setRawmonthyeild(double rawmonthyeild) {
        this.rawmonthyeild = rawmonthyeild;
    }
}
