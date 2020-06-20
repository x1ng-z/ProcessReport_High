package Model;

import java.util.List;
import java.util.Map;

public interface Product {
    Map<String,Tag4properties> getTags();


     Tag4properties getRaw_judgerelu() ;

     void setRaw_judgerelu(Tag4properties raw_judgerelu) ;

     Tag4properties getFired_judgerelu() ;

     void setFired_judgerelu(Tag4properties fired_judgerelu) ;
     List<String> tagnamesInproductline();

    public void addDeviceAlarmjudgeRsc(String deviceName,Tag4properties tag);

     void removeDeviceAlarmjudgeRsc(String deviceName);
  Double findDeviceAlarmjudgeRsc(String deviceName);

}
