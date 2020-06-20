package Model;

import ToolUnits.Tools;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

public class Operate_Message extends AlarmMessage{

    private double coal_consume_before;
    private double coal_consume_after;


    public double getCoal_consume_before() {
        return coal_consume_before;
    }

    public void setCoal_consume_before(double coal_consume_before) {
        this.coal_consume_before = coal_consume_before;
    }

    public double getCoal_consume_after() {
        return coal_consume_after;
    }

    public void setCoal_consume_after(double coal_consume_after) {
        this.coal_consume_after = coal_consume_after;
    }

    public String toString() {

        return super.toString();
//        return this.getClass().getSimpleName()+"%"+Tools.InstanttoString(getGenertime())+"%"+getProductline()+"%"+getDevice()+"%"+getCn()+"%"+getTag_value_before()+"%"+getTag_value_after()+"%"+getDefaultcode()+"%"+super.getId()+"%"+super.getProcessStatus()+"%"+super.getBapdefaultId();
    }
}

