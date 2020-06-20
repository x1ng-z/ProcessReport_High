
/*----------------------------详情界面跳转-----------------------------------------*/

var objWinfirstline;

function raw_frame(){

    var target = "Raw_Frame.html";
    if (objWinfirstline == null || objWinfirstline.closed) {
        objWinfirstline = window.open(target);
    } else {
        objWinfirstline.location.replace(target);
    }
}


/*-----------------------------开停机数量Chart-------------------------------*/

var mapbox_t;

function runChartflush(){
    clearInterval(mapbox_t);

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


            var covalue_run = {codata:[{name:"sysZJLX_11",elcdata:sysZJLX_11.B32M_DACAH_PV+sysZJLX_11.B32M_DACAG_PV},
                    {name:"sysZJLX_21",elcdata:sysZJLX_21.B32M_B_DACA_PV},
                    {name:"sysZJLX_31",elcdata:sysZJLX_31.B07G_B13M_CUND_PV},
                    {name:"sysHZJD_11",elcdata:sysHZJD_11.AB13M_CUND_PV},
                    {name:"sysHZJD_21",elcdata:sysHZJD_21.B13M_CUND_PV},
                    {name:"sysHZTL_11",elcdata:sysHZTL_11.A41E1AH04I},
                    {name:"sysJXGA_11",elcdata:sysJXGA_11.B13M_CUN_M},
                    {name:"sysJXGA_21",elcdata:sysJXGA_21.AB34M_CUN},
                    {name:"sysJXHC_11",elcdata:sysJXHC_11.B131ALI2},
                    {name:"sysJXHY_11",elcdata:sysJXHY_11.AAL1T18},
                    {name:"sysJXNY_11",elcdata:sysJXNY_11.A13106I1},
                    {name:"sysJXYZ_11",elcdata:sysJXYZ_11.A361RP01HA_AI13_PV+sysJXYZ_11.A361RP01HA_AI14_PV},
                    {name:"sysJXYZ_12",elcdata:sysJXYZ_12.A361RP02HA_AI13_PV+sysJXYZ_12.A361RP02HA_AI14_PV},
                    {name:"sysJXYP_11",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV},
                    {name:"sysJXYP_12",elcdata:sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV},
                    {name:"sysFJZP_11",elcdata:sysFJZP_11.I_AAI4105MI},
                    {name:"sysFJZP_21",elcdata:sysFJZP_21.M4105I},
                    {name:"sysFJZP_31",elcdata:sysFJZP_31.DP361RM01_AI39},
                    {name:"sysFJZP_32",elcdata:sysFJZP_32.DP361RM02_AI39},
                    {name:"sysFJDT_11",elcdata:sysFJDT_11.AI_4105},
                    {name:"sysYNYL_11",elcdata:sysYNYL_11.AI4105MI},
                    {name:"sysYNYL_21",elcdata:sysYNYL_21.MI4105I},
                    {name:"sysYNNN_11",elcdata:sysYNNN_11.AI4105},
                    {name:"sysYNLL_11",elcdata:sysYNLL_11.B34M11CUN},
                    {name:"sysYNLL_21",elcdata:sysYNLL_21.M4111AI},
                    {name:"sysYNLL_22",elcdata:sysYNLL_22.M4112AI},
                    {name:"sysYNCZ_11",elcdata:sysYNCZ_11.M4111AI},
                    {name:"sysYNCZ_12",elcdata:sysYNCZ_12.M4112AI},
                    {name:"sysYNMX_11",elcdata:sysYNMX_11.I361RM1},
                    {name:"sysYNMX_12",elcdata:sysYNMX_12.I361RM2},
                    {name:"sysYNHQ_11",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4},
                    {name:"sysSCLS_11",elcdata:sysSCLS_11.AI4105MI},
                    {name:"sysSCLS_21",elcdata:sysSCLS_21.AIB30IA},
                    {name:"sysSCJY_11",elcdata:sysSCJY_11.AI4105MI},
                    {name:"sysSCCN_11",elcdata:sysSCCN_11.AI4105},
                    {name:"sysJTKC_11",elcdata:sysJTKC_11.A13103I1},
                    {name:"sysJTLZ_11",elcdata:sysJTLZ_11.M41111AI},
                    {name:"sysJTLZ_12",elcdata:sysJTLZ_12.M41121AI},
                    {name:"sysHWWX_11",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I}]};

            var stopNum = 0;

            for(var i=0;i<covalue_run.codata.length;i++){
                if(covalue_run.codata[i].elcdata<=1){
                    stopNum++;
                }
            }

            var allNum = covalue_run.codata.length;
            var runNum = allNum-stopNum;

            showRunchart(runNum,allNum,stopNum);

        }
    }
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    mapbox_t = setInterval(runChartflush,5000);
}


function showRunchart(runNum,allNum,stopNum){

// var runNum = 30;
// var stopNum =10;
// var allNum = 40;

var myRatebox = echarts.init(document.getElementById('ratebox'));

optionrate = {
    title: {
        text: runNum+"/"+allNum,
        x: 'center',
        y: 'center',
        textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '18'
        }
    },
    color: ['rgba(176, 212, 251, 1)'],

    series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: true,
        radius: ['50%', '66%'],
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        data: [{
            value: runNum,
            name: '01',
            itemStyle: {
                normal: {
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#00cefc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#367bec' // 100% 处的颜色
                        }]
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }, {
            name: '02',
            value: stopNum
        }]
    }]
}
myRatebox.setOption(optionrate);

window.onresize = function() {
    myRatebox.resize();
}
}
/*-----------------------------------------地图Chart产量--------------------------------------------------*/

var mapChart_t;
function mapChartflush(){
    clearInterval(mapChart_t);

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
/*
            var covalue_out = {codata:[
                    {name:"兰溪1#",dayvalue:sysZJLX_11.rawdayyeild,monvalue:sysZJLX_11.rawmonthyeild},
                    {name:"兰溪2#",dayvalue:sysZJLX_21.rawdayyeild,monvalue:sysZJLX_21.rawmonthyeild},
                    {name:"兰溪3#",dayvalue:sysZJLX_31.rawdayyeild,monvalue:sysZJLX_31.rawmonthyeild},
                    {name:"建德1#",dayvalue:sysHZJD_11.rawdayyeild,monvalue:sysHZJD_11.rawmonthyeild},
                    {name:"建德2#",dayvalue:sysHZJD_21.rawdayyeild,monvalue:sysHZJD_21.rawmonthyeild},
                    {name:"桐庐 #",dayvalue:sysHZTL_11.rawdayyeild,monvalue:sysHZTL_11.rawmonthyeild},
                    {name:"高安1#",dayvalue:sysJXGA_11.rawdayyeild,monvalue:sysJXGA_11.rawmonthyeild},
                    {name:"高安2#",dayvalue:sysJXGA_21.rawdayyeild,monvalue:sysJXGA_21.rawmonthyeild},
                    {name:"会昌 #",dayvalue:sysJXHC_11.rawdayyeild,monvalue:sysJXHC_11.rawmonthyeild},
                    {name:"衡阳 #",dayvalue:sysJXHY_11.rawdayyeild,monvalue:sysJXHY_11.rawmonthyeild},
                    {name:"宁远莲花",dayvalue:sysJXNY_11.rawdayyeild,monvalue:sysJXNY_11.rawmonthyeild},
                    {name:"永州 #",dayvalue:sysJXYZ_11.rawdayyeild + sysJXYZ_12.rawdayyeild,monvalue:sysJXYZ_11.rawmonthyeild + sysJXYZ_12.rawmonthyeild},
                    {name:"鹰鹏 #",dayvalue:sysJXYP_11.rawdayyeild + sysJXYP_12.rawdayyeild,monvalue:sysJXYP_11.rawmonthyeild + sysJXYP_12.rawmonthyeild},
                    {name:"漳平1#",dayvalue:sysFJZP_11.rawdayyeild,monvalue:sysFJZP_11.rawmonthyeild},
                    {name:"漳平2#",dayvalue:sysFJZP_21.rawdayyeild,monvalue:sysFJZP_21.rawmonthyeild},
                    {name:"漳平3#",dayvalue:sysFJZP_31.rawdayyeild + sysFJZP_32.rawdayyeild,monvalue:sysFJZP_31.rawmonthyeild + sysFJZP_32.rawmonthyeild},
                    {name:"大田 #",dayvalue:sysFJDT_11.rawdayyeild,monvalue:sysFJDT_11.rawmonthyeild},
                    {name:"宜良1#",dayvalue:sysYNYL_11.rawdayyeild,monvalue:sysYNYL_11.rawmonthyeild},
                    {name:"宜良2#",dayvalue:sysYNYL_21.rawdayyeild,monvalue:sysYNYL_21.rawmonthyeild},
                    {name:"南宁 #",dayvalue:sysYNNN_11.rawdayyeild,monvalue:sysYNNN_11.rawmonthyeild},
                    {name:"龙里1#",dayvalue:sysYNLL_11.rawdayyeild,monvalue:sysYNLL_11.rawmonthyeild},
                    {name:"龙里2#",dayvalue:sysYNLL_21.rawdayyeild + sysYNLL_22.rawdayyeild,monvalue:sysYNLL_21.rawmonthyeild + sysYNLL_22.rawmonthyeild},
                    {name:"崇左 #",dayvalue:sysYNCZ_11.rawdayyeild + sysYNCZ_12.rawdayyeild,monvalue:sysYNCZ_11.rawmonthyeild + sysYNCZ_12.rawmonthyeild},
                    {name:"茂鑫 #",dayvalue:sysYNMX_11.rawdayyeild + sysYNMX_12.rawdayyeild,monvalue:sysYNMX_11.rawmonthyeild + sysYNMX_12.rawmonthyeild},
                    {name:"恒庆 #",dayvalue:sysYNHQ_11.rawdayyeild,monvalue:sysYNHQ_11.rawmonthyeild},
                    {name:"邻水1#",dayvalue:sysSCLS_11.rawdayyeild,monvalue:sysSCLS_11.rawmonthyeild},
                    {name:"邻水2#",dayvalue:sysSCLS_21.rawdayyeild,monvalue:sysSCLS_21.rawmonthyeild},
                    {name:"江油 #",dayvalue:sysSCJY_11.rawdayyeild,monvalue:sysSCJY_11.rawmonthyeild},
                    {name:"长宁 #",dayvalue:sysSCCN_11.rawdayyeild,monvalue:sysSCCN_11.rawmonthyeild},
                    {name:"库车 #",dayvalue:sysJTKC_11.rawdayyeild,monvalue:sysJTKC_11.rawmonthyeild},
                    {name:"兰州 #",dayvalue:sysJTLZ_11.rawdayyeild+sysJTLZ_12.rawdayyeild,monvalue:sysJTLZ_11.rawmonthyeild+sysJTLZ_12.rawmonthyeild},
                    {name:"老挝万象",dayvalue:sysHWWX_11.rawdayyeild,monvalue:sysHWWX_11.rawmonthyeild}]};

            var totaldayvalue = 0;
            var totalmonvalue = 0;
            for(var i=0;i<covalue_out.codata.length;i++){

                totaldayvalue += covalue_out.codata[i].dayvalue;
                totalmonvalue += covalue_out.codata[i].monvalue;
            }

            var totaldayout = document.getElementById("totaldayout");
            totaldayout.innerText = Math.round(totaldayvalue*100)/100;

            var totalmonout = document.getElementById("totalmonout");
            totalmonout.innerText = Math.round(totalmonvalue*100)/100;
*/
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
                        {name:"衡阳",dayvalue:sysJXHY_11.rawdayyeild,monvalue:sysJXHY_11.rawmonthyeild},
                        {name:"宁远莲花",dayvalue:sysJXNY_11.rawdayyeild,monvalue:sysJXNY_11.rawmonthyeild},
                        {name:"永州",dayvalue:sysJXYZ_11.rawdayyeild + sysJXYZ_12.rawdayyeild,monvalue:sysJXYZ_11.rawmonthyeild + sysJXYZ_12.rawmonthyeild},
                        {name:"鹰鹏",dayvalue:sysJXYP_11.rawdayyeild + sysJXYP_12.rawdayyeild,monvalue:sysJXYP_11.rawmonthyeild + sysJXYP_12.rawmonthyeild}]},
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

            // console.log("total_result:",toolTipData[0].value[0]);

            var total_result = new Array(20);
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
            var FJdayvalue = total_result[4];   var FJmonvalue = total_result[5];
            var YNdayvalue = total_result[6];   var YNmonvalue = total_result[7];
            var GXdayvalue = total_result[8];   var GXmonvalue = total_result[9];
            var GZdayvalue = total_result[10];  var GZmonvalue = total_result[11];
            var SCdayvalue = total_result[12];  var SCmonvalue = total_result[13];
            var GSdayvalue = total_result[14];  var GSmonvalue = total_result[15];
            var XJdayvalue = total_result[16];  var XJmonvalue = total_result[17];
            var LWdayvalue = total_result[18];  var LWmonvalue = total_result[19];
             // console.log("total_result:",total_result);

            var data = [
                {name:"浙江",value:ZJdayvalue},
                {name:"江西",value:JXdayvalue},
                {name:"福建",value:FJdayvalue},
                {name:"云南",value:YNdayvalue},
                {name:"广西",value:GXdayvalue},
                {name:"贵州",value:GZdayvalue},
                {name:"四川",value:SCdayvalue},
                {name:"甘肃",value:GSdayvalue},
                {name:"新疆",value:XJdayvalue},
                {name:"老挝",value:LWdayvalue},
            ];

            var totaldayvalue = ZJdayvalue + JXdayvalue + FJdayvalue + YNdayvalue + GXdayvalue + GZdayvalue + SCdayvalue + GSdayvalue + XJdayvalue + LWdayvalue;
            var totalmonvalue = ZJmonvalue + JXmonvalue + FJmonvalue + YNmonvalue + GXmonvalue + GZmonvalue + SCmonvalue + GSmonvalue + XJmonvalue + LWmonvalue;

            var totaldayout = document.getElementById("totaldayout");
            totaldayout.innerText = Math.round(totaldayvalue*100)/100;

            var totalmonout = document.getElementById("totalmonout");
            totalmonout.innerText = Math.round(totalmonvalue*100)/100;

            showmapChart(data,toolTipData);
        }

    }
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    mapChart_t = setInterval(mapChartflush,5000);
}

function showmapChart(data,toolTipData){

// var data = [
//     {name:"浙江",value:100},
//     {name:"江西",value:66},
//     {name:"福建",value:102},
//     {name:"云南",value:81},
//     {name:"广西",value:81},
//     {name:"贵州",value:81},
//     {name:"四川",value:47},
//     {name:"甘肃",value:47},
//     {name:"新疆",value:47},
// ];
//     var toolTipData = [
//         {name:"浙江",value:[{name:"兰溪1#",dayvalue:95,monvalue:900},{name:"兰溪2#",dayvalue:82,monvalue:800},{name:"兰溪3#",dayvalue:82,monvalue:800},
//                 {name:"建德1#",dayvalue:95,monvalue:900},{name:"建德2#",dayvalue:82,monvalue:900},{name:"桐庐",dayvalue:82,monvalue:900}]},
//         {name:"江西",value:[{name:"高安1#",dayvalue:22,monvalue:900},{name:"高安2#",dayvalue:20,monvalue:900},{name:"会昌",dayvalue:20,monvalue:900},{name:"衡阳",dayvalue:20,monvalue:900},
//                 {name:"宁远莲花",dayvalue:20,monvalue:900},{name:"永州红狮",dayvalue:20,monvalue:900},{name:"江西鹰鹏",dayvalue:20,monvalue:900}]},
//         {name:"福建",value:[{name:"漳平1#",dayvalue:60,monvalue:900},{name:"漳平2#",dayvalue:42,monvalue:900},{name:"漳平3#",dayvalue:42,monvalue:900},{name:"大田",dayvalue:42,monvalue:900}]},
//         {name:"云南",value:[{name:"宜良1#",dayvalue:40,monvalue:900},{name:"宜良2#",dayvalue:41,monvalue:900}]},
//         {name:"广西",value:[{name:"南宁",dayvalue:41,monvalue:900},{name:"崇左",dayvalue:41,monvalue:900},{name:"恒庆",dayvalue:41,monvalue:900}]},
//         {name:"贵州",value:[{name:"龙里1#",dayvalue:41,monvalue:900},{name:"龙里2#",dayvalue:41,monvalue:900},{name:"茂鑫",dayvalue:41,monvalue:900}]},
//         {name:"四川",value:[{name:"邻水1#",dayvalue:23,monvalue:900},{name:"邻水2#",dayvalue:24,monvalue:900},{name:"江油",dayvalue:24,monvalue:900},{name:"长宁",dayvalue:24,monvalue:900}]},
//         {name:"甘肃",value:[{name:"兰州",dayvalue:23,monvalue:900}]},
//         {name:"新疆",value:[{name:"库车",dayvalue:23,monvalue:900}]},
//     ];


var geoCoordMap = {};


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('mapbox'));
var mapName = 'china';
/*获取地图数据*/
myChart.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myChart.hideLoading();
mapFeatures.forEach(function(v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;
});


var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};


option = {

    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            if (typeof(params.value)[2] == "undefined" ||typeof(params.value)[3] == "undefined") {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            // toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                            toolTiphtml+=toolTipData[i].value[j].name+':'+"<br>"+ "日产量:" + toolTipData[i].value[j].dayvalue+";"+ "月产量:"+ toolTipData[i].value[j].monvalue+"<br>"
                        }
                    }
                }
                return toolTiphtml;
            } else {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            // toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                            toolTiphtml+=toolTipData[i].value[j].name+':'+"<br>"+ "日产量:" + toolTipData[i].value[j].dayvalue+";"+ "月产量:"+ toolTipData[i].value[j].monvalue+"<br>"
                        }
                    }
                }
                return toolTiphtml;
            }
        }
    },

    visualMap: {
        show: true,
        min: 0,
        max: 30000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        textStyle: {
            color: '#fff'
        },
        calculable: true,
        seriesIndex: [1],
        inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
             //color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
             color: ['#23074d', '#cc0b11'] // 紫红
            //color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
        }
    },

    geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    },
    series: [{
        name: '散点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: function(val) {
            return val[2] / 4000;
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#05C3F9'
            }
        }
    },
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            },
            animation: false,
            data: data
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function(val) {
                return val[2] /4000;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 10,
                    shadowColor: 'yellow',
                }
            },
            zlevel: 1,
        },

    ]
};
myChart.setOption(option);

window.onresize = function() {
    myChart.resize();
};
}