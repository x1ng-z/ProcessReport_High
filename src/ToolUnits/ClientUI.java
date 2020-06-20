package ToolUnits;

import Model.Tag4properties;
import Task_Service.MonitorDefaultDymaticAlarm;
import org.apache.log4j.Logger;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;

public class ClientUI {
    private static Logger logger=Logger.getLogger(ClientUI.class);
    private static TrayIcon trayIcon = null;
    static JFrame mf = new JFrame();
    static SystemTray tray = SystemTray.getSystemTray();
    private static JFormattedTextField tagvalue;
    private static List<Tag4properties> list=new ArrayList<Tag4properties>();
    private static MonitorDefaultDymaticAlarm service_dymaticAlarm=null;



    public static void setLister(Tag4properties task_write_influxdb){
        list.add(task_write_influxdb);
    }


    public static void notify_all(){

        long value=Long.parseLong(tagvalue.getText());

//        for(Tag4properties tags:service_dymaticAlarm.getDymatic_table()){
//
//            tags.setValue(value);
//
//        }
    }




    public static void show_ClientUI() {

//        mf.setLocation(300, 100);

        mf.setSize(500, 300);
        mf.setTitle("实时采集工具");
        JPanel pane = new JPanel();
        mf.add(pane);
        pane.setBackground(new Color(255, 167, 17));
        pane.setBounds(0,0,500,320);
        pane.setLayout(null);
        mf.setResizable(false);

        mf.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        try {

            Image logoimage = Toolkit.getDefaultToolkit().createImage(System.getProperty("user.dir")+"/conf/img/Bug_big.png");
            mf.setIconImage(logoimage );
        }catch (Exception e){
//            LogMgr.getLogMgr_instance(null).WirteError(e);
        }


        JLabel textField=new JLabel("动态报警线测试！",JLabel.CENTER);
        textField.setFont( new Font("宋体", 1, 32));
//        textField.setText("实时采集工具运行中！",);
        textField.setBounds(0,0,500,200);
        pane.add(textField);








        tagvalue = new JFormattedTextField(new java.text.DecimalFormat("#0"));
        tagvalue.setBounds(20,200,50,20);
        tagvalue.setBackground(new Color(255, 167, 17));
        tagvalue.setText("3");
        tagvalue.setEditable(false);
        tagvalue.addKeyListener(new KeyAdapter() {

            @Override
            public void keyReleased(KeyEvent e) {
//                super.keyReleased(e);

                String old = tagvalue.getText();
                JFormattedTextField.AbstractFormatter formatter = tagvalue.getFormatter();
                if (!old.equals("")) {
                    if (formatter != null) {
                        String str = tagvalue.getText();
                        try {
                            long page = (Long) formatter.stringToValue(str);
                            tagvalue.setText(page + "");
                            notify_all();

                        } catch (ParseException pe) {
                            tagvalue.setText("3");//解析异常直接将文本框中值设置为1
                        }
                    }
                }
            }
        });

        pane.add(tagvalue);



        JFormattedTextField sec = new JFormattedTextField(new java.text.DecimalFormat("#0"));
        sec.setBounds(70,200,100,20);
        sec.setBackground(new Color(255, 167, 17));
        sec.setText("采集频率（秒）");
        sec.setEditable(false);
        pane.add(sec);




        String strict = "严格模式";
        String limit = "限值模式";


        JRadioButton strictButton = new JRadioButton(strict);


        strictButton.setActionCommand(strict);
        strictButton.setBackground(new Color(255, 167, 17));
        strictButton.setSelected(true);


        JRadioButton limitButton = new JRadioButton(limit);

//        birdButton.setMnemonic(KeyEvent.VK_B);
        limitButton.setActionCommand(limit);
        limitButton.setBackground(new Color(255, 167, 17));
        limitButton.setSelected(true);


        ButtonGroup group = new ButtonGroup();
        group.add(strictButton);
        group.add(limitButton);


        //Put the radio buttons in a column in a panel.
        JPanel radioPanel = new JPanel(new GridLayout(0, 1));
        radioPanel.setBounds(15,225,100,30);
        radioPanel.setBackground(new Color(255, 167, 17));
        radioPanel.add(strictButton);
        radioPanel.add(limitButton);

        strictButton.setEnabled(false);
        limitButton.setEnabled(false);


        pane.add(radioPanel, BorderLayout.LINE_START);





        JCheckBox jCheckBox=new JCheckBox("锁定");
        jCheckBox.setSelected(true);
        jCheckBox.setActionCommand("锁定");
        jCheckBox.setEnabled(true);
        jCheckBox.setBackground(new Color(255, 167, 17));
        jCheckBox.setBounds(0,200,20,20);
        jCheckBox.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if(jCheckBox.isSelected()){
//                    jCheckBox.("锁定");
                    tagvalue.setEditable(false);
                    strictButton.setEnabled(false);
                    limitButton.setEnabled(false);
                }else {
//                    jCheckBox.setActionCommand("释放");
                    tagvalue.setEditable(true);
                    strictButton.setEnabled(true);
                    limitButton.setEnabled(true);

                }
            }
        });
        pane.add(jCheckBox);






        strictButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String model=e.getActionCommand();
//                CollectionMgr.getCollectMgr().setModel(model);
                System.out.println(model);

            }
        });
        limitButton.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                String model=e.getActionCommand();
//                CollectionMgr.getCollectMgr().setModel(model);
                System.out.println(model);

            }
        });




        mf.setVisible(true);

        mf.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                int i = JOptionPane.showConfirmDialog(null, "确定要退出系统吗？", "退出系统", JOptionPane.YES_NO_OPTION);
                if (i == JOptionPane.YES_OPTION) {
                    System.exit(0);
                }
            };

            public void windowIconified(WindowEvent e) { // 窗口最小化事件

                mf.setVisible(false);
                miniTray();

            }

        });

    }

    private static void miniTray() { // 窗口最小化到任务栏托盘

        String rootpath=System.getProperty("user.dir");

        String filepath=rootpath+"/conf/img/Bug.png";
        ImageIcon trayImg = new ImageIcon(filepath);// 托盘图标

        trayIcon = new TrayIcon(trayImg.getImage(), "Collecter", new PopupMenu());
        trayIcon.setImageAutoSize(true);

        trayIcon.addMouseListener(new MouseAdapter() {

            public void mouseClicked(MouseEvent e) {

                if (e.getClickCount() == 2) {// 单击 1 双击 2

                    tray.remove(trayIcon);
                    mf.setVisible(true);
                    mf.setExtendedState(JFrame.NORMAL);
                    mf.toFront();
                }

            }

        });

        try {

            tray.add(trayIcon);

        } catch (AWTException e1) {
//            e1.printStackTrace();
            logger.error(e1);
        }
    }


        public static void main (String[]args){

            ClientUI.show_ClientUI();

            MonitorDefaultDymaticAlarm monitor_dymaticAlarm =new MonitorDefaultDymaticAlarm(null,new LinkedBlockingQueue<>());

            Tag4properties tag=new Tag4properties();
            tag.setLowlowbase(-40);
            tag.setLowbase(-10);
            tag.setHighbase(0);
            tag.setHighhighbase(300);
            tag.init();



            ClientUI.setService_dymaticAlarm(monitor_dymaticAlarm);

            new Thread(new Runnable() {
                @Override
                public void run() {

                    while (!Thread.currentThread().isInterrupted()){
//                        monitor_dymaticAlarm.judgment(0,null,null);
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }

                }
            }).start();






        }

    public static MonitorDefaultDymaticAlarm getService_dymaticAlarm() {
        return service_dymaticAlarm;
    }

    public static void setService_dymaticAlarm(MonitorDefaultDymaticAlarm monitor_dymaticAlarm) {
        ClientUI.service_dymaticAlarm = monitor_dymaticAlarm;
    }
}


