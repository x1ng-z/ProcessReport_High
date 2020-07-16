package DAO;

import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OracleBapAccsessData {
    private static Logger logger=Logger.getLogger(OracleBapAccsessData.class);

    public  static List<Map<String,String>> getJobs(Connection oracle_connection){
        if(oracle_connection==null){
            return null;
        }
        String sql="SELECT" +
                "            a.id ID,"+
                "            b.Eam_assetcode EAM_CODE," +
                "            b.EAM_NAME," +
                "            a.DESCRIBE," +
                "           CASE a.SOURCE_TYPE WHEN 'BEAM2006/01' THEN '巡检'" +
                "             WHEN  'BEAM2006/02' THEN '其它'" +
                "             WHEN  'BEAM2006/03' THEN '维保'" +
                "             WHEN  'BEAM2006/04' THEN '备件'" +
                "             WHEN  'BEAM2006/05' THEN '润滑'" +
                "             WHEN  'BEAM2006/06' THEN '运行监控'" +
                "             end SOURCE_TYPE, " +
                "           CASE a.FAULT_INFO_TYPE WHEN 'BEAM029/05' THEN '机械'" +
                "             WHEN  'BEAM029/06' THEN '电气'" +
                "             WHEN  'BEAM029/07' THEN '工艺'" +
                "             end FAULT_INFO_TYPE,"+
                "           case  a.FAULT_STATE WHEN 'BEAM2004/01' THEN '待处理'" +
                "             WHEN  'BEAM2004/02' THEN '处理中'" +
                "             WHEN  'BEAM2004/04' THEN '已处理'" +
                "              WHEN  'BEAM2004/06' THEN '直接消缺'" +
                "             WHEN  'BEAM2004/05' THEN '已关闭'" +
                "             end FAULT_STATE," +
                "            case  a.DOWN_STREAM when 'BEAM2_2013/01' then '直接消缺'" +
                "              when 'BEAM2_2013/02' then '工单'" +
                "                when 'BEAM2_2013/03' then '验收'" +
                "                when 'BEAM2_2013/04' then '大修'" +
                "                  when 'BEAM2_2013/05' then '检修'" +
                "                    end DOWN_STREAM," +
                "           case a.PRIORITY  when 'BEAM2007/001'then '普通'" +
                "             when 'BEAM2007/002' then '紧急'" +
                "               end PRIORITY," +
                "            nvl(to_char( a.FIND_TIME, 'yyyy-mm-dd hh24:mi:ss' ),'null') AS NEXT_TIME ," +
                "            r.name fname," +
                "         case  a.DOWN_STREAM" +
                "        WHEN  'BEAM2_2013/02' THEN  r1.name" +
                "          else s.name end  cname," +
                "            case  a.DOWN_STREAM" +
                "        WHEN  'BEAM2_2013/02' THEN  po.name" +
                "          else po1.name end postname," +
                "          case  a.DOWN_STREAM" +
                "           WHEN  'BEAM2_2013/02' THEN w.effect_time" +
                "            else a.effect_time end eff_time," +
                "              c.name companyname" +
                "        FROM" +
                "            BEAM2_FAULT_INFOS a" +
                "            LEFT JOIN eam_baseinfo b ON a.eamid = b.eam_id" +
                "            LEFT JOIN BASE_STAFF r ON r.id = a.FIND_STAFFID" +
                "            left join BEAM2_WORK_RECORDS w on w.FAULT_INFO=a.id" +
                "            left join BASE_STAFF r1 on r1.id=w.CHARGE_STAFF" +
                "            left join BASE_COMPANY c on c.id=b.cid" +
                "            left join base_positionwork pw on pw.staff_id=w.CHARGE_STAFF" +
                "            left join BASE_POSITION po on po.id=pw.position_id" +
                "            LEFT JOIN BASE_STAFF s ON s.id = a.EFFECT_STAFF_ID" +
                "            left join base_positionwork pw1 on pw1.staff_id=a.EFFECT_STAFF_ID" +
                "            left join BASE_POSITION po1 on po1.id=pw1.position_id";
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;
        try {
            preparedStatement=oracle_connection.prepareStatement(sql);
            resultSet=preparedStatement.executeQuery();
            List<Map<String,String>> allResult=new ArrayList<>();
            while(resultSet.next()){
                Integer id =resultSet.getInt("ID");//faultId
                String EAM_CODE=resultSet.getString("EAM_CODE");//s设备编码
                String EAM_NAME=resultSet.getString("EAM_NAME");//设备名称
                String DESCRIBE=resultSet.getString("DESCRIBE");//隐患现象
                String SOURCE_TYPE=resultSet.getString("SOURCE_TYPE");//隐患来源
                String FAULT_STATE=resultSet.getString("FAULT_STATE");//隐患状态
                String DOWN_STREAM=resultSet.getString("DOWN_STREAM");//处理方式
                String PRIORITY=resultSet.getString("PRIORITY");//隐患等级
                String NEXT_TIME=resultSet.getString("NEXT_TIME");//发现时间
                String fname=resultSet.getString("fname");//发现人
                String cname=resultSet.getString("cname");//处理人
                String postname=resultSet.getString("postname");//处理人岗位
                String eff_time=resultSet.getString("eff_time");//隐患单生效时间
                String companyname=resultSet.getString("companyname");//子公司
                String FAULT_INFO_TYPE=resultSet.getString("FAULT_INFO_TYPE");//隐患类型


                Map<String,String> rowresult=new HashMap<String,String>();
                rowresult.put("EAM_CODE",EAM_CODE);
                rowresult.put("EAM_NAME",EAM_NAME);
                rowresult.put("DESCRIBE",DESCRIBE);
                rowresult.put("SOURCE_TYPE",SOURCE_TYPE);
                rowresult.put("FAULT_STATE",FAULT_STATE);
                rowresult.put("DOWN_STREAM",DOWN_STREAM);
                rowresult.put("PRIORITY",PRIORITY);
                rowresult.put("NEXT_TIME",NEXT_TIME);
                rowresult.put("fname",fname);
                rowresult.put("cname",cname);
                rowresult.put("postname",postname);
                rowresult.put("eff_time",eff_time);
                rowresult.put("EAM_CODE",EAM_CODE);
                rowresult.put("companyname",companyname);
                rowresult.put("id",id.toString());
                rowresult.put("FAULT_INFO_TYPE",FAULT_INFO_TYPE);
                allResult.add(rowresult);
            }
            return allResult;
        } catch (SQLException e) {
            logger.error(e);
        }finally {
            if (preparedStatement!=null){
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(resultSet!=null){

                try {
                    resultSet.close();
                } catch (SQLException e) {
//                    e.printStackTrace();
                    logger.error(e);
                }
            }
            if(oracle_connection!=null){
                try {
                    oracle_connection.close();
                } catch (SQLException throwables) {
                    logger.error(throwables);
                }
            }

        }

        return null;
    }
}
