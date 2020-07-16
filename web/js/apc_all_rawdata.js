

function apc_raw_dataRequest() {
    let raw_data=[];

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
            let sysJXYZ_11 = dataObj.JXYZ_11;
            let sysJXYZ_12 = dataObj.JXYZ_12;

            let sysFJZP_31 = dataObj.FJZP_31;
            let sysFJZP_32 = dataObj.FJZP_32;

            let sysJXYC_11 = dataObj.JXYC_11;

             raw_data = [
                 {system:"兰溪1#_00",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"兰溪2#_01",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"兰溪3#_02",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"建德1#_03",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"建德2#_04",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"桐庐_05",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"青龙山_06",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"高安1#_07",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"高安2#_08",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"会昌_09",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"鹰鹏_10",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"衡阳_11",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"宁远莲花_12",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                {system:"永州红狮_13",
                    loop:[{loopname:"1#磨产量",
                            loopdata:[apc_loop_state("APC_SLM1_AUTO",sysJXYZ_11),apc_loop_value("APC_SLM1_SP1",sysJXYZ_11),
                                apc_loop_value("A361RP01HA_AI16_PV",sysJXYZ_11),apc_loop_value("APC_SLM1_MV1",sysJXYZ_11),apc_looprate_raw("JXYZ","APC_SLM1_AUTO")]},
                        {loopname:"2#磨产量",
                            loopdata:[apc_loop_state("APC_SLM2_AUTO",sysJXYZ_12),apc_loop_value("APC_SLM2_SP1",sysJXYZ_12),
                                apc_loop_value("A361RP02HA_AI16_PV",sysJXYZ_12),apc_loop_value("APC_SLM2_MV1",sysJXYZ_12),apc_looprate_raw("JXYZ","APC_SLM2_AUTO")]}
                    ]},
                 {system:"漳平1#_14",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"漳平2#_15",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                {system:"漳平三期_16",
                    loop:[{loopname:"1#磨产量",
                            loopdata:[apc_loop_state("Bfeeder1_auto",sysFJZP_31),apc_loop_value("Bfeeder1_SPX",sysFJZP_31),
                                apc_loop_value("COM361BE01MT01_I",sysFJZP_31),apc_loop_value("SLCL_XN",sysFJZP_31),apc_looprate_raw("FJZP3","Bfeeder1_auto")]},
                        {loopname:"2#磨产量",
                            loopdata:[apc_loop_state("Bfeeder2_auto",sysFJZP_32),apc_loop_value("Bfeeder2_SPX",sysFJZP_32),
                                apc_loop_value("COM361BE02MT01_I",sysFJZP_32),apc_loop_value("SLCL2_XN",sysFJZP_32),apc_looprate_raw("FJZP3","Bfeeder2_auto")]}
                    ]},
                 {system:"大田_17",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"邻水1#_18",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"邻水2#_19",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"江油_20",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"长宁_21",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"宜良1#_22",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"宜良2#_23",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"无量山_24",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"龙里1#_25",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"龙里2#_26",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"茂鑫_27",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"南宁_28",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"崇左_29",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"恒庆_30",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"兰州_31",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"库车_32",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"万象红狮_33",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
                 {system:"希望红狮_34",
                     loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                         {loopname:"2#磨产量",loopdata:["-","-","-","-"]}
                     ]},
            ];
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return raw_data;
}


function apc_looprate_raw(line_name, tag_name){
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
            let loop_state = dataObj["tag_name"];

            let statedata = eval(loop_state.join("+"));
            let totaldata = loop_state.length;

            let looprate = statedata/totaldata;
            loop_rate = Number(looprate*100).toFixed();
            loop_rate+="%";

        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=raw&method=moredata&tagName="+tag_name+"&measurement="+line_name+"&timespan=60",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return loop_rate;
}

