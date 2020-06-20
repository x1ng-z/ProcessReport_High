package DAO;

import ToolUnits.PropertiesHelp;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class MysqlDB {

    private volatile static Connection connection = null;
    private static Logger logger = Logger.getLogger(MysqlDB.class);


    public static Connection getConnection(ServletContext context) {
        String filepath;
        try {
            if (context == null) {
                filepath = System.getProperty("user.dir") + "/conf/processdb.properties";
            } else {
                filepath = context.getRealPath("/WEB-INF") + "/conf/processdb.properties";
            }
        } catch (Exception e) {
            logger.error(e);
            return null;
        }


        Properties prop = new PropertiesHelp(filepath).getProperties();
        String ip = prop.getProperty("ip");
        String usename = prop.getProperty("username");
        String password = prop.getProperty("password");
        String dbname = prop.getProperty("dbname");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String dbURL = "jdbc:mysql://" + ip + "/" + dbname + "?autoReconnect=true&autoReconnectForPools=true&failOverReadOnly=false&&useUnicode=true&characterEncoding=utf8&allowMultiQueries=true";
            Connection connection = DriverManager.getConnection(dbURL, usename, password);
            return connection;
        } catch (ClassNotFoundException e) {
            logger.error(e);
        } catch (SQLException e) {
            logger.error(e);
        }
        return null;
    }




    public static void close(ServletContext servletContext) {
        try {
            if (getConnection(servletContext) != null) {
                if (connection != null) {
                    connection.close();
                }
                connection = null;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }


    }


}

