package DAO;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class OracleMESDB {
    private volatile static Connection connection=null;
    private static Logger logger=Logger.getLogger(OracleMESDB.class);
    private static String dbip ="192.168.10.212:1521";
    private static String dbname="orcl" ;
    private static String username="HsEnv";
    private static String password="HsEnv";
    private ServletContext servletContext;



    public synchronized static Connection getConnection(ServletContext servletContext) {


            try {
                Class.forName("oracle.jdbc.driver.OracleDriver");
                String dbURL = "jdbc:oracle:thin:@"+dbip+":"+dbname;
                connection = DriverManager.getConnection(dbURL, username, password);
            } catch (ClassNotFoundException e) {
               logger.error(e);
                connection=null;
            } catch (SQLException e) {
                logger.error(e);
                connection = null;
            }
        return connection;
    }


    public synchronized static void close(ServletContext servletContext){
        try {
            if(getConnection(servletContext)!=null){
               connection.close();
                connection=null;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }


    }






}







