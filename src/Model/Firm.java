package Model;

import java.util.HashMap;
import java.util.Map;

public class Firm {
    private String firmid;
    private String firmname;
    private String firmshortname;
    private Map<String, DefaultProductline> productlinemapping;

    private boolean isupdate=false;//回转窑产量数据是否已经更新

    public String getFirmid() {
        return firmid;
    }

    public void setFirmid(String firmid) {
        this.firmid = firmid;
    }

    public String getFirmname() {
        return firmname;
    }

    public void setFirmname(String firmname) {
        this.firmname = firmname;
    }

    public String getFirmshortname() {
        return firmshortname;
    }

    public void setFirmshortname(String firmshortname) {
        this.firmshortname = firmshortname;
    }

    public Map<String, DefaultProductline> getProductlinemapping() {
        return productlinemapping;
    }

    public void setProductlinemapping(Map<String, DefaultProductline> productlinemapping) {
        this.productlinemapping = productlinemapping;
    }

    public Firm firmclone(){

        Firm firm=new Firm();

        firm.setFirmshortname(firmshortname);
        firm.setFirmname(firmname);
        firm.setFirmid(firmid);

        Map<String, DefaultProductline> tempproductlinemapping=new HashMap<String, DefaultProductline>();

        for(Map.Entry<String, DefaultProductline> stringProductlineEntry:productlinemapping.entrySet()){
            tempproductlinemapping.put(stringProductlineEntry.getKey(),stringProductlineEntry.getValue().productlineclone());

        }
        firm.setProductlinemapping(tempproductlinemapping);


        return firm;

    }

    public boolean isIsupdate() {
        return isupdate;
    }

    public void setIsupdate(boolean isupdate) {
        this.isupdate = isupdate;
    }
}
