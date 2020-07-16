package Task_Service;

import Model.DefaultProductline;
import Model.Tag4properties;

public interface Monitor {
      int ALARMINTERVAL=60*30;

      void judgment( Tag4properties tag4properties, DefaultProductline defaultProductline);

}
