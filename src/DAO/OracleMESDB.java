package DAO;

import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class OracleMESDB {

    private static Logger logger = Logger.getLogger(OracleMESDB.class);
    private static String dbip212 = "192.168.10.212:1521";
    private static String dbname212 = "orcl";
    private static String username212 = "HsEnv";
    private static String password212 = "HsEnv";


    private static String dbip211 = "192.168.10.211:1521";
    private static String dbname211 = "orcl";
    private static String username211 = "mesgroup";
    private static String password211 = "mesgroup";


    static {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
        } catch (ClassNotFoundException e) {
            logger.error(e.getMessage(),e);
        }
    }


    public  static Connection get212Connection() {
        try {
            String dbURL = "jdbc:oracle:thin:@" + dbip212 + ":" + dbname212;
            return DriverManager.getConnection(dbURL, username212, password212);
        } catch (SQLException e) {
            logger.error(e);

        }
        return null;
    }



    public  static Connection get211Connection() {
        try {
            String dbURL = "jdbc:oracle:thin:@" + dbip211 + ":" + dbname211;
            return DriverManager.getConnection(dbURL, username211, password211);
        } catch (SQLException e) {
            logger.error(e);

        }
        return null;
    }



    public  static Connection getConnection(String ip) {
        try {
            String dbURL = "jdbc:oracle:thin:@" + ip+":1521" + ":" + "orcl";

            Properties props = new Properties() ;
            props.put( "user" , "mesquery") ;
            props.put( "password" , "mesquery") ;
            props.put( "oracle.net.CONNECT_TIMEOUT" , "8000") ;
            props.put( "oracle.jdbc.ReadTimeout" , "60000" ) ;
            Connection conn = DriverManager.getConnection( dbURL, props ) ;

            return conn ;//DriverManager.getConnection(dbURL, "mesquery", "mesquery");
        } catch (SQLException e) {
            logger.error("ip="+ip+" can't conect mes db");
            logger.error(e.getMessage(),e);

        }
        return null;
    }









}







