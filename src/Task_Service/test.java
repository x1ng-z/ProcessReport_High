package Task_Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class test {
    public static void main(String[] args) {


        String tagname="水泥1磨1";//台时1 台时2  台时给定  台时给定1  台时给定2
        if(tagname.contains("水泥磨")){
            System.out.println(tagname);
        }
//        String regex = "((.*)(\\w*))";
//        Pattern pattern=Pattern.compile(regex);
//
//        Matcher matcher=pattern.matcher(tagname);
//        while (matcher.find()){
//
//            System.out.println(matcher.group(2));
//            System.out.println(matcher.group(3));
//            System.out.println(matcher.group(1));
//            System.out.println(matcher.group());
//        }


    }
}
