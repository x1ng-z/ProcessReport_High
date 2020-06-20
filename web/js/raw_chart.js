
/*----------------开停机数量chart---------------*/

function showRunchart(runNum,allNum,stopNum){

    var myRatebox = echarts.init(document.getElementById('ratebox'));

    optionrate = {
        title: {
            text: runNum+"/"+allNum,
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#65c4f1',
                fontSize: '18'
            }
        },
        tooltip: {
            trigger: 'item',
            position:"right"
        },
        series: [{
            name: '运行情况',
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
                name: '运行',
                value: runNum,
                itemStyle: {
                    normal: {
                        color:"#0fae72",
                    }
                }
            },
                {
                    name: '停机',
                    value: stopNum,
                    itemStyle: {
                        normal: {
                            color: "#f54e4c",
                        }
                    }
                },
            ]
        }]
    }
    myRatebox.setOption(optionrate);

    window.onresize = function() {
        myRatebox.resize();
    }
}
/*------------------------产量地图Chart-------------------------*/

function showmapChart(data,toolTipData){

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
            formatter:
                function(params) {
                if (typeof(params.value)[2] == "undefined" ||typeof(params.value)[3] == "undefined") {
                    var toolTiphtml = '';
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
                    var toolTiphtml = '';
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
                // color: ['#0f0c29', '#302b63', '#24243e']
                // color: ['#23074d', '#cc0b11']紫红
                color: ['#102e82', '#cc0b11'] // 紫红
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
                    // areaColor: '#031525',
                    // areaColor: '#B2D2DD',
                    areaColor: '#378DDA',
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
                    // color: '#05C3F9'
                    color: '#fff'
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

/*------------------------台时数据chart----------------------------------*/

function showChartbox1(realdata,titlename,valdata){

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


/*------------------------电耗数据chart----------------------------------*/

function showChartbox2(x_data,y_data){

    // var colorList = {
    //     type: 'linear',
    //     x: 0,
    //     y: 0,
    //     x2: 0,
    //     y2: 1,
    //     colorStops: [{offset: 0, color: '#06DBF5' // 0% 处的颜色
    //     }, {offset: 1, color: '#00d386'}],// 100% 处的颜色
    //     globalCoord: false // 缺省为 false
    // }
    var colorList = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{offset: 0, color: '#a657f6' // 0% 处的颜色
        }, {offset: 1, color: '#5625ff'}],// 100% 处的颜色
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


/*------------------------细度数据chart--------------------------------*/

function showChartbox3(fin_name,fin_value) {

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
            data: fin_name,
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
            name: '细度',
            type: 'bar',
            barWidth: '35%',
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
            data: fin_value,
            zlevel: 11
        },
            {
                name: '背景',
                type: 'bar',
                barWidth: '60%',
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


/*------------------------库位数据chart----------------------------*/

function showChartbox4(comName,siloLevel){

    var myChart_box4 = echarts.init(document.getElementById('chart_box4'));

    var colorList = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{offset: 0, color: '#00d386' // 0% 处的颜色
        }, {offset: 1, color: '#06DBF5'}],// 100% 处的颜色
        globalCoord: false // 缺省为 false
    }

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
                data:siloLevel,
                itemStyle: {
                    color: function(params) {
                        return colorList;
                    },
                },
                barWidth: 25,
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
    window.onresize = function() {
        myChart_box4.resize();
    }
}