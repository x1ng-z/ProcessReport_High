
/*-----------------------------集团及子公司 生料库位数据Chart------------------------------*/
var chartbox4_t4;
function chartBox4flush(){
    clearInterval(chartbox4_t4);

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

            var covalue_silolev = {codata:[
                    {name:"兰溪1#",elcdata:sysZJLX_11.B32M_DACAH_PV+sysZJLX_11.B32M_DACAG_PV,value:sysZJLX_11.BLT01_daca_pv},
                    {name:"兰溪2#",elcdata:sysZJLX_21.B32M_B_DACA_PV,value:sysZJLX_21.BLT01_B_daca_pv},
                    {name:"兰溪3#",elcdata:sysZJLX_31.B07G_B13M_CUND_PV,value:sysZJLX_31.B_LT02_DACA_PV},
                    {name:"建德1#",elcdata:sysHZJD_11.AB13M_CUND_PV,value:sysHZJD_11.ABLT02_DACA_PV},
                    {name:"建德2#",elcdata:sysHZJD_21.B13M_CUND_PV,value:sysHZJD_21.BLT02_DACA_PV},
                    {name:"桐庐 #",elcdata:sysHZTL_11.A41E1AH04I,value:sysHZTL_11.AI4208L01},
                    {name:"高安1#",elcdata:sysJXGA_11.B13M_CUN_M,value:sysJXGA_11.BLT02_L_M},
                    {name:"高安2#",elcdata:sysJXGA_21.AB34M_CUN,value:sysJXGA_21.ABLT02},
                    {name:"会昌 #",elcdata:sysJXHC_11.B131ALI2,value:sysJXHC_11.B13213L1},
                    {name:"衡阳 #",elcdata:sysJXHY_11.AAL1T18,value:sysJXHY_11.A13211L},
                    {name:"宁远莲花",elcdata:sysJXNY_11.A13106I1,value:sysJXNY_11.B13200L1},
                    {name:"永州 #",elcdata:sysJXYZ_11.A361RP01HA_AI13_PV+sysJXYZ_11.A361RP01HA_AI14_PV+
                                         sysJXYZ_12.A361RP02HA_AI13_PV+sysJXYZ_12.A361RP02HA_AI14_PV,value:sysJXYZ_11.A1391SB01L01_PV},
                    {name:"鹰鹏 #",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV+
                                         sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV,value:sysJXYP_11.AI1391SB01L01},
                    {name:"漳平1#",elcdata:sysFJZP_11.I_AAI4105MI,value:sysFJZP_11.I_AAI4208L02},
                    {name:"漳平2#",elcdata:sysFJZP_21.M4105I,value:sysFJZP_21.M4208L},
                    {name:"漳平3#",elcdata:sysFJZP_31.DP361RM01_AI39+sysFJZP_32.DP361RM02_AI39,value:sysFJZP_31.AI391SB01LT01_PV},
                    {name:"大田 #",elcdata:sysFJDT_11.AI_4105,value:sysFJDT_11.L01_4208},
                    {name:"宜良1#",elcdata:sysYNYL_11.AI4105MI,value:sysYNYL_11.AI4200L01},
                    {name:"宜良2#",elcdata:sysYNYL_21.MI4105I,value:sysYNYL_21.MI4208L},
                    {name:"南宁 #",elcdata:sysYNNN_11.AI4105,value:sysYNNN_11.L4200L02},
                    {name:"龙里1#",elcdata:sysYNLL_11.B34M11CUN,value:sysYNLL_11.BLT01L},
                    {name:"龙里2#",elcdata:sysYNLL_21.M4111AI+sysYNLL_22.M4112AI,value:sysYNLL_21.LT4200L01},
                    {name:"崇左 #",elcdata:sysYNCZ_11.M4111AI+sysYNCZ_12.M4112AI,value:sysYNCZ_11.LT4200L01},
                    {name:"茂鑫 #",elcdata:sysYNMX_11.I361RM1+sysYNMX_12.I361RM2,value:sysYNMX_11.L391SB01},
                    {name:"恒庆 #",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4,value:sysYNHQ_11.B63LT0},
                    {name:"邻水1#",elcdata:sysSCLS_11.AI4105MI,value:sysSCLS_11.AI4200LT01},
                    {name:"邻水2#",elcdata:sysSCLS_21.AIB30IA,value:sysSCLS_21.AIF1L01A},
                    {name:"江油 #",elcdata:sysSCJY_11.AI4105MI,value:sysSCJY_11.AI4200L01},
                    {name:"长宁 #",elcdata:sysSCCN_11.AI4105,value:sysSCCN_11.LI420002},
                    {name:"库车 #",elcdata:sysJTKC_11.A13103I1,value:sysJTKC_11.A13213L1},
                    {name:"兰州 #",elcdata:sysJTLZ_11.M41111AI+sysJTLZ_12.M41121AI,value:sysJTLZ_11.A4200L01},
                    {name:"老挝万象",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I,value:sysHWWX_11.B13209L1}]};

            var k=0;
            for(var i=0;i<covalue_silolev.codata.length;i++){
                // if(covalue_silolev.codata[i].elcdata<=5||covalue_silolev.codata[i].value==0){
                    if(covalue_silolev.codata[i].value==0){
                    k++;
                    delete covalue_silolev.codata[i];
                }
            }

            function sortValue_silolev(a,b){
                return b.value-a.value;
            }
            covalue_silolev.codata.sort(sortValue_silolev);

            // console.log("covalue_silolev.codata:",covalue_silolev.codata);

            var totaldata = 0;
            for(var i=0;i<covalue_silolev.codata.length-k;i++){

                totaldata += covalue_silolev.codata[i].value;
            }

            var aveSilolevel = document.getElementById('aveSilolevel');
            avedata_silolev = totaldata/(covalue_silolev.codata.length-k);
            aveSilolevel.innerText = Math.round(avedata_silolev*100)/100;


            var comName = [covalue_silolev.codata[covalue_silolev.codata.length-k-1].name,
                covalue_silolev.codata[covalue_silolev.codata.length-k-2].name,
                covalue_silolev.codata[covalue_silolev.codata.length-k-3].name,
                covalue_silolev.codata[covalue_silolev.codata.length-k-4].name,
                covalue_silolev.codata[covalue_silolev.codata.length-k-5].name,
                covalue_silolev.codata[covalue_silolev.codata.length-k-6].name];

            var siloLevel =[covalue_silolev.codata[covalue_silolev.codata.length-k-1].value,
                covalue_silolev.codata[covalue_silolev.codata.length-k-2].value,
                covalue_silolev.codata[covalue_silolev.codata.length-k-3].value,
                covalue_silolev.codata[covalue_silolev.codata.length-k-4].value,
                covalue_silolev.codata[covalue_silolev.codata.length-k-5].value,
                covalue_silolev.codata[covalue_silolev.codata.length-k-6].value];

            showChartbox4(comName,siloLevel);
        }

    }
    // xmlhttp.open("GET","http://172.16.22.107:8079/process.do?method=RD&process=raw",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    chartbox4_t4 = setInterval(chartBox4flush,5000);
}

function showChartbox4(comName,siloLevel){

var myChart_box4 = echarts.init(document.getElementById('chart_box4'));

// var comName = ['建德','永州','桐庐','兰溪','崇左','漳平'];
// var siloLevel=[12.7, 15.6, 20.1, 22.4,27.5,30.2];

var  optionbox4 = {
            backgroundColor: '#12234F',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
           grid: {
                 left: "3%",
                 right: '10%',
                 top: '13%',
                 bottom: "5%",
                 containLabel: true,
                 },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)'
                    }
                },
            },
            yAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                    }
                },
                data: comName
            },
            series: [
                {
                    name: '库位',
                    type: 'bar',
                    data:siloLevel
                },

            ]
        };

myChart_box4.setOption(optionbox4);
window.onresize = function() {
    myChart_box4.resize();
}
}