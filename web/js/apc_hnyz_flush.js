
/*------------------界面数据定时获取，刷新----------------------*/
var data_t1;

function apc_hnyz_dataRequest_raw(){
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

            /*--------------设备运行状态------------*/
            // let sysJXYZ_11_state = device_runstate("rawmill_btn1","A361RP01HA_AI13_PV",sysJXYZ_11);
            // let sysJXYZ_12_state = device_runstate("rawmill_btn2","A361RP02HA_AI14_PV",sysJXYZ_12);
            device_runstate("rawmill_btn1","A361RP01HA_AI13_PV",sysJXYZ_11);
            device_runstate("rawmill_btn2","A361RP02HA_AI14_PV",sysJXYZ_12);

            /*--------------1#生料磨APC模块-------------*/
            apc_loop_state("rawout_loop_1","APC_SLM1_AUTO",sysJXYZ_11);
            let set_rawout_1 = document.getElementById("set_rawout_1");
            set_rawout_1.innerText = sysJXYZ_11.APC_SLM1_SP1;
            let real_rawout_1 = document.getElementById("real_rawout_1");
            real_rawout_1.innerText = sysJXYZ_11.A361RP01HA_AI16_PV;
            let out_rawout_1 = document.getElementById("out_rawout_1");
            out_rawout_1.innerText = sysJXYZ_11.APC_SLM1_MV1;


            apc_loop_state("rawfeed_loop_1","APC_SLM1_SW2",sysJXYZ_11);
            let set_rawfeed_1 = document.getElementById("set_rawfeed_1");
            set_rawfeed_1.innerText = sysJXYZ_11.APC_SLM1_SP2;
            let real_rawfeed_1 = document.getElementById("real_rawfeed_1");
            real_rawfeed_1.innerText = sysJXYZ_11.APC_SLM1_PV2;


            apc_loop_state("rawtemp_loop_1","APC_SLM1T_AUTO",sysJXYZ_11);
            let set_rawtemp_1 = document.getElementById("set_rawtemp_1");
            set_rawtemp_1.innerText = sysJXYZ_11.APC_SLM1_SP3;
            let real_rawtemp_1 = document.getElementById("real_rawtemp_1");
            real_rawtemp_1.innerText = sysJXYZ_11.AI361CS01T01_PV;


            apc_loop_state("cyclefan_loop_1","APC_XHFJ1_AUTO",sysJXYZ_11);
            let set_cyclefan_1 = document.getElementById("set_cyclefan_1");
            set_cyclefan_1.innerText = sysJXYZ_11.APC_XHFJ1_SP;
            let real_cyclefan_1 = document.getElementById("real_cyclefan_1");
            real_cyclefan_1.innerText = sysJXYZ_11.A361FN01_AI08_PV;
            let out_cyclefan_1 = document.getElementById("out_cyclefan_1");
            out_cyclefan_1.innerText = sysJXYZ_11.A361FN01_AI07_PV;

            /*--------------2#生料磨APC模块-------------*/
            apc_loop_state("rawout_loop_2","APC_SLM2_AUTO",sysJXYZ_12);
            let set_rawout_2 = document.getElementById("set_rawout_2");
            set_rawout_2.innerText = sysJXYZ_12.APC_SLM2_SP1;
            let real_rawout_2 = document.getElementById("real_rawout_2");
            real_rawout_2.innerText = sysJXYZ_12.A361RP02HA_AI16_PV;
            let out_rawout_2 = document.getElementById("out_rawout_2");
            out_rawout_2.innerText = sysJXYZ_12.APC_SLM2_MV1;


            apc_loop_state("rawfeed_loop_2","APC_SLM2_SW2",sysJXYZ_12);
            let set_rawfeed_2 = document.getElementById("set_rawfeed_2");
            set_rawfeed_2.innerText = sysJXYZ_12.APC_SLM2_SP2;
            let real_rawfeed_2 = document.getElementById("real_rawfeed_2");
            real_rawfeed_2.innerText = sysJXYZ_12.APC_SLM2_PV2;


            apc_loop_state("rawtemp_loop_2","APC_SLM2T_AUTO",sysJXYZ_12);
            let set_rawtemp_2 = document.getElementById("set_rawtemp_2");
            set_rawtemp_2.innerText = sysJXYZ_12.APC_SLM2_SP3;
            let real_rawtemp_2 = document.getElementById("real_rawtemp_2");
            real_rawtemp_2.innerText = sysJXYZ_12.AI361CS02T01_PV;


            apc_loop_state("cyclefan_loop_2","APC_XHFJ2_AUTO",sysJXYZ_12);
            let set_cyclefan_2 = document.getElementById("set_cyclefan_2");
            set_cyclefan_2.innerText = sysJXYZ_12.APC_XHFJ2_SP;
            let real_cyclefan_2 = document.getElementById("real_cyclefan_2");
            real_cyclefan_2.innerText = sysJXYZ_12.A361FN02_AI08_PV;
            let out_cyclefan_2 = document.getElementById("out_cyclefan_2");
            out_cyclefan_2.innerText = sysJXYZ_12.A361FN02_AI07_PV;

        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_hnyz_dataRequest_fired(){
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
            let sysJXYZ_K1 = dataObj.JXYZ_K1;

            /*--------------尾排脱硝APC回路-------------*/
            apc_loop_state("endfan_loop_1","尾排风机APC尾排控制",sysJXYZ_K1);
            let set_endfan_1 = document.getElementById("set_endfan_1");
            set_endfan_1.innerText = sysJXYZ_K1.尾排风机高温风机出口压力设定;
            let real_endfan_1 = document.getElementById("real_endfan_1");
            real_endfan_1.innerText = sysJXYZ_K1.尾排风机高温风机出口压力反馈;


            apc_loop_state("TX_loop_1","氨水泵APC脱硝",sysJXYZ_K1);
            let set_TX_1 = document.getElementById("set_TX_1");
            set_TX_1.innerText = sysJXYZ_K1.氨水泵脱硝设定;
            let real_TX_1 = document.getElementById("real_TX_1");
            real_TX_1.innerText = sysJXYZ_K1.氨水泵脱硝反馈;

            /*--------------煤磨APC回路-------------*/
            apc_loop_state("coaltemp_loop_1","煤磨APC出磨温度",sysJXYZ_K1);
            let set_coaltemp_1 = document.getElementById("set_coaltemp_1");
            set_coaltemp_1.innerText = sysJXYZ_K1.煤磨出磨温度设定;
            let real_coaltemp_1 = document.getElementById("real_coaltemp_1");
            real_coaltemp_1.innerText = sysJXYZ_K1.煤磨出磨温度反馈;


            apc_loop_state("coalout_loop_1","煤磨APC产量控制",sysJXYZ_K1);
            let set_coalout_1 = document.getElementById("set_coalout_1");
            set_coalout_1.innerText = sysJXYZ_K1.煤磨产量设定;
            let real_coalout_1 = document.getElementById("real_coalout_1");
            real_coalout_1.innerText = sysJXYZ_K1.煤磨产量反馈;

            /*--------------回转窑APC回路-------------*/
            apc_loop_state("endcoal_loop","窑尾喂煤APC尾煤",sysJXYZ_K1);
            let set_endcoal = document.getElementById("set_endcoal");
            set_endcoal.innerText = sysJXYZ_K1.窑尾喂煤温度设定;
            let real_endcoal = document.getElementById("real_endcoal");
            real_endcoal.innerText = sysJXYZ_K1.窑尾喂煤温度反馈;
            let out_endcoal = document.getElementById("out_endcoal");
            out_endcoal.innerText = sysJXYZ_K1.窑尾喂煤尾煤输出;

            apc_loop_state("headcoal_loop","窑头喂煤APC头煤",sysJXYZ_K1);
            let set_headcoal = document.getElementById("set_headcoal");
            set_headcoal.innerText = sysJXYZ_K1.窑头喂煤喂煤量给定1;
            let real_headcoal = document.getElementById("real_headcoal");
            real_headcoal.innerText = sysJXYZ_K1.窑头喂煤喂煤量1;

            let set_kilnspeed = document.getElementById("set_kilnspeed");
            set_kilnspeed.innerText = sysJXYZ_K1.回转窑窑速给定1;
            let real_kilnspeed = document.getElementById("real_kilnspeed");
            real_kilnspeed.innerText = sysJXYZ_K1.回转窑窑速1;


            apc_loop_state("kilnfeed_loop","回转窑APC喂料量",sysJXYZ_K1);
            let real_kilnfeed = document.getElementById("real_kilnfeed");
            real_kilnfeed.innerText = sysJXYZ_K1.回转窑喂料量修正;

            /*--------------篦冷机APC回路-------------*/
            apc_loop_state("coolspeed_loop_1","篦冷机APC一段篦速",sysJXYZ_K1);
            let set_coolspeed_1 = document.getElementById("set_coolspeed_1");
            set_coolspeed_1.innerText = sysJXYZ_K1.篦冷机层压设定;
            let real_coolspeed_1 = document.getElementById("real_coolspeed_1");
            real_coolspeed_1.innerText = sysJXYZ_K1.篦冷机层压反馈;
            let out_coolspeed_1 = document.getElementById("out_coolspeed_1");
            out_coolspeed_1.innerText = sysJXYZ_K1.篦冷机篦速1输出;


            apc_loop_state("coolspeed_loop_2","篦冷机APC二段篦速",sysJXYZ_K1);
            let set_coolspeed_2 = document.getElementById("set_coolspeed_2");
            set_coolspeed_2.innerText = sysJXYZ_K1.篦冷机篦速给定2;
            let real_coolspeed_2 = document.getElementById("real_coolspeed_2");
            real_coolspeed_2.innerText = sysJXYZ_K1.篦冷机篦速2;

            apc_loop_state("headfan_loop","头排风机APC头排控制",sysJXYZ_K1);
            let set_headfan_1= document.getElementById("set_headfan_1");
            set_headfan_1.innerText = sysJXYZ_K1.头排风机窑头罩负压设定;
            let real_headfan_1 = document.getElementById("real_headfan_1");
            real_headfan_1.innerText = sysJXYZ_K1.头排风机窑头罩负压反馈;


            /*--------------余热系统APC回路-------------*/
            apc_loop_state_yure("AQChw_loop","AQC锅炉APC水位","AQC锅炉APC高压水位",sysJXYZ_K1);
            let set_AQChw = document.getElementById("set_AQChw");
            set_AQChw.innerText = sysJXYZ_K1.AQC锅炉高压设定水位;
            let real_AQChw = document.getElementById("real_AQChw");
            real_AQChw.innerText = sysJXYZ_K1.AQC锅炉高压实际水位;


            apc_loop_state_yure("AQClw_loop","AQC锅炉APC水位","AQC锅炉APC低压水位",sysJXYZ_K1);
            let set_AQClw = document.getElementById("set_AQClw");
            set_AQClw.innerText = sysJXYZ_K1.AQC锅炉低压设定水位;
            let real_AQClw = document.getElementById("real_AQClw");
            real_AQClw.innerText = sysJXYZ_K1.AQC锅炉低压实际水位;


            apc_loop_state_yure("SPAw_loop","AQC锅炉APC水位","SP锅炉SPA水位APC",sysJXYZ_K1);
            let set_SPAw = document.getElementById("set_SPAw");
            set_SPAw.innerText = sysJXYZ_K1.SP锅炉SPA设定水位;
            let real_SPAw = document.getElementById("real_SPAw");
            real_SPAw.innerText = sysJXYZ_K1.SP锅炉SPA实际水位;


            apc_loop_state_yure("SPBw_loop","AQC锅炉APC水位","SP锅炉SPB水位APC",sysJXYZ_K1);
            let set_SPBw = document.getElementById("set_SPBw");
            set_SPBw.innerText = sysJXYZ_K1.SP锅炉SPB设定水位;
            let real_SPBw = document.getElementById("real_SPBw");
            real_SPBw.innerText = sysJXYZ_K1.SP锅炉SPB实际水位;


            // apc_loop_state("Cyclew_loop","汽轮机APC循环水",sysJXYZ_K1);
            // let set_Cyclew = document.getElementById("set_Cyclew");
            // set_Cyclew.innerText = sysJXYZ_K1.汽轮机循环水设定;
            // let real_Cyclew = document.getElementById("real_Cyclew");
            // real_Cyclew.innerText = sysJXYZ_K1.汽轮机循环水反馈;


            apc_loop_state("505_loop","汽轮机505负荷",sysJXYZ_K1);

            /*--------------水泥磨系统APC回路-------------*/
            apc_loop_state("cementout_loop_1","水泥磨1APC产量控制",sysJXYZ_K1);
            let set_cementout_1 = document.getElementById("set_cementout_1");
            set_cementout_1.innerText = sysJXYZ_K1.水泥磨1产量设定;
            let real_cementout_1 = document.getElementById("real_cementout_1");
            real_cementout_1.innerText = sysJXYZ_K1.水泥磨1产量反馈;
            let out_cementout_1 = document.getElementById("out_cementout_1");
            out_cementout_1.innerText = sysJXYZ_K1.水泥磨1产量输出;


            apc_loop_state("cementfeed_loop_1","水泥磨1APC下料阀",sysJXYZ_K1);
            let set_cementfeed_1 = document.getElementById("set_cementfeed_1");
            set_cementfeed_1.innerText = sysJXYZ_K1.水泥磨1下料阀设定;
            let real_cementfeed_1 = document.getElementById("real_cementfeed_1");
            real_cementfeed_1.innerText = sysJXYZ_K1.水泥磨1下料阀反馈;


            apc_loop_state("cementout_loop_2","水泥磨2APC产量控制",sysJXYZ_K1);
            let set_cementout_2 = document.getElementById("set_cementout_2");
            set_cementout_2.innerText = sysJXYZ_K1.水泥磨2产量设定;
            let real_cementout_2 = document.getElementById("real_cementout_2");
            real_cementout_2.innerText = sysJXYZ_K1.水泥磨2产量反馈;
            let out_cementout_2 = document.getElementById("out_cementout_2");
            out_cementout_2.innerText = sysJXYZ_K1.水泥磨2产量输出;


            apc_loop_state("cementfeed_loop_2","水泥磨2APC下料阀",sysJXYZ_K1);
            let set_cementfeed_2 = document.getElementById("set_cementfeed_2");
            set_cementfeed_2.innerText = sysJXYZ_K1.水泥磨2下料阀设定;
            let real_cementfeed_2 = document.getElementById("real_cementfeed_2");
            real_cementfeed_2.innerText = sysJXYZ_K1.水泥磨2下料阀反馈;


            apc_loop_state("cementout_loop_3","水泥磨3APC产量控制",sysJXYZ_K1);
            let set_cementout_3 = document.getElementById("set_cementout_3");
            set_cementout_3.innerText = sysJXYZ_K1.水泥磨3产量设定;
            let real_cementout_3 = document.getElementById("real_cementout_3");
            real_cementout_3.innerText = sysJXYZ_K1.水泥磨3产量反馈;
            let out_cementout_3 = document.getElementById("out_cementout_3");
            out_cementout_3.innerText = sysJXYZ_K1.水泥磨3产量输出;


            apc_loop_state("cementfeed_loop_3","水泥磨3APC下料阀",sysJXYZ_K1);
            let set_cementfeed_3 = document.getElementById("set_cementfeed_3");
            set_cementfeed_3.innerText = sysJXYZ_K1.水泥磨3下料阀设定;
            let real_cementfeed_3 = document.getElementById("real_cementfeed_3");
            real_cementfeed_3.innerText = sysJXYZ_K1.水泥磨3下料阀反馈;


            apc_loop_state("cementout_loop_4","水泥磨4APC产量控制",sysJXYZ_K1);
            let set_cementout_4 = document.getElementById("set_cementout_4");
            set_cementout_4.innerText = sysJXYZ_K1.水泥磨4产量设定;
            let real_cementout_4 = document.getElementById("real_cementout_4");
            real_cementout_4.innerText = sysJXYZ_K1.水泥磨4产量反馈;
            let out_cementout_4 = document.getElementById("out_cementout_4");
            out_cementout_4.innerText = sysJXYZ_K1.水泥磨4产量输出;


            apc_loop_state("cementfeed_loop_4","水泥磨4APC下料阀",sysJXYZ_K1);
            let set_cementfeed_4 = document.getElementById("set_cementfeed_4");
            set_cementfeed_4.innerText = sysJXYZ_K1.水泥磨4下料阀设定;
            let real_cementfeed_4 = document.getElementById("real_cementfeed_4");
            real_cementfeed_4.innerText = sysJXYZ_K1.水泥磨4下料阀反馈;


            /*--------------设备运行状态------------*/
            device_runstate("kiln_btn","回转窑电流1",sysJXYZ_K1);
            device_runstate("cementmill_btn1","水泥磨1电流",sysJXYZ_K1);
            device_runstate("cementmill_btn2","水泥磨2电流",sysJXYZ_K1);
            device_runstate("cementmill_btn3","水泥磨3电流",sysJXYZ_K1);
            device_runstate("cementmill_btn4","水泥磨4电流",sysJXYZ_K1);
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=FiredRD",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_loop_state(loop_btn,tagname,system){
    let loop = document.getElementById(loop_btn);
    let loop_data = eval("system."+tagname);
    if(loop_data === 0){
        loop.innerText = "手动";
        loop.style.backgroundColor='#FFFFFF';
    }
    if(loop_data === 1){
        loop.innerText = "自动";
        loop.style.backgroundColor='#00FF00';
    }
}

function apc_loop_state_yure(loop_btn,tagname1,tagname2,system){
    let loop = document.getElementById(loop_btn);
    let loop_data1 = eval("system."+tagname1);
    let loop_data2 = eval("system."+tagname2);
    let loop_data = loop_data1 + loop_data2;
    if(loop_data === 0||loop_data === 1){
        loop.innerText = "手动";
        loop.style.backgroundColor='#FFFFFF';
    }
    if(loop_data === 2){
        loop.innerText = "自动";
        loop.style.backgroundColor='#00FF00';
    }
}

function device_runstate(state_btn,tagname,system){
    let state = document.getElementById(state_btn);
    let state_data = eval("system."+tagname);
    if(state_data < 10){
        state.innerText = "停机";
        state.style.backgroundColor='#FFFFFF';
    }else {
        state.innerText = "运行";
        state.style.backgroundColor='#00FF00';
    }
    // return state;
}

function apc_hnyz_flush(){

    clearInterval(data_t1);
    apc_hnyz_dataRequest_raw();
    apc_hnyz_dataRequest_fired();
    data_t1 =setInterval(apc_hnyz_flush,3000);
}





















