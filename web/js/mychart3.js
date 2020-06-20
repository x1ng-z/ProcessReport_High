
/*-----------------------------集团及子公司生料细度数据Chart------------------------------*/
var chartbox3_t3;
function chartBox3flush(){
    clearInterval(chartbox3_t3);

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

            var k=0;
            if(covalue_fin.codata.length>7){
                for(var i=0;i<covalue_fin.codata.length;i++){
                    if(covalue_fin.codata[i].value==0){
                        k++;
                        delete covalue_fin.codata[i];
                    }
                }
            }else{
                return;
            }

            function sortValue_fin(a,b){
                return a.value-b.value;
            }
            covalue_fin.codata.sort(sortValue_fin);

            // console.log("covalue_fin.codata:",covalue_fin.codata);

            var totaldata = 0;
            for(var i=0;i<covalue_fin.codata.length-k;i++){
                totaldata += covalue_fin.codata[i].value;
            }

            var aveFine = document.getElementById('aveFine');
            // avedata_fine = totaldata/(covalue_fin.codata.length-k);
            avedata_fine = totaldata/(covalue_fin.codata.length);
            aveFine.innerText = Math.round(avedata_fine*100)/100;

            var y_data = [covalue_fin.codata[0].value,covalue_fin.codata[1].value,covalue_fin.codata[2].value,covalue_fin.codata[covalue_fin.codata.length-k-3].value,covalue_fin.codata[covalue_fin.codata.length-k-2].value,covalue_fin.codata[covalue_fin.codata.length-k-1].value];
            var x_data = [covalue_fin.codata[0].name,covalue_fin.codata[1].name,covalue_fin.codata[2].name,covalue_fin.codata[covalue_fin.codata.length-k-3].name,covalue_fin.codata[covalue_fin.codata.length-k-2].name,covalue_fin.codata[covalue_fin.codata.length-k-1].name,];

            // var y_data = [covalue_fin.codata[0].value,covalue_fin.codata[1].value,covalue_fin.codata[2].value,covalue_fin.codata[covalue_fin.codata.length-3].value,covalue_fin.codata[covalue_fin.codata.length-2].value,covalue_fin.codata[covalue_fin.codata.length-1].value];
            // var x_data = [covalue_fin.codata[0].name,covalue_fin.codata[1].name,covalue_fin.codata[2].name,covalue_fin.codata[covalue_fin.codata.length-3].name,covalue_fin.codata[covalue_fin.codata.length-2].name,covalue_fin.codata[covalue_fin.codata.length-1].name,];
            showChartbox3(x_data,y_data);
        }

    }
    // xmlhttp.open("GET","http://172.16.22.107:8079/process.do?method=RD&process=raw",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    chartbox3_t3 = setInterval(chartBox3flush,5000);
}


function showChartbox3(x_data,y_data) {

    // var x_data = ['永州1#', '崇左1#', '茂鑫2#', '兰溪1#', '建德1#', '桐庐1#'];
    // var y_data = [12.6, 13.8, 15, 15.8, 16.6, 17.6];

    var myChart_box3 = echarts.init(document.getElementById('chart_box3'));

    var optionbox3 = {
        backgroundColor: '#12234F',
        grid: {
            left: '3%',
            right: '1%',
            top: '13%',
            bottom: '3%',
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    opacity: 0
                }
            },
            formatter: function (prams) {
                return "细度：" + prams[0].data
            }
        },
        xAxis: [{
            type: 'category',
            gridIndex: 0,
            data: x_data,
            // axisTick: {
            //     alignWithLabel: true
            // },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 20,
                textStyle: {
                    // fontFamily:"宋体",
                    color: "#fff"
                }
            }
        }],
        yAxis: [{
            type: 'value',
            //gridIndex: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.3)'
                }
            },
            axisTick: {
                show: true,
                length: 5,
                lineStyle: {
                    color: '#fff',
                    type: 'solid',
                    width: 1
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    //color: '#0c3b71'
                    color: '#fff'
                }
            },
            axisLabel: {
                //color: 'rgb(170,170,170)',
                color: '#fff',
                formatter: '{value}'
            }
        },
            {
                type: 'value',
                //gridIndex: 0,
                //splitNumber: 12,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                    }
                }
            }
        ],
        series: [{
            name: '细度',
            type: 'bar',
            barWidth: '30%',
            xAxisIndex: 0,
            yAxisIndex: 0,
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
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00feff'
                        },
                            {
                                offset: 0.5,
                                color: '#027eff'
                            },
                            {
                                offset: 1,
                                color: '#0286ff'
                            }
                        ]
                    )
                }
            },
            data: y_data,
            zlevel: 11
        },
            {
                name: '背景',
                type: 'bar',
                barWidth: '50%',
                xAxisIndex: 0,
                yAxisIndex: 1,
                barGap: '-135%',
                data: [100, 100, 100, 100, 100, 100, 100],
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                zlevel: 9
            },
        ]
    };
    myChart_box3.setOption(optionbox3);
    window.onresize = myChart_box3.resize();
}