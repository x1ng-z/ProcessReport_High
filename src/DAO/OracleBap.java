package DAO;

import ToolUnits.PropertiesHelp;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class OracleBap {
    private static Logger logger = Logger.getLogger(OracleBap.class);


    public static Connection getConnect(ServletContext context) {
        Connection connection = null;
        String filepath;
        try {
            if (context == null) {
                filepath = System.getProperty("user.dir") + "/conf/bapdb.properties";
            } else {
                filepath = context.getRealPath("/WEB-INF") + "/conf/bapdb.properties";
            }
        } catch (Exception e) {
            logger.error(e);
            return null;
        }
        Properties prop = new PropertiesHelp(filepath).getProperties();
        String ip = prop.getProperty("ip");
        String username = prop.getProperty("username");
        String password = prop.getProperty("password");
        String dbname = prop.getProperty("dbname");
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            String dbURL = "jdbc:oracle:thin:@" + ip + ":" + dbname;
            connection = DriverManager.getConnection(dbURL, username, password);
            return connection;
        } catch (ClassNotFoundException e) {
            logger.error(e);
        } catch (SQLException e) {
            logger.error(e);
        }
        return null;
    }


}
