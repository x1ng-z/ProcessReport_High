package ToolUnits;

import Model.AlarmMessage;
import Model.AudioMessage;
import Model.Operate_Message;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class test_DymaticProx {
    public static void main(String[] agrs){

//        System.out.println(DatesUtil.getBeginDayOfMonth().toLocaleString());

//        int a = 18;
//        int b = 23;
//        String[] args = new String[] { "C:\\Users\\zaixz\\venv\\Scripts\\python.exe", "E:\\WX_PUSH_3\\analysis\\test_day.py", String.valueOf(a), String.valueOf(b) };
//        System.out.println(ExecuteCmd.execute(args));;
//
//
//
//        System.out.println(new Date(Tools.stringTodate("2018-11-03 00:00:00").getTime()).equals(new Date(Tools.stringTodate("2018-11-03 00:00:00").getTime())));;

//        int index =0;
//        for(int i=1;i<10;i++){
//            System.out.println(index);
//            if(++index==0){
//                System.out.println(index);
//
//                System.out.println(InterruptedException.class.isInstance(new Exception()));
//            }
//
//        }
//        SomeMethod someimp=(SomeMethod)Proxy.newProxyInstance(someimp.class.getClassLoader(),someimp.class.getInterfaces(),new MethodSelector(new someimp()));
//
//        someimp.boring();
//
//        Map<String,String> map=new HashMap<String,String>();
//        String a=map.get("ss");

//        Object alarmMessage=new AlarmMessage();
//        Object audioMessage=new AudioMessage();
//        Operate_Message operate_message=new Operate_Message();
//        System.out.println(Operate_Message.class.isInstance(audioMessage));


//        Date date=Tools.adjustTimeZone("2019-01-05T09:04:18.385Z");
//        System.out.println(date.toLocaleString());
        System.out.println("\"s\"".indexOf(".")

        );


//



//        String format = DateTimeFormatter.ofPattern("yyyy:MM:dd HH:mm:ss").format(now);

//        System.out.println(LocalDateTime.from(Instant.now()).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));


    }


    public static class MethodSelector implements InvocationHandler{
        private Object proxied;

        public MethodSelector(Object proxy) {
            this.proxied = proxy;
        }


        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

            if(method.getName().equals("boring")){
                System.out.println(method.getName());
            }

            return method.invoke(proxied,args);
        }

    }

    public static interface SomeMethod{

        public void boring();

    }

    public static class someimp implements SomeMethod{

        @Override
        public void boring() {
            System.out.println("boring is execute");
        }
    }



}
