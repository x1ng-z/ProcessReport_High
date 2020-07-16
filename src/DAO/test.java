package DAO;

import Management.ProcessMgr;
import Model.*;

import java.util.Map;

public class test {
    public static void main(String[] args) {


        Map<String, Firm> firmmaping = ProcessMgr.getProcessMgr_instance(null).getFirmmmaping();

        Firm firm = firmmaping.get("1002");

       Map<String, DefaultProductline> pls= firm.getProductlinemapping();
        DefaultProductline one=pls.get("0001E110000000000EYU");
        Influxdb_Access_Data.get_Realtimedata(one.getRegionfirm(),one.getTags(),null,60,one,false,0);

//            Map<String, Productline> productlinemapping = firm.getProductlinemapping();
//


    }
}