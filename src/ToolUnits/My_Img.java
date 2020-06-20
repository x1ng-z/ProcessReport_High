package ToolUnits;


import Model.Quality_data;
import Model.SaleData;

import java.awt.*;
import java.awt.image.BufferedImage;
        import java.io.File;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

public class My_Img {

    public static void main(String[] args) throws Exception {


        SaleData saleData=new SaleData();
        List<SaleData> list=new LinkedList<SaleData>();

        saleData.setCement(123);
        saleData.setClinker(212);
        saleData.setComplete_rate(70);
        saleData.setDaytotal(345);
        saleData.setFirmname("兰溪红狮");
        saleData.setMonthtotal(232213);
        saleData.setOre(323);
        list.add(saleData);



        createImage("请在这里输入文字", new Font("微软雅黑", Font.PLAIN, 32),
                new File("D:\\360MoveData\\Users\\zaixz\\Desktop\\a.png"),
                423, 695,list);
    }

    // 根据str,font的样式以及输出文件目录
    public static void createImage(String str, Font font, File outFile,
                                   Integer width, Integer height,List<SaleData> context) throws Exception {
        // 创建图片
        BufferedImage image = new BufferedImage(width, height,
                BufferedImage.TYPE_INT_BGR);
        Graphics2D g = image.createGraphics();
        g.setClip(0, 0, width, height);
        g.setColor(Color.white);
        g.fillRect(0, 0, width, height);
//        g.setColor(Color.white);
        g.setBackground(new Color(0xFFF6F9));

        drawTableTitle(g,new Font("微软雅黑",Font.PLAIN,12),0,0,423,43);


        List<SaleData> list=new LinkedList<SaleData>();

//        SaleData saleData=new SaleData();
//
//        saleData.setCement(123);
//        saleData.setClinker(212);
//        saleData.setComplete_rate(70);
//        saleData.setDaytotal(345);
//        saleData.setFirmname("兰溪红狮");
//        saleData.setMonthtotal(2323);
//        saleData.setOre(323);
//        list.add(saleData);


        drawTableBody(g,new Font("微软雅黑",Font.PLAIN,12),0,43,423,674,35,context);


        drawTableTail(g,new Font("微软雅黑",Font.PLAIN,12),0,674,423,694);



//        g.setClip(0, 0, width, height);
//        g.setColor(Color.white);
//        g.fillRect(0, 0, width, height);// 先用黑色填充整张图片,也就是背景
//        g.setColor(Color.black);// 在换成黑色
//        g.setFont(font);// 设置画笔字体
//        /** 用于获得垂直居中y */
//        Rectangle clip = g.getClipBounds();
//        FontMetrics fm = g.getFontMetrics(font);
//        int ascent = fm.getAscent();
//        int descent = fm.getDescent();
//        int y = (clip.height - (ascent + descent)) / 2 + ascent;
//
//
//        for (int i = 0; i < 1; i++) {// 256 340 0 680
//            g.drawString(str, i*680 , y);// 画出字符串
//        }
        g.dispose();
        ImageIO.write(image, "png", outFile);// 输出png图片
    }




    public static void drawTableTitle(Graphics2D g, Font font, int startx,int starty, int endx , int endy ){

        int with=endx-startx;
        int heigh=endy-starty;
        g.setColor(Color.black);
        g.setFont(font);
        g.setClip(startx,starty,with,heigh);
        g.setStroke(new BasicStroke(1.3f));
        //Vertical line
        int fl0=0;
        g.drawLine(fl0,0,fl0,heigh);
        int fl1=30;
        g.drawLine(fl1,0,fl1,heigh);
        int fl2=94;
        g.drawLine(fl2,0,fl2,heigh);
        int fl3=153;
        int limiheigh=17;
        g.drawLine(fl3,limiheigh,fl3,heigh);
        int fl4=213;
        g.drawLine(fl4,limiheigh,fl4,heigh);
        int fl5=256;
        g.drawLine(fl5,limiheigh,fl5,heigh);
        int fl6=318;
        g.drawLine(fl6,0,fl6,heigh);
        int fl7=377;
        g.drawLine(fl7,0,fl7,heigh);
        int fl8=with-1;
        g.drawLine(fl8,0,fl8,heigh);


        //Horizontal line
        int fl9=0;
        g.drawLine(0,fl9,with,fl9);

        int fl10=17;
        g.drawLine(94,fl10,318,fl10);

        int fl11=heigh-1;
        g.drawLine(0,fl11,with,fl11);

        //fill context
        setConextOneline(g,"本日销量(单位：吨)",font,fl9,fl10,fl2,fl6);

        setConextOneline(g,"序号",font,fl9,fl11,fl0,fl1);

        setConextOneline(g,"子公司",font,fl9,fl11,fl1,fl2);

        setConextOneline(g,"水泥",font,fl10,fl11,fl2,fl3);
        setConextOneline(g,"熟料",font,fl10,fl11,fl3,fl4);
        setConextMoreline(g,"矿粉/\n掺和料",font,fl10,fl11,fl4,fl5);
        setConextOneline(g,"合计",font,fl10,fl11,fl5,fl6);
        setConextOneline(g,"本月累计",font,fl9,fl11,fl6,fl7);
        setConextOneline(g,"完成率",font,fl9,fl11,fl7,fl8);

    }



    public static void drawTableBody(Graphics2D g, Font font, int startx, int starty, int endx , int endy, int bodycount, List<SaleData> contexts){

        int with=endx-startx;
        int heigh=endy-starty;

        g.setColor(Color.black);
        g.setFont(font);
        g.setClip(startx,starty,with,heigh);
        g.setStroke(new BasicStroke(1.3f));


        //Vertical line
        int adjusty=endy-1;
        int fl0=0;
        g.drawLine(fl0,0,fl0,adjusty);
        int fl1=30;
        g.drawLine(fl1,0,fl1,adjusty);
        int fl2=94;
        g.drawLine(fl2,0,fl2,adjusty);
        int fl3=153;
        g.drawLine(fl3,0,fl3,adjusty);
        int fl4=213;
        g.drawLine(fl4,0,fl4,adjusty);
        int fl5=256;
        g.drawLine(fl5,0,fl5,adjusty);
        int fl6=318;
        g.drawLine(fl6,0,fl6,adjusty);
        int fl7=377;
        g.drawLine(fl7,0,fl7,adjusty);
        int fl8=endx-1;
        g.drawLine(fl8,0,fl8,adjusty);

        int[] lines=new int[]{fl0,fl1,fl2,fl3,fl4,fl5,fl6,fl7,fl8};


        //Horizontal line
        int upline=starty;
        for(int i=1;i<bodycount+1;i++) {
            int f$l11 = 18*i+starty;

            //
            setConextOneline(g,""+i,font,upline,f$l11,fl0,fl1);
            try {
                setConextOneline(g,contexts.get(i-1).getFirmname(),font,upline,f$l11,fl1,fl2);
                setConextOneline(g,Double.toString(contexts.get(i-1).getCement()),font,upline,f$l11,fl2,fl3);
                setConextOneline(g,Double.toString(contexts.get(i-1).getClinker()),font,upline,f$l11,fl3,fl4);
                setConextOneline(g,Double.toString(contexts.get(i-1).getOre()),font,upline,f$l11,fl4,fl5);
                setConextOneline(g,Double.toString(contexts.get(i-1).getDaytotal()),font,upline,f$l11,fl5,fl6);
                setConextOneline(g,Double.toString(contexts.get(i-1).getMonthtotal()),font,upline,f$l11,fl6,fl7);
                setConextOneline(g,Double.toString(contexts.get(i-1).getComplete_rate()),font,upline,f$l11,fl7,fl8);
            } catch (Exception e) {
                e.printStackTrace();
            }
            //update upline site
            upline=f$l11;

            g.drawLine(0,f$l11,endx,f$l11);
        }

    }



    public static void drawTableTail(Graphics2D g, Font font, int startx,int starty, int endx , int endy ){

        int with=endx-startx;
        int heigh=endy-starty;

        g.setColor(Color.black);
        g.setFont(font);
        g.setClip(startx,starty,with,heigh);
        g.setStroke(new BasicStroke(1.3f));


        //Vertical line
        int adjusty=endy-1;

        int fl0=0;
        g.drawLine(fl0,0,fl0,adjusty);
//        int fl1=30;
//
//        g.drawLine(fl1,0,fl1,adjusty);
        int fl2=94;
        g.drawLine(fl2,0,fl2,adjusty);
        int fl3=153;
        g.drawLine(fl3,0,fl3,adjusty);
        int fl4=213;
        g.drawLine(fl4,0,fl4,adjusty);
        int fl5=256;
        g.drawLine(fl5,0,fl5,adjusty);
        int fl6=318;
        g.drawLine(fl6,0,fl6,adjusty);
        int fl7=377;
        g.drawLine(fl7,0,fl7,adjusty);
        int fl8=endx-1;
        g.drawLine(fl8,0,fl8,adjusty);


//        Horizontal line
            int f$l11 = 19+starty;
            g.drawLine(0,f$l11,endx,f$l11);


        setConextOneline(g,"合计",font,starty,f$l11,fl0,fl2);




    }




    public static void setConextMoreline(Graphics2D g, String context0, Font font, int Horizontalup, int Horizontaldown, int Verticallef, int Verticalright){


        g.setStroke(new BasicStroke(1));

        FontMetrics fm0 = g.getFontMetrics(font);
        int ascent0 = fm0.getAscent();
        int descent0 = fm0.getDescent();
        String[] context=context0.split("\n");
        float step= (Horizontaldown-Horizontalup)/(float)context.length;
        for(int i=0;i<context.length;i++){
            int context0length=fm0.charsWidth(context[i].toCharArray(),0,context[i].length());
            float height0=Horizontalup+step*i+(step)/2.0f-(ascent0+descent0)/2.0f+ascent0;
            float with0=Verticallef+(Verticalright-Verticallef)/2.0f-context0length/2.0f;
            g.drawString(context[i],with0,height0);
        }
    }


    public static void setConextOneline(Graphics2D g, String context0, Font font, int Horizontalup, int Horizontaldown, int Verticallef, int Verticalright){


        g.setStroke(new BasicStroke(1));
        FontMetrics fm0 = g.getFontMetrics(font);
        int ascent0 = fm0.getAscent();
        int descent0 = fm0.getDescent();




        int context0length=fm0.charsWidth(context0.toCharArray(),0,context0.length());


        float height0=Horizontalup+(Horizontaldown-Horizontalup)/2.0f-(ascent0+descent0)/2.0f+ascent0;
        float with0=Verticallef+(Verticalright-Verticallef)/2.0f-context0length/2.0f;
        g.drawString(context0,with0,height0);

    }




}

