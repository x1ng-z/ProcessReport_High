/*----------------开停机数量chart---------------*/

function showRunchart(allNum,runNum,stopNum){

    // var runNum = 30;
    // var allNum = 33;
    // var stopNum = allNum-runNum;

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
    window.onresize = myRatebox.resize();
}

/*---------------地图chart------------------*/

function showmapChart(data,toolTipData,stopBurningsysArr,coaluseHighsysArr,tsLowsysArr) {
    var geoCoordMap = {
        "兰溪一线": [119.460472, 29.2000],
        "兰溪二线": [119.460472, 29.2100],
        "兰溪三线": [119.460472, 29.2200],
        "建德一线": [119.281231, 29.474759],
        "建德二线": [119.281231, 29.484759],
        "桐庐一线": [119.691467, 29.79299],

        "高安一线": [115.892151, 28.676493],
        "高安二线": [115.892151, 28.686493],
        "会昌红狮": [115.786056, 25.600272],
        "鹰鹏红狮": [114.986373, 27.111699],

        "衡阳红狮": [112.607693, 26.900358],
        "宁远莲花": [111.945844, 25.570888],
        "永州红狮": [111.608019, 26.434516],

        "漳平一线": [117.419998, 25.290184],
        "漳平二线": [117.419998, 25.300184],
        "漳平三期": [117.419998, 25.310184],
        "大田红狮": [117.847115, 25.692699],

        "宜良一线": [103.141603, 24.919839],
        "宜良二线": [103.141603, 24.929839],

        "崇左红狮": [107.353926, 22.404108],
        "南宁红狮": [108.320004, 22.82402],
        "广西恒庆": [109.875304, 22.736421],

        "龙里一线": [106.979524, 26.453154],
        "龙里二线": [106.979524, 26.463154],
        "茂鑫红狮": [108.81606, 27.173887],

        "邻水一线": [106.93038, 30.334768],
        "邻水二线": [106.93038, 30.344768],
        "江油红狮": [104.745915, 31.778026],
        "长宁红狮": [104.921174, 28.582169],

        "库车红狮": [82.987312, 41.714696],
        "兰州红狮": [103.823557, 36.058039],

    };


    var data1 = tsLowsysArr;
    var data2 = coaluseHighsysArr;
    var data3= stopBurningsysArr;

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

    var convertData1 = function (data1) {
        var res = [];
        for (var i = 0; i < data1.length; i++) {
            var geoCoord = geoCoordMap[data1[i].name];
            if (geoCoord) {
                res.push({
                    name: data1[i].name,
                    value: geoCoord.concat(data1[i].value)
                });
            }
        }
        return res;
    };

    var convertData2 = function (data2) {
        var res = [];
        for (var i = 0; i < data2.length; i++) {
            var geoCoord = geoCoordMap[data2[i].name];
            if (geoCoord) {
                res.push({
                    name: data2[i].name,
                    value: geoCoord.concat(data2[i].value)
                });
            }
        }
        return res;
    };

    var convertData3 = function (data3) {
        var res = [];
        for (var i = 0; i < data3.length; i++) {
            var geoCoord = geoCoordMap[data3[i].name];
            if (geoCoord) {
                res.push({
                    name: data3[i].name,
                    value: geoCoord.concat(data3[i].value)
                });
            }
        }
        return res;
    };

    var myChart = echarts.init(document.getElementById('mapbox'));

    option = {
        backgroundColor: 'rgb(13, 23, 89)',
        tooltip: {
            trigger: 'item',
            formatter:
                function (params) {
                if(typeof(params.value)[2] == "undefined"){
                    var toolTiphtml = '';
                }else{
                    var toolTiphtml= params.name + ' : ' + params.value[2];
                }
                return toolTiphtml;
            },
        },
        color: [ '#ff0000', '#ffff00','#ff510f'],
        legend: {
            orient: 'vertical',
            right: 20,
            top: 30,
            data: ['产量低', '煤耗高', '停窑'],
            textStyle: {
                color: '#fff'
            },
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
                color: ['#378DDA','#102e82'] //地图各区域颜色
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    // areaColor: 'rgb(19, 91, 153)',
                    // borderColor: 'rgb(9, 54, 95)'
                    areaColor: '#378DDA',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: 'rgb(10, 105, 187)'
                }
            }
        },

        series: [
           //产量数据
            {
                name: '散点',
                type:'scatter',
                show:false,
                coordinateSystem: 'geo',
                // data: convertData(data),
                data: convertData(data),
                // symbolSize: function(val) {
                //     return val[2] / 4000;
                // },
                symbolSize: 0,
                label: {
                    normal: {
                        show: false
                        // formatter: '{b}',
                        // position: 'right',
                        // show: true
                    },
                    emphasis: {
                        show: false
                        // show: true
                    }
                },
            },
            {
                type: 'map',
                map: 'china',
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
                        // areaColor: '#031525',
                        areaColor: '#378DDA',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                },
                animation: false,
                data: data
            },

            //产量低地区
            {
            name: '产量低',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData1(data1),
            symbolSize: 6,
            label: {
                normal: {
                    show: false
                    // formatter: '{b}',
                    // fontSize: 12,
                    // position: 'right',
                    // show: true
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                tooltip: {
                    show: false
                }
            },
            //煤耗高地区
            {
                name: '煤耗高',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData2(data2),
                symbolSize: 6,
                label: {
                    normal: {
                        show: false
                        // formatter: '{b}',
                        // fontSize: 12,
                        // position: 'top',
                        // show: true
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                tooltip: {
                    show: false
                }
            },
            //停窑地区
            {
                name: '停窑',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData3(data3),
                symbolSize: 6,
                label: {
                    normal: {
                        show: false
                        // formatter: '{b}',
                        // fontSize: 12,
                        // position: 'right',
                        // show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                tooltip: {
                    show: false
                }
            }

        ]
    }
    myChart.setOption(option);
    window.onresize = myChart.resize();
}


/*------------------------台时数据chart----------------------------------*/

function showChartbox1(x_ts,y_ts,de_ts,real_ts){

    // var x_ts=[90,88,83,60,50,45];
    // var y_ts=["建德2#","桐庐 #","兰溪3#","兰溪1#","兰溪2#","建德1#"];
    // var de_ts=[380,380,380,180,180,170];

    var myChart_box1 = echarts.init(document.getElementById('chart_box1'));
    var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6','#0fae72'];

    var optionbox1 = {
        backgroundColor: '#12234F',
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
            data: y_ts,
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
            data: real_ts,
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
            data: x_ts,
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
                    formatter: '{c}%'
                }
            },
        },
            {
            name: '框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [130,130,130,130,130,130],
            barWidth: 20,
            itemStyle: {
                normal: {
                    color: 'none',
                    borderColor: '#00c1de',
                    borderWidth: 3,
                    barBorderRadius: 15,
                }
            }
        },
        ]
    };
    myChart_box1.setOption(optionbox1);
    window.onresize = myChart_box1.resize();
}

/*------------------------煤耗数据chart----------------------------------*/

function showChartbox2(x_Coaluse,y_Coaluse){

    // var y_Coaluse=[116.0,122.0,128.3,157.7,162.0,201.6];
    // var x_Coaluse=["龙里1#","龙里2#","桐庐#","建德2#","茂鑫#","长宁#"];

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
            data: x_Coaluse,
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
            data:y_Coaluse,
        }]
    };

    myChart_box2.setOption(optionbox2);
    window.onresize = myChart_box2.resize();
}


/*------------------------游离钙数据chart--------------------------------*/

function showChartbox3(x_f_Cao,y_f_Cao) {

    // var y_f_Cao=[0.6,0.8,0.9,1.5,1.7,1.9];
    // var x_f_Cao=["龙里1#","龙里2#","桐庐#","建德2#","茂鑫#","长宁#"];

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
                return "游离钙：" + prams[0].data
            }
        },
        xAxis: [{
            type: 'category',
            gridIndex: 0,
            data: x_f_Cao,
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 20,
                textStyle: {
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
                color: '#fff',
                formatter: '{value}'
            }
        },
            {
                type: 'value',
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
            name: '游离钙',
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
            data: y_f_Cao,
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


/*------------------------饱和比数据chart----------------------------*/

function showChartbox4(x_Saturat,y_Saturat){

    // var y_Saturat=[0.6,0.8,0.9,1.5,1.7,1.9];
    // var x_Saturat=["龙里1#","龙里2#","桐庐#","建德2#","茂鑫#","长宁#"];

    var myChart_box4 = echarts.init(document.getElementById('chart_box4'));

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
            data: x_Saturat
        },
        series: [
            {
                name: '饱和比',
                type: 'bar',
                data:y_Saturat,
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        textStyle: {
                            color: "#ffc72b",
                            fontSize: 14
                        }
                    }
                },
            },
        ]
    };

    myChart_box4.setOption(optionbox4);
    window.onresize = myChart_box4.resize();
}