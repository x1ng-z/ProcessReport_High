package ToolUnits;

import org.apache.activemq.ActiveMQConnection;
import org.fusesource.stomp.jms.*;

import javax.jms.*;


public  class JMS_Text_Service  {
    private static volatile Connection connection = null;
    private static volatile Session session;
    private static volatile Destination dest = null;
    private static volatile MessageProducer producer = null;
    private static volatile JMS_Text_Service jms_service;


    private String user = ActiveMQConnection.DEFAULT_USER;
    private String password =  ActiveMQConnection.DEFAULT_PASSWORD;
    private String host = "localhost";
    private int port = Integer.parseInt("61613");
    private String destination = "/topic/process";

    private JMS_Text_Service() {

        initialize();
    }

    private void initialize() {
        StompJmsConnectionFactory factory = new StompJmsConnectionFactory();
        factory.setBrokerURI("tcp://" + host + ":" + port);

        try {
            connection = factory.createConnection(user, password);
            connection.start();
            connection.setExceptionListener(new ExceptionListener() {
                @Override
                public void onException(JMSException e) {
//                    System.out.println("#1");
                    e.printStackTrace();
                }
            });
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            dest = new StompJmsDestination(destination);
//            System.out.println(((StompJmsDestination) dest).isTemporary());
            producer = session.createProducer(dest);
            producer.setDeliveryMode(DeliveryMode.PERSISTENT);

        } catch (JMSException e) {
            e.printStackTrace();
        }

    }

    public synchronized static JMS_Text_Service get_MesService( ) {
        if (jms_service == null) {
            jms_service = new JMS_Text_Service( );
        }
        return jms_service;
    }

    public synchronized void SenderTextMessages(String mes, String department) {

        TextMessage msg = null;
        try {
            msg = session.createTextMessage(mes);
//                msg.setIntProperty("id", ++i);
//                  msg.setJMSExpiration(1000*60*5);
            msg.setStringProperty("persistent", "true");
            msg.setStringProperty("msgtype", "text");
            msg.setStringProperty("destination",department);
            producer.send(msg,DeliveryMode.PERSISTENT,4,5*60*1000 );//DeliveryMode.PERSISTENT,4,60*1000  DeliveryMode.PERSISTENT,4,-1

        } catch (JMSException e) {
            e.printStackTrace();
        }

    }


    // 关闭连接
    public synchronized void close()  {
        try {
            System.out.println("Producer:Closing connection");
            if (producer != null)
                producer.close();
            if (session != null)
                session.close();
            if (connection != null)
                connection.close();
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }




}