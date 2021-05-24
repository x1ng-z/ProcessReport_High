package Model;

import java.util.List;
import java.util.Map;

public interface Productline {
    Map<String,Tag4properties> getTags();


     Map<String,Tag4properties> getRaw_judgerelu() ;

     void addRaw_judgerelu(String device,Tag4properties raw_judgerelu) ;

     Map<String,List<Tag4properties>> getFired_judgerelu() ;

     void addFired_judgerelu(Tag4properties fired_judgerelu) ;
     List<String> tagnamesInproductline();

    public void addDeviceAlarmjudgeRsc(String deviceName,Tag4properties tag);

     void removeDeviceAlarmjudgeRsc(String deviceName);
  Double findDeviceAlarmjudgeRsc(String deviceName);


     Map<String, Tag4properties> getCement_judgerelu() ;

     void addCement_judgerelu(String device, Tag4properties cement_judgerelu);

    void addPower_judgerelu(String device, Tag4properties power_judgerelu);

}
