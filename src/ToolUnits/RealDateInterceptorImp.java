package ToolUnits;

import Model.AlarmMessage;
import Model.Productline;
import Model.Tag4properties;
import Task_Service.Service_AlarmMonitor;

import java.lang.reflect.Method;

public class RealDateInterceptorImp implements Interceptor {

    private Tag4properties tag;
    private Service_AlarmMonitor service_alarmMonitor;
    private Productline productline;


    public RealDateInterceptorImp(Tag4properties tag, Service_AlarmMonitor service_alarmMonitor, Productline productline) {
        this.tag = tag;
        this.service_alarmMonitor = service_alarmMonitor;
        this.productline = productline;
    }

    @Override
    public boolean before(Object proxy, Object target, Method method, Object[] args) {
        String alarmonitor = tag.getAlarmtmonitor();
        if (alarmonitor == null) {
            return true;
        }

        switch (tag.getProcesstype()) {
            case "raw":
                if (productline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null && (productline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                    return true;
                } else {
                    if ((productline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (productline.getRaw_judgerelu() != null) && (productline.getRaw_judgerelu().getValue() < 5)) {//生料磨电流小于5停机
                        return true;
                    }
                }
                break;

            case "fired":
                if ((productline.findDeviceAlarmjudgeRsc(tag.getDevice()) != null) && (productline.findDeviceAlarmjudgeRsc(tag.getDevice()) == 0)) {
                    return true;
                } else {
                    if ((productline.findDeviceAlarmjudgeRsc(tag.getDevice()) == null) && (productline.getFired_judgerelu() != null) && (productline.getFired_judgerelu().getValue() < 30)) {//回转窑电流小于30停机
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

            service_alarmMonitor.getMonitors().get(Tag4properties.OPERATEMONITOR).judgment(tag, productline);

        } else if (alarmonitor.trim().equals(Tag4properties.ALARMMONITOR)) {

            service_alarmMonitor.getMonitors().get(Tag4properties.ALARMMONITOR).judgment(tag, productline);

        } else if (alarmonitor.trim().equals(Tag4properties.ALLVALUEMONITOR)) {

            service_alarmMonitor.getMonitors().get(Tag4properties.ALLVALUEMONITOR).judgment(tag,productline);
        } else if (alarmonitor.trim().equals(Tag4properties.ALLVALUENODYNAMICMONITOR)) {
            service_alarmMonitor.getMonitors().get(Tag4properties.ALLVALUENODYNAMICMONITOR).judgment(tag,productline);

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
