package Task_Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class test {
    public static void main(String[] args) {


        String tagname="给定";//台时1 台时2  台时给定  台时给定1  台时给定2
        Pattern pattern=Pattern.compile(".*(台时).*");
        Matcher matcher=pattern.matcher(tagname);
        while (matcher.find()){

            System.out.println(matcher.group());
        }


    }
}
