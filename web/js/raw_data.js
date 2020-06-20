/*----------------------------详情界面跳转-----------------------------------------*/

var objWinRaw_Frame;

function raw_frame(){

    var target = "Raw_Frame1.html";
    if (objWinRaw_Frame == null || objWinRaw_Frame.closed) {
        objWinRaw_Frame = window.open(target);
    } else {
        objWinRaw_Frame.location.replace(target);
    }
}


/*-------------------参数设置---------------*/

function raw_syetem_set_OK(){
    document.getElementById("interval_time").setAttribute("readOnly","true");
    document.getElementById("siloLevel_limit").setAttribute("readOnly","true");

    localStorage.intervaltime = document.getElementById("interval_time").value;
    localStorage.siloLevellimit =document.getElementById("siloLevel_limit").value;

    document.getElementById("interval_time").style.backgroundColor="#a2a2a2";
    document.getElementById("siloLevel_limit").style.backgroundColor="#a2a2a2";

}

function raw_syetem_set_Edit(){
    document.getElementById("interval_time").removeAttribute("readOnly");
    document.getElementById("siloLevel_limit").removeAttribute("readOnly");

    document.getElementById("interval_time").style.backgroundColor="#fff";
    document.getElementById("siloLevel_limit").style.backgroundColor="#fff";
}

function data_onload(){
    document.getElementById("interval_time").value=localStorage.intervaltime;
    document.getElementById("siloLevel_limit").value=localStorage.siloLevellimit;
}
/*----------------------------数据获取及刷新----------------------------------*/

var siloLevel_audio_mess=new Array();

function raw_data_flush(kiln_stopArr){

    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var jsonObject = JSON.parse(xmlhttp.responseText);
            var dataObj = jsonObject.data;

            // console.log(dataObj);
            var sysZJLX_11 = dataObj.ZJLX_11; var sysZJLX_21 = dataObj.ZJLX_21; var sysZJLX_31 = dataObj.ZJLX_31;
            var sysHZJD_11 = dataObj.HZJD_11; var sysHZJD_21 = dataObj.HZJD_21; var sysHZTL_11 = dataObj.HZTL_11;

            var sysJXGA_11 = dataObj.JXGA_11; var sysJXGA_21 = dataObj.JXGA_21; var sysJXHC_11 = dataObj.JXHC_11;
            var sysJXHY_11 = dataObj.JXHY_11; var sysJXNY_11 = dataObj.JXNY_11; var sysJXYZ_11 = dataObj.JXYZ_11;
            var sysJXYZ_12 = dataObj.JXYZ_12; var sysJXYP_11 = dataObj.JXYP_11; var sysJXYP_12 = dataObj.JXYP_12;

            var sysFJZP_11 = dataObj.FJZP_11; var sysFJZP_21 = dataObj.FJZP_21; var sysFJZP_31 = dataObj.FJZP_31;
            var sysFJZP_32 = dataObj.FJZP_32; var sysFJDT_11 = dataObj.FJDT_11;

            var sysYNYL_11 = dataObj.YNYL_11; var sysYNYL_21 = dataObj.YNYL_21; var sysYNNN_11 = dataObj.YNNN_11;
            var sysYNLL_11 = dataObj.YNLL_11; var sysYNLL_21 = dataObj.YNLL_21; var sysYNLL_22 = dataObj.YNLL_22;
            var sysYNCZ_11 = dataObj.YNCZ_11; var sysYNCZ_12 = dataObj.YNCZ_12; var sysYNMX_11 = dataObj.YNMX_11;
            var sysYNMX_12 = dataObj.YNMX_12; var sysYNHQ_11 = dataObj.YNHQ_11;

            var sysSCLS_11 = dataObj.SCLS_11; var sysSCLS_21 = dataObj.SCLS_21; var sysSCJY_11 = dataObj.SCJY_11;
            var sysSCCN_11 = dataObj.SCCN_11;

            var sysJTKC_11 = dataObj.JTKC_11; var sysJTLZ_11 = dataObj.JTLZ_11; var sysJTLZ_12 = dataObj.JTLZ_12;

            var sysHWWX_11 = dataObj.HWWX_11; var sysHWXW_11 = dataObj.HWXW_11;


/*------------------生料磨开停机数量数据-------------------------------*/

            var covalue_run = {codata:[{name:"sysZJLX_11",name_ch:"兰溪一线",elcdata:sysZJLX_11.B32M_DACAH_PV+sysZJLX_11.B32M_DACAG_PV},
                    {name:"sysZJLX_21",name_ch:"兰溪二线",elcdata:sysZJLX_21.B32M_B_DACA_PV},
                    {name:"sysZJLX_31",name_ch:"兰溪三线",elcdata:sysZJLX_31.B07G_B13M_CUND_PV},
                    {name:"sysHZJD_11",name_ch:"建德一线",elcdata:sysHZJD_11.AB13M_CUND_PV},
                    {name:"sysHZJD_21",name_ch:"建德二线",elcdata:sysHZJD_21.B13M_CUND_PV},
                    {name:"sysHZTL_11",name_ch:"桐庐红狮",elcdata:sysHZTL_11.A41E1AH04I},
                    {name:"sysJXGA_11",name_ch:"高安一线",elcdata:sysJXGA_11.B13M_CUN_M},
                    {name:"sysJXGA_21",name_ch:"高安二线",elcdata:sysJXGA_21.AB34M_CUN},
                    {name:"sysJXHC_11",name_ch:"会昌红狮",elcdata:sysJXHC_11.B131ALI2},
                    {name:"sysJXHY_11",name_ch:"衡阳红狮",elcdata:sysJXHY_11.AAL1T18},
                    {name:"sysJXNY_11",name_ch:"宁远莲花",elcdata:sysJXNY_11.A13106I1},
                    {name:"sysJXYZ_11",name_ch:"永州红狮1号磨",elcdata:sysJXYZ_11.A361RP01HA_AI13_PV+sysJXYZ_11.A361RP01HA_AI14_PV},
                    {name:"sysJXYZ_12",name_ch:"永州红狮2号磨",elcdata:sysJXYZ_12.A361RP02HA_AI13_PV+sysJXYZ_12.A361RP02HA_AI14_PV},
                    {name:"sysJXYP_11",name_ch:"江西鹰鹏1号磨",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV},
                    {name:"sysJXYP_12",name_ch:"江西鹰鹏2号磨",elcdata:sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV},
                    {name:"sysFJZP_11",name_ch:"漳平一线",elcdata:sysFJZP_11.I_AAI4105MI},
                    {name:"sysFJZP_21",name_ch:"漳平二线",elcdata:sysFJZP_21.M4105I},
                    {name:"sysFJZP_31",name_ch:"漳平三期1号磨",elcdata:sysFJZP_31.DP361RM01_AI39},
                    {name:"sysFJZP_32",name_ch:"漳平三期2号磨",elcdata:sysFJZP_32.DP361RM02_AI39},
                    {name:"sysFJDT_11",name_ch:"大田红狮",elcdata:sysFJDT_11.AI_4105},
                    {name:"sysYNYL_11",name_ch:"宜良一线",elcdata:sysYNYL_11.AI4105MI},
                    {name:"sysYNYL_21",name_ch:"宜良二线",elcdata:sysYNYL_21.MI4105I},
                    {name:"sysYNNN_11",name_ch:"南宁红狮",elcdata:sysYNNN_11.AI4105},
                    {name:"sysYNLL_11",name_ch:"龙里一线",elcdata:sysYNLL_11.B34M11CUN},
                    {name:"sysYNLL_21",name_ch:"龙里二线1号磨",elcdata:sysYNLL_21.M4111AI},
                    {name:"sysYNLL_22",name_ch:"龙里二线2号磨",elcdata:sysYNLL_22.M4112AI},
                    {name:"sysYNCZ_11",name_ch:"崇左红狮1号磨",elcdata:sysYNCZ_11.M4111AI},
                    {name:"sysYNCZ_12",name_ch:"崇左红狮2号磨",elcdata:sysYNCZ_12.M4112AI},
                    {name:"sysYNMX_11",name_ch:"茂鑫红狮1号磨",elcdata:sysYNMX_11.I361RM1},
                    {name:"sysYNMX_12",name_ch:"茂鑫红狮2号磨",elcdata:sysYNMX_12.I361RM2},
                    {name:"sysYNHQ_11",name_ch:"广西恒庆",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4},
                    {name:"sysSCLS_11",name_ch:"邻水一线",elcdata:sysSCLS_11.AI4105MI},
                    {name:"sysSCLS_21",name_ch:"邻水二线",elcdata:sysSCLS_21.AIB30IA},
                    {name:"sysSCJY_11",name_ch:"江油红狮",elcdata:sysSCJY_11.AI4105MI},
                    {name:"sysSCCN_11",name_ch:"长宁红狮",elcdata:sysSCCN_11.AI4105},
                    {name:"sysJTKC_11",name_ch:"库车红狮",elcdata:sysJTKC_11.A13103I1},
                    {name:"sysJTLZ_11",name_ch:"兰州红狮1号磨",elcdata:sysJTLZ_11.M41111AI},
                    {name:"sysJTLZ_12",name_ch:"兰州红狮2号磨",elcdata:sysJTLZ_12.M41121AI},
                    {name:"sysHWWX_11",name_ch:"老挝万象",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I}]};

            var stopNum = 0;
            var stopRawsysArr=new Array();
            for(var i=0;i<covalue_run.codata.length;i++){

                // var line_name=covalue_run.codata[i].name_ch;
                if(covalue_run.codata[i].elcdata<=1){
                    stopNum++;
                    stopRawsysArr.push(covalue_run.codata[i].name_ch);
                }
            }


            var allNum = covalue_run.codata.length;
            var runNum = allNum-stopNum;

            showRunchart(runNum,allNum,stopNum);


/*------------------生料产量map数据-------------------------------*/

            var toolTipData = [
                {name:"浙江", value:[
                        {name:"兰溪1#",dayvalue:sysZJLX_11.rawdayyeild,monvalue:sysZJLX_11.rawmonthyeild},
                        {name:"兰溪2#",dayvalue:sysZJLX_21.rawdayyeild,monvalue:sysZJLX_21.rawmonthyeild},
                        {name:"兰溪3#",dayvalue:sysZJLX_31.rawdayyeild,monvalue:sysZJLX_31.rawmonthyeild},
                        {name:"建德1#",dayvalue:sysHZJD_11.rawdayyeild,monvalue:sysHZJD_11.rawmonthyeild},
                        {name:"建德2#",dayvalue:sysHZJD_21.rawdayyeild,monvalue:sysHZJD_21.rawmonthyeild},
                        {name:"桐庐",dayvalue:sysHZTL_11.rawdayyeild,monvalue:sysHZTL_11.rawmonthyeild}]},
                {name:"江西",value:[
                        {name:"高安1#",dayvalue:sysJXGA_11.rawdayyeild,monvalue:sysJXGA_11.rawmonthyeild},
                        {name:"高安2#",dayvalue:sysJXGA_21.rawdayyeild,monvalue:sysJXGA_21.rawmonthyeild},
                        {name:"会昌",dayvalue:sysJXHC_11.rawdayyeild,monvalue:sysJXHC_11.rawmonthyeild},
                        {name:"鹰鹏",dayvalue:sysJXYP_11.rawdayyeild + sysJXYP_12.rawdayyeild,monvalue:sysJXYP_11.rawmonthyeild + sysJXYP_12.rawmonthyeild}]},
                {name:"湖南",value:[
                        {name:"衡阳",dayvalue:sysJXHY_11.rawdayyeild,monvalue:sysJXHY_11.rawmonthyeild},
                        {name:"宁远莲花",dayvalue:sysJXNY_11.rawdayyeild,monvalue:sysJXNY_11.rawmonthyeild},
                        {name:"永州",dayvalue:sysJXYZ_11.rawdayyeild + sysJXYZ_12.rawdayyeild,monvalue:sysJXYZ_11.rawmonthyeild + sysJXYZ_12.rawmonthyeild}]},
                {name:"福建",value:[
                        {name:"漳平1#",dayvalue:sysFJZP_11.rawdayyeild,monvalue:sysFJZP_11.rawmonthyeild},
                        {name:"漳平2#",dayvalue:sysFJZP_21.rawdayyeild,monvalue:sysFJZP_21.rawmonthyeild},
                        {name:"漳平3#",dayvalue:sysFJZP_31.rawdayyeild + sysFJZP_32.rawdayyeild,monvalue:sysFJZP_31.rawmonthyeild + sysFJZP_32.rawmonthyeild},
                        {name:"大田",dayvalue:sysFJDT_11.rawdayyeild,monvalue:sysFJDT_11.rawmonthyeild}]},
                {name:"云南",value:[
                        {name:"宜良1#",dayvalue:sysYNYL_11.rawdayyeild,monvalue:sysYNYL_11.rawmonthyeild},
                        {name:"宜良2#",dayvalue:sysYNYL_21.rawdayyeild,monvalue:sysYNYL_21.rawmonthyeild}]},
                {name:"广西",value:[
                        {name:"南宁",dayvalue:sysYNNN_11.rawdayyeild,monvalue:sysYNNN_11.rawmonthyeild},
                        {name:"崇左",dayvalue:sysYNCZ_11.rawdayyeild + sysYNCZ_12.rawdayyeild,monvalue:sysYNCZ_11.rawmonthyeild + sysYNCZ_12.rawmonthyeild},
                        {name:"恒庆",dayvalue:sysYNHQ_11.rawdayyeild,monvalue:sysYNHQ_11.rawmonthyeild}]},
                {name:"贵州",value:[
                        {name:"龙里1#",dayvalue:sysYNLL_11.rawdayyeild,monvalue:sysYNLL_11.rawmonthyeild},
                        {name:"龙里2#",dayvalue:sysYNLL_21.rawdayyeild + sysYNLL_22.rawdayyeild,monvalue:sysYNLL_21.rawmonthyeild + sysYNLL_22.rawmonthyeild},
                        {name:"茂鑫",dayvalue:sysYNMX_11.rawdayyeild + sysYNMX_12.rawdayyeild,monvalue:sysYNMX_11.rawmonthyeild + sysYNMX_12.rawmonthyeild}]},
                {name:"四川",value:[
                        {name:"邻水1#",dayvalue:sysSCLS_11.rawdayyeild,monvalue:sysSCLS_11.rawmonthyeild},
                        {name:"邻水2#",dayvalue:sysSCLS_21.rawdayyeild,monvalue:sysSCLS_21.rawmonthyeild},
                        {name:"江油",dayvalue:sysSCJY_11.rawdayyeild,monvalue:sysSCJY_11.rawmonthyeild},
                        {name:"长宁",dayvalue:sysSCCN_11.rawdayyeild,monvalue:sysSCCN_11.rawmonthyeild}]},
                {name:"甘肃",value:[
                        {name:"兰州",dayvalue:sysJTLZ_11.rawdayyeild+sysJTLZ_12.rawdayyeild,monvalue:sysJTLZ_11.rawmonthyeild+sysJTLZ_12.rawmonthyeild}]},
                {name:"新疆",value:[
                        {name:"库车",dayvalue:sysJTKC_11.rawdayyeild,monvalue:sysJTKC_11.rawmonthyeild}]},
                {name:"老挝",value:[
                        {name:"万象",dayvalue:sysHWWX_11.rawdayyeild,monvalue:sysHWWX_11.rawmonthyeild}]},
            ];

            var total_result = new Array(22);
            for(var i=0;i<total_result.length;++i){
                total_result[i]=0;
            }

            for(var i=0;i<toolTipData.length;i++){
                for(var j=0;j<toolTipData[i].value.length;j++) {

                    total_result[2*i]+=toolTipData[i].value[j].dayvalue;
                    total_result[2*i+1]+=toolTipData[i].value[j].monvalue;
                }
            }

            var ZJdayvalue = total_result[0];   var ZJmonvalue =total_result[1];
            var JXdayvalue = total_result[2];   var JXmonvalue = total_result[3];
            var HNdayvalue = total_result[4];   var HNmonvalue = total_result[5];
            var FJdayvalue = total_result[6];   var FJmonvalue = total_result[7];
            var YNdayvalue = total_result[8];   var YNmonvalue = total_result[9];
            var GXdayvalue = total_result[10];  var GXmonvalue = total_result[11];
            var GZdayvalue = total_result[12];  var GZmonvalue = total_result[13];
            var SCdayvalue = total_result[14];  var SCmonvalue = total_result[15];
            var GSdayvalue = total_result[16];  var GSmonvalue = total_result[17];
            var XJdayvalue = total_result[18];  var XJmonvalue = total_result[19];
            var LWdayvalue = total_result[20];  var LWmonvalue = total_result[21];
            // console.log("total_result:",total_result);

            var data = [
                {name:"浙江",value:ZJdayvalue},
                {name:"江西",value:JXdayvalue},
                {name:"湖南",value:HNdayvalue},
                {name:"福建",value:FJdayvalue},
                {name:"云南",value:YNdayvalue},
                {name:"广西",value:GXdayvalue},
                {name:"贵州",value:GZdayvalue},
                {name:"四川",value:SCdayvalue},
                {name:"甘肃",value:GSdayvalue},
                {name:"新疆",value:XJdayvalue},
                {name:"老挝",value:LWdayvalue},
            ];

            var totaldayvalue = ZJdayvalue + JXdayvalue + HNdayvalue + FJdayvalue + YNdayvalue + GXdayvalue + GZdayvalue + SCdayvalue + GSdayvalue + XJdayvalue + LWdayvalue;
            var totalmonvalue = ZJmonvalue + JXmonvalue + HNmonvalue + FJmonvalue + YNmonvalue + GXmonvalue + GZmonvalue + SCmonvalue + GSmonvalue + XJmonvalue + LWmonvalue;

            var totaldayout = document.getElementById("totaldayout");
            totaldayout.innerText = returnVaule(totaldayvalue/10000);

            var totalmonout = document.getElementById("totalmonout");
            totalmonout.innerText = returnVaule(totalmonvalue/10000);

            showmapChart(data,toolTipData);


 /*------------------集团及子公司生料台时数据-----------------------*/

            var covalue_ts = {codata:[
                    {name:"兰溪1#",elcdata:sysZJLX_11.B32M_DACAH_PV+sysZJLX_11.B32M_DACAG_PV,value:sysZJLX_11.AFEED_TOTALS_C1},
                    {name:"兰溪2#",elcdata:sysZJLX_21.B32M_B_DACA_PV,value:sysZJLX_21.AFEED_B_TOTALS_C1},
                    {name:"兰溪3#",elcdata:sysZJLX_31.B07G_B13M_CUND_PV,value:sysZJLX_31.Q06G_PLJS_ZFK_PV},
                    {name:"建德1#",elcdata:sysHZJD_11.AB13M_CUND_PV,value:sysHZJD_11.AAFEED_TOTAL_C1},
                    {name:"建德2#",elcdata:sysHZJD_21.B13M_CUND_PV,value:sysHZJD_21.AFEED_TOTAL_C1},
                    {name:"桐庐 #",elcdata:sysHZTL_11.A41E1AH04I,value:sysHZTL_11.TSFK},
                    {name:"高安1#",elcdata:sysJXGA_11.B13M_CUN_M,value:sysJXGA_11.FEED_TOL},
                    {name:"高安2#",elcdata:sysJXGA_21.AB34M_CUN,value:sysJXGA_21.AA2ZCL_FI},
                    {name:"会昌 #",elcdata:sysJXHC_11.B131ALI2,value:sysJXHC_11.B_G14_TOL},
                    {name:"衡阳 #",elcdata:sysJXHY_11.AAL1T18,value:sysJXHY_11.Total},
                    {name:"宁远莲花",elcdata:sysJXNY_11.A13106I1,value:sysJXNY_11.A_G18_TOL},
                    {name:"永州 #1",elcdata:sysJXYZ_11.A361RP01HA_AI13_PV+sysJXYZ_11.A361RP01HA_AI14_PV,value:sysJXYZ_11.TSFK_1_VALUE},
                    {name:"永州 #2",elcdata:sysJXYZ_12.A361RP02HA_AI13_PV+sysJXYZ_12.A361RP02HA_AI14_PV,value:sysJXYZ_12.TSFK_2_VALUE},
                    {name:"鹰鹏 #1",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV,value:sysJXYP_11.TSFK_1_VALUE},
                    {name:"鹰鹏 #2",elcdata:sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV,value:sysJXYP_12.TSFK_2_VALUE},
                    {name:"漳平1#",elcdata:sysFJZP_11.I_AAI4105MI,value:sysFJZP_11.ARAWIN},
                    {name:"漳平2#",elcdata:sysFJZP_21.M4105I,value:sysFJZP_21.TSFK},
                    {name:"漳平3#1",elcdata:sysFJZP_31.DP361RM01_AI39,value:sysFJZP_31.TSFK_1_VALUE},
                    {name:"漳平3#2",elcdata:sysFJZP_32.DP361RM02_AI39,value:sysFJZP_32.TSFK_2},
                    {name:"大田 #",elcdata:sysFJDT_11.AI_4105,value:sysFJDT_11.S_YL1},
                    {name:"宜良1#",elcdata:sysYNYL_11.AI4105MI,value:sysYNYL_11.TSFK},
                    {name:"宜良2#",elcdata:sysYNYL_21.MI4105I,value:sysYNYL_21.TSFK4105},
                    {name:"南宁 #",elcdata:sysYNNN_11.AI4105,value:sysYNNN_11.LMTSFK},
                    {name:"龙里1#",elcdata:sysYNLL_11.B34M11CUN,value:sysYNLL_11.FKYULIAO},
                    {name:"龙里2#1",elcdata:sysYNLL_21.M4111AI,value:sysYNLL_21.LM1TCFI},
                    {name:"龙里2#2",elcdata:sysYNLL_22.M4112AI,value:sysYNLL_22.LM2TCFI},
                    {name:"崇左 #1",elcdata:sysYNCZ_11.M4111AI,value:sysYNCZ_11.LM1TCFI},
                    {name:"崇左 #2",elcdata:sysYNCZ_12.M4112AI,value:sysYNCZ_12.LM2TCFI},
                    {name:"茂鑫 #1",elcdata:sysYNMX_11.I361RM1,value:sysYNMX_11.TSFK_1},
                    {name:"茂鑫 #2",elcdata:sysYNMX_12.I361RM2,value:sysYNMX_12.TSFK_2},
                    {name:"恒庆 #",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4,value:sysYNHQ_11.YLSNTSFK_1},
                    {name:"邻水1#",elcdata:sysSCLS_11.AI4105MI,value:sysSCLS_11.TSFK},
                    {name:"邻水2#",elcdata:sysSCLS_21.AIB30IA,value:sysSCLS_21.TSFK_YLMA},
                    {name:"江油 #",elcdata:sysSCJY_11.AI4105MI,value:sysSCJY_11.TSFK},
                    {name:"长宁 #",elcdata:sysSCCN_11.AI4105,value:sysSCCN_11.TCFCA},
                    {name:"库车 #",elcdata:sysJTKC_11.A13103I1,value:sysJTKC_11.AF01_00},
                    {name:"兰州 #1",elcdata:sysJTLZ_11.M41111AI,value:sysJTLZ_11.LM1TCFI},
                    {name:"兰州 #2",elcdata:sysJTLZ_12.M41121AI,value:sysJTLZ_12.LM2TCFI},
                    {name:"老挝万象",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I,value:sysHWWX_11.TOTALFB2_VALUE}]};

            var k=0;
            for(var i=0;i<covalue_ts.codata.length;i++){
                if(covalue_ts.codata[i].elcdata<=10){
                    k++;
                    delete covalue_ts.codata[i];
                }
            }

            function sortValue_ts(a,b){
                return b.value-a.value;
            }
            covalue_ts.codata.sort(sortValue_ts);

            var totaldata = 0;
            for(var i=0;i<covalue_ts.codata.length-k;i++){
                totaldata += covalue_ts.codata[i].value;
            }

            var allStaout = document.getElementById('allStaout');
            allStaout.innerText = Math.round(totaldata*100)/100;

            var realdata = [covalue_ts.codata[0].value,covalue_ts.codata[1].value,covalue_ts.codata[2].value,covalue_ts.codata[covalue_ts.codata.length-k-3].value,covalue_ts.codata[covalue_ts.codata.length-k-2].value,covalue_ts.codata[covalue_ts.codata.length-k-1].value];
            var titlename = [covalue_ts.codata[0].name,covalue_ts.codata[1].name,covalue_ts.codata[2].name,covalue_ts.codata[covalue_ts.codata.length-k-3].name,covalue_ts.codata[covalue_ts.codata.length-k-2].name,covalue_ts.codata[covalue_ts.codata.length-k-1].name,];
            var valdata = realdata;

            showChartbox1(realdata,titlename,valdata);



/*-------------------------集团及子公司生料电耗数据-------------------------*/

            var covalue_elc = {codata:[
                    {name:"兰溪3#",elcdata:sysZJLX_31.B07G_B13M_CUND_PV,feed:sysZJLX_31.Q06G_PLJS_ZFK_PV,value:sysZJLX_31.SSGL_YLGH_C2},
                    {name:"建德1#",elcdata:sysHZJD_11.AB13M_CUND_PV,feed:sysHZJD_11.AAFEED_TOTAL_C1,value:sysHZJD_11.ADL_SLDH1_C2},
                    {name:"建德2#",elcdata:sysHZJD_21.B13M_CUND_PV,feed:sysHZJD_21.AFEED_TOTAL_C1,value:sysHZJD_21.DL_SLDH_C6},
                    {name:"桐庐 #",elcdata:sysHZTL_11.A41E1AH04I,feed:sysHZTL_11.TSFK,value:sysHZTL_11.DLSLHJ},
                    {name:"高安1#",elcdata:sysJXGA_11.B13M_CUN_M,feed:sysJXGA_11.FEED_TOL,value:sysJXGA_11.YLZDH_1},
                    {name:"高安2#",elcdata:sysJXGA_21.AB34M_CUN,feed:sysJXGA_21.AA2ZCL_FI,value:sysJXGA_21.YLZDH_2},
                    {name:"会昌 #",elcdata:sysJXHC_11.B131ALI2,feed:sysJXHC_11.B_G14_TOL,value:sysJXHC_11.GL_PSHZDH},
                    {name:"衡阳 #",elcdata:sysJXHY_11.AAL1T18,feed:sysJXHY_11.Total,value:sysJXHY_11.SLZDH},
                    {name:"鹰鹏 #1",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV,feed:sysJXYP_11.TSFK_1_VALUE,value:sysJXYP_11.ZDH_1_VALUE},
                    {name:"鹰鹏 #2",elcdata:sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV,feed:sysJXYP_12.TSFK_2_VALUE,value:sysJXYP_12.ZDH_2_VALUE},
                    {name:"漳平1#",elcdata:sysFJZP_11.I_AAI4105MI,feed:sysFJZP_11.ARAWIN,value:sysFJZP_11.SLZDH002},
                    {name:"漳平2#",elcdata:sysFJZP_21.M4105I,feed:sysFJZP_21.TSFK,value:sysFJZP_21.SLZDH001},
                    {name:"大田 #",elcdata:sysFJDT_11.AI_4105,feed:sysFJDT_11.S_YL1,value:sysFJDT_11.SLDH_HJ},
                    {name:"宜良1#",elcdata:sysYNYL_11.AI4105MI,feed:sysYNYL_11.TSFK,value:sysYNYL_11.H04},
                    {name:"宜良2#",elcdata:sysYNYL_21.MI4105I,feed:sysYNYL_21.TSFK4105,value:sysYNYL_21.H04P},
                    {name:"南宁 #",elcdata:sysYNNN_11.AI4105,feed:sysYNNN_11.LMTSFK,value:sysYNNN_11.AVG6a},
                    {name:"龙里1#",elcdata:sysYNLL_11.B34M11CUN,feed:sysYNLL_11.FKYULIAO,value:sysYNLL_11.YLZDH},
                    {name:"龙里2#1",elcdata:sysYNLL_21.M4111AI,feed:sysYNLL_21.LM1TCFI,value:sysYNLL_21.SLDH2},
                    {name:"龙里2#2",elcdata:sysYNLL_22.M4112AI,feed:sysYNLL_22.LM2TCFI,value:sysYNLL_22.SLDH3},
                    {name:"崇左 #1",elcdata:sysYNCZ_11.M4111AI,feed:sysYNCZ_11.LM1TCFI,value:sysYNCZ_11.LMZDH1},
                    {name:"崇左 #2",elcdata:sysYNCZ_12.M4112AI,feed:sysYNCZ_12.LM2TCFI,value:sysYNCZ_12.LMZDH2},
                    {name:"茂鑫 #1",elcdata:sysYNMX_11.I361RM1,feed:sysYNMX_11.TSFK_1,value:sysYNMX_11.PSLGX},
                    {name:"茂鑫 #2",elcdata:sysYNMX_12.I361RM2,feed:sysYNMX_12.TSFK_2,value:sysYNMX_12.PSLGX_HPS},
                    {name:"恒庆 #",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4,feed:sysYNHQ_11.YLSNTSFK_1,value:sysYNHQ_11.SLSSDH_VALUE},
                    {name:"邻水1#",elcdata:sysSCLS_11.AI4105MI,feed:sysSCLS_11.TSFK,value:sysSCLS_11.L1SL_Z},
                    {name:"邻水2#",elcdata:sysSCLS_21.AIB30IA,feed:sysSCLS_21.TSFK_YLMA,value:sysSCLS_21.L2SL_Z},
                    {name:"江油 #",elcdata:sysSCJY_11.AI4105MI,feed:sysSCJY_11.TSFK,value:sysSCJY_11.DDH200},
                    {name:"长宁 #",elcdata:sysSCCN_11.AI4105,feed:sysSCCN_11.TCFCA,value:sysSCCN_11.TDH01},
                    {name:"库车 #",elcdata:sysJTKC_11.A13103I1,feed:sysJTKC_11.AF01_00,value:sysJTKC_11.SLFMHJDH},
                    {name:"兰州 #1",elcdata:sysJTLZ_11.M41111AI,feed:sysJTLZ_11.LM1TCFI,value:sysJTLZ_11.YLDDH1},
                    {name:"兰州 #2",elcdata:sysJTLZ_12.M41121AI,feed:sysJTLZ_12.LM2TCFI,value:sysJTLZ_12.YLDDH2},
                    {name:"老挝万象",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I,feed:sysHWWX_11.TOTALFB2_VALUE,value:sysHWWX_11.B001DH}]};

            var k=0;
            for(var i=0;i<covalue_elc.codata.length;i++){
                if(covalue_elc.codata[i].elcdata<=10||covalue_elc.codata[i].feed<=10||covalue_elc.codata[i].value<=1||covalue_elc.codata[i].value>=30){
                    k++;
                    delete covalue_elc.codata[i];
                }
            }

            function sortValue_elc(a,b){
                return a.value-b.value;
            }
            covalue_elc.codata.sort(sortValue_elc);

            var totaldata = 0;
            for(var i=0;i<covalue_elc.codata.length-k;i++){
                totaldata += covalue_elc.codata[i].value;
            }

            var aveElecuse = document.getElementById('aveElecuse');
            avedata_elc = totaldata/(covalue_elc.codata.length-k);
            aveElecuse.innerHTML = Math.round(avedata_elc*100)/100;

            var y_data = [covalue_elc.codata[0].value,covalue_elc.codata[1].value,covalue_elc.codata[2].value,covalue_elc.codata[covalue_elc.codata.length-k-3].value,covalue_elc.codata[covalue_elc.codata.length-k-2].value,covalue_elc.codata[covalue_elc.codata.length-k-1].value];
            var x_data = [covalue_elc.codata[0].name,covalue_elc.codata[1].name,covalue_elc.codata[2].name,covalue_elc.codata[covalue_elc.codata.length-k-3].name,covalue_elc.codata[covalue_elc.codata.length-k-2].name,covalue_elc.codata[covalue_elc.codata.length-k-1].name,];

            showChartbox2(x_data,y_data);


/*-------------------------集团及子公司生料细度数据-------------------------*/

            var covalue_fin = {codata:[
                    {name:"兰溪1#",elcdata:sysZJLX_11.B32M_DACAH_PV+sysZJLX_11.B32M_DACAG_PV,value:sysZJLX_11.raw02Fineness},
                    {name:"兰溪2#",elcdata:sysZJLX_21.B32M_B_DACA_PV,value:sysZJLX_21.raw02Fineness},
                    {name:"兰溪3#",elcdata:sysZJLX_31.B07G_B13M_CUND_PV,value:sysZJLX_31.raw02Fineness},
                    {name:"建德1#",elcdata:sysHZJD_11.AB13M_CUND_PV,value:sysHZJD_11.raw02Fineness},
                    {name:"建德2#",elcdata:sysHZJD_21.B13M_CUND_PV,value:sysHZJD_21.raw02Fineness},
                    {name:"桐庐 #",elcdata:sysHZTL_11.A41E1AH04I,value:sysHZTL_11.raw02Fineness},
                    {name:"高安1#",elcdata:sysJXGA_11.B13M_CUN_M,value:sysJXGA_11.raw02Fineness},
                    {name:"高安2#",elcdata:sysJXGA_21.AB34M_CUN,value:sysJXGA_21.raw02Fineness},
                    {name:"会昌 #",elcdata:sysJXHC_11.B131ALI2,value:sysJXHC_11.raw02Fineness},
                    {name:"衡阳 #",elcdata:sysJXHY_11.AAL1T18,value:sysJXHY_11.raw02Fineness},
                    {name:"宁远莲花",elcdata:sysJXNY_11.A13106I1,value:sysJXNY_11.raw02Fineness},
                    {name:"永州 #1",elcdata:sysJXYZ_11.A361RP01HA_AI13_PV+sysJXYZ_11.A361RP01HA_AI14_PV,value:sysJXYZ_11.raw02Fineness},
                    {name:"永州 #2",elcdata:sysJXYZ_12.A361RP02HA_AI13_PV+sysJXYZ_12.A361RP02HA_AI14_PV,value:sysJXYZ_12.raw02Fineness},
                    {name:"鹰鹏 #1",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV,value:sysJXYP_11.raw02Fineness},
                    {name:"鹰鹏 #2",elcdata:sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV,value:sysJXYP_12.raw02Fineness},
                    {name:"漳平1#",elcdata:sysFJZP_11.I_AAI4105MI,value:sysFJZP_11.raw02Fineness},
                    {name:"漳平2#",elcdata:sysFJZP_21.M4105I,value:sysFJZP_21.raw02Fineness},
                    {name:"漳平3#1",elcdata:sysFJZP_31.DP361RM01_AI39,value:sysFJZP_31.raw02Fineness},
                    {name:"漳平3#2",elcdata:sysFJZP_32.DP361RM02_AI39,value:sysFJZP_32.raw02Fineness},
                    {name:"大田 #",elcdata:sysFJDT_11.AI_4105,value:sysFJDT_11.raw02Fineness},
                    {name:"宜良1#",elcdata:sysYNYL_11.AI4105MI,value:sysYNYL_11.raw02Fineness},
                    {name:"宜良2#",elcdata:sysYNYL_21.MI4105I,value:sysYNYL_21.raw02Fineness},
                    {name:"南宁 #",elcdata:sysYNNN_11.AI4105,value:sysYNNN_11.raw02Fineness},
                    {name:"龙里1#",elcdata:sysYNLL_11.B34M11CUN,value:sysYNLL_11.raw02Fineness},
                    {name:"龙里2#1",elcdata:sysYNLL_21.M4111AI,value:sysYNLL_21.raw02Fineness},
                    {name:"龙里2#2",elcdata:sysYNLL_22.M4112AI,value:sysYNLL_22.raw02Fineness},
                    {name:"崇左 #1",elcdata:sysYNCZ_11.M4111AI,value:sysYNCZ_11.raw02Fineness},
                    {name:"崇左 #2",elcdata:sysYNCZ_12.M4112AI,value:sysYNCZ_12.raw02Fineness},
                    {name:"茂鑫 #1",elcdata:sysYNMX_11.I361RM1,value:sysYNMX_11.raw02Fineness},
                    {name:"茂鑫 #2",elcdata:sysYNMX_12.I361RM2,value:sysYNMX_12.raw02Fineness},
                    {name:"恒庆 #",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4,value:sysYNHQ_11.raw02Fineness},
                    {name:"邻水1#",elcdata:sysSCLS_11.AI4105MI,value:sysSCLS_11.raw02Fineness},
                    {name:"邻水2#",elcdata:sysSCLS_21.AIB30IA,value:sysSCLS_21.raw02Fineness},
                    {name:"江油 #",elcdata:sysSCJY_11.AI4105MI,value:sysSCJY_11.raw02Fineness},
                    {name:"长宁 #",elcdata:sysSCCN_11.AI4105,value:sysSCCN_11.raw02Fineness},
                    {name:"库车 #",elcdata:sysJTKC_11.A13103I1,value:sysJTKC_11.raw02Fineness},
                    {name:"兰州 #1",elcdata:sysJTLZ_11.M41111AI,value:sysJTLZ_11.raw02Fineness},
                    {name:"兰州 #2",elcdata:sysJTLZ_12.M41121AI,value:sysJTLZ_12.raw02Fineness},
                    {name:"老挝万象",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I,value:sysHWWX_11.raw02Fineness}]};

            // console.log(covalue_fin);
            var covalue_fin_dataArr= new Array();
            for(var i=0;i<covalue_fin.codata.length;i++) {
                if(covalue_fin.codata[i].value>0){
                    covalue_fin_dataArr.push(covalue_fin.codata[i]);
                }
            }

            var totaldata = 0;

            if(covalue_fin_dataArr.length<6) {

                function sortValue_fin1(a,b){
                    return a.value-b.value;
                }
                covalue_fin.codata.sort(sortValue_fin1);

                for(var i=0;i<covalue_fin.codata.length;i++){
                    totaldata += covalue_fin.codata[i].value;
                }

                var aveFine = document.getElementById('aveFine');
                var avedata_fine = totaldata/(covalue_fin.codata.length);
                aveFine.innerText = Math.round(avedata_fine*100)/100;

                var fin_value = [covalue_fin.codata[0].value,covalue_fin.codata[1].value,covalue_fin.codata[2].value,covalue_fin.codata[covalue_fin.codata.length-3].value,covalue_fin.codata[covalue_fin.codata.length-2].value,covalue_fin.codata[covalue_fin.codata.length-1].value];
                var fin_name = [covalue_fin.codata[0].name,covalue_fin.codata[1].name,covalue_fin.codata[2].name,covalue_fin.codata[covalue_fin.codata.length-3].name,covalue_fin.codata[covalue_fin.codata.length-2].name,covalue_fin.codata[covalue_fin.codata.length-1].name,];

            }else{

                function sortValue_fin2(a,b){
                    return a.value-b.value;
                }
                covalue_fin_dataArr.sort(sortValue_fin2);

                for(var i=0;i<covalue_fin_dataArr.length;i++){
                    totaldata += covalue_fin_dataArr[i].value;
                }

                var aveFine = document.getElementById('aveFine');
                var avedata_fine = totaldata/(covalue_fin_dataArr.length);
                aveFine.innerText = Math.round(avedata_fine*100)/100;

                var fin_value = [covalue_fin_dataArr[0].value,covalue_fin_dataArr[1].value,covalue_fin_dataArr[2].value,covalue_fin_dataArr[covalue_fin_dataArr.length-3].value,covalue_fin_dataArr[covalue_fin_dataArr.length-2].value,covalue_fin_dataArr[covalue_fin_dataArr.length-1].value];
                var fin_name = [covalue_fin_dataArr[0].name,covalue_fin_dataArr[1].name,covalue_fin_dataArr[2].name,covalue_fin_dataArr[covalue_fin_dataArr.length-3].name,covalue_fin_dataArr[covalue_fin_dataArr.length-2].name,covalue_fin_dataArr[covalue_fin_dataArr.length-1].name,];

            }

            showChartbox3(fin_name,fin_value);


 /*-------------------------集团及子公司生料库位数据-------------------------*/

            var covalue_silolev = {codata:[
                    {name:"兰溪1#",name_ch:"兰溪一线",elcdata:sysZJLX_11.B32M_DACAH_PV+sysZJLX_11.B32M_DACAG_PV,value:sysZJLX_11.BLT01_daca_pv},
                    {name:"兰溪2#",name_ch:"兰溪二线",elcdata:sysZJLX_21.B32M_B_DACA_PV,value:sysZJLX_21.BLT01_B_daca_pv},
                    {name:"兰溪3#",name_ch:"兰溪三线",elcdata:sysZJLX_31.B07G_B13M_CUND_PV,value:sysZJLX_31.B_LT02_DACA_PV},
                    {name:"建德1#",name_ch:"建德一线",elcdata:sysHZJD_11.AB13M_CUND_PV,value:sysHZJD_11.ABLT02_DACA_PV},
                    {name:"建德2#",name_ch:"建德二线",elcdata:sysHZJD_21.B13M_CUND_PV,value:sysHZJD_21.BLT02_DACA_PV},
                    {name:"桐庐 #",name_ch:"桐庐红狮",elcdata:sysHZTL_11.A41E1AH04I,value:sysHZTL_11.AI4208L01},
                    {name:"高安1#",name_ch:"高安一线",elcdata:sysJXGA_11.B13M_CUN_M,value:sysJXGA_11.BLT02_L_M},
                    {name:"高安2#",name_ch:"高安二线",elcdata:sysJXGA_21.AB34M_CUN,value:sysJXGA_21.ABLT02},
                    {name:"会昌 #",name_ch:"会昌红狮",elcdata:sysJXHC_11.B131ALI2,value:sysJXHC_11.B13213L1},
                    {name:"衡阳 #",name_ch:"衡阳红狮",elcdata:sysJXHY_11.AAL1T18,value:sysJXHY_11.A13211L},
                    {name:"宁远莲花",name_ch:"宁远莲花",elcdata:sysJXNY_11.A13106I1,value:sysJXNY_11.B13200L1},
                    {name:"永州 #",name_ch:"永州红狮",elcdata:sysJXYZ_11.A361RP01HA_AI13_PV+sysJXYZ_11.A361RP01HA_AI14_PV+
                        sysJXYZ_12.A361RP02HA_AI13_PV+sysJXYZ_12.A361RP02HA_AI14_PV,value:sysJXYZ_11.A1391SB01L01_PV},
                    {name:"鹰鹏 #",name_ch:"江西鹰鹏",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV+
                        sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV,value:sysJXYP_11.AI1391SB01L01},
                    {name:"漳平1#",name_ch:"漳平一线",elcdata:sysFJZP_11.I_AAI4105MI,value:sysFJZP_11.I_AAI4208L02},
                    {name:"漳平2#",name_ch:"漳平二线",elcdata:sysFJZP_21.M4105I,value:sysFJZP_21.M4208L},
                    {name:"漳平3#",name_ch:"漳平三期",elcdata:sysFJZP_31.DP361RM01_AI39+sysFJZP_32.DP361RM02_AI39,value:sysFJZP_31.AI391SB01LT01_PV},
                    {name:"大田 #",name_ch:"大田红狮",elcdata:sysFJDT_11.AI_4105,value:sysFJDT_11.L01_4208},
                    {name:"宜良1#",name_ch:"宜良一线",elcdata:sysYNYL_11.AI4105MI,value:sysYNYL_11.AI4200L01},
                    {name:"宜良2#",name_ch:"宜良二线",elcdata:sysYNYL_21.MI4105I,value:sysYNYL_21.MI4208L},
                    {name:"南宁 #",name_ch:"南宁红狮",elcdata:sysYNNN_11.AI4105,value:sysYNNN_11.L4200L02},
                    {name:"龙里1#",name_ch:"龙里一线",elcdata:sysYNLL_11.B34M11CUN,value:sysYNLL_11.BLT01L},
                    {name:"龙里2#",name_ch:"龙里二线",elcdata:sysYNLL_21.M4111AI+sysYNLL_22.M4112AI,value:sysYNLL_21.LT4200L01},
                    {name:"崇左 #",name_ch:"崇左红狮",elcdata:sysYNCZ_11.M4111AI+sysYNCZ_12.M4112AI,value:sysYNCZ_11.LT4200L01},
                    {name:"茂鑫 #",name_ch:"茂鑫红狮",elcdata:sysYNMX_11.I361RM1+sysYNMX_12.I361RM2,value:sysYNMX_11.L391SB01},
                    {name:"恒庆 #",name_ch:"广西恒庆",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4,value:sysYNHQ_11.B63LT0},
                    {name:"邻水1#",name_ch:"邻水一线",elcdata:sysSCLS_11.AI4105MI,value:sysSCLS_11.AI4200LT01},
                    {name:"邻水2#",name_ch:"邻水二线",elcdata:sysSCLS_21.AIB30IA,value:sysSCLS_21.AIF1L01A},
                    {name:"江油 #",name_ch:"江油红狮",elcdata:sysSCJY_11.AI4105MI,value:sysSCJY_11.AI4200L01},
                    {name:"长宁 #",name_ch:"长宁红狮",elcdata:sysSCCN_11.AI4105,value:sysSCCN_11.LI420002},
                    {name:"库车 #",name_ch:"库车红狮",elcdata:sysJTKC_11.A13103I1,value:sysJTKC_11.A13213L1},
                    {name:"兰州 #",name_ch:"兰州红狮",elcdata:sysJTLZ_11.M41111AI+sysJTLZ_12.M41121AI,value:sysJTLZ_11.A4200L01},
                    {name:"老挝万象",name_ch:"老挝万象",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I,value:sysHWWX_11.B13209L1}]};

            var temp_silo =new Array();
            var silolev_data= new Array();
            var silolev_dataArr= new Array();
            for(var i=0;i<covalue_silolev.codata.length;i++){
                if(covalue_silolev.codata[i].value >0){
                    silolev_data.push(covalue_silolev.codata[i]);
                }
            }

            for(var i=0;i<kiln_stopArr.length;i++){
                temp_silo[kiln_stopArr[i].name]=true;
            }
            for(var i=0;i<silolev_data.length;i++){
                if(!temp_silo[silolev_data[i].name_ch]){
                    silolev_dataArr.push(silolev_data[i]);
                }
            }

            function sortValue_silolev(a,b){
                return b.value-a.value;
            }
            silolev_dataArr.sort(sortValue_silolev);

            var totaldata = 0;
            for(var i=0;i<silolev_dataArr.length;i++){
                totaldata += silolev_dataArr[i].value;
            }

            var aveSilolevel = document.getElementById('aveSilolevel');
            var avedata_silolev = totaldata/silolev_dataArr.length;
            aveSilolevel.innerText = Math.round(avedata_silolev*100)/100;

            var comName = [silolev_dataArr[silolev_dataArr.length-1].name,
                silolev_dataArr[silolev_dataArr.length-2].name,
                silolev_dataArr[silolev_dataArr.length-3].name,
                silolev_dataArr[silolev_dataArr.length-4].name,
                silolev_dataArr[silolev_dataArr.length-5].name,
                silolev_dataArr[silolev_dataArr.length-6].name];

            var siloLevel =[silolev_dataArr[silolev_dataArr.length-1].value,
                silolev_dataArr[silolev_dataArr.length-2].value,
                silolev_dataArr[silolev_dataArr.length-3].value,
                silolev_dataArr[silolev_dataArr.length-4].value,
                silolev_dataArr[silolev_dataArr.length-5].value,
                silolev_dataArr[silolev_dataArr.length-6].value];

            showChartbox4(comName,siloLevel);


     /*------------库位报警语音消息----------------*/

            var siloLevel_lowArr = new Array();
            for(var i=0;i<covalue_silolev.codata.length;i++){
               if(covalue_silolev.codata[i].value>0&&covalue_silolev.codata[i].value <15){
                        siloLevel_lowArr.push(covalue_silolev.codata[i]);
                 }
             }

              var temp_silo1 =[];
              siloLevel_audio_mess=[];

              for(var i=0;i<kiln_stopArr.length;i++){
                  temp_silo1[kiln_stopArr[i].name]=true;
              }
              for(var i=0;i<siloLevel_lowArr.length;i++){
                  if(!temp_silo1[siloLevel_lowArr[i].name_ch]){
                      siloLevel_audio_mess.push(siloLevel_lowArr[i]);
                  }
              }

            function sortAudio_silolev(a,b){
                return b.value-a.value;
            }
            siloLevel_audio_mess.sort(sortAudio_silolev);

        }
    }
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

}


window.setInterval(function( ){raw_doTTS(siloLevel_audio_mess)},30*60*1000);


var data_requre_t;

function data_requre(){
    clearInterval(data_requre_t);

    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var jsonObject = JSON.parse(xmlhttp.responseText);

            var dataObj = jsonObject.data;

            var sysZJLX_K1 = dataObj.ZJLX_K1;
            var sysZJLX_K2 = dataObj.ZJLX_K2;
            var sysZJLX_K3 = dataObj.ZJLX_K3;
            var sysZJQL_K1 = dataObj.ZJQL_K1;
            var sysHZJD_K1 = dataObj.HZJD_K1;
            var sysHZJD_K2 = dataObj.HZJD_K2;
            var sysHZTL_K1 = dataObj.HZTL_K1;

            var sysJXGA_K1 = dataObj.JXGA_K1;
            var sysJXGA_K2 = dataObj.JXGA_K2;
            var sysJXHC_K1 = dataObj.JXHC_K1;
            var sysJXHY_K1 = dataObj.JXHY_K1;
            var sysJXNY_K1 = dataObj.JXNY_K1;
            var sysJXYZ_K1 = dataObj.JXYZ_K1;
            var sysJXYP_K1 = dataObj.JXYP_K1;

            var sysFJZP_K1 = dataObj.FJZP_K1;
            var sysFJZP_K2 = dataObj.FJZP_K2;
            var sysFJZP_K3 = dataObj.FJZP_K3;
            var sysFJDT_K1 = dataObj.FJDT_K1;

            var sysYNYL_K1 = dataObj.YNYL_K1;
            var sysYNYL_K2 = dataObj.YNYL_K2;
            var sysYNCZ_K1 = dataObj.YNCZ_K1;
            var sysYNMX_K1 = dataObj.YNMX_K1;
            var sysYNNN_K1 = dataObj.YNNN_K1;
            var sysYNLL_K1 = dataObj.YNLL_K1;
            var sysYNLL_K2 = dataObj.YNLL_K2;
            var sysYNHQ_K1 = dataObj.YNHQ_K1;

            var sysSCLS_K1 = dataObj.SCLS_K1;
            var sysSCLS_K2 = dataObj.SCLS_K2;
            var sysSCJY_K1 = dataObj.SCJY_K1;
            var sysSCCN_K1 = dataObj.SCCN_K1;

            var sysJTKC_K1 = dataObj.JTKC_K1;
            var sysJTLZ_K1 = dataObj.JTLZ_K1;

            var sysHWWX_K1 = dataObj.HWWX_K1;
            var sysHWXW_K1 = dataObj.HWXW_K1;

            /*------------------回转窑开停机数量数据-------------------------------*/

            var kiln_elec = {
                codata: [
                    {name: "兰溪一线", value: sysZJLX_K1.回转窑电流1},
                    {name: "兰溪二线", value: sysZJLX_K2.回转窑电流1},
                    {name: "兰溪三线", value: sysZJLX_K3.回转窑电流1},
                    // {name: "青龙山", value: sysZJQL_K1.回转窑电流1},
                    {name: "建德一线", value: sysHZJD_K1.回转窑电流1},
                    {name: "建德二线", value: sysHZJD_K2.回转窑电流1},
                    {name: "桐庐红狮", value: sysHZTL_K1.回转窑电流1},
                    {name: "高安一线", value: sysJXGA_K1.回转窑电流1},
                    {name: "高安二线", value: sysJXGA_K2.回转窑电流1},
                    {name: "会昌红狮", value: sysJXHC_K1.回转窑电流1},
                    {name: "衡阳红狮", value: sysJXHY_K1.回转窑电流1},
                    {name: "宁远莲花", value: sysJXNY_K1.回转窑电流1},
                    {name: "永州红狮", value: (sysJXYZ_K1.回转窑电流1+sysJXYZ_K1.回转窑电流2)/2},
                    {name: "江西鹰鹏", value: (sysJXYP_K1.回转窑电流1+sysJXYP_K1.回转窑电流2)/2},
                    {name: "漳平一线", value: sysFJZP_K1.回转窑电流1},
                    {name: "漳平二线", value: sysFJZP_K2.回转窑电流1},
                    {name: "漳平三期", value: (sysFJZP_K3.回转窑电流1+sysFJZP_K3.回转窑电流2)/2},
                    {name: "大田红狮", value: sysFJDT_K1.回转窑电流1},
                    {name: "宜良一线", value: sysYNYL_K1.回转窑电流1},
                    {name: "宜良二线", value: sysYNYL_K2.回转窑电流1},
                    {name: "崇左红狮", value: (sysYNCZ_K1.回转窑电流1+sysYNCZ_K1.回转窑电流2)/2},
                    {name: "茂鑫红狮", value: sysYNMX_K1.回转窑电流1},
                    {name: "南宁红狮", value: sysYNNN_K1.回转窑电流1},
                    {name: "龙里一线", value: sysYNLL_K1.回转窑电流1},
                    {name: "龙里二线", value: sysYNLL_K2.回转窑电流1},
                    {name: "广西恒庆", value: sysYNHQ_K1.回转窑电流1},
                    {name: "邻水一线", value: sysSCLS_K1.回转窑电流1},
                    {name: "邻水二线", value: sysSCLS_K2.回转窑电流1},
                    {name: "江油红狮", value: sysSCJY_K1.回转窑电流1},
                    {name: "长宁红狮", value: sysSCCN_K1.回转窑电流1},
                    {name: "库车红狮", value: sysJTKC_K1.回转窑电流1},
                    {name: "兰州红狮", value: sysJTLZ_K1.回转窑电流1},
                    {name: "老挝万象", value: sysHWWX_K1.回转窑电流1},
                    {name: "尼泊尔希望", value: sysHWXW_K1.回转窑电流1}]
            };

            var kiln_stopArr= new Array();
            for(var i=0;i<kiln_elec.codata.length;i++){
                if(kiln_elec.codata[i].value<5){
                    kiln_stopArr.push(kiln_elec.codata[i]);
                }
            }
            raw_data_flush(kiln_stopArr);
        }
    }
    xmlhttp.open("GET","process.do?process=fired&method=FiredRD",true);
    //xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=FiredRD",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    data_requre_t = setInterval(data_requre,3000);
}

function returnVaule(value) {
    var value=Math.round(value*100)/100;
    var point2=value.toString().split(".");
    if(point2.length==1){
        value=value.toString()+".00";
        return value;
    }
    if(point2.length>1){
        if(point2[1].length<2){
            value=value.toString()+"0";
        }
        return value;
    }
}