package DAO;

import ToolUnits.PropertiesHelp;
import org.apache.log4j.Logger;
import org.influxdb.BatchOptions;
import org.influxdb.InfluxDBFactory;

import javax.servlet.ServletContext;
import java.util.Properties;

public class Influxdb {
    private static Logger logger = Logger.getLogger(Influxdb.class);
    private volatile static org.influxdb.InfluxDB influxDB = null;

    public synchronized static org.influxdb.InfluxDB getConnect(ServletContext context) {

        if (influxDB == null) {
            String filepath;
            try {
                if (context == null) {
                    filepath = System.getProperty("user.dir") + "/conf/influxdb.properties";
                } else {
                    filepath = context.getRealPath("/WEB-INF") + "/conf/influxdb.properties";
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
                influxDB = InfluxDBFactory.connect("http://"+ip+":8086", usename, password);
                influxDB.setDatabase(dbname);
//            influxDB.enableBatch(BatchOptions.DEFAULTS);
                influxDB.enableBatch(BatchOptions.DEFAULTS.jitterDuration(500));
            } catch (Exception e) {
                logger.error(e);
                if (influxDB != null) {
                    InfluxdbClose();
                }

            }


        }


        return influxDB;
    }

    public synchronized static void InfluxdbClose() {

        influxDB.close();
    }


}
