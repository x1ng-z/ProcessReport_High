

/*-----------------------------集团及子公司电耗数据Chart------------------------------*/
var chartbox2_t2;
function chartBox2flush(){
    clearInterval(chartbox2_t2);

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
            var covalue_elc = {codata:[
                    {name:"兰溪3#",feed:sysZJLX_31.Q06G_PLJS_ZFK_PV,feed1:11,value:sysZJLX_31.SSGL_YLGH_C2},
                    {name:"建德1#",feed:sysHZJD_11.AAFEED_TOTAL_C1,feed1:11,value:sysHZJD_11.ADL_SLDH1_C2},
                    {name:"建德2#",feed:sysHZJD_21.AFEED_TOTAL_C1,feed1:11,value:sysHZJD_21.DL_SLDH_C6},
                    {name:"桐庐 #",feed:sysHZTL_11.TSFK,feed1:11,value:sysHZTL_11.DLSLHJ},
                    {name:"高安1#",feed:sysJXGA_11.FEED_TOL,feed1:11,value:sysJXGA_11.YLZDH_1},
                    {name:"高安2#",feed:sysJXGA_21.AA2ZCL_FI,feed1:11,value:sysJXGA_21.YLZDH_2},
                    {name:"会昌 #",feed:sysJXHC_11.B_G14_TOL,feed1:11,value:sysJXHC_11.GL_PSHZDH},
                    {name:"衡阳 #",feed:sysJXHY_11.Total,feed1:11,value:sysJXHY_11.SLZDH},
                    {name:"鹰鹏 #",feed:sysJXYP_11.TSFK_1_VALUE,feed1:sysJXYP_12.TSFK_2_VALUE,value:sysJXYP_11.ZDH_1_VALUE + sysJXYP_12.ZDH_2_VALUE},
                    {name:"漳平1#",feed:sysFJZP_11.ARAWIN,feed1:11,value:sysFJZP_11.SLZDH002},
                    {name:"漳平2#",feed:sysFJZP_21.TSFK,feed1:11,value:sysFJZP_21.SLZDH001},
                    {name:"大田 #",feed:sysFJDT_11.S_YL1,feed1:11,value:sysFJDT_11.SLDH_HJ},
                    {name:"宜良1#",feed:sysYNYL_11.TSFK,feed1:11,value:sysYNYL_11.H04},
                    {name:"宜良2#",feed:sysYNYL_21.TSFK4105,feed1:11,value:sysYNYL_21.H04P},
                    {name:"南宁 #",feed:sysYNNN_11.LMTSFK,feed1:11,value:sysYNNN_11.AVG6a},
                    {name:"龙里1#",feed:sysYNLL_11.FKYULIAO,feed1:11,value:sysYNLL_11.YLZDH},
                    {name:"龙里2#",feed:sysYNLL_21.LM1TCFI,feed1:sysYNLL_22.LM2TCFI,value:sysYNLL_21.SLDH2 + sysYNLL_22.SLDH3},
                    {name:"崇左 #",feed:sysYNCZ_11.LM1TCFI,feed1:sysYNCZ_12.LM2TCFI,value:sysYNCZ_11.LMZDH1 + sysYNCZ_12.LMZDH2},
                    {name:"茂鑫 #",feed:sysYNMX_11.TSFK_1,feed1:sysYNMX_12.TSFK_2,value:sysYNMX_11.PSLGX + sysYNMX_12.PSLGX_HPS},
                    {name:"恒庆 #",feed:sysYNHQ_11.YLSNTSFK_1,feed1:11,value:sysYNHQ_11.SLSSDH_VALUE},
                    {name:"邻水1#",feed:sysSCLS_11.TSFK,feed1:11,value:sysSCLS_11.L1SL_Z},
                    {name:"邻水2#",feed:sysSCLS_21.TSFK_YLMA,feed1:11,value:sysSCLS_21.L2SL_Z},
                    {name:"江油 #",feed:sysSCJY_11.TSFK,feed1:11,value:sysSCJY_11.DDH200},
                    {name:"长宁 #",feed:sysSCCN_11.TCFCA,feed1:11,value:sysSCCN_11.TDH01},
                    {name:"库车 #",feed:sysJTKC_11.AF01_00,feed1:11,value:sysJTKC_11.SLFMHJDH},
                    {name:"兰州 #",feed:sysJTLZ_11.LM1TCFI,feed1:sysJTLZ_12.LM2TCFI,value:sysJTLZ_11.YLDDH1+sysJTLZ_12.YLDDH2},
                    {name:"老挝万象",feed:sysHWWX_11.TOTALFB2_VALUE,feed1:11,value:sysHWWX_11.B001DH}]};

                       var k=0;
            for(var i=0;i<covalue_elc.codata.length;i++){
                if(covalue_elc.codata[i].feed<=10||covalue_elc.codata[i].feed1<=1||covalue_elc.codata[i].value<=1){
                    k++;
                    delete covalue_elc.codata[i];
                }
            }
        */
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
                if(covalue_elc.codata[i].elcdata<=10||covalue_elc.codata[i].feed<=10||covalue_elc.codata[i].value<=1){
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
        }

    }
    // xmlhttp.open("GET","http://172.16.22.107:8079/process.do?method=RD&process=raw",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    chartbox2_t2 = setInterval(chartBox2flush,5000);
}

function showChartbox2(x_data,y_data){
// var x_data = ['永州红狮1#','崇左红狮1#','茂鑫红狮2#','兰溪红狮','建德红狮','桐庐红狮'];
// var y_data = [12.6,13.8,15,15.8,16.6,17.6];

    var colorList = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{offset: 0, color: '#06DBF5' // 0% 处的颜色
        }, {offset: 1, color: '#00d386'}],// 100% 处的颜色
        globalCoord: false // 缺省为 false
    }

//         color: '#FEDD3D' // 0% 处的颜色
//         color: '#F99901' // 100% 处的颜色

    var myChart_box2 = echarts.init(document.getElementById('chart_box2'));

    var optionbox2 = {
        backgroundColor: '#12234F',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut',
        grid: {
            left: '3%',
            right: '1%',
            top:"13%",
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: x_data,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 30,
                textStyle: {
                    //fontFamily: 'Microsoft YaHei'
                    // fontFamily:"宋体"
                    color: '#fff',
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            axisLabel: {
            }
        },

        series: [{
            name: '',
            type: 'bar',
            barWidth: '40%',
            label: {
                normal: {
                    show: true,
                    position: "top",
                    textStyle: {
                        color: "#ffc72b",
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                color: function(params) {
                    return colorList;
                },
            },
            emphasis:{
                itemStyle:{
                    color:'#FBB419'
                }
            },
            data:y_data,
        }]
    };

    myChart_box2.setOption(optionbox2);
    window.onresize = function() {
        myChart_box2.resize();
    }
}