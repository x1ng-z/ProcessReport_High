let data_t2;
function apc_simpledata_flush(){
    clearInterval(data_t2);
    apc_pyro_dataSimple();
    data_t2 =setInterval(apc_simpledata_flush,30*1000);
}

function apc_pyro_dataSimple() {
    let xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            let jsonObject = JSON.parse(xmlhttp.responseText);

            let raw_data =apc_raw_dataRequest();

//兰溪一线
            let sysZJLX_K1 = jsonObject.data.ZJLX_K1;
            let zjlx1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysZJLX_K1),apc_looprate_fired("ZJLX","L1_FTemp_AT")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysZJLX_K1),apc_looprate_fired("ZJLX","L1_BLJ1_AT")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//兰溪二线
            let sysZJLX_K2 = jsonObject.data.ZJLX_K2;
            let zjlx2_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//兰溪三线
            let sysZJLX_K3 = jsonObject.data.ZJLX_K3;
            let zjlx3_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//建德一线
            let sysHZJD_K1 = jsonObject.data.HZJD_K1;
            let hzjd1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//建德二线
            let sysHZJD_K2 = jsonObject.data.HZJD_K2;
            let hzjd2_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//桐庐红狮
            let sysHZTL_K1 = jsonObject.data.HZTL_K1;
            let hztl1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//高安一线
            let sysJXGA_K1 = jsonObject.data.JXGA_K1;
            let jxga1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJXGA_K1), apc_looprate_fired("JXGA","L1Ftemp_AUTO")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysJXGA_K1),apc_looprate_fired("JXGA","L1Gcool_AUTO")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//高安二线
            let sysJXGA_K2 = jsonObject.data.JXGA_K2;
            let jxga2_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJXGA_K2),apc_looprate_fired("JXGA","L2Ftemp_AUTO")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysJXGA_K2),apc_looprate_fired("JXGA","L2Gcool_AUTO")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//会昌红狮
            let sysJXHC_K1 = jsonObject.data.JXHC_K1;
            let jxhc_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJXHC_K1),apc_looprate_fired("JXHC","Ftemp_auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysJXHC_K1),apc_looprate_fired("JXHC","Gcool_auto")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//江西鹰鹏
            let sysJXYP_K1 = jsonObject.data.JXYP_K1;
            let jxyp_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJXYP_K1),apc_looprate_fired("JXYP","Ftemp_Auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//衡阳红狮
            let sysJXHY_K1 = jsonObject.data.JXHY_K1;
            let jxhy_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJXHY_K1),apc_looprate_fired("JXHC","Ftemp_auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysJXHY_K1),apc_looprate_fired("JXHY","Gcool_auto")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//宁远莲花
            let sysJXNY_K1 = jsonObject.data.JXNY_K1;
            let jxny_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJXNY_K1),apc_looprate_fired("JXNY","Ftemp_Auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:["  "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//永州红狮
            let sysJXYZ_K1 = jsonObject.data.JXYZ_K1;
            let jxyz_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",
                        loopdata:[raw_data[13].loop[0].loopdata[0],raw_data[13].loop[0].loopdata[4]
                        ]},
                        {loopname:"2#磨产量",
                            loopdata:[raw_data[13].loop[1].loopdata[0],raw_data[13].loop[0].loopdata[4]]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",
                        loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJXYZ_K1),apc_looprate_fired("JXYZ","Ftemp_auto")]},
                        {loopname:"头煤",
                            loopdata:[apc_loop_state("窑头喂煤APC头煤",sysJXYZ_K1), apc_looprate_fired("JXYZ","APC_761RS03_AUTO")]},
                        {loopname:"窑速",
                            loopdata:["手动","0%"]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",
                        loopdata:[apc_loop_state("篦冷机APC一段篦速",sysJXYZ_K1),apc_looprate_fired("JXYZ","Gcool_auto")]},
                        {loopname:"二段篦速",
                            loopdata:[apc_loop_state("篦冷机APC二段篦速",sysJXYZ_K1), apc_looprate_fired("JXYZ","S2SP_SW")]},
                        {loopname:"头排",
                            loopdata:[apc_loop_state("头排风机APC头排控制",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_YTP_AUTO")]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",
                        loopdata:[apc_loop_state("煤磨APC产量控制",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_MMCL_AUTO")]},
                        {loopname:"1#磨温度",
                            loopdata:[apc_loop_state("煤磨APC出磨温度",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_MMCL_AUTO")]},
                        {loopname:"2#磨产量",loopdata:["-","-"]},
                        {loopname:"2#磨温度",loopdata:["-","-"]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",
                        loopdata:[
                            apc_loop_state("尾排风机APC尾排控制",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_YWP_AUTO")]},
                        {loopname:"脱硝控制",
                            loopdata:[
                                apc_loop_state("氨水泵APC脱硝",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_TX_AUTO1")]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",
                        loopdata:[
                            apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC高压水位",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_AQC_CVSW1"))]},
                        {loopname:"AQC低压水位",
                            loopdata:[
                                apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC低压水位",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_AQC_CVSW2"))]},
                        {loopname:"SPA水位",
                            loopdata:[
                                apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPA水位APC",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_SP_CVSW1"))]},
                        {loopname:"SPB水位",
                            loopdata:[
                                apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPB水位APC",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_SP_CVSW2"))]},
                        {loopname:"汽机负荷",
                            loopdata:[apc_loop_state("汽轮机505负荷",sysJXYZ_K1),apc_looprate_fired("JXYZ","A_ZKSS505_SW")]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",
                        loopdata:[
                            apc_loop_state("水泥磨1APC产量控制",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM1_AUTO")]},
                        {loopname:"1#下料阀",
                            loopdata:[
                                apc_loop_state("水泥磨1APC下料阀",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM1_SW2")]},
                        {loopname:"2#磨产量",
                            loopdata:[
                                apc_loop_state("水泥磨2APC产量控制",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM2_AUTO")]},
                        {loopname:"2#下料阀",
                            loopdata:[
                                apc_loop_state("水泥磨2APC下料阀",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM2_SW2")]},
                        {loopname:"3#磨产量",
                            loopdata:[
                                apc_loop_state("水泥磨3APC产量控制",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM3_AUTO")]},
                        {loopname:"3#下料阀",
                            loopdata:[
                                apc_loop_state("水泥磨3APC下料阀",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM3_SW2")]},
                        {loopname:"4#磨产量",
                            loopdata:[
                                apc_loop_state("水泥磨4APC产量控制",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM4_AUTO")]},
                        {loopname:"4#下料阀",
                            loopdata:[
                                apc_loop_state("水泥磨4APC下料阀",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM4_SW2")]}
                    ]}
            ];

//漳平一线
            let sysFJZP_K1 = jsonObject.data.FJZP_K1;
            let fjzp1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysFJZP_K1),apc_looprate_fired("FJZP","APC1_FJLAM")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysFJZP_K1),apc_looprate_fired("FJZP","APC1_BLJAM")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//漳平二线
            let sysFJZP_K2 = jsonObject.data.FJZP_K2;
            let fjzp2_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysFJZP_K2),apc_looprate_fired("FJZP","APC_FJLAM2")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysFJZP_K2),apc_looprate_fired("FJZP","APC_BLJAM2")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//漳平三期
            let sysFJZP_K3 = jsonObject.data.FJZP_K3;
            let fjzp3_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",
                        loopdata:[raw_data[16].loop[0].loopdata[0],raw_data[16].loop[0].loopdata[4]]},
                        {loopname:"2#磨产量",
                            loopdata:[raw_data[16].loop[1].loopdata[0],raw_data[16].loop[1].loopdata[4]]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",
                        loopdata:[
                            apc_loop_state("窑尾喂煤APC尾煤",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_WMC_AUTO")]},
                        {loopname:"头煤",
                            loopdata:[
                                apc_loop_state("窑头喂煤APC头煤",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_761RS03_AUTO")]},
                        {loopname:"窑速",
                            loopdata:[
                                apc_loop_state("回转窑APC窑转速",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_461KL01_AUTO")]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",
                        loopdata:[apc_loop_state("篦冷机APC一段篦速",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_BLJ_AUTO1")]},
                        {loopname:"二段篦速",
                            loopdata:[apc_loop_state("篦冷机APC二段篦速",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_BLJ2_AUTO")]},
                        {loopname:"头排",
                            loopdata:[apc_loop_state("头排风机APC头排",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_YTP_AUTO")]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",
                        loopdata:[apc_loop_state("煤磨APC磨产量1",sysFJZP_K3),apc_looprate_fired("FJZP3","Kfeeder1_auto")]},
                        {loopname:"1#磨温度",
                            loopdata:[apc_loop_state("煤磨APC出磨温度1",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_KT1")]},
                        {loopname:"2#磨产量",
                            loopdata:[apc_loop_state("煤磨APC磨产量2",sysFJZP_K3),apc_looprate_fired("FJZP3","Kfeeder2_auto")]},
                        {loopname:"2#磨温度",
                            loopdata:[apc_loop_state("煤磨APC出磨温度2",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_KT2")]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",
                        loopdata:[apc_loop_state("尾排风机APC尾排",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_GCF2_AUTO")]},
                        {loopname:"脱硝控制",
                            loopdata:[apc_loop_state("氨水泵AP脱硝",sysFJZP_K3),apc_looprate_fired("FJZP3","TX_AUTO")]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",
                        loopdata:[apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC高压水位",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_AQC_CVSW1"))]},
                        {loopname:"AQC低压水位",
                            loopdata:[apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC低压水位",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_AQC_CVSW2"))]},
                        {loopname:"SPA水位",
                            loopdata:[apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPA水位APC",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_SP_CVSW1"))]},
                        {loopname:"SPB水位",
                            loopdata:[apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPB水位APC",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_SP_CVSW2"))]},
                        {loopname:"汽机负荷",
                            loopdata:[apc_loop_state("汽轮机505负荷",sysFJZP_K3),apc_looprate_fired("FJZP3","A_ZKSS505_SW")]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:["-","-"]},
                        {loopname:"1#下料阀",loopdata:["-","-"]},
                        {loopname:"2#磨产量",loopdata:["-","-"]},
                        {loopname:"2#下料阀",loopdata:["-","-"]},
                        {loopname:"3#磨产量",loopdata:["-","-"]},
                        {loopname:"3#下料阀",loopdata:["-","-"]},
                        {loopname:"4#磨产量",loopdata:["-","-"]},
                        {loopname:"4#下料阀",loopdata:["-","-"]}
                    ]}
            ];

//大田红狮
            let sysFJDT_K1 = jsonObject.data.FJDT_K1;
            let fjdt_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//邻水一线
            let sysSCLS_K1 = jsonObject.data.SCLS_K1;
            let scls1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//邻水二线
            let sysSCLS_K2 = jsonObject.data.SCLS_K2;
            let scls2_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:["手动","0%"]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//江油红狮
            let sysSCJY_K1 = jsonObject.data.SCJY_K1;
            let scjy_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysSCJY_K1),apc_looprate_fired("SCJY","APC_FJLAM2")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysSCJY_K1),apc_looprate_fired("SCJY","APC_BLJAM2")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//长宁红狮
            let sysSCCN_K1 = jsonObject.data.SCCN_K1;
            let sccn_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysSCCN_K1),apc_looprate_fired("SCCN","Ftemp_AUTO")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysSCCN_K1),apc_looprate_fired("SCCN","Gcool_AUTO")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//宜良一线
            let sysYNYL_K1 = jsonObject.data.YNYL_K1;
            let ynyl1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNYL_K1),apc_looprate_fired("YNYL","FJL_AUTO")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysYNYL_K1),apc_looprate_fired("YNYL","BLJ1_AUTO")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//宜良二线
            let sysYNYL_K2 = jsonObject.data.YNYL_K2;
            let ynyl2_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNYL_K2),apc_looprate_fired("YNYL","L2_FJL_AUTO")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysYNYL_K2),apc_looprate_fired("YNYL","L2_BLJ1_AUTO")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//龙里一线
            let sysYNLL_K1 = jsonObject.data.YNLL_K1;
            let ynll1_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNLL_K1),apc_looprate_fired("YNLL","F1temp_auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//龙里二线
            let sysYNLL_K2 = jsonObject.data.YNLL_K2;
            let ynll2_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNLL_K2),apc_looprate_fired("YNLL","APCC5_AM")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysYNLL_K1),apc_looprate_fired("YNLL","APCBLJ_AM")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//茂鑫红狮
            let sysYNMX_K1 = jsonObject.data.YNMX_K1;
            let ynmx_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNMX_K1),apc_looprate_fired("YNMX","Ftemp_auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//南宁红狮
            let sysYNNN_K1 = jsonObject.data.YNNN_K1;
            let ynnn_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNNN_K1),apc_looprate_fired("YNNN","AM750102")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysYNNN_K1),apc_looprate_fired("YNNN","ZD570202")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//崇左红狮
            let sysYNCZ_K1 = jsonObject.data.YNCZ_K1;
            let yncz_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNCZ_K1),apc_looprate_fired("YNCZ","M7501auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysYNCZ_K1),apc_looprate_fired("YNCZ","BLJYD_auto")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//广西恒庆
            let sysYNHQ_K1 = jsonObject.data.YNHQ_K1;
            let ynhq_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysYNHQ_K1),apc_looprate_fired("YNHQ","APC_WMC_AUTO1")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//兰州红狮
            let sysJTLZ_K1 = jsonObject.data.JTLZ_K1;
            let jtlz_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJTLZ_K1),apc_looprate_fired("JTLZ","Ftemp_auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//库车红狮
            let sysJTKC_K1 = jsonObject.data.JTKC_K1;
            let jtkc_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysJTKC_K1),apc_looprate_fired("JTKC","Ftemp_Auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:[apc_loop_state("篦冷机APC一段篦速",sysJTKC_K1),apc_looprate_fired("JTKC","Gcool_Auto")]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

//老挝万象
            let sysHWWX_K1 = jsonObject.data.HWWX_K1;
            let hwwx_table = [
                {system:"生料磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}
                    ]},
                {system:"回转窑系统",
                    loop:[{loopname:"尾煤",loopdata:[apc_loop_state("窑尾喂煤APC尾煤",sysHWWX_K1),apc_looprate_fired("HWWX","Ftemp_auto")]},
                        {loopname:"头煤",loopdata:[" "," "]},
                        {loopname:"窑速",loopdata:[" "," "]}
                    ]},
                {system:"篦冷机系统",
                    loop:[{loopname:"一段篦速",loopdata:["手动","0%"]},
                        {loopname:"二段篦速",loopdata:[" "," "]},
                        {loopname:"头排",loopdata:[" "," "]}
                    ]},
                {system:"煤磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#磨温度",loopdata:[" "," "]}, {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#磨温度",loopdata:[" "," "]}
                    ]},
                {system:"废气系统",
                    loop:[{loopname:"尾排控制",loopdata:[" "," "]}, {loopname:"脱硝控制",loopdata:[" "," "]}
                    ]},
                {system:"余热系统",
                    loop:[{loopname:"AQC高压水位",loopdata:[" "," "]}, {loopname:"AQC低压水位",loopdata:[" "," "]},
                        {loopname:"SPA水位",loopdata:[" "," "]}, {loopname:"SPB水位",loopdata:[" "," "]}, {loopname:"汽机负荷",loopdata:[" "," "]}
                    ]},
                {system:"水泥磨系统",
                    loop:[{loopname:"1#磨产量",loopdata:[" "," "]}, {loopname:"1#下料阀",loopdata:[" "," "]},
                        {loopname:"2#磨产量",loopdata:[" "," "]}, {loopname:"2#下料阀",loopdata:[" "," "]},
                        {loopname:"3#磨产量",loopdata:[" "," "]}, {loopname:"3#下料阀",loopdata:[" "," "]},
                        {loopname:"4#磨产量",loopdata:[" "," "]}, {loopname:"4#下料阀",loopdata:[" "," "]}
                    ]}
            ];

            let company_line = [
                {name:"ZJLX_K1",table:zjlx1_table},{name:"ZJLX_K2",table:zjlx2_table},{name:"ZJLX_K3",table:zjlx3_table},{name:"HZJD_K1",table:hzjd1_table},
                {name:"HZJD_K2",table:hzjd2_table},{name:"HZTL_K1",table:hztl1_table},
                {name:"JXGA_K1",table:jxga1_table},{name:"JXGA_K2",table:jxga2_table},{name:"JXHC_K1",table:jxhc_table},{name:"JXYP_K1",table:jxyp_table},
                {name:"JXHY_K1",table:jxhy_table},{name:"JXNY_K1",table:jxny_table},{name:"JXYZ_K1",table:jxyz_table},
                {name:"FJZP_K1",table:fjzp1_table},{name:"FJZP_K2",table:fjzp2_table},{name:"FJZP_K3",table:fjzp3_table},{name:"FJDT_K1",table:fjdt_table},
                {name:"SCLS_K1",table:scls1_table},{name:"SCLS_K2",table:scls2_table},{name:"SCJY_K1",table:scjy_table},{name:"SCCN_K1",table:sccn_table},
                {name:"YNYL_K1",table:ynyl1_table},{name:"YNYL_K2",table:ynyl2_table},
                {name:"YNLL_K1",table:ynll1_table},{name:"YNLL_K2",table:ynll2_table},{name:"YNMX_K1",table:ynmx_table},
                {name:"YNNN_K1",table:ynnn_table},{name:"YNCZ_K1",table:yncz_table},{name:"YNHQ_K1",table:ynhq_table},
                {name:"JTLZ_K1",table:jtlz_table},{name:"JTKC_K1",table:jtkc_table},{name:"HWWX_K1",table:hwwx_table}];

            // let company_line = [
            //     {name:"JXYZ_K1",table:jxyz_table},{name:"FJZP_K3",table:fjzp3_table}];

            let use_Arr = [];
            for(let i=0;i<company_line.length;i++){
                let total_use = total_use_data(company_line[i].name,company_line[i].table);
                use_Arr.push(total_use);
                apc_all_dataflush(company_line[i].name,company_line[i].table);
            }

            let use_cols_Arr = total_use_Arr(use_Arr);
            total_use_flush(use_cols_Arr);
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=FiredRD",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}


function total_use_data(sysLine,table_Item) {
    let table_data=[];
    for(let i=0;i<table_Item.length;i++){
        let looplength = table_Item[i].loop.length;
        for(let j=0;j<looplength;j++){
            let cell_data = table_Item[i].loop[j].loopdata[0];
            table_data.push(cell_data);
        }
    }
    return table_data;
}

function total_use_Arr(use_Arr) {
    let result = [];
    use_Arr.forEach(item => {
        item.forEach((d, i)=> {
            let a = result[i] = result[i] || [];
            a.push(d)
        })
    });
    return result;
}

function apc_looprate_fired(line_name,tag_name){
    let loop_rate=0;
    let xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            let jsonObject = JSON.parse(xmlhttp.responseText);
            let dataObj = jsonObject.data;
            // let loop_state = eval("dataObj."+tag_name);
            let loop_state = dataObj[tag_name];

            let statedata = eval(loop_state.join("+"));
            let totaldata = loop_state.length;

            let looprate = statedata/totaldata;
            loop_rate = Number(looprate*100).toFixed();
            loop_rate+="%";
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=moredata&tagName="+tag_name+"&measurement="+line_name+"&timespan=60",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return loop_rate;
}

function apc_looprate_yure(line_name,tag_name){
    let loop_rate = 0;
    let xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            let jsonObject = JSON.parse(xmlhttp.responseText);
            let dataObj = jsonObject.data;
            let loop_state = eval("dataObj."+ tag_name);
            // let loop_state =dataObj[tag_name];

            let statedata = eval(loop_state.join("+"));
            let totaldata = loop_state.length;

            loop_rate = statedata/totaldata;
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=moredata&tagName="+tag_name+"&measurement="+line_name+"&timespan=60",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return loop_rate;
}

function apc_looprate_yure1(){
    var loop_rate = 0;
    let xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            let jsonObject = JSON.parse(xmlhttp.responseText);
            let dataObj = jsonObject.data;
            let loop_state =dataObj["A_AQC_SW.VALUE"];

            let statedata = eval(loop_state.join("+"));
            let totaldata = loop_state.length;

            loop_rate = statedata/totaldata;
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=moredata&tagName=A_AQC_SW.VALUE&measurement=JXYZ&timespan=60",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return loop_rate;
}

function smaller(rate1,rate2) {
    let rate=null;
    if(rate1<rate2){
        rate = rate1;
    }else{
        rate = rate2;
    }
    let looprate = Number(rate*100).toFixed();
    looprate+="%";
    return looprate;
}