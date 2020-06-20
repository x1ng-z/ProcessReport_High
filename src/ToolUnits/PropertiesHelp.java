package ToolUnits;

import Contrl.ActionServlet;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesHelp {
    private static Logger logger = Logger.getLogger(PropertiesHelp.class);
    String filepath = null;

    public Properties getProperties() {
        try {
            FileInputStream fileInputStream = new FileInputStream(new File(filepath));
            Properties prop = new Properties();
            prop.load(fileInputStream);
            return prop;
        } catch (
                IOException e) {
            logger.error(e);
        }
        return null;
    }

    public PropertiesHelp(String filepath) {
        this.filepath = filepath;
    }
}
