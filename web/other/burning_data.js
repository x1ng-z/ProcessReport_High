
/*----------------------------详情界面跳转-------------------------------------*/

var objWinBurning_Frame;

function burning_frame(){

    var target = "Burning_Frame.html";
    if (objWinBurning_Frame == null || objWinBurning_Frame.closed) {
        objWinBurning_Frame = window.open(target);
    } else {
        objWinBurning_Frame.location.replace(target);
    }
}

/*----------------------------数据获取及刷新----------------------------------*/

var mapbox_t;

function burning_data_flush() {
    clearInterval(mapbox_t);

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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
            /*
                        var covalue_run = {
                            codata: [
                                {name: "sysZJLX_K1", name_ch: "兰溪一线", elcdata: sysZJLX_K1.回转窑.电流1},
                                {name: "sysZJLX_K2", name_ch: "兰溪二线", elcdata: sysZJLX_K2.回转窑.电流1},
                                {name: "sysZJLX_K3", name_ch: "兰溪三线", elcdata: sysZJLX_K3.回转窑.电流1},
                                // {name: "sysZJQL_K1", name_ch: "青龙山", elcdata: sysZJQL_K1.回转窑.电流1},
                                {name: "sysHZJD_K1", name_ch: "建德一线", elcdata: sysHZJD_K1.回转窑.电流1},
                                {name: "sysHZJD_K2", name_ch: "建德二线", elcdata: sysHZJD_K2.回转窑.电流1},
                                {name: "sysHZTL_K1", name_ch: "桐庐红狮", elcdata: sysHZTL_K1.回转窑.电流1},
                                {name: "sysJXGA_K1", name_ch: "高安一线", elcdata: sysJXGA_K1.回转窑.电流1},
                                {name: "sysJXGA_K2", name_ch: "高安二线", elcdata: sysJXGA_K2.回转窑.电流1},
                                {name: "sysJXHC_K1", name_ch: "会昌红狮", elcdata: sysJXHC_K1.回转窑.电流1},
                                {name: "sysJXHY_K1", name_ch: "衡阳红狮", elcdata: sysJXHY_K1.回转窑.电流1},
                                {name: "sysJXNY_K1", name_ch: "宁远莲花", elcdata: sysJXNY_K1.回转窑.电流1},
                                {name: "sysJXYZ_K1", name_ch: "永州红狮", elcdata: (sysJXYZ_K1.回转窑.电流1+sysJXYZ_K1.回转窑.电流2)/2},
                                {name: "sysJXYP_K1", name_ch: "江西鹰鹏", elcdata: (sysJXYP_K1.回转窑.电流1+sysJXYP_K1.回转窑.电流2)/2},
                                {name: "sysFJZP_K1", name_ch: "漳平一线", elcdata: sysFJZP_K1.回转窑.电流1},
                                {name: "sysFJZP_K2", name_ch: "漳平二线", elcdata: sysFJZP_K2.回转窑.电流1},
                                {name: "sysFJZP_K3", name_ch: "漳平三期", elcdata: (sysFJZP_K3.回转窑.电流1+sysFJZP_K3.回转窑.电流2)/2},
                                {name: "sysFJDT_K1", name_ch: "大田红狮", elcdata: sysFJDT_K1.回转窑.电流1},
                                {name: "sysYNYL_K1", name_ch: "宜良一线", elcdata: sysYNYL_K1.回转窑.电流1},
                                {name: "sysYNYL_K2", name_ch: "宜良二线", elcdata: sysYNYL_K2.回转窑.电流1},
                                {name: "sysYNCZ_K1", name_ch: "崇左红狮", elcdata: (sysYNCZ_K1.回转窑.电流1+sysYNCZ_K1.回转窑.电流2)/2},
                                {name: "sysYNMX_K1", name_ch: "茂鑫红狮", elcdata: sysYNMX_K1.回转窑.电流1},
                                {name: "sysYNNN_K1", name_ch: "南宁红狮", elcdata: sysYNNN_K1.回转窑.电流1},
                                {name: "sysYNLL_K1", name_ch: "龙里一线", elcdata: sysYNLL_K1.回转窑.电流1},
                                {name: "sysYNLL_K2", name_ch: "龙里二线", elcdata: sysYNLL_K2.回转窑.电流1},
                                {name: "sysYNHQ_K1", name_ch: "广西恒庆", elcdata: sysYNHQ_K1.回转窑.电流1},
                                {name: "sysSCLS_K1", name_ch: "邻水一线", elcdata: sysSCLS_K1.回转窑.电流1},
                                {name: "sysSCLS_K2", name_ch: "邻水二线", elcdata: sysSCLS_K2.回转窑.电流1},
                                {name: "sysSCJY_K1", name_ch: "江油红狮", elcdata: sysSCJY_K1.回转窑.电流1},
                                {name: "sysSCCN_K1", name_ch: "长宁红狮", elcdata: sysSCCN_K1.回转窑.电流1},
                                {name: "sysJTKC_K1", name_ch: "库车红狮", elcdata: sysJTKC_K1.回转窑.电流1},
                                {name: "sysJTLZ_K1", name_ch: "兰州红狮", elcdata: sysJTLZ_K1.回转窑.电流1},
                                {name: "sysHWWX_K1", name_ch: "老挝万象", elcdata: sysHWWX_K1.回转窑.电流1},
                                {name: "sysHWXW_K1", name_ch: "尼泊尔希望", elcdata: sysHWXW_K1.回转窑.电流1}]
                        };

                        var stopNum = 0;
                        var stopRawsysArr = new Array();
                        for (var i = 0; i < covalue_run.codata.length; i++) {

                            if (covalue_run.codata[i].elcdata <= 10) {
                                stopNum++;
                                stopRawsysArr.push(covalue_run.codata[i].name_ch);
                            }
                        }


                        var allNum = covalue_run.codata.length;
                        var runNum = allNum - stopNum;

                        showRunchart(runNum, allNum, stopNum);

            */
            /*------------------熟料产量map数据-------------------------------*/

            var toolTipData = [
                {name: "浙江", value: [
                        {name: "兰溪一线", dayvalue: sysZJLX_K1.day_output, monvalue: sysZJLX_K1.month_output},
                        {name: "兰溪二线", dayvalue: sysZJLX_K2.day_output, monvalue: sysZJLX_K2.month_output},
                        {name: "兰溪三线", dayvalue: sysZJLX_K3.day_output, monvalue: sysZJLX_K3.month_output},
                        // {name: "青龙山", dayvalue: sysZJQL_K1.day_output, monvalue: sysZJQL_K1.month_output},
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
                        {name: "宜良二线", dayvalue: sysYNYL_K2.day_output, monvalue: sysYNYL_K2.month_output}]
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
            totaldayout.innerText = Math.round(totaldayvalue * 100) / 100;

            var totalmonout = document.getElementById("totalmonout");
            totalmonout.innerText = Math.round(totalmonvalue * 100) / 100;

            showmapChart(data, toolTipData);


  /*------------------集团及子公司熟料台时数据-------------------------------*/
/*
            var covalue_ts = {
                codata: [
                    {name: "sysZJLX_K1", name_ch: "兰溪一线", value: sysZJLX_K1.回转窑.台时1},
                    {name: "sysZJLX_K2", name_ch: "兰溪二线", value: sysZJLX_K2.回转窑.台时1},
                    {name: "sysZJLX_K3", name_ch: "兰溪三线", value: sysZJLX_K3.回转窑.台时1},
                    // {name: "sysZJQL_K1", name_ch: "青龙山", value: sysZJQL_K1.回转窑.台时1},
                    {name: "sysHZJD_K1", name_ch: "建德一线", value: sysHZJD_K1.回转窑.台时1},
                    {name: "sysHZJD_K2", name_ch: "建德二线", value: sysHZJD_K2.回转窑.台时1},
                    {name: "sysHZTL_K1", name_ch: "桐庐红狮", value: sysHZTL_K1.回转窑.台时1},
                    {name: "sysJXGA_K1", name_ch: "高安一线", value: sysJXGA_K1.回转窑.台时1+sysJXGA_K1.回转窑.台时2},
                    {name: "sysJXGA_K2", name_ch: "高安二线", value: sysJXGA_K2.回转窑.台时1+sysJXGA_K2.回转窑.台时2},
                    {name: "sysJXHC_K1", name_ch: "会昌红狮", value: sysJXHC_K1.回转窑.台时1+sysJXHC_K1.回转窑.台时2},
                    {name: "sysJXHY_K1", name_ch: "衡阳红狮", value: sysJXHY_K1.回转窑.台时1},
                    {name: "sysJXNY_K1", name_ch: "宁远莲花", value: sysJXNY_K1.回转窑.台时1},
                    {name: "sysJXYZ_K1", name_ch: "永州红狮", value: sysJXYZ_K1.回转窑.台时1+sysJXYZ_K1.回转窑.台时2},
                    {name: "sysJXYP_K1", name_ch: "江西鹰鹏", value: sysJXYP_K1.回转窑.台时1+sysJXYP_K1.回转窑.台时2},
                    {name: "sysFJZP_K1", name_ch: "漳平一线", value: sysFJZP_K1.回转窑.台时1+sysFJZP_K1.回转窑.台时2},
                    {name: "sysFJZP_K2", name_ch: "漳平二线", value: sysFJZP_K2.回转窑.台时1+sysFJZP_K2.回转窑.台时2},
                    {name: "sysFJZP_K3", name_ch: "漳平三期", value: sysFJZP_K3.回转窑.台时1},
                    {name: "sysFJDT_K1", name_ch: "大田红狮", value: sysFJDT_K1.回转窑.台时1},
                    {name: "sysYNYL_K1", name_ch: "宜良一线", value: sysYNYL_K1.回转窑.台时1+sysYNYL_K1.回转窑.台时2},
                    {name: "sysYNYL_K2", name_ch: "宜良二线", value: sysYNYL_K2.回转窑.台时1},
                    {name: "sysYNCZ_K1", name_ch: "崇左红狮", value: sysYNCZ_K1.回转窑.台时1+sysYNCZ_K1.回转窑.台时2},
                    {name: "sysYNMX_K1", name_ch: "茂鑫红狮", value: sysYNMX_K1.回转窑.台时1+sysYNMX_K1.回转窑.台时2},
                    {name: "sysYNNN_K1", name_ch: "南宁红狮", value: sysYNNN_K1.回转窑.台时1},
                    {name: "sysYNLL_K1", name_ch: "龙里一线", value: sysYNLL_K1.回转窑.台时1+sysYNLL_K1.回转窑.台时2},
                    {name: "sysYNLL_K2", name_ch: "龙里二线", value: sysYNLL_K2.回转窑.台时1+sysYNLL_K2.回转窑.台时2},
                    {name: "sysYNHQ_K1", name_ch: "广西恒庆", value: sysYNHQ_K1.回转窑.台时1+sysYNHQ_K1.回转窑.台时2},
                    {name: "sysSCLS_K1", name_ch: "邻水一线", value: sysSCLS_K1.回转窑.台时1},
                    {name: "sysSCLS_K2", name_ch: "邻水二线", value: sysSCLS_K2.回转窑.台时1},
                    {name: "sysSCJY_K1", name_ch: "江油红狮", value: sysSCJY_K1.回转窑.台时1+sysSCJY_K1.回转窑.台时2},
                    {name: "sysSCCN_K1", name_ch: "长宁红狮", value: sysSCCN_K1.回转窑.台时1},
                    {name: "sysJTKC_K1", name_ch: "库车红狮", value: sysJTKC_K1.回转窑.台时1+sysJTKC_K1.回转窑.台时2},
                    {name: "sysJTLZ_K1", name_ch: "兰州红狮", value: sysJTLZ_K1.回转窑.台时1+sysJTLZ_K1.回转窑.台时2},
                    {name: "sysHWWX_K1", name_ch: "老挝万象", value: sysHWWX_K1.回转窑.台时1+sysHWWX_K1.回转窑.台时2},
                    {name: "sysHWXW_K1", name_ch: "尼泊尔希望", value: sysHWXW_K1.回转窑.台时1+sysHWXW_K1.回转窑.台时2}]
            };


            var covalue_ts_dataArr= new Array();
            for(var i=0;i<covalue_ts.codata.length;i++) {
                if(covalue_ts.codata[i].value>0){
                    covalue_ts_dataArr.push(covalue_ts.codata[i]);
                }
            }

            function sortValue_ts(a,b){
                return b.value-a.value;
            }
            covalue_ts_dataArr.sort(sortValue_ts);

            var total_ts = 0;
            for(var i=0;i<covalue_ts_dataArr.length;i++){
                total_ts += covalue_ts_dataArr[i].value;
            }

            var allStaout = document.getElementById('allStaout');
            allStaout.innerText = Math.round(total_ts*100)/100;

            var x_ts = [covalue_ts_dataArr[0].value,covalue_ts_dataArr[1].value,covalue_ts_dataArr[2].value,
                covalue_ts_dataArr[covalue_ts_dataArr.length-3].value,covalue_ts_dataArr[covalue_ts_dataArr.length-2].value,covalue_ts_dataArr[covalue_ts_dataArr.length-1].value];
            var y_ts = [covalue_ts_dataArr[0].name,covalue_ts_dataArr[1].name,covalue_ts_dataArr[2].name,
                covalue_ts_dataArr[covalue_ts_dataArr.length-3].name,covalue_ts_dataArr[covalue_ts_dataArr.length-2].name,covalue_ts_dataArr[covalue_ts_dataArr.length-1].name,];
            var de_ts = x_ts;

            showChartbox1(x_ts,y_ts,de_ts);
*/

 /*------------------集团及子公司熟料煤耗数据-------------------------------*/

            var covalue_Coaluse = {
                codata: [
                    {name: "sysZJLX_K1", name_ch: "兰溪一线", value: sysZJLX_K1.coal_consum},
                    {name: "sysZJLX_K2", name_ch: "兰溪二线", value: sysZJLX_K2.coal_consum},
                    {name: "sysZJLX_K3", name_ch: "兰溪三线", value: sysZJLX_K3.coal_consum},
                    // {name: "sysZJQL_K1", name_ch: "青龙山", value: sysZJQL_K1.coal_consum},
                    {name: "sysHZJD_K1", name_ch: "建德一线", value: sysHZJD_K1.coal_consum},
                    {name: "sysHZJD_K2", name_ch: "建德二线", value: sysHZJD_K2.coal_consum},
                    {name: "sysHZTL_K1", name_ch: "桐庐红狮", value: sysHZTL_K1.coal_consum},
                    {name: "sysJXGA_K1", name_ch: "高安一线", value: sysJXGA_K1.coal_consum},
                    {name: "sysJXGA_K2", name_ch: "高安二线", value: sysJXGA_K2.coal_consum},
                    {name: "sysJXHC_K1", name_ch: "会昌红狮", value: sysJXHC_K1.coal_consum},
                    {name: "sysJXHY_K1", name_ch: "衡阳红狮", value: sysJXHY_K1.coal_consum},
                    {name: "sysJXNY_K1", name_ch: "宁远莲花", value: sysJXNY_K1.coal_consum},
                    {name: "sysJXYZ_K1", name_ch: "永州红狮", value: sysJXYZ_K1.coal_consum},
                    {name: "sysJXYP_K1", name_ch: "江西鹰鹏", value: sysJXYP_K1.coal_consum},
                    {name: "sysFJZP_K1", name_ch: "漳平一线", value: sysFJZP_K1.coal_consum},
                    {name: "sysFJZP_K2", name_ch: "漳平二线", value: sysFJZP_K2.coal_consum},
                    {name: "sysFJZP_K3", name_ch: "漳平三期", value: sysFJZP_K3.coal_consum},
                    {name: "sysFJDT_K1", name_ch: "大田红狮", value: sysFJDT_K1.coal_consum},
                    {name: "sysYNYL_K1", name_ch: "宜良一线", value: sysYNYL_K1.coal_consum},
                    {name: "sysYNYL_K2", name_ch: "宜良二线", value: sysYNYL_K2.coal_consum},
                    {name: "sysYNCZ_K1", name_ch: "崇左红狮", value: sysYNCZ_K1.coal_consum},
                    {name: "sysYNMX_K1", name_ch: "茂鑫红狮", value: sysYNMX_K1.coal_consum},
                    {name: "sysYNNN_K1", name_ch: "南宁红狮", value: sysYNNN_K1.coal_consum},
                    {name: "sysYNLL_K1", name_ch: "龙里一线", value: sysYNLL_K1.coal_consum},
                    {name: "sysYNLL_K2", name_ch: "龙里二线", value: sysYNLL_K2.coal_consum},
                    {name: "sysYNHQ_K1", name_ch: "广西恒庆", value: sysYNHQ_K1.coal_consum},
                    {name: "sysSCLS_K1", name_ch: "邻水一线", value: sysSCLS_K1.coal_consum},
                    {name: "sysSCLS_K2", name_ch: "邻水二线", value: sysSCLS_K2.coal_consum},
                    {name: "sysSCJY_K1", name_ch: "江油红狮", value: sysSCJY_K1.coal_consum},
                    {name: "sysSCCN_K1", name_ch: "长宁红狮", value: sysSCCN_K1.coal_consum},
                    {name: "sysJTKC_K1", name_ch: "库车红狮", value: sysJTKC_K1.coal_consum},
                    {name: "sysJTLZ_K1", name_ch: "兰州红狮", value: sysJTLZ_K1.coal_consum},
                    {name: "sysHWWX_K1", name_ch: "老挝万象", value: sysHWWX_K1.coal_consum},
                    {name: "sysHWXW_K1", name_ch: "尼泊尔希望", value: sysHWXW_K1.coal_consum}]
            };


            var covalue_Coaluse_dataArr= new Array();
            for(var i=0;i<covalue_Coaluse.codata.length;i++) {
                if(covalue_Coaluse.codata[i].value>0){
                    covalue_Coaluse_dataArr.push(covalue_Coaluse.codata[i]);
                }
            }

            function sortValue_Coaluse(a,b){
                return b.value-a.value;
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
                covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-3].name,covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-2].name,covalue_Coaluse_dataArr[covalue_Coaluse_dataArr.length-1].name,];

            showChartbox2(x_Coaluse,y_Coaluse);


 /*------------------集团及子公司熟料游离钙数据-------------------------------*/

            var covalue_f_Cao = {
                codata: [
                    {name: "sysZJLX_K1", name_ch: "兰溪一线", value: sysZJLX_K1.fcao},
                    {name: "sysZJLX_K2", name_ch: "兰溪二线", value: sysZJLX_K2.fcao},
                    {name: "sysZJLX_K3", name_ch: "兰溪三线", value: sysZJLX_K3.fcao},
                    // {name: "sysZJQL_K1", name_ch: "青龙山", value: sysZJQL_K1.fcao},
                    {name: "sysHZJD_K1", name_ch: "建德一线", value: sysHZJD_K1.fcao},
                    {name: "sysHZJD_K2", name_ch: "建德二线", value: sysHZJD_K2.fcao},
                    {name: "sysHZTL_K1", name_ch: "桐庐红狮", value: sysHZTL_K1.fcao},
                    {name: "sysJXGA_K1", name_ch: "高安一线", value: sysJXGA_K1.fcao},
                    {name: "sysJXGA_K2", name_ch: "高安二线", value: sysJXGA_K2.fcao},
                    {name: "sysJXHC_K1", name_ch: "会昌红狮", value: sysJXHC_K1.fcao},
                    {name: "sysJXHY_K1", name_ch: "衡阳红狮", value: sysJXHY_K1.fcao},
                    {name: "sysJXNY_K1", name_ch: "宁远莲花", value: sysJXNY_K1.fcao},
                    {name: "sysJXYZ_K1", name_ch: "永州红狮", value: sysJXYZ_K1.fcao},
                    {name: "sysJXYP_K1", name_ch: "江西鹰鹏", value: sysJXYP_K1.fcao},
                    {name: "sysFJZP_K1", name_ch: "漳平一线", value: sysFJZP_K1.fcao},
                    {name: "sysFJZP_K2", name_ch: "漳平二线", value: sysFJZP_K2.fcao},
                    {name: "sysFJZP_K3", name_ch: "漳平三期", value: sysFJZP_K3.fcao},
                    {name: "sysFJDT_K1", name_ch: "大田红狮", value: sysFJDT_K1.fcao},
                    {name: "sysYNYL_K1", name_ch: "宜良一线", value: sysYNYL_K1.fcao},
                    {name: "sysYNYL_K2", name_ch: "宜良二线", value: sysYNYL_K2.fcao},
                    {name: "sysYNCZ_K1", name_ch: "崇左红狮", value: sysYNCZ_K1.fcao},
                    {name: "sysYNMX_K1", name_ch: "茂鑫红狮", value: sysYNMX_K1.fcao},
                    {name: "sysYNNN_K1", name_ch: "南宁红狮", value: sysYNNN_K1.fcao},
                    {name: "sysYNLL_K1", name_ch: "龙里一线", value: sysYNLL_K1.fcao},
                    {name: "sysYNLL_K2", name_ch: "龙里二线", value: sysYNLL_K2.fcao},
                    {name: "sysYNHQ_K1", name_ch: "广西恒庆", value: sysYNHQ_K1.fcao},
                    {name: "sysSCLS_K1", name_ch: "邻水一线", value: sysSCLS_K1.fcao},
                    {name: "sysSCLS_K2", name_ch: "邻水二线", value: sysSCLS_K2.fcao},
                    {name: "sysSCJY_K1", name_ch: "江油红狮", value: sysSCJY_K1.fcao},
                    {name: "sysSCCN_K1", name_ch: "长宁红狮", value: sysSCCN_K1.fcao},
                    {name: "sysJTKC_K1", name_ch: "库车红狮", value: sysJTKC_K1.fcao},
                    {name: "sysJTLZ_K1", name_ch: "兰州红狮", value: sysJTLZ_K1.fcao},
                    {name: "sysHWWX_K1", name_ch: "老挝万象", value: sysHWWX_K1.fcao},
                    {name: "sysHWXW_K1", name_ch: "尼泊尔希望", value: sysHWXW_K1.fcao}]
            };


            var covalue_f_Cao_dataArr= new Array();
            for(var i=0;i<covalue_f_Cao.codata.length;i++) {
                if(covalue_f_Cao.codata[i].value>0){
                    covalue_f_Cao_dataArr.push(covalue_f_Cao.codata[i]);
                }
            }

            function sortValue_f_Cao(a,b){
                return b.value-a.value;
            }
            covalue_f_Cao_dataArr.sort(sortValue_f_Cao);

            var total_f_Cao = 0;
            for(var i=0;i<covalue_f_Cao_dataArr.length;i++){
                total_f_Cao += covalue_f_Cao_dataArr[i].value;
            }

            var avef_Cao = document.getElementById('avef_Cao');
            var avedata_f_Cao = total_Coaluse/covalue_f_Cao_dataArr.length;
            avef_Cao.innerText = Math.round(avedata_f_Cao*100)/100;

            var y_f_Cao = [covalue_f_Cao_dataArr[0].value,covalue_f_Cao_dataArr[1].value,covalue_f_Cao_dataArr[2].value,
                covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-3].value,covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-2].value,covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-1].value];
            var x_f_Cao = [covalue_f_Cao_dataArr[0].name,covalue_f_Cao_dataArr[1].name,covalue_f_Cao_dataArr[2].name,
                covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-3].name,covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-2].name,covalue_f_Cao_dataArr[covalue_f_Cao_dataArr.length-1].name,];

            showChartbox3(x_f_Cao,y_f_Cao);



 /*------------------集团及子公司熟料饱和比数据-------------------------------*/

            var covalue_Saturat = {
                codata: [
                    {name: "sysZJLX_K1", name_ch: "兰溪一线", value: sysZJLX_K1.kh},
                    {name: "sysZJLX_K2", name_ch: "兰溪二线", value: sysZJLX_K2.kh},
                    {name: "sysZJLX_K3", name_ch: "兰溪三线", value: sysZJLX_K3.kh},
                    // {name: "sysZJQL_K1", name_ch: "青龙山", value: sysZJQL_K1.kh},
                    {name: "sysHZJD_K1", name_ch: "建德一线", value: sysHZJD_K1.kh},
                    {name: "sysHZJD_K2", name_ch: "建德二线", value: sysHZJD_K2.kh},
                    {name: "sysHZTL_K1", name_ch: "桐庐红狮", value: sysHZTL_K1.kh},
                    {name: "sysJXGA_K1", name_ch: "高安一线", value: sysJXGA_K1.kh},
                    {name: "sysJXGA_K2", name_ch: "高安二线", value: sysJXGA_K2.kh},
                    {name: "sysJXHC_K1", name_ch: "会昌红狮", value: sysJXHC_K1.kh},
                    {name: "sysJXHY_K1", name_ch: "衡阳红狮", value: sysJXHY_K1.kh},
                    {name: "sysJXNY_K1", name_ch: "宁远莲花", value: sysJXNY_K1.kh},
                    {name: "sysJXYZ_K1", name_ch: "永州红狮", value: sysJXYZ_K1.kh},
                    {name: "sysJXYP_K1", name_ch: "江西鹰鹏", value: sysJXYP_K1.kh},
                    {name: "sysFJZP_K1", name_ch: "漳平一线", value: sysFJZP_K1.kh},
                    {name: "sysFJZP_K2", name_ch: "漳平二线", value: sysFJZP_K2.kh},
                    {name: "sysFJZP_K3", name_ch: "漳平三期", value: sysFJZP_K3.kh},
                    {name: "sysFJDT_K1", name_ch: "大田红狮", value: sysFJDT_K1.kh},
                    {name: "sysYNYL_K1", name_ch: "宜良一线", value: sysYNYL_K1.kh},
                    {name: "sysYNYL_K2", name_ch: "宜良二线", value: sysYNYL_K2.kh},
                    {name: "sysYNCZ_K1", name_ch: "崇左红狮", value: sysYNCZ_K1.kh},
                    {name: "sysYNMX_K1", name_ch: "茂鑫红狮", value: sysYNMX_K1.kh},
                    {name: "sysYNNN_K1", name_ch: "南宁红狮", value: sysYNNN_K1.kh},
                    {name: "sysYNLL_K1", name_ch: "龙里一线", value: sysYNLL_K1.kh},
                    {name: "sysYNLL_K2", name_ch: "龙里二线", value: sysYNLL_K2.kh},
                    {name: "sysYNHQ_K1", name_ch: "广西恒庆", value: sysYNHQ_K1.kh},
                    {name: "sysSCLS_K1", name_ch: "邻水一线", value: sysSCLS_K1.kh},
                    {name: "sysSCLS_K2", name_ch: "邻水二线", value: sysSCLS_K2.kh},
                    {name: "sysSCJY_K1", name_ch: "江油红狮", value: sysSCJY_K1.kh},
                    {name: "sysSCCN_K1", name_ch: "长宁红狮", value: sysSCCN_K1.kh},
                    {name: "sysJTKC_K1", name_ch: "库车红狮", value: sysJTKC_K1.kh},
                    {name: "sysJTLZ_K1", name_ch: "兰州红狮", value: sysJTLZ_K1.kh},
                    {name: "sysHWWX_K1", name_ch: "老挝万象", value: sysHWWX_K1.kh},
                    {name: "sysHWXW_K1", name_ch: "尼泊尔希望", value: sysHWXW_K1.kh}]
            };


            var covalue_Saturat_dataArr= new Array();
            for(var i=0;i<covalue_Saturat.codata.length;i++) {
                if(covalue_Saturat.codata[i].value>0){
                    covalue_Saturat_dataArr.push(covalue_Saturat.codata[i]);
                }
            }

            function sortValue_Saturat(a,b){
                return b.value-a.value;
            }
            covalue_Saturat_dataArr.sort(sortValue_Saturat);

            var total_Saturat = 0;
            for(var i=0;i<covalue_Saturat_dataArr.length;i++){
                total_Saturat += covalue_Saturat_dataArr[i].value;
            }

            var aveSaturat = document.getElementById('aveSaturat');
            var avedata_Saturat = total_Coaluse/covalue_Saturat_dataArr.length;
            aveSaturat.innerText = Math.round(avedata_Saturat*100)/100;

            var y_Saturat = [covalue_Saturat_dataArr[0].value,covalue_Saturat_dataArr[1].value,covalue_Saturat_dataArr[2].value,
                covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-3].value,covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-2].value,covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-1].value];
            var x_Saturat = [covalue_Saturat_dataArr[0].name,covalue_Saturat_dataArr[1].name,covalue_Saturat_dataArr[2].name,
                covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-3].name,covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-2].name,covalue_Saturat_dataArr[covalue_Saturat_dataArr.length-1].name,];

            showChartbox4(x_Saturat,y_Saturat);


        }
        // xmlhttp.open("GET","process.do?method=RD&process=raw",true);
        // xmlhttp.open("GET", "http://172.16.22.107:8079/process.do?process=fired&method=FiredRD", true);
        xmlhttp.open("GET", "http://192.168.10.212:8080/Process/process.do?method=RD&process=raw", true);
        xmlhttp.overrideMimeType('text/json; charset=utf-8');
        xmlhttp.send();

        mapbox_t = setInterval(burning_data_flush, 5000);
    }
}






// function burning_data_flush_test() {
//
//     var jsonObject = {data:
//             {"ZJLX_K1":
//                 {"回转窑":{"电流1":800,"转速1":4.0,"台时1":180},"C1出口":{"负压1":-5150,"负压2":-5316,"温度1":355,"温度2":338,}},
//              "ZJLX_K2":
//                  {"回转窑":{"电流1":900,"转速1":4.2,"台时1":170},"C1出口":{"负压1":-5250,"负压2":-5116,"温度1":345,"温度2":348,}},
//              "ZJLX_K3":
//                  {"回转窑":{"电流1":1000,"转速1":4.4,"台时1":360},"C1出口":{"负压1":-5210,"负压2":-5216,"温度1":356,"温度2":358,}},
//              "HZJD_K1":
//                  {"回转窑":{"电流1":800,"转速1":4.0,"台时1":370},"C1出口":{"负压1":-5150,"负压2":-5316,"温度1":355,"温度2":338,}},
//              "HZJD_K2":
//                  {"回转窑":{"电流1":900,"转速1":4.2,"台时1":340},"C1出口":{"负压1":-5250,"负压2":-5116,"温度1":345,"温度2":348,}},
//              "HZTL_K1":
//                  {"回转窑":{"电流1":1000,"转速1":4.4,"台时1":320},"C1出口":{"负压1":-5210,"负压2":-5216,"温度1":356,"温度2":358,}}
//     }
//     }
//
//     var dataObj = jsonObject.data;
//
//     var sysZJLX_K1 = dataObj.ZJLX_K1;
//     var sysZJLX_K2 = dataObj.ZJLX_K2;
//     var sysZJLX_K3 = dataObj.ZJLX_K3;
//     var sysHZJD_K1 = dataObj.HZJD_K1;
//     var sysHZJD_K2 = dataObj.HZJD_K2;
//     var sysHZTL_K1 = dataObj.HZTL_K1;
//
//
//     var covalue_run = {
//         codata: [
//             {name: "sysZJLX_K1", name_ch: "兰溪一线", elcdata: sysZJLX_K1.回转窑.电流1},
//             {name: "sysZJLX_K2", name_ch: "兰溪二线", elcdata: sysZJLX_K2.回转窑.电流1},
//             {name: "sysZJLX_K3", name_ch: "兰溪三线", elcdata: sysZJLX_K3.回转窑.电流1},
//             {name: "sysHZJD_K1", name_ch: "建德一线", elcdata: sysHZJD_K1.回转窑.电流1},
//             {name: "sysHZJD_K2", name_ch: "建德二线", elcdata: sysHZJD_K2.回转窑.电流1},
//             {name: "sysHZTL_K1", name_ch: "桐庐红狮", elcdata: sysHZTL_K1.回转窑.电流1},
//          ]
//     };

    // console.log("covalue_run:",covalue_run);

// }




