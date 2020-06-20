package Task_Service;

import Model.AudioMessage;
import Model.Productline;
import Model.Tag4properties;

import java.util.concurrent.LinkedBlockingQueue;

public interface Monitor {
      int ALARMINTERVAL=60*30;

      void judgment( Tag4properties tag4properties, Productline productline);

}
