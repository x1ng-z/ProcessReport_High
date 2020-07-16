
function apc_pyro_dataRequest() {
    let pyro_data=[];
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

            let sysJXYZ_K1 = jsonObject.data.JXYZ_K1;
            let sysFJZP_K3 = jsonObject.data.FJZP_K3;

            pyro_data = [
                {proline:"兰溪1#_00"},
                {proline:"兰溪2#_01"},
                {proline:"兰溪3#_02"},
                {proline:"建德1#_03"},
                {proline:"建德2#_04"},
                {proline:"桐庐_05"},
                {proline:"青龙山_06"},
                {proline:"高安1#_07"},
                {proline:"高安2#_08"},
                {proline:"会昌_09"},
                {proline:"鹰鹏_10"},
                {proline:"衡阳_11"},
                {proline:"宁远莲花_12"},
                {proline:"永州_13",
                linedata:[
                    {system:"回转窑系统",
                        loop:[{loopname:"尾煤",
                            loopdata:[
                                apc_loop_state("窑尾喂煤APC尾煤",sysJXYZ_K1), apc_loop_value("窑尾喂煤温度设定",sysJXYZ_K1), apc_loop_value("窑尾喂煤温度反馈",sysJXYZ_K1),
                                apc_loop_value("窑尾喂煤尾煤输出",sysJXYZ_K1),apc_looprate_fired("JXYZ","Ftemp_auto")]},
                            {loopname:"头煤",
                                loopdata:[
                                    apc_loop_state("窑头喂煤APC头煤",sysJXYZ_K1), apc_loop_value("窑头喂煤喂煤量给定1",sysJXYZ_K1),
                                    apc_loop_value("窑头喂煤喂煤量1",sysJXYZ_K1), apc_looprate_fired("JXYZ","APC_761RS03_AUTO")]},
                            {loopname:"窑速",
                                loopdata:["手动",
                                    apc_loop_value("回转窑窑速给定1",sysJXYZ_K1), apc_loop_value("回转窑窑速1",sysJXYZ_K1),"0"]}
                        ]},
                    {system:"篦冷机系统",
                        loop:[{loopname:"一段篦速",
                            loopdata:[
                                apc_loop_state("篦冷机APC一段篦速",sysJXYZ_K1), apc_loop_value("篦冷机层压设定",sysJXYZ_K1), apc_loop_value("篦冷机层压反馈",sysJXYZ_K1),
                                apc_loop_value("篦冷机篦速1输出",sysJXYZ_K1),apc_looprate_fired("JXYZ","Gcool_auto")]},
                            {loopname:"二段篦速",
                                loopdata:[
                                    apc_loop_state("篦冷机APC二段篦速",sysJXYZ_K1), apc_loop_value("篦冷机篦速给定2",sysJXYZ_K1),
                                    apc_loop_value("篦冷机篦速2",sysJXYZ_K1), apc_looprate_fired("JXYZ","S2SP_SW")]},
                            {loopname:"头排",
                                loopdata:[
                                    apc_loop_state("头排风机APC头排控制",sysJXYZ_K1),apc_loop_value("头排风机窑头罩负压设定",sysJXYZ_K1),
                                    apc_loop_value("头排风机窑头罩负压反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_YTP_AUTO")]}
                        ]},
                    {system:"煤磨系统",
                        loop:[{loopname:"1#磨产量",
                            loopdata:[
                                apc_loop_state("煤磨APC产量控制",sysJXYZ_K1),apc_loop_value("煤磨产量设定",sysJXYZ_K1),
                                apc_loop_value("煤磨产量反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_MMCL_AUTO")]},
                            {loopname:"1#磨温度",
                                loopdata:[
                                    apc_loop_state("煤磨APC出磨温度",sysJXYZ_K1),apc_loop_value("煤磨出磨温度设定",sysJXYZ_K1),
                                    apc_loop_value("煤磨出磨温度反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_MMCL_AUTO")]},
                            {loopname:"2#磨产量",loopdata:["-","-","-","-"]},
                            {loopname:"2#磨温度",loopdata:["-","-","-","-"]}
                        ]},
                    {system:"废气系统",
                        loop:[{loopname:"尾排控制",
                            loopdata:[
                                apc_loop_state("尾排风机APC尾排控制",sysJXYZ_K1),apc_loop_value("尾排风机高温风机出口压力设定",sysJXYZ_K1),
                                apc_loop_value("尾排风机高温风机出口压力反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_YWP_AUTO")]},
                            {loopname:"脱硝控制",
                                loopdata:[
                                    apc_loop_state("氨水泵APC脱硝",sysJXYZ_K1),apc_loop_value("氨水泵脱硝设定",sysJXYZ_K1),
                                    apc_loop_value("氨水泵脱硝反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_TX_AUTO")]}
                        ]},
                    {system:"余热系统",
                        loop:[{loopname:"AQC高压水位",
                            loopdata:[
                                apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC高压水位",sysJXYZ_K1),apc_loop_value("AQC锅炉高压设定水位",sysJXYZ_K1),
                                apc_loop_value("AQC锅炉高压实际水位",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_AQC_CVSW1"))]},
                            {loopname:"AQC低压水位",
                                loopdata:[
                                    apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC低压水位",sysJXYZ_K1),apc_loop_value("AQC锅炉低压设定水位",sysJXYZ_K1),
                                    apc_loop_value("AQC锅炉低压实际水位",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_AQC_CVSW2"))]},
                            {loopname:"SPA水位",
                                loopdata:[
                                    apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPA水位APC",sysJXYZ_K1),apc_loop_value("SP锅炉SPA设定水位",sysJXYZ_K1),
                                    apc_loop_value("SP锅炉SPA实际水位",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_SP_CVSW1"))]},
                            {loopname:"SPB水位",
                                loopdata:[
                                    apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPB水位APC",sysJXYZ_K1),apc_loop_value("SP锅炉SPB设定水位",sysJXYZ_K1),
                                    apc_loop_value("SP锅炉SPB实际水位",sysJXYZ_K1),smaller(apc_looprate_yure1,apc_looprate_yure("JXYZ","A_SP_CVSW2"))]},
                            {loopname:"汽机负荷",
                                loopdata:[apc_loop_state("汽轮机505负荷",sysJXYZ_K1),apc_looprate_fired("JXYZ","A_ZKSS505_SW")]}
                        ]},
                    {system:"水泥磨系统",
                        loop:[{loopname:"1#磨产量",
                            loopdata:[
                                apc_loop_state("水泥磨1APC产量控制",sysJXYZ_K1),apc_loop_value("水泥磨1产量设定",sysJXYZ_K1), apc_loop_value("水泥磨1产量反馈",sysJXYZ_K1),
                                apc_loop_value("水泥磨1产量输出",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM1_AUTO")]},
                            {loopname:"1#下料阀",
                                loopdata:[
                                    apc_loop_state("水泥磨1APC下料阀",sysJXYZ_K1),apc_loop_value("水泥磨1下料阀设定",sysJXYZ_K1),
                                    apc_loop_value("水泥磨1下料阀反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM1_SW2")]},
                            {loopname:"2#磨产量",
                                loopdata:[
                                    apc_loop_state("水泥磨2APC产量控制",sysJXYZ_K1),apc_loop_value("水泥磨2产量设定",sysJXYZ_K1), apc_loop_value("水泥磨2产量反馈",sysJXYZ_K1),
                                    apc_loop_value("水泥磨2产量输出",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM2_AUTO")]},
                            {loopname:"2#下料阀",
                                loopdata:[
                                    apc_loop_state("水泥磨2APC下料阀",sysJXYZ_K1),apc_loop_value("水泥磨2下料阀设定",sysJXYZ_K1),
                                    apc_loop_value("水泥磨2下料阀反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM2_SW2")]},
                            {loopname:"3#磨产量",
                                loopdata:[
                                    apc_loop_state("水泥磨3APC产量控制",sysJXYZ_K1),apc_loop_value("水泥磨3产量设定",sysJXYZ_K1), apc_loop_value("水泥磨3产量反馈",sysJXYZ_K1),
                                    apc_loop_value("水泥磨3产量输出",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM3_AUTO")]},
                            {loopname:"3#下料阀",
                                loopdata:[
                                    apc_loop_state("水泥磨3APC下料阀",sysJXYZ_K1),apc_loop_value("水泥磨3下料阀设定",sysJXYZ_K1),
                                    apc_loop_value("水泥磨3下料阀反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM3_SW2")]},
                            {loopname:"4#磨产量",
                                loopdata:[
                                    apc_loop_state("水泥磨4APC产量控制",sysJXYZ_K1),apc_loop_value("水泥磨4产量设定",sysJXYZ_K1), apc_loop_value("水泥磨4产量反馈",sysJXYZ_K1),
                                    apc_loop_value("水泥磨4产量输出",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM4_AUTO")]},
                            {loopname:"4#下料阀",
                                loopdata:[
                                    apc_loop_state("水泥磨4APC下料阀",sysJXYZ_K1),apc_loop_value("水泥磨4下料阀设定",sysJXYZ_K1),
                                    apc_loop_value("水泥磨4下料阀反馈",sysJXYZ_K1),apc_looprate_fired("JXYZ","APC_SNM4_SW2")]}
                        ]}
                ]},
                {proline:"漳平1#_14"},
                {proline:"漳平2#_15"},
                {proline:"漳平三期_16",
                    linedata:[
                        {system:"回转窑系统",
                            loop:[{loopname:"尾煤",
                                loopdata:[
                                    apc_loop_state("窑尾喂煤APC尾煤",sysFJZP_K3),apc_loop_value("窑尾喂煤温度设定",sysFJZP_K3), apc_loop_value("窑尾喂煤温度反馈",sysFJZP_K3),
                                    apc_loop_value("窑尾喂煤喂煤量1",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_WMC_AUTO")]},
                                {loopname:"头煤",
                                    loopdata:[
                                        apc_loop_state("窑头喂煤APC头煤",sysFJZP_K3),apc_loop_value("窑头喂煤喂煤量给定1",sysFJZP_K3),
                                        apc_loop_value("窑头喂煤喂煤量1",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_761RS03_AUTO")]},
                                {loopname:"窑速",
                                    loopdata:[
                                        apc_loop_state("回转窑APC窑转速",sysFJZP_K3),apc_loop_value("回转窑窑速给定1",sysFJZP_K3),
                                        apc_loop_value("回转窑窑速1",sysFJZP_K3), apc_looprate_fired("FJZP3","APC_461KL01_AUTO")]}
                            ]},
                        {system:"篦冷机系统",
                            loop:[{loopname:"一段篦速",
                                loopdata:[apc_loop_state("篦冷机APC一段篦速",sysFJZP_K3),apc_loop_value("篦冷机层压设定",sysFJZP_K3), apc_loop_value("篦冷机层压反馈",sysFJZP_K3),
                                    apc_loop_value("篦冷机篦速1",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_BLJ_AUTO1")]},
                                {loopname:"二段篦速",
                                    loopdata:[apc_loop_state("篦冷机APC二段篦速",sysFJZP_K3),apc_loop_value("篦冷机篦速给定2",sysFJZP_K3),
                                        apc_loop_value("篦冷机篦速2",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_BLJ2_AUTO")]},
                                {loopname:"头排",
                                    loopdata:[apc_loop_state("头排风机APC头排",sysFJZP_K3),apc_loop_value("头排风机设定转速",sysFJZP_K3),
                                        apc_loop_value("头排风机实际转速",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_YTP_AUTO")]}
                            ]},
                        {system:"煤磨系统",
                            loop:[{loopname:"1#磨产量",
                                loopdata:[apc_loop_state("煤磨APC磨产量1",sysFJZP_K3),apc_loop_value("煤磨设定产量1",sysFJZP_K3),
                                    apc_loop_value("煤磨实际产量1",sysFJZP_K3),apc_looprate_fired("FJZP3","Kfeeder1_auto")]},
                                {loopname:"1#磨温度",
                                    loopdata:[apc_loop_state("煤磨APC出磨温度1",sysFJZP_K3),apc_loop_value("煤磨设定温度1",sysFJZP_K3),
                                        apc_loop_value("煤磨实际温度1",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_KT1")]},
                                {loopname:"2#磨产量",
                                    loopdata:[apc_loop_state("煤磨APC磨产量2",sysFJZP_K3),apc_loop_value("煤磨设定产量2",sysFJZP_K3),
                                        apc_loop_value("煤磨实际产量2",sysFJZP_K3),apc_looprate_fired("FJZP3","Kfeeder2_auto")]},
                                {loopname:"2#磨温度",
                                    loopdata:[apc_loop_state("煤磨APC出磨温度2",sysFJZP_K3),apc_loop_value("煤磨设定温度2",sysFJZP_K3),
                                        apc_loop_value("煤磨实际温度2",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_KT2")]}
                            ]},
                        {system:"废气系统",
                            loop:[{loopname:"尾排控制",
                                loopdata:[apc_loop_state("尾排风机APC尾排",sysFJZP_K3),apc_loop_value("尾排风机设定转速",sysFJZP_K3),
                                    apc_loop_value("尾排风机实际转速",sysFJZP_K3),apc_looprate_fired("FJZP3","APC_GCF2_AUTO")]},
                                {loopname:"脱硝控制",
                                    loopdata:[apc_loop_state("氨水泵AP脱硝",sysFJZP_K3),apc_loop_value("氨水泵设定氮氧化物",sysFJZP_K3),
                                        apc_loop_value("氨水泵实际氮氧化物",sysFJZP_K3),apc_looprate_fired("FJZP3","TX_AUTO")]}
                            ]},
                        {system:"余热系统",
                            loop:[{loopname:"AQC高压水位",
                                loopdata:[apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC高压水位",sysFJZP_K3),apc_loop_value("AQC锅炉高压设定水位",sysFJZP_K3),
                                    apc_loop_value("AQC锅炉高压实际水位",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_AQC_CVSW1"))]},
                                {loopname:"AQC低压水位",
                                    loopdata:[apc_loop_state_yure("AQC锅炉APC水位","AQC锅炉APC低压水位",sysFJZP_K3),apc_loop_value("AQC锅炉低压设定水位",sysFJZP_K3),
                                        apc_loop_value("AQC锅炉低压实际水位",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_AQC_CVSW2"))]},
                                {loopname:"SPA水位",
                                    loopdata:[apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPA水位APC",sysFJZP_K3),apc_loop_value("SP锅炉SPA设定水位",sysFJZP_K3),
                                        apc_loop_value("SP锅炉SPA实际水位",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_SP_CVSW1"))]},
                                {loopname:"SPB水位",
                                    loopdata:[apc_loop_state_yure("AQC锅炉APC水位","SP锅炉SPB水位APC",sysFJZP_K3),apc_loop_value("SP锅炉SPB设定水位",sysFJZP_K3),
                                        apc_loop_value("SP锅炉SPB实际水位",sysFJZP_K3),smaller(apc_looprate_yure("FJZP3","A_AQC_SW"),apc_looprate_yure("FJZP3","A_SP_CVSW2"))]},
                                {loopname:"汽机负荷",
                                    loopdata:[apc_loop_state("汽轮机505负荷",sysFJZP_K3),apc_looprate_fired("FJZP3","A_ZKSS505_SW")]}
                            ]},
                        {system:"水泥磨系统",
                            loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-","-"]},
                                {loopname:"1#下料阀",loopdata:["-","-","-","-"]},
                                {loopname:"2#磨产量",loopdata:["-","-","-","-","-"]},
                                {loopname:"2#下料阀",loopdata:["-","-","-","-"]},
                                {loopname:"3#磨产量",loopdata:["-","-","-","-","-"]},
                                {loopname:"3#下料阀",loopdata:["-","-","-","-"]},
                                {loopname:"4#磨产量",loopdata:["-","-","-","-","-"]},
                                {loopname:"4#下料阀",loopdata:["-","-","-","-"]}
                            ]}
                    ]},
                {proline:"大田_17"},
                {proline:"邻水1#_18"},
                {proline:"邻水2#_19"},
                {proline:"江油_20"},
                {proline:"长宁_21"},
                {proline:"宜良1#_22"},
                {proline:"宜良2#_23"},
                {proline:"无量山_24"},
                {proline:"龙里1#_25"},
                {proline:"龙里2#_26"},
                {proline:"茂鑫_27"},
                {proline:"南宁_28"},
                {proline:"崇左_29"},
                {proline:"恒庆_30"},
                {proline:"兰州_31"},
                {proline:"库车_32"},
                {proline:"万象红狮_33"},
                {proline:"希望红狮_34"},
            ];
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=FiredRD",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return pyro_data;
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
            let loop_state = eval("dataObj."+tag_name);


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