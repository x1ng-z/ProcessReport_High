package ToolUnits;

import Model.DefaultProductline;
import Model.Tag4properties;
import Task_Service.Service_AlarmMonitor;

import java.lang.reflect.Method;

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
                if (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                    return true;
                } else {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getRaw_judgerelu().get(tag.getDevice())!=null) && (defaultProductline.getRaw_judgerelu().get(tag.getDevice()).getValue() < 5)) {//生料磨电流小于5停机
                        return true;
                    }
                }
                break;

            case "fired":
                if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                    return true;
                } else {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getFired_judgerelu() != null) && (defaultProductline.getFired_judgerelu().getValue() < 30)) {//回转窑电流小于30停机
                        return true;//不用执行后面的动态报警判断了
                    }
                }
                break;

            case "cement":
                if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                    return true;
                } else {
                    if ((defaultProductline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (defaultProductline.getCement_judgerelu().get(tag.getDevice())!= null) && (defaultProductline.getCement_judgerelu().get(tag.getDevice()).getValue() < 10)) {//回转窑电流小于30停机
                        return true;//不用执行后面的动态报警判断了
                    }
                }
                break;

            case "envptc"://环保数据
                break;
            case "qulity"://质量数据
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
