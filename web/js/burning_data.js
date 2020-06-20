/*----------------------------详情界面跳转-----------------------------------------*/

var objWinBurning_Frame;

function burning_frame(){

    var target = "Burning_Frame1.html";
    if (objWinBurning_Frame == null || objWinBurning_Frame.closed) {
        objWinBurning_Frame = window.open(target);
    } else {
        objWinBurning_Frame.location.replace(target);
    }
}

/*-------------------参数设置---------------*/

function burning_syetem_set_OK(){
    document.getElementById("staout").setAttribute("readOnly","true");
    document.getElementById("coaluse").setAttribute("readOnly","true");

    localStorage.staout = document.getElementById("staout").value;
    localStorage.coaluse =document.getElementById("coaluse").value;

    document.getElementById("staout").style.backgroundColor="#a2a2a2";
    document.getElementById("coaluse").style.backgroundColor="#a2a2a2";

}

function burning_syetem_set_Edit(){
    document.getElementById("staout").removeAttribute("readOnly");
    document.getElementById("coaluse").removeAttribute("readOnly");

    document.getElementById("staout").style.backgroundColor="#fff";
    document.getElementById("coaluse").style.backgroundColor="#fff";
}

function data_onload(){
    document.getElementById("staout").value=localStorage.staout;
    document.getElementById("coaluse").value=localStorage.coaluse;
}

/*----------------------------数据获取及刷新----------------------------------*/

var mapbox_t;

function burning_data_flush(){
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

            var sysZJLX_K1 = dataObj.ZJLX_K1;
            var sysZJLX_K2 = dataObj.ZJLX_K2;
            var sysZJLX_K3 = dataObj.ZJLX_K3;
            var sysHZQLS_K1 = dataObj.HZQLS_K1;
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
            var sysYNWLS_K1 = dataObj.YNWLS_K1;

            var sysSCLS_K1 = dataObj.SCLS_K1;
            var sysSCLS_K2 = dataObj.SCLS_K2;
            var sysSCJY_K1 = dataObj.SCJY_K1;
            var sysSCCN_K1 = dataObj.SCCN_K1;

            var sysJTKC_K1 = dataObj.JTKC_K1;
            var sysJTLZ_K1 = dataObj.JTLZ_K1;

            var sysHWWX_K1 = dataObj.HWWX_K1;
            var sysHWXW_K1 = dataObj.HWXW_K1;


            /*------------------集团及子公司熟料台时数据-------------------------------*/

            var covalue_ts = {
                codata: [
                    {name: "兰溪一线",elecdata:sysZJLX_K1.回转窑电流1,runrate: Math.round((sysZJLX_K1.回转窑台时1/sysZJLX_K1.type)*100),devalue:sysZJLX_K1.type,value: sysZJLX_K1.回转窑台时1},
                    {name: "兰溪二线",elecdata:sysZJLX_K2.回转窑电流1,runrate: Math.round((sysZJLX_K2.回转窑台时1/sysZJLX_K2.type)*100),devalue:sysZJLX_K2.type, value: sysZJLX_K2.回转窑台时1},
                    {name: "兰溪三线",elecdata:sysZJLX_K3.回转窑电流1,runrate: Math.round((sysZJLX_K3.回转窑台时1/sysZJLX_K3.type)*100),devalue:sysZJLX_K3.type, value: sysZJLX_K3.回转窑台时1},
                    {name: "青龙山",elecdata:sysHZQLS_K1.回转窑电流1,runrate: Math.round((sysHZQLS_K1.回转窑台时1/sysHZQLS_K1.type)*100),devalue:sysHZQLS_K1.type, value: sysHZQLS_K1.回转窑台时1},
                    {name: "建德一线",elecdata:sysHZJD_K1.回转窑电流1,runrate: Math.round((sysHZJD_K1.回转窑台时1/sysHZJD_K1.type)*100),devalue:sysHZJD_K1.type, value: sysHZJD_K1.回转窑台时1},
                    {name: "建德二线",elecdata:sysHZJD_K2.回转窑电流1,runrate: Math.round((sysHZJD_K2.回转窑台时1/sysHZJD_K2.type)*100),devalue:sysHZJD_K2.type, value: sysHZJD_K2.回转窑台时1},
                    {name: "桐庐红狮",elecdata:sysHZTL_K1.回转窑电流1,runrate: Math.round((sysHZTL_K1.回转窑台时1/sysHZTL_K1.type)*100),devalue:sysHZTL_K1.type, value: sysHZTL_K1.回转窑台时1},
                    {name: "高安一线",elecdata:sysJXGA_K1.回转窑电流1,runrate: Math.round(((sysJXGA_K1.回转窑台时1+sysJXGA_K1.回转窑台时2)/sysJXGA_K1.type)*100),devalue:sysJXGA_K1.type, value: sysJXGA_K1.回转窑台时1+sysJXGA_K1.回转窑台时2},
                    {name: "高安二线",elecdata:sysJXGA_K2.回转窑电流1,runrate: Math.round(((sysJXGA_K2.回转窑台时1+sysJXGA_K2.回转窑台时2)/sysJXGA_K2.type)*100),devalue:sysJXGA_K2.type, value: sysJXGA_K2.回转窑台时1+sysJXGA_K2.回转窑台时2},
                    {name: "会昌红狮",elecdata:sysJXHC_K1.回转窑电流1,runrate: Math.round(((sysJXHC_K1.回转窑台时1+sysJXHC_K1.回转窑台时2)/sysJXHC_K1.type)*100),devalue:sysJXHC_K1.type, value: sysJXHC_K1.回转窑台时1+sysJXHC_K1.回转窑台时2},
                    {name: "衡阳红狮",elecdata:sysJXHY_K1.回转窑电流1,runrate: Math.round((sysJXHY_K1.回转窑台时1/sysJXHY_K1.type)*100),devalue:sysJXHY_K1.type, value: sysJXHY_K1.回转窑台时1},
                    {name: "宁远莲花",elecdata:sysJXNY_K1.回转窑电流1,runrate: Math.round((sysJXNY_K1.回转窑台时1/sysJXNY_K1.type)*100),devalue:sysJXNY_K1.type, value: sysJXNY_K1.回转窑台时1},
                    {name: "永州红狮",elecdata:(sysJXYZ_K1.回转窑电流1+sysJXYZ_K1.回转窑电流2)/2,runrate: Math.round(((sysJXYZ_K1.回转窑台时1+sysJXYZ_K1.回转窑台时2)/sysJXYZ_K1.type)*100),devalue:sysJXYZ_K1.type, value: sysJXYZ_K1.回转窑台时1+sysJXYZ_K1.回转窑台时2},
                    {name: "江西鹰鹏",elecdata:(sysJXYP_K1.回转窑电流1+sysJXYP_K1.回转窑电流2)/2,runrate: Math.round(((sysJXYP_K1.回转窑台时1+sysJXYP_K1.回转窑台时2)/sysJXYP_K1.type)*100),devalue:sysJXYP_K1.type, value: sysJXYP_K1.回转窑台时1+sysJXYP_K1.回转窑台时2},
                    {name: "漳平一线",elecdata:sysFJZP_K1.回转窑电流1,runrate: Math.round(((sysFJZP_K1.回转窑台时1+sysFJZP_K1.回转窑台时2)/sysFJZP_K1.type)*100),devalue:sysFJZP_K1.type, value: sysFJZP_K1.回转窑台时1+sysFJZP_K1.回转窑台时2},
                    {name: "漳平二线",elecdata:sysFJZP_K2.回转窑电流1,runrate: Math.round(((sysFJZP_K2.回转窑台时1+sysFJZP_K2.回转窑台时2)/sysFJZP_K2.type)*100),devalue:sysFJZP_K2.type, value: sysFJZP_K2.回转窑台时1+sysFJZP_K2.回转窑台时2},
                    {name: "漳平三期",elecdata:(sysFJZP_K3.回转窑电流1+sysFJZP_K3.回转窑电流2)/2,runrate: Math.round((sysFJZP_K3.回转窑台时1/sysFJZP_K3.type)*100),devalue:sysFJZP_K3.type, value: sysFJZP_K3.回转窑台时1},
                    {name: "大田红狮",elecdata:sysFJDT_K1.回转窑电流1,runrate: Math.round((sysFJDT_K1.回转窑台时1/sysFJDT_K1.type)*100),devalue:sysFJDT_K1.type, value: sysFJDT_K1.回转窑台时1},
                    {name: "宜良一线",elecdata:sysYNYL_K1.回转窑电流1,runrate: Math.round((sysYNYL_K1.回转窑台时2/sysYNYL_K1.type)*100),devalue:sysYNYL_K1.type, value: sysYNYL_K1.回转窑台时2},
                    {name: "宜良二线",elecdata:sysYNYL_K2.回转窑电流1,runrate: Math.round((sysYNYL_K2.回转窑台时1/sysYNYL_K2.type)*100),devalue:sysYNYL_K2.type, value: sysYNYL_K2.回转窑台时1},
                    {name: "崇左红狮",elecdata:(sysYNCZ_K1.回转窑电流1+sysYNCZ_K1.回转窑电流2)/2,runrate: Math.round(((sysYNCZ_K1.回转窑台时1+sysYNCZ_K1.回转窑台时2)/sysYNCZ_K1.type)*100),devalue:sysYNCZ_K1.type, value: sysYNCZ_K1.回转窑台时1+sysYNCZ_K1.回转窑台时2},
                    {name: "茂鑫红狮",elecdata:sysYNMX_K1.回转窑电流1,runrate: Math.round(((sysYNMX_K1.回转窑台时1+sysYNMX_K1.回转窑台时2)/sysYNMX_K1.type)*100),devalue:sysYNMX_K1.type, value: sysYNMX_K1.回转窑台时1+sysYNMX_K1.回转窑台时2},
                    {name: "南宁红狮",elecdata:sysYNNN_K1.回转窑电流1,runrate: Math.round((sysYNNN_K1.回转窑台时1/sysYNNN_K1.type)*100),devalue:sysYNNN_K1.type, value: sysYNNN_K1.回转窑台时1},
                    {name: "龙里一线",elecdata:sysYNLL_K1.回转窑电流1,runrate: Math.round(((sysYNLL_K1.回转窑台时1+sysYNLL_K1.回转窑台时2)/sysYNLL_K1.type)*100),devalue:sysYNLL_K1.type, value: sysYNLL_K1.回转窑台时1+sysYNLL_K1.回转窑台时2},
                    {name: "龙里二线",elecdata:sysYNLL_K2.回转窑电流1,runrate: Math.round(((sysYNLL_K2.回转窑台时1+sysYNLL_K2.回转窑台时2)/sysYNLL_K2.type)*100),devalue:sysYNLL_K2.type, value: sysYNLL_K2.回转窑台时1+sysYNLL_K2.回转窑台时2},
                    {name: "广西恒庆",elecdata:sysYNHQ_K1.回转窑电流1,runrate: Math.round(((sysYNHQ_K1.回转窑台时1+sysYNHQ_K1.回转窑台时2)/sysYNHQ_K1.type)*100),devalue:sysYNHQ_K1.type, value: sysYNHQ_K1.回转窑台时1+sysYNHQ_K1.回转窑台时2},
                    // {name: "无量山",elecdata:sysYNWLS_K1.回转窑电流1,runrate: Math.round((sysYNWLS_K1.回转窑台时1/sysYNWLS_K1.type)*100),devalue:sysYNWLS_K1.type, value: sysYNWLS_K1.回转窑台时1},
                    {name: "邻水一线",elecdata:sysSCLS_K1.回转窑电流1,runrate: Math.round((sysSCLS_K1.回转窑台时1/sysSCLS_K1.type)*100),devalue:sysSCLS_K1.type, value: sysSCLS_K1.回转窑台时1},
                    {name: "邻水二线",elecdata:sysSCLS_K2.回转窑电流1,runrate: Math.round((sysSCLS_K2.回转窑台时1/sysSCLS_K2.type)*100),devalue:sysSCLS_K2.type, value: sysSCLS_K2.回转窑台时1},
                    {name: "江油红狮",elecdata:sysSCJY_K1.回转窑电流1,runrate: Math.round(((sysSCJY_K1.回转窑台时1+sysSCJY_K1.回转窑台时2)/sysSCJY_K1.type)*100),devalue:sysSCJY_K1.type, value: sysSCJY_K1.回转窑台时1+sysSCJY_K1.回转窑台时2},
                    {name: "长宁红狮",elecdata:sysSCCN_K1.回转窑电流1,runrate: Math.round((sysSCCN_K1.回转窑台时1/sysSCCN_K1.type)*100),devalue:sysSCCN_K1.type, value: sysSCCN_K1.回转窑台时1},
                    {name: "库车红狮",elecdata:sysJTKC_K1.回转窑电流1,runrate: Math.round(((sysJTKC_K1.回转窑台时1+sysJTKC_K1.回转窑台时2)/sysJTKC_K1.type)*100),devalue:sysJTKC_K1.type, value: sysJTKC_K1.回转窑台时1+sysJTKC_K1.回转窑台时2},
                    {name: "兰州红狮",elecdata:sysJTLZ_K1.回转窑电流1,runrate: Math.round(((sysJTLZ_K1.回转窑台时1+sysJTLZ_K1.回转窑台时2)/sysJTLZ_K1.type)*100),devalue:sysJTLZ_K1.type, value: sysJTLZ_K1.回转窑台时1+sysJTLZ_K1.回转窑台时2},
                    {name: "老挝万象",elecdata:sysHWWX_K1.回转窑电流1,runrate: Math.round(((sysHWWX_K1.回转窑台时1+sysHWWX_K1.回转窑台时2)/sysHWWX_K1.type)*100),devalue:sysHWWX_K1.type, value: sysHWWX_K1.回转窑台时1+sysHWWX_K1.回转窑台时2},
                    {name: "尼泊尔希望",elecdata:sysHWXW_K1.回转窑电流1,runrate: Math.round(((sysHWXW_K1.回转窑台时1+sysHWXW_K1.回转窑台时2)/sysHWXW_K1.type)*100),devalue:sysHWXW_K1.type, value: sysHWXW_K1.回转窑台时1+sysHWXW_K1.回转窑台时2}]
            };

                        var covalue_ts_dataArr= new Array();
                        var fullrun = 0;
                        var tsLowsysArr= new Array();

                        for(var i=0;i<covalue_ts.codata.length;i++) {
                            if(covalue_ts.codata[i].value>10&&covalue_ts.codata[i].elecdata>10){
                                covalue_ts_dataArr.push(covalue_ts.codata[i]);
                            }
                            if(covalue_ts.codata[i].value>=covalue_ts.codata[i].devalue){
                                fullrun++;
                            }
                            if(covalue_ts.codata[i].runrate<=90&&covalue_ts.codata[i].value>10&&covalue_ts.codata[i].elecdata>10){
                                tsLowsysArr.push({name:covalue_ts.codata[i].name,value:covalue_ts.codata[i].value});
                            }
                        }

                        var allworkno = document.getElementById('allworkno');
                        allworkno.innerText = fullrun;

                        function sortValue_ts(a,b){
                            return b.runrate-a.runrate;
                        }
                        covalue_ts_dataArr.sort(sortValue_ts);

                        var total_ts = 0;
                        for(var i=0;i<covalue_ts_dataArr.length;i++){
                            total_ts += covalue_ts_dataArr[i].value;
                        }

                        var allStaout = document.getElementById('allStaout');
                        allStaout.innerText = Math.round(total_ts*100)/100;

                        var x_ts =[covalue_ts_dataArr[0].runrate,covalue_ts_dataArr[1].runrate,covalue_ts_dataArr[2].runrate,
                            covalue_ts_dataArr[covalue_ts_dataArr.length-3].runrate,covalue_ts_dataArr[covalue_ts_dataArr.length-2].runrate,covalue_ts_dataArr[covalue_ts_dataArr.length-1].runrate];
                        var y_ts =[covalue_ts_dataArr[0].name,covalue_ts_dataArr[1].name,covalue_ts_dataArr[2].name,
                            covalue_ts_dataArr[covalue_ts_dataArr.length-3].name,covalue_ts_dataArr[covalue_ts_dataArr.length-2].name,covalue_ts_dataArr[covalue_ts_dataArr.length-1].name];
                        var de_ts =[covalue_ts_dataArr[0].devalue,covalue_ts_dataArr[1].devalue,covalue_ts_dataArr[2].devalue,
                            covalue_ts_dataArr[covalue_ts_dataArr.length-3].devalue,covalue_ts_dataArr[covalue_ts_dataArr.length-2].devalue,covalue_ts_dataArr[covalue_ts_dataArr.length-1].devalue];

                        var real_ts =[Math.round(covalue_ts_dataArr[0].value*100)/100,
                                      Math.round(covalue_ts_dataArr[1].value*100)/100,
                                      Math.round(covalue_ts_dataArr[2].value*100)/100,
                                      Math.round(covalue_ts_dataArr[covalue_ts_dataArr.length-3].value*100)/100,
                                      Math.round(covalue_ts_dataArr[covalue_ts_dataArr.length-2].value*100)/100,
                                      Math.round(covalue_ts_dataArr[covalue_ts_dataArr.length-1].value*100)/100];

                        showChartbox1(x_ts,y_ts,de_ts,real_ts);


            /*------------------集团及子公司熟料煤耗数据-------------------------------*/

            var covalue_Coaluse = {
                codata: [
                    {name: "兰溪一线",value: sysZJLX_K1.煤磨煤耗1,elecdata:sysZJLX_K1.回转窑电流1},
                    {name: "兰溪二线",value: sysZJLX_K2.煤磨煤耗1,elecdata:sysZJLX_K2.回转窑电流1},
                    {name: "兰溪三线",value: sysZJLX_K3.煤磨煤耗1,elecdata:sysZJLX_K3.回转窑电流1},
                    {name: "青龙山",value: sysHZQLS_K1.煤磨煤耗1,elecdata:sysHZQLS_K1.回转窑电流1},
                    {name: "建德一线",value: sysHZJD_K1.煤磨煤耗1,elecdata:sysHZJD_K1.回转窑电流1},
                    {name: "建德二线",value: sysHZJD_K2.煤磨煤耗1,elecdata:sysHZJD_K2.回转窑电流1},
                    {name: "桐庐红狮",value: sysHZTL_K1.煤磨煤耗1,elecdata:sysHZTL_K1.回转窑电流1},
                    {name: "高安一线",value: sysJXGA_K1.煤磨煤耗1,elecdata:sysJXGA_K1.回转窑电流1},
                    {name: "高安二线",value: sysJXGA_K2.煤磨煤耗1,elecdata:sysJXGA_K2.回转窑电流1},
                    {name: "会昌红狮",value: sysJXHC_K1.煤磨煤耗1,elecdata:sysJXHC_K1.回转窑电流1},
                    {name: "衡阳红狮",value: sysJXHY_K1.煤磨煤耗1,elecdata:sysJXHY_K1.回转窑电流1},
                    //{name: "宁远莲花",value: sysJXNY_K1.煤磨煤耗1,elecdata:sysJXNY_K1.回转窑电流1},
                    {name: "永州红狮",value: sysJXYZ_K1.煤磨煤耗1,elecdata:(sysJXYZ_K1.回转窑电流1+sysJXYZ_K1.回转窑电流2)/2},
                    {name: "江西鹰鹏",value: sysJXYP_K1.煤磨煤耗1,elecdata:(sysJXYP_K1.回转窑电流1+sysJXYP_K1.回转窑电流2)/2},
                    {name: "漳平一线",value: sysFJZP_K1.煤磨煤耗1,elecdata:sysFJZP_K1.回转窑电流1},
                    {name: "漳平二线",value: sysFJZP_K2.煤磨煤耗1,elecdata:sysFJZP_K2.回转窑电流1},
                    {name: "漳平三期",value: sysFJZP_K3.煤磨煤耗1,elecdata:(sysFJZP_K3.回转窑电流1+sysFJZP_K3.回转窑电流2)/2},
                    {name: "大田红狮",value: sysFJDT_K1.煤磨煤耗1,elecdata:sysFJDT_K1.回转窑电流1},
                    {name: "宜良一线",value: sysYNYL_K1.煤磨煤耗1,elecdata:sysYNYL_K1.回转窑电流1},
                    {name: "宜良二线",value: sysYNYL_K2.煤磨煤耗1,elecdata:sysYNYL_K2.回转窑电流1},
                    {name: "崇左红狮",value: sysYNCZ_K1.煤磨煤耗1,elecdata:(sysYNCZ_K1.回转窑电流1+sysYNCZ_K1.回转窑电流2)/2},
                    {name: "茂鑫红狮",value: sysYNMX_K1.煤磨煤耗1,elecdata:sysYNMX_K1.回转窑电流1},
                    {name: "南宁红狮",value: sysYNNN_K1.煤磨煤耗1,elecdata:sysYNNN_K1.回转窑电流1},
                    {name: "龙里一线",value: sysYNLL_K1.煤磨煤耗1,elecdata:sysYNLL_K1.回转窑电流1},
                    {name: "龙里二线",value: sysYNLL_K2.煤磨煤耗1,elecdata:sysYNLL_K2.回转窑电流1},
                    //{name: "广西恒庆",value: sysYNHQ_K1.煤磨煤耗1,elecdata:sysYNHQ_K1.回转窑电流1},
                    //{name: "无量山",value: sysYNWLS_K1.煤磨煤耗1,elecdata:sysYNWLS_K1.回转窑电流1},
                    {name: "邻水一线",value: sysSCLS_K1.煤磨煤耗1,elecdata:sysSCLS_K1.回转窑电流1},
                    {name: "邻水二线",value: sysSCLS_K2.煤磨煤耗1,elecdata:sysSCLS_K2.回转窑电流1},
                    {name: "江油红狮",value: sysSCJY_K1.煤磨煤耗1,elecdata:sysSCJY_K1.回转窑电流1},
                    {name: "长宁红狮",value: sysSCCN_K1.煤磨煤耗1,elecdata:sysSCCN_K1.回转窑电流1},
                    {name: "库车红狮",value: sysJTKC_K1.煤磨煤耗1,elecdata:sysJTKC_K1.回转窑电流1},
                    {name: "兰州红狮",value: sysJTLZ_K1.煤磨煤耗1,elecdata:sysJTLZ_K1.回转窑电流1},
                    //{name: "老挝万象",value: sysHWWX_K1.煤磨煤耗1,elecdata:sysHWWX_K1.回转窑电流1},
                    //{name: "尼泊尔希望",value: sysHWXW_K1.煤磨煤耗1,elecdata:sysHWXW_K1.回转窑电流1}
                ]
            };

            var covalue_Coaluse_dataArr= new Array();
            var coaluseHighsysArr = new Array();
            for(var i=0;i<covalue_Coaluse.codata.length;i++) {
                if(covalue_Coaluse.codata[i].value>10&&covalue_Coaluse.codata[i].value<300&&covalue_Coaluse.codata[i].elecdata>10){
                    covalue_Coaluse_dataArr.push(covalue_Coaluse.codata[i]);
                }
                if(covalue_Coaluse.codata[i].value>148&&covalue_Coaluse.codata[i].elecdata>10){
                    coaluseHighsysArr.push({name:covalue_Coaluse.codata[i].name,value:covalue_Coaluse.codata[i].value});
                }
            }

            function sortValue_Coaluse(a,b){
                return a.value-b.value;
            }
            covalue_Coaluse_dataArr.sort(sortValue_Coaluse);

            var total_Coaluse = 0;
            for(var i=0;i<covalue_Coaluse_dataArr.length;i++){
                total_Coaluse += covalue_Coaluse_dataArr[i].value;
            }

            var aveCoaluse = document.getElementById('aveCoaluse');
            var avedata_Coaluse = total_Coaluse/covalue_Coaluse_dataArr.length;
            aveCoaluse.innerText = Math.round(avedata_Coaluse*100)/100;

            var y_Coaluse = [covalue_Coaluse_dataArr[0].value,covalue_Coaluse_dataArr[1].value,covalue_Coaluse_dataArr[2].value,
                covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-3].value,covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-2].value,covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-1].value];
            var x_Coaluse = [covalue_Coaluse_dataArr[0].name,covalue_Coaluse_dataArr[1].name,covalue_Coaluse_dataArr[2].name,
                covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-3].name,covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-2].name,covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-1].name];

            showChartbox2(x_Coaluse,y_Coaluse);


            /*------------------集团及子公司熟料游离钙数据-------------------------------*/

            var covalue_f_Cao = {
                codata: [
                    {name: "兰溪一线",value: sysZJLX_K1.fcao,elecdata:sysZJLX_K1.回转窑电流1},
                    {name: "兰溪二线",value: sysZJLX_K2.fcao,elecdata:sysZJLX_K2.回转窑电流1},
                    {name: "兰溪三线",value: sysZJLX_K3.fcao,elecdata:sysZJLX_K3.回转窑电流1},
                    {name: "青龙山",value: sysHZQLS_K1.fcao,elecdata:sysHZQLS_K1.回转窑电流1},
                    {name: "建德一线",value: sysHZJD_K1.fcao,elecdata:sysHZJD_K1.回转窑电流1},
                    {name: "建德二线",value: sysHZJD_K2.fcao,elecdata:sysHZJD_K2.回转窑电流1},
                    {name: "桐庐红狮",value: sysHZTL_K1.fcao,elecdata:sysHZTL_K1.回转窑电流1},
                    {name: "高安一线",value: sysJXGA_K1.fcao,elecdata:sysJXGA_K1.回转窑电流1},
                    {name: "高安二线",value: sysJXGA_K2.fcao,elecdata:sysJXGA_K2.回转窑电流1},
                    {name: "会昌红狮",value: sysJXHC_K1.fcao,elecdata:sysJXHC_K1.回转窑电流1},
                    {name: "衡阳红狮",value: sysJXHY_K1.fcao,elecdata:sysJXHY_K1.回转窑电流1},
                    {name: "宁远莲花",value: sysJXNY_K1.fcao,elecdata:sysJXNY_K1.回转窑电流1},
                    {name: "永州红狮",value: sysJXYZ_K1.fcao,elecdata:(sysJXYZ_K1.回转窑电流1+sysJXYZ_K1.回转窑电流2)/2},
                    {name: "江西鹰鹏",value: sysJXYP_K1.fcao,elecdata:(sysJXYP_K1.回转窑电流1+sysJXYP_K1.回转窑电流2)/2},
                    {name: "漳平一线",value: sysFJZP_K1.fcao,elecdata:sysFJZP_K1.回转窑电流1},
                    {name: "漳平二线",value: sysFJZP_K2.fcao,elecdata:sysFJZP_K2.回转窑电流1},
                    {name: "漳平三期",value: sysFJZP_K3.fcao,elecdata:(sysFJZP_K3.回转窑电流1+sysFJZP_K3.回转窑电流2)/2},
                    {name: "大田红狮",value: sysFJDT_K1.fcao,elecdata:sysFJDT_K1.回转窑电流1},
                    {name: "宜良一线",value: sysYNYL_K1.fcao,elecdata:sysYNYL_K1.回转窑电流1},
                    {name: "宜良二线",value: sysYNYL_K2.fcao,elecdata:sysYNYL_K2.回转窑电流1},
                    {name: "崇左红狮",value: sysYNCZ_K1.fcao,elecdata:(sysYNCZ_K1.回转窑电流1+sysYNCZ_K1.回转窑电流2)/2},
                    {name: "茂鑫红狮",value: sysYNMX_K1.fcao,elecdata:sysYNMX_K1.回转窑电流1},
                    {name: "南宁红狮",value: sysYNNN_K1.fcao,elecdata:sysYNNN_K1.回转窑电流1},
                    {name: "龙里一线",value: sysYNLL_K1.fcao,elecdata:sysYNLL_K1.回转窑电流1},
                    {name: "龙里二线",value: sysYNLL_K2.fcao,elecdata:sysYNLL_K2.回转窑电流1},
                    {name: "广西恒庆",value: sysYNHQ_K1.fcao,elecdata:sysYNHQ_K1.回转窑电流1},
                    // {name: "无量山",value: sysYNWLS_K1.fcao,elecdata:sysYNWLS_K1.回转窑电流1},
                    {name: "邻水一线",value: sysSCLS_K1.fcao,elecdata:sysSCLS_K1.回转窑电流1},
                    {name: "邻水二线",value: sysSCLS_K2.fcao,elecdata:sysSCLS_K2.回转窑电流1},
                    {name: "江油红狮",value: sysSCJY_K1.fcao,elecdata:sysSCJY_K1.回转窑电流1},
                    {name: "长宁红狮",value: sysSCCN_K1.fcao,elecdata:sysSCCN_K1.回转窑电流1},
                    {name: "库车红狮",value: sysJTKC_K1.fcao,elecdata:sysJTKC_K1.回转窑电流1},
                    {name: "兰州红狮",value: sysJTLZ_K1.fcao,elecdata:sysJTLZ_K1.回转窑电流1},
                    {name: "老挝万象",value: sysHWWX_K1.fcao,elecdata:sysHWWX_K1.回转窑电流1},
                    {name: "尼泊尔希望",value: sysHWXW_K1.fcao,elecdata:sysHWXW_K1.回转窑电流1}]
            };

            var covalue_f_Cao_dataArr= new Array();
            for(var i=0;i<covalue_f_Cao.codata.length;i++) {
                if(covalue_f_Cao.codata[i].value>0&&covalue_f_Cao.codata[i].value<10&&covalue_f_Cao.codata[i].elecdata>10){
                    covalue_f_Cao_dataArr.push({name:covalue_f_Cao.codata[i].name,value:covalue_f_Cao.codata[i].value});
                }
            }

            function sortValue_f_Cao(a,b){
                return a.value-b.value;
            }
            covalue_f_Cao_dataArr.sort(sortValue_f_Cao);


            var total_f_Cao = 0;
            for(var i=0;i<covalue_f_Cao_dataArr.length;i++){
                total_f_Cao += covalue_f_Cao_dataArr[i].value;
            }

            var avef_Cao = document.getElementById('avef_CaO');
            var avedata_f_Cao = total_f_Cao/covalue_f_Cao_dataArr.length;
            avef_Cao.innerText = returnVaule(avedata_f_Cao);

            var y_f_Cao = [
                returnVaule(covalue_f_Cao_dataArr[0].value),
                returnVaule(covalue_f_Cao_dataArr[1].value),
                returnVaule(covalue_f_Cao_dataArr[2].value),
                returnVaule(covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-3].value),
                returnVaule(covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-2].value),
                returnVaule(covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-1].value)];
            var x_f_Cao = [covalue_f_Cao_dataArr[0].name,covalue_f_Cao_dataArr[1].name,covalue_f_Cao_dataArr[2].name,
                covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-3].name,covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-2].name,covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-1].name];

            showChartbox3(x_f_Cao,y_f_Cao);


            /*------------------集团及子公司熟料饱和比数据-------------------------------*/

            var covalue_Saturat = {
                codata: [
                    {name: "兰溪一线",value: sysZJLX_K1.kh,elecdata:sysZJLX_K1.回转窑电流1},
                    {name: "兰溪二线",value: sysZJLX_K2.kh,elecdata:sysZJLX_K2.回转窑电流1},
                    {name: "兰溪三线",value: sysZJLX_K3.kh,elecdata:sysZJLX_K3.回转窑电流1},
                    {name: "青龙山",value: sysHZQLS_K1.kh,elecdata:sysHZQLS_K1.回转窑电流1},
                    {name: "建德一线",value: sysHZJD_K1.kh,elecdata:sysHZJD_K1.回转窑电流1},
                    {name: "建德二线",value: sysHZJD_K2.kh,elecdata:sysHZJD_K2.回转窑电流1},
                    {name: "桐庐红狮",value: sysHZTL_K1.kh,elecdata:sysHZTL_K1.回转窑电流1},
                    {name: "高安一线",value: sysJXGA_K1.kh,elecdata:sysJXGA_K1.回转窑电流1},
                    {name: "高安二线",value: sysJXGA_K2.kh,elecdata:sysJXGA_K2.回转窑电流1},
                    {name: "会昌红狮",value: sysJXHC_K1.kh,elecdata:sysJXHC_K1.回转窑电流1},
                    {name: "衡阳红狮",value: sysJXHY_K1.kh,elecdata:sysJXHY_K1.回转窑电流1},
                    {name: "宁远莲花",value: sysJXNY_K1.kh,elecdata:sysJXNY_K1.回转窑电流1},
                    {name: "永州红狮",value: sysJXYZ_K1.kh,elecdata:(sysJXYZ_K1.回转窑电流1+sysJXYZ_K1.回转窑电流2)/2},
                    {name: "江西鹰鹏",value: sysJXYP_K1.kh,elecdata:(sysJXYP_K1.回转窑电流1+sysJXYP_K1.回转窑电流2)/2},
                    {name: "漳平一线",value: sysFJZP_K1.kh,elecdata:sysFJZP_K1.回转窑电流1},
                    {name: "漳平二线",value: sysFJZP_K2.kh,elecdata:sysFJZP_K2.回转窑电流1},
                    {name: "漳平三期",value: sysFJZP_K3.kh,elecdata:(sysFJZP_K3.回转窑电流1+sysFJZP_K3.回转窑电流2)/2},
                    {name: "大田红狮",value: sysFJDT_K1.kh,elecdata:sysFJDT_K1.回转窑电流1},
                    {name: "宜良一线",value: sysYNYL_K1.kh,elecdata:sysYNYL_K1.回转窑电流1},
                    {name: "宜良二线",value: sysYNYL_K2.kh,elecdata:sysYNYL_K2.回转窑电流1},
                    {name: "崇左红狮",value: sysYNCZ_K1.kh,elecdata:(sysYNCZ_K1.回转窑电流1+sysYNCZ_K1.回转窑电流2)/2},
                    {name: "茂鑫红狮",value: sysYNMX_K1.kh,elecdata:sysYNMX_K1.回转窑电流1},
                    {name: "南宁红狮",value: sysYNNN_K1.kh,elecdata:sysYNNN_K1.回转窑电流1},
                    {name: "龙里一线",value: sysYNLL_K1.kh,elecdata:sysYNLL_K1.回转窑电流1},
                    {name: "龙里二线",value: sysYNLL_K2.kh,elecdata:sysYNLL_K2.回转窑电流1},
                    {name: "广西恒庆",value: sysYNHQ_K1.kh,elecdata:sysYNHQ_K1.回转窑电流1},
                    // {name: "无量山",value: sysYNWLS_K1.kh,elecdata:sysYNWLS_K1.回转窑电流1},
                    {name: "邻水一线",value: sysSCLS_K1.kh,elecdata:sysSCLS_K1.回转窑电流1},
                    {name: "邻水二线",value: sysSCLS_K2.kh,elecdata:sysSCLS_K2.回转窑电流1},
                    {name: "江油红狮",value: sysSCJY_K1.kh,elecdata:sysSCJY_K1.回转窑电流1},
                    {name: "长宁红狮",value: sysSCCN_K1.kh,elecdata:sysSCCN_K1.回转窑电流1},
                    {name: "库车红狮",value: sysJTKC_K1.kh,elecdata:sysJTKC_K1.回转窑电流1},
                    {name: "兰州红狮",value: sysJTLZ_K1.kh,elecdata:sysJTLZ_K1.回转窑电流1},
                    {name: "老挝万象",value: sysHWWX_K1.kh,elecdata:sysHWWX_K1.回转窑电流1},
                    {name: "尼泊尔希望",value: sysHWXW_K1.kh,elecdata:sysHWXW_K1.回转窑电流1}]
            };

            var covalue_Saturat_dataArr= new Array();
            for(var i=0;i<covalue_Saturat.codata.length;i++) {
                if(covalue_Saturat.codata[i].value>0&&covalue_Saturat.codata[i].value<5&&covalue_Saturat.codata[i].elecdata>10){
                    covalue_Saturat_dataArr.push({name:covalue_Saturat.codata[i].name,value:covalue_Saturat.codata[i].value});
                }
            }

            function sortValue_Saturat(a,b){
                return a.value-b.value;
            }
            covalue_Saturat_dataArr.sort(sortValue_Saturat);

            var total_Saturat = 0;
            for(var i=0;i<covalue_Saturat_dataArr.length;i++){
                total_Saturat += covalue_Saturat_dataArr[i].value;
            }

            var aveSaturat = document.getElementById('aveSaturat');
            var avedata_Saturat = total_Saturat/covalue_Saturat_dataArr.length;
            aveSaturat.innerText = returnVaule(avedata_Saturat);

            var y_Saturat = [
                returnVaule(covalue_Saturat_dataArr[0].value),
                returnVaule(covalue_Saturat_dataArr[1].value),
                returnVaule(covalue_Saturat_dataArr[2].value),
                returnVaule(covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-3].value),
                returnVaule(covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-2].value),
                returnVaule(covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-1].value)];
            var x_Saturat = [
                covalue_Saturat_dataArr[0].name,
                covalue_Saturat_dataArr[1].name,
                covalue_Saturat_dataArr[2].name,
                covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-3].name,
                covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-2].name,
                covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-1].name];

            showChartbox4(x_Saturat,y_Saturat);

            /*------------------回转窑开停机数量数据-------------------------------*/

            var covalue_run = {
                codata: [
                    {name: "兰溪一线", value: sysZJLX_K1.回转窑电流1},
                    {name: "兰溪二线", value: sysZJLX_K2.回转窑电流1},
                    {name: "兰溪三线", value: sysZJLX_K3.回转窑电流1},
                    {name: "青龙山", value: sysHZQLS_K1.回转窑电流1},
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
                    {name: "无量山", value: sysYNWLS_K1.回转窑电流1},
                    {name: "邻水一线", value: sysSCLS_K1.回转窑电流1},
                    {name: "邻水二线", value: sysSCLS_K2.回转窑电流1},
                    {name: "江油红狮", value: sysSCJY_K1.回转窑电流1},
                    {name: "长宁红狮", value: sysSCCN_K1.回转窑电流1},
                    {name: "库车红狮", value: sysJTKC_K1.回转窑电流1},
                    {name: "兰州红狮", value: sysJTLZ_K1.回转窑电流1},
                    {name: "老挝万象", value: sysHWWX_K1.回转窑电流1},
                    {name: "尼泊尔希望", value: sysHWXW_K1.回转窑电流1}]
            };

            var stopNum = 0;
            var stopBurningsysArr = new Array();
            for (var i = 0; i < covalue_run.codata.length; i++) {
                if (covalue_run.codata[i].value <= 10) {
                    stopNum++;
                    stopBurningsysArr.push(covalue_run.codata[i]);
                }
            }

            var allNum = covalue_run.codata.length;
            var runNum = allNum - stopNum;

            // var unnormalArr = twoArrayUn(tsLowsysArr,coaluseHighsysArr).concat(coaluseHighsysArr);
            // var unnormalNum = unnormalArr.length;
            var repeatNum = twoArrayUn(tsLowsysArr,coaluseHighsysArr).length;
            var tsLowNum = tsLowsysArr.length;
            var coalusehighNum = coaluseHighsysArr.length - repeatNum;
            var unnormalNum = tsLowNum+coalusehighNum;

            showRunchart(allNum,runNum,stopNum,tsLowNum,coalusehighNum,unnormalNum);

            /*------------------回转窑产量数据-------------------------------*/

            var toolTipData = [
                {name: "浙江", value: [
                        {name: "兰溪一线", dayvalue: sysZJLX_K1.day_output, monvalue: sysZJLX_K1.month_output},
                        {name: "兰溪二线", dayvalue: sysZJLX_K2.day_output, monvalue: sysZJLX_K2.month_output},
                        {name: "兰溪三线", dayvalue: sysZJLX_K3.day_output, monvalue: sysZJLX_K3.month_output},
                        {name: "青龙山", dayvalue: sysHZQLS_K1.day_output, monvalue: sysHZQLS_K1.month_output},
                        {name: "建德一线", dayvalue: sysHZJD_K1.day_output, monvalue: sysHZJD_K1.month_output},
                        {name: "建德二线", dayvalue: sysHZJD_K2.day_output, monvalue: sysHZJD_K2.month_output},
                        {name: "桐庐红狮", dayvalue: sysHZTL_K1.day_output, monvalue: sysHZTL_K1.month_output}]
                },
                {name: "江西", value: [
                        {name: "高安一线", dayvalue: sysJXGA_K1.day_output, monvalue: sysJXGA_K1.month_output},
                        {name: "高安二线", dayvalue: sysJXGA_K2.day_output, monvalue: sysJXGA_K2.month_output},
                        {name: "会昌红狮", dayvalue: sysJXHC_K1.day_output, monvalue: sysJXHC_K1.month_output},
                        {name: "江西鹰鹏", dayvalue: sysJXYP_K1.day_output, monvalue: sysJXYP_K1.month_output}]
                },
                {name: "湖南", value: [
                        {name: "衡阳红狮", dayvalue: sysJXHY_K1.day_output, monvalue: sysJXHY_K1.month_output},
                        {name: "宁远莲花", dayvalue: sysJXNY_K1.day_output, monvalue: sysJXNY_K1.month_output},
                        {name: "永州红狮", dayvalue: sysJXYZ_K1.day_output, monvalue: sysJXYZ_K1.month_output}]
                },
                {name: "福建", value: [
                        {name: "漳平一线", dayvalue: sysFJZP_K1.day_output, monvalue: sysFJZP_K1.month_output},
                        {name: "漳平二线", dayvalue: sysFJZP_K2.day_output, monvalue: sysFJZP_K2.month_output},
                        {name: "漳平三期", dayvalue: sysFJZP_K3.day_output, monvalue: sysFJZP_K3.month_output},
                        {name: "大田红狮", dayvalue: sysFJDT_K1.day_output, monvalue: sysFJDT_K1.month_output}]
                },
                {name: "云南", value: [
                        {name: "宜良一线", dayvalue: sysYNYL_K1.day_output, monvalue: sysYNYL_K1.month_output},
                        {name: "宜良二线", dayvalue: sysYNYL_K2.day_output, monvalue: sysYNYL_K2.month_output},
                    // {name: "无量山", dayvalue: sysYNWLS_K1.day_output, monvalue: sysYNWLS_K1.month_output},
                    ]
                },
                {name: "广西", value: [
                        {name: "南宁红狮", dayvalue: sysYNNN_K1.day_output, monvalue: sysYNNN_K1.month_output},
                        {name: "崇左红狮", dayvalue: sysYNCZ_K1.day_output, monvalue: sysYNCZ_K1.month_output},
                        {name: "广西恒庆", dayvalue: sysYNHQ_K1.day_output, monvalue: sysYNHQ_K1.month_output}]
                },
                {name: "贵州", value: [
                        {name: "龙里一线", dayvalue: sysYNLL_K1.day_output, monvalue: sysYNLL_K1.month_output},
                        {name: "龙里二线", dayvalue: sysYNLL_K2.day_output, monvalue: sysYNLL_K2.month_output},
                        {name: "茂鑫红狮", dayvalue: sysYNMX_K1.day_output, monvalue: sysYNMX_K1.month_output}]
                },
                {name: "四川", value: [
                        {name: "邻水一线", dayvalue: sysSCLS_K1.day_output, monvalue: sysSCLS_K1.month_output},
                        {name: "邻水二线", dayvalue: sysSCLS_K2.day_output, monvalue: sysSCLS_K2.month_output},
                        {name: "江油红狮", dayvalue: sysSCJY_K1.day_output, monvalue: sysSCJY_K1.month_output},
                        {name: "长宁红狮", dayvalue: sysSCCN_K1.day_output, monvalue: sysSCCN_K1.month_output}]
                },
                {name: "甘肃", value: [
                        {name: "兰州红狮", dayvalue: sysJTLZ_K1.day_output, monvalue: sysJTLZ_K1.month_output}]
                },
                {name: "新疆", value: [
                        {name: "库车红狮", dayvalue: sysJTKC_K1.day_output, monvalue: sysJTKC_K1.month_output}]
                },
                {name: "海外", value: [
                        {name: "老挝万象", dayvalue: sysHWWX_K1.day_output, monvalue: sysHWWX_K1.month_output},
                        {name: "尼泊尔希望", dayvalue: sysHWXW_K1.day_output, monvalue: sysHWXW_K1.month_output}]
                },
            ];

            var total_result = new Array(22);
            for (var i = 0; i < total_result.length; ++i) {
                total_result[i] = 0;
            }

            for (var i = 0; i < toolTipData.length; i++) {
                for (var j = 0; j < toolTipData[i].value.length; j++) {

                    total_result[2 * i] += toolTipData[i].value[j].dayvalue;
                    total_result[2 * i + 1] += toolTipData[i].value[j].monvalue;
                }
            }

            var ZJdayvalue = total_result[0];
            var ZJmonvalue = total_result[1];
            var JXdayvalue = total_result[2];
            var JXmonvalue = total_result[3];
            var HNdayvalue = total_result[4];
            var HNmonvalue = total_result[5];
            var FJdayvalue = total_result[6];
            var FJmonvalue = total_result[7];
            var YNdayvalue = total_result[8];
            var YNmonvalue = total_result[9];
            var GXdayvalue = total_result[10];
            var GXmonvalue = total_result[11];
            var GZdayvalue = total_result[12];
            var GZmonvalue = total_result[13];
            var SCdayvalue = total_result[14];
            var SCmonvalue = total_result[15];
            var GSdayvalue = total_result[16];
            var GSmonvalue = total_result[17];
            var XJdayvalue = total_result[18];
            var XJmonvalue = total_result[19];
            var HWdayvalue = total_result[20];
            var HWmonvalue = total_result[21];

            var data = [
                {name: "浙江", value: ZJdayvalue},
                {name: "江西", value: JXdayvalue},
                {name: "湖南", value: HNdayvalue},
                {name: "福建", value: FJdayvalue},
                {name: "云南", value: YNdayvalue},
                {name: "广西", value: GXdayvalue},
                {name: "贵州", value: GZdayvalue},
                {name: "四川", value: SCdayvalue},
                {name: "甘肃", value: GSdayvalue},
                {name: "新疆", value: XJdayvalue},
                {name: "老挝", value: HWdayvalue},
            ];

            var totaldayvalue = ZJdayvalue + JXdayvalue + HNdayvalue + FJdayvalue + YNdayvalue + GXdayvalue + GZdayvalue + SCdayvalue + GSdayvalue + XJdayvalue + HWdayvalue;
            var totalmonvalue = ZJmonvalue + JXmonvalue + HNmonvalue + FJmonvalue + YNmonvalue + GXmonvalue + GZmonvalue + SCmonvalue + GSmonvalue + XJmonvalue + HWmonvalue;

            var totaldayout = document.getElementById("totaldayout");
            totaldayout.innerText = returnVaule(totaldayvalue/10000);

            var totalmonout = document.getElementById("totalmonout");
            totalmonout.innerText = returnVaule(totalmonvalue/10000);

            var finishgoal =542.5;//18.12_560//19.01_542.5
            var finishdata = returnVaule(totalmonvalue/10000);
            var unfinish = returnVaule(finishgoal-finishdata);
            var finishrate = returnVaule((finishdata/finishgoal)*100);

            showFinishchart1(finishgoal,finishdata,unfinish,finishrate);


            var covalue_Score = {
                codata: [
                    {name: "兰溪一线",value:90},
                    //{name: "兰溪二线",value: sysZJLX_K2.煤磨煤耗1},
                    //{name: "兰溪三线",value: sysZJLX_K3.煤磨煤耗1},
                    {name: "青龙山",value:80},
                    {name: "建德一线",value:86},
                    //{name: "建德二线",value: sysHZJD_K2.煤磨煤耗1},
                    //{name: "桐庐红狮",value: sysHZTL_K1.煤磨煤耗1},
                    {name: "高安一线",value:83},
                   // {name: "高安二线",value: sysJXGA_K2.煤磨煤耗1},
                    {name: "会昌红狮",value:75},
                    {name: "衡阳红狮",value:78},
                    {name: "宁远莲花",value:73},
                    {name: "永州红狮",value:96},
                    {name: "江西鹰鹏",value:85},
                    {name: "漳平一线",value:60},
                    //{name: "漳平二线",value: sysFJZP_K2.煤磨煤耗1},
                    //{name: "漳平三期",value: sysFJZP_K3.煤磨煤耗1},
                    {name: "大田红狮",value: 69},
                    {name: "宜良一线",value:81},
                   // {name: "宜良二线",value: sysYNYL_K2.煤磨煤耗1},
                    {name: "崇左红狮",value:89},
                    {name: "茂鑫红狮",value:79},
                    //{name: "南宁红狮",value: sysYNNN_K1.煤磨煤耗1},
                    //{name: "龙里一线",value: sysYNLL_K1.煤磨煤耗1},
                    //{name: "龙里二线",value: sysYNLL_K2.煤磨煤耗1},
                    //{name: "广西恒庆",value: sysYNHQ_K1.coal_consum},
                    //{name: "无量山",value: sysYNWLS_K1.coal_consum},
                    //{name: "邻水一线",value: sysSCLS_K1.煤磨煤耗1},
                    //{name: "邻水二线",value: sysSCLS_K2.煤磨煤耗1},
                    // {name: "江油红狮",value: sysSCJY_K1.煤磨煤耗1},
                    // {name: "长宁红狮",value: sysSCCN_K1.煤磨煤耗1},
                    // {name: "库车红狮",value: sysJTKC_K1.煤磨煤耗1},
                    // {name: "兰州红狮",value: sysJTLZ_K1.煤磨煤耗1},
                    // {name: "老挝万象",value: sysHWWX_K1.coal_consum},
                    // {name: "尼泊尔希望",value: sysHWXW_K1.coal_consum}
                ]
            };

            var lowScoresysArr= new Array();
            for(var i=0;i<covalue_Score.codata.length;i++) {
                if(covalue_Score.codata[i].value<80){
                    lowScoresysArr.push({name:covalue_Score.codata[i].name,value:covalue_Score.codata[i].value});
                }
            }

            showmapChart(data,toolTipData,stopBurningsysArr,coaluseHighsysArr,tsLowsysArr);
            // console.log("stopBurningsysArr:",stopBurningsysArr)

        }
    }
    xmlhttp.open("GET","process.do?process=fired&method=FiredRD",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=FiredRD",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    mapbox_t = setInterval(burning_data_flush,3000);
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

function twoArrayUn(array1,array2){

    var tempArray1 = [];
    var tempArray2 = [];

    for(var i=0;i<array2.length;i++){
        tempArray1[array2[i].name]=true;
    }
    // for(var i=0;i<array1.length;i++){
    //     if(!tempArray1[array1[i].name]){
    //         tempArray2.push(array1[i]);//过滤array1 中与array2 相同的元素；
    //     }
    // }
    for(var i=0;i<array1.length;i++){
        if(tempArray1[array1[i].name]){
            tempArray2.push(array1[i]);//array1 中与array2 相同的元素；
        }
    }
    return tempArray2;
}
