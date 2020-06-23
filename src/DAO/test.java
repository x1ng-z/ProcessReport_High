package DAO;

import Management.ProcessMgr;
import Model.*;
import Task_Service.Service4get_realdata;
import ToolUnits.DynamicProxyHandler;
import ToolUnits.Tools;
import org.influxdb.InfluxDB;
import org.influxdb.dto.BoundParameterQuery;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static java.util.concurrent.TimeUnit.NANOSECONDS;

public class test {
    public static void main(String[] args) {


        Map<String, Firm> firmmaping = ProcessMgr.getProcessMgr_instance(null).getFirmmmaping();

        Firm firm = firmmaping.get("1002");

       Map<String,Productline> pls= firm.getProductlinemapping();
        Productline one=pls.get("0001E110000000000EYU");
        Influxdb_Access_Data.get_Realtimedata(one.getRegionfirm(),one.getTags(),null,60,one,false,0);

//            Map<String, Productline> productlinemapping = firm.getProductlinemapping();
//


    }
}