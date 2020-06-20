package Model;

import java.util.HashMap;
import java.util.Map;

public class Firm {
    private String firmid;
    private String firmname;
    private String firmshortname;
    private Map<String,Productline> productlinemapping;

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

    public Map<String, Productline> getProductlinemapping() {
        return productlinemapping;
    }

    public void setProductlinemapping(Map<String, Productline> productlinemapping) {
        this.productlinemapping = productlinemapping;
    }

    public Firm firmclone(){

        Firm firm=new Firm();

        firm.setFirmshortname(firmshortname);
        firm.setFirmname(firmname);
        firm.setFirmid(firmid);

        Map<String,Productline> tempproductlinemapping=new HashMap<String,Productline>();

        for(Map.Entry<String, Productline> stringProductlineEntry:productlinemapping.entrySet()){
            tempproductlinemapping.put(stringProductlineEntry.getKey(),stringProductlineEntry.getValue().productlineclone());

        }
        firm.setProductlinemapping(tempproductlinemapping);


        return firm;

    }
}
