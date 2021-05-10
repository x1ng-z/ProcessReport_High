package ToolUnits;

import Model.DefaultProductline;
import Model.Tag4properties;
import Task_Service.Service_AlarmMonitor;

import java.lang.reflect.Method;
import java.time.Instant;
import java.util.List;

public class RealDateInterceptorImp implements Interceptor {

    private Tag4properties tag;
    private Service_AlarmMonitor service_alarmMonitor;
    private DefaultProductline defaultProductline;


    public RealDateInterceptorImp(Tag4properties tag, Service_AlarmMonitor service_alarmMonitor, DefaultProductline defaultProductline) {
        this.tag = tag;
        this.service_alarmMonitor = service_alarmMonitor;
        this.defaultProductline = defaultProductline;
    }

    @Override
    public boolean before(Object proxy, Object target, Method method, Object[] args) {
        String alarmonitor = tag.getAlarmtmonitor();
        if (alarmonitor == null) {
            return true;
        }

        switch (tag.getProcesstype()) {
            //停机判定
            case "raw":
                if (tag.getIsrunvalide() == 1) {
                    //开机进行判定
                    if (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                        tag.setStoptimestep(Instant.now());
                        return true;
                    } else {
                        if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getRaw_judgerelu().get(tag.getDevice()) != null) && (defaultProductline.getRaw_judgerelu().get(tag.getDevice()).getValue() < 5)) {//生料磨电流小于5停机
                            tag.setStoptimestep(Instant.now());
                            return true;
                        }
                    }
                    tag.setRuntimestep(Instant.now());
                } else {
                    //停机报警判定
                    if (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != 0)) {
                        tag.setRuntimestep(Instant.now());
                        return true;
                    } else {
                        if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getRaw_judgerelu().get(tag.getDevice()) != null) && (defaultProductline.getRaw_judgerelu().get(tag.getDevice()).getValue() > 5)) {//生料磨电流小于5停机
                            tag.setRuntimestep(Instant.now());
                            return true;
                        }
                    }
                    tag.setStoptimestep(Instant.now());
                }

                break;

            case "fired":

                if (tag.getIsrunvalide() == 1) {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                        tag.setStoptimestep(Instant.now());
                        return true;
                    } else {
                        if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getFired_judgerelu() != null) && (defaultProductline.getFiredSepcielTag("回转窑","台时").getValue() < 30)) {//回转窑电流小于30停机
                            tag.setStoptimestep(Instant.now());
                            //这里还是要判断下是否存在从有数字变成0的情况，有，那么需要报警
                            List<Tag4properties> rules=defaultProductline.getFired_judgerelu().get("回转窑");
                            if(rules!=null){
                                Boolean isAnyConditionMatch=rules.stream().anyMatch(rule->{
                                    if(rule.getMinvalues()!=null&&rule.getMinvalues().size()>=2){
                                        //最新数据为0,且前一个数据不为0
                                        if(0==rule.getMinvalues().get(0)&&0!=rule.getMinvalues().get(1)){
                                            return true;
                                        }
                                    }
                                    return false;

                                });
                                if(!isAnyConditionMatch){
                                    return true;//不用执行后面的动态报警判断了
                                }
                                //继续报警
                            }else {
                                return true;//不用执行后面的动态报警判断了
                            }
                        }
                    }
                    tag.setRuntimestep(Instant.now());
                } else {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != 0)) {
                        tag.setRuntimestep(Instant.now());
                        return true;
                    } else {
                        if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getFired_judgerelu() != null) && (defaultProductline.getFiredSepcielTag("回转窑","台时").getValue() > 30)) {//回转窑电流小于30停机
                            tag.setRuntimestep(Instant.now());
                            //这里还是要判断下是否存在从有数字变成0的情况，有，那么需要报警
                            List<Tag4properties> rules=defaultProductline.getFired_judgerelu().get("回转窑");
                            if(rules!=null){
                                Boolean isAnyConditionMatch=rules.stream().anyMatch(rule->{

                                    if(rule.getMinvalues()!=null&&rule.getMinvalues().size()>=2){
                                        //最新数据为0,且前一个数据不为0
                                        if(0==rule.getMinvalues().get(0)&&0!=rule.getMinvalues().get(1)){
                                            return true;
                                        }
                                    }
                                    return false;

                                });

                                if(!isAnyConditionMatch){
                                    return true;//不用执行后面的动态报警判断了
                                }
                                //继续报警
                            }else {
                                return true;//不用执行后面的动态报警判断了
                            }
                        }
                    }
                    tag.setStoptimestep(Instant.now());
                }

                break;

            case "cement":
                if (tag.getIsrunvalide() == 1) {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                        tag.setStoptimestep(Instant.now());
                        return true;
                    } else {
                        if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getCement_judgerelu().get(tag.getDevice()) != null) && (defaultProductline.getCement_judgerelu().get(tag.getDevice()).getValue() < 10)) {//回转窑电流小于30停机
                            tag.setStoptimestep(Instant.now());
                            return true;//不用执行后面的动态报警判断了
                        }
                    }
                    tag.setRuntimestep(Instant.now());

                } else {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 1)) {
                        tag.setRuntimestep(Instant.now());
                        return true;
                    } else {
                        if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getCement_judgerelu().get(tag.getDevice()) != null) && (defaultProductline.getCement_judgerelu().get(tag.getDevice()).getValue() > 10)) {//回转窑电流小于30停机
                            tag.setRuntimestep(Instant.now());
                            return true;//不用执行后面的动态报警判断了
                        }
                    }
                    tag.setStoptimestep(Instant.now());
                }
                break;
            case "envptc"://环保数据
                break;
            case "qulity"://质量数据
                if (tag.getDevice() != null && tag.getType().equals("fired")) {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                        tag.setStoptimestep(Instant.now());
                        return true;
                    } else {
                        if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getFired_judgerelu() != null) && (defaultProductline.getFiredSepcielTag("回转窑","台时").getValue() < 30)) {//回转窑电流小于30停机
                            tag.setStoptimestep(Instant.now());
                          return true;
                        }
                    }
                    tag.setRuntimestep(Instant.now());
                }

                break;
            default:
                break;
        }


        if (!method.getName().equals("update")) {
            return true;
        }

        if (alarmonitor.trim().equals(Tag4properties.OPERATEMONITOR)) {

            service_alarmMonitor.getMonitors().get(Tag4properties.OPERATEMONITOR).judgment(tag, defaultProductline);

        } else if (alarmonitor.trim().equals(Tag4properties.ALARMMONITOR)) {

            service_alarmMonitor.getMonitors().get(Tag4properties.ALARMMONITOR).judgment(tag, defaultProductline);

        } else if (alarmonitor.trim().equals(Tag4properties.ALLVALUEMONITOR)) {

            service_alarmMonitor.getMonitors().get(Tag4properties.ALLVALUEMONITOR).judgment(tag, defaultProductline);
        } else if (alarmonitor.trim().equals(Tag4properties.ALLVALUENODYNAMICMONITOR)) {
            service_alarmMonitor.getMonitors().get(Tag4properties.ALLVALUENODYNAMICMONITOR).judgment(tag, defaultProductline);

        }

        return true;
    }

    @Override
    public void after(Object proxy, Object target, Method method, Object[] args) {

    }

    @Override
    public void around(Object proxy, Object target, Method method, Object[] args) {

    }
}
