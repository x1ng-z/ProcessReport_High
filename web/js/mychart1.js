
/*-----------------------------集团及子公司台时数据Chart-------------------------------*/
var chartbox1_t1;
function chartBox1flush(){
    clearInterval(chartbox1_t1);
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
            var covalue_ts = {codata:[{name:"兰溪1#",elcdata:sysZJLX_11.B32M_DACAH_PV+sysZJLX_11.B32M_DACAG_PV,value:sysZJLX_11.AFEED_TOTALS_C1},
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
                    {name:"永州 #",elcdata:sysJXYZ_11.A361RP01HA_AI13_PV+sysJXYZ_11.A361RP01HA_AI14_PV+sysJXYZ_12.A361RP02HA_AI13_PV+sysJXYZ_12.A361RP02HA_AI14_PV,value:sysJXYZ_11.TSFK_1_VALUE + sysJXYZ_12.TSFK_2_VALUE},
                    {name:"鹰鹏 #",elcdata:sysJXYP_11.A361RP01HA_AI13_PV+sysJXYP_11.A361RP01HA_AI14_PV+sysJXYP_12.A361RP02HA_AI13_PV+sysJXYP_12.A361RP02HA_AI14_PV,value:sysJXYP_11.TSFK_1_VALUE + sysJXYP_12.TSFK_2_VALUE},
                    {name:"漳平1#",elcdata:sysFJZP_11.I_AAI4105MI,value:sysFJZP_11.ARAWIN},
                    {name:"漳平2#",elcdata:sysFJZP_21.M4105I,value:sysFJZP_21.TSFK},
                    {name:"漳平3#",elcdata:sysFJZP_31.DP361RM01_AI39+sysFJZP_32.DP361RM02_AI39,value:sysFJZP_31.TSFK_1_VALUE + sysFJZP_32.TSFK_2},
                    {name:"大田 #",elcdata:sysFJDT_11.AI_4105,value:sysFJDT_11.S_YL1},
                    {name:"宜良1#",elcdata:sysYNYL_11.AI4105MI,value:sysYNYL_11.TSFK},
                    {name:"宜良2#",elcdata:sysYNYL_21.MI4105I,value:sysYNYL_21.TSFK4105},
                    {name:"南宁 #",elcdata:sysYNNN_11.AI4105,value:sysYNNN_11.LMTSFK},
                    {name:"龙里1#",elcdata:sysYNLL_11.B34M11CUN,value:sysYNLL_11.FKYULIAO},
                    {name:"龙里2#",elcdata:sysYNLL_21.M4111AI+sysYNLL_22.M4112AI,value:sysYNLL_21.LM1TCFI + sysYNLL_22.LM2TCFI},
                    {name:"崇左 #",elcdata:sysYNCZ_11.M4111AI+sysYNCZ_12.M4112AI,value:sysYNCZ_11.LM1TCFI + sysYNCZ_12.LM2TCFI},
                    {name:"茂鑫 #",elcdata:sysYNMX_11.I361RM1+sysYNMX_12.I361RM2,value:sysYNMX_11.TSFK_1 + sysYNMX_12.TSFK_2},
                    {name:"恒庆 #",elcdata:sysYNHQ_11.DP_YL_GYJ_AI3+sysYNHQ_11.DP_YL_GYJ_AI4,value:sysYNHQ_11.YLSNTSFK_1},
                    {name:"邻水1#",elcdata:sysSCLS_11.AI4105MI,value:sysSCLS_11.TSFK},
                    {name:"邻水2#",elcdata:sysSCLS_21.AIB30IA,value:sysSCLS_21.TSFK_YLMA},
                    {name:"江油 #",elcdata:sysSCJY_11.AI4105MI,value:sysSCJY_11.TSFK},
                    {name:"长宁 #",elcdata:sysSCCN_11.AI4105,value:sysSCCN_11.TCFCA},
                    {name:"库车 #",elcdata:sysJTKC_11.A13103I1,value:sysJTKC_11.AF01_00},
                    {name:"兰州 #",elcdata:sysJTLZ_11.M41111AI+sysJTLZ_12.M41121AI,value:sysJTLZ_11.LM1TCFI+sysJTLZ_12.LM2TCFI},
                    {name:"老挝万象",elcdata:sysHWWX_11.B131101I+sysHWWX_11.B131102I,value:sysHWWX_11.TOTALFB2_VALUE}]};
*/

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
                if(covalue_ts.codata[i].elcdata<=5){
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

            // console.log("covalue_ts:",covalue_ts.codata);

            var realdata = [covalue_ts.codata[0].value,covalue_ts.codata[1].value,covalue_ts.codata[2].value,covalue_ts.codata[covalue_ts.codata.length-k-3].value,covalue_ts.codata[covalue_ts.codata.length-k-2].value,covalue_ts.codata[covalue_ts.codata.length-k-1].value];
            var titlename = [covalue_ts.codata[0].name,covalue_ts.codata[1].name,covalue_ts.codata[2].name,covalue_ts.codata[covalue_ts.codata.length-k-3].name,covalue_ts.codata[covalue_ts.codata.length-k-2].name,covalue_ts.codata[covalue_ts.codata.length-k-1].name,];
            var valdata = realdata;

            // var inNo =covalue_ts.codata.length-k-6;

            showChartbox1(realdata,titlename,valdata);

        }

    }
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    chartbox1_t1 = setInterval(chartBox1flush,5000);
}


function showChartbox1(realdata,titlename,valdata){

    var myChart_box1 = echarts.init(document.getElementById('chart_box1'));
// var data = [500, 390, 380, 340, 300,170];
// var titlename = [ '茂鑫红狮2#', '崇左红狮1#', '永州红狮1#','桐庐红狮1#', '建德红狮1#', '兰溪红狮1#'];
// var valdata = [580, 406, 580, 380, 380,180];
    var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6','#0fae72'];

    var optionbox1 = {
        backgroundColor: '#0e2147',
        grid: {
            left: '8%',
            right: '2%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show:true,
                color: '#fff',
                // formatter: function(value, index) {
                //     if(index <=2 ){
                //         return [
                //             '{lg|' + (index + 1) + '}' + '{title|' + value + '} '
                //         ].join('\n')
                //     }else{
                //         return [
                //             '{lg|' + (index + inNo) + '}' + '{title|' + value + '} '
                //         ].join('\n')
                //     }
                // },
                rich: {
                    lg: {
                        backgroundColor: '#339911',
                        color: '#fff',
                        borderRadius: 15,
                        padding: 5,
                        align: 'center',
                        width: 15,
                        height: 10
                    },
                }
            },
        }, {
            show: true,
            inverse: true,
            data: valdata,
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    color: '#fff',
                },
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },

        }],
        series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: realdata,
            barWidth: 15,
            itemStyle: {
                normal: {
                    barBorderRadius: 15,
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}'
                }
            },
        }, {
            name: '框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: valdata,
            barWidth: 20,
            itemStyle: {
                normal: {
                    color: 'none',
                    borderColor: '#00c1de',
                    borderWidth: 3,
                    barBorderRadius: 15,
                }
            }
        }, ]
    };
    myChart_box1.setOption(optionbox1);
    window.onresize = myChart_box1.resize();
}