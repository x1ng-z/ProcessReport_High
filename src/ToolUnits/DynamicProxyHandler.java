package ToolUnits;

import Model.DefaultProductline;
import Model.Tag4properties;
import Task_Service.Service_AlarmMonitor;
import org.apache.log4j.Logger;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class DynamicProxyHandler implements InvocationHandler {
    private static Logger logger= Logger.getLogger(DynamicProxyHandler.class);
    private Object target;
    private String interceptorClazz=null;
    private String aopMethod;
    private Service_AlarmMonitor alarmMonitor;
    private DefaultProductline defaultProductline;
    private  Double newvalue;


    public DynamicProxyHandler(Object target, String interceptorClazz, String aopMethod, Service_AlarmMonitor alarmMonitor, DefaultProductline defaultProductline) {
        this.target = target;
        this.interceptorClazz = interceptorClazz;
        this.aopMethod=aopMethod;
        this.alarmMonitor=alarmMonitor;
        this.defaultProductline = defaultProductline;
    }




    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        if(interceptorClazz==null || (!aopMethod.equals(method.getName()))){
            return method.invoke(this.target,args);
        }
        Object result=null;
        try {
//            Interceptor interceptor=(Interceptor) Class.forName(interceptorClazz).newInstance();

            Constructor<?> cons = Class.forName(interceptorClazz).getConstructor(Tag4properties.class,Service_AlarmMonitor.class, DefaultProductline.class);
            Interceptor obj = (Interceptor)cons.newInstance((Tag4properties)target,alarmMonitor, defaultProductline);

            if(obj.before(proxy,target,method,args)){
                result= method.invoke(target,args);
            }else {
                obj.around(proxy,target,method,args);
            }

            obj.after(proxy,target,method,args);

        } catch (InstantiationException | IllegalAccessException | ClassNotFoundException | NullPointerException e) {
            logger.error(e);
        } //            System.out.println(((Tag4properties)target).getValue()+((Tag4properties)target).getTag()+((Tag4properties)target).getCn());

        return result;

    }

    public static Object bind(Object target, String interceptorClazz, String aopMethod, Service_AlarmMonitor alarmMonitor, DefaultProductline defaultProductline){

        return Proxy.newProxyInstance(target.getClass().getClassLoader(),target.getClass().getInterfaces(),new DynamicProxyHandler(target,interceptorClazz,aopMethod,alarmMonitor, defaultProductline));

    }
}
