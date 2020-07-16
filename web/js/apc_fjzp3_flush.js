

/*------------------表格界面数据定时获取，刷新----------------------*/

var data_t1;

function apc_fjzp3_dataRequest_raw(){
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
            let sysFJZP_31 = dataObj.FJZP_31;
            let sysFJZP_32 = dataObj.FJZP_32;

            /*--------------1#磨机APC产量回路-------------*/
            apc_loop_state("rawout_loop_1","Bfeeder1_auto",sysFJZP_31);

            let set_backele_1 = document.getElementById("set_backele_1");
            set_backele_1.innerText = sysFJZP_31['Bfeeder1_SPX'];

            let real_backele_1 = document.getElementById("real_backele_1");
            real_backele_1.innerText = sysFJZP_31["COM361BE01MT01_I"];

            let set_presub_1 = document.getElementById("set_presub_1");
            set_presub_1.innerText = sysFJZP_31["Bfeeder1_SP2X"];

            let real_presub_1 = document.getElementById("real_presub_1");
            real_presub_1.innerText = sysFJZP_31["AI361RM01PT03"];

            let pro_out_1 = document.getElementById("pro_out_1");
            pro_out_1.innerText = sysFJZP_31['SLCL_XN'];

            /*--------------2#磨机APC产量回路-------------*/
            apc_loop_state("rawout_loop_2","Bfeeder2_auto",sysFJZP_32);

            let set_backele_2 = document.getElementById("set_backele_2");
            set_backele_2.innerText = sysFJZP_32["Bfeeder2_SPX"];

            let real_backele_2 = document.getElementById("real_backele_2");
            real_backele_2.innerText = sysFJZP_32["COM361BE02MT01_I"];

            let set_presub_2 = document.getElementById("set_presub_2");
            set_presub_2.innerText = sysFJZP_32["Bfeeder2_SP2X"];

            let real_presub_2 = document.getElementById("real_presub_2");
            real_presub_2.innerText = sysFJZP_32["AI361RM02PT03"];

            let pro_out_2 = document.getElementById("pro_out_2");
            pro_out_2.innerText = sysFJZP_32["SLCL2_XN"];

            /*--------------设备运行状态------------*/
            device_runstate("rawmill_btn1","DP361RM01_AI39",sysFJZP_31);
            device_runstate("rawmill_btn2","DP361RM02_AI39",sysFJZP_32);
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_fjzp3_dataRequest_fired(){
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
            let sysFJZP_K3 = dataObj.FJZP_K3;

            /*--------------尾排APC回路-------------*/
            apc_loop_state("endfan_loop","尾排风机APC尾排",sysFJZP_K3);

            let set_endfan_hz = document.getElementById("set_endfan_hz");
            set_endfan_hz.innerText = sysFJZP_K3["尾排风机设定转速"];

            let real_endfan_hz = document.getElementById("real_endfan_hz");
            real_endfan_hz.innerText = sysFJZP_K3["尾排风机实际转速"];

            /*--------------脱硝APC回路-------------*/
            apc_loop_state("TX_loop","氨水泵APC脱硝",sysFJZP_K3);

            let set_TX = document.getElementById("set_TX");
            set_TX.innerText = sysFJZP_K3["氨水泵设定氮氧化物"];

            let real_TX = document.getElementById("real_TX");
            real_TX.innerText = sysFJZP_K3["氨水泵氮氧化物反馈"];

            /*--------------1#煤磨APC回路-------------*/
            apc_loop_state("coaltemp_loop_1","煤磨APC出磨温度1",sysFJZP_K3);

            let set_coaltemp_1 = document.getElementById("set_coaltemp_1");
            set_coaltemp_1.innerText = sysFJZP_K3["煤磨设定温度1"];

            let real_coaltemp_1 = document.getElementById("real_coaltemp_1");
            real_coaltemp_1.innerText = sysFJZP_K3["煤磨实际温度1"];

            apc_loop_state("coalout_loop_1","煤磨APC磨产量1",sysFJZP_K3);

            let set_coalout_1 = document.getElementById("set_coalout_1");
            set_coalout_1.innerText = sysFJZP_K3["煤磨设定产量1"];

            let real_coalout_1 = document.getElementById("real_coalout_1");
            real_coalout_1.innerText = sysFJZP_K3["煤磨实际产量1"];

            /*--------------2#煤磨APC回路-------------*/
            apc_loop_state("coaltemp_loop_2","煤磨APC出磨温度2",sysFJZP_K3);

            let set_coaltemp_2 = document.getElementById("set_coaltemp_2");
            set_coaltemp_2.innerText = sysFJZP_K3["煤磨设定温度2"];

            let real_coaltemp_2 = document.getElementById("real_coaltemp_2");
            real_coaltemp_2.innerText = sysFJZP_K3["煤磨实际温度2"];

            apc_loop_state("coalout_loop_2","煤磨APC磨产量2",sysFJZP_K3);

            let set_coalout_2 = document.getElementById("set_coalout_2");
            set_coalout_2.innerText = sysFJZP_K3["煤磨设定产量2"];

            let real_coalout_2 = document.getElementById("real_coalout_2");
            real_coalout_2.innerText = sysFJZP_K3["煤磨实际产量2"];

            // apc_loop_state("airvalv_loop","煤磨APC总冷热风阀",sysFJZP_K3);

            /*--------------回转窑APC回路-------------*/
            // apc_loop_state("endcoal_loop","窑尾喂煤APC尾煤",sysFJZP_K3);
            apc_loop_state1("endcoal_loop","窑尾喂煤APC尾煤","窑尾喂煤APC尾煤推优",sysFJZP_K3);

            let set_endcoal = document.getElementById("set_endcoal");
            set_endcoal.innerText = sysFJZP_K3["窑尾喂煤温度设定"];

            let real_endcoal = document.getElementById("real_endcoal");
            real_endcoal.innerText = sysFJZP_K3["窑尾喂煤温度反馈"];

            let out_endcoal = document.getElementById("out_endcoal");
            out_endcoal.innerText = sysFJZP_K3["窑尾喂煤喂煤量1"];

            // apc_loop_state("headcoal_loop","窑头喂煤APC头煤",sysFJZP_K3);
            apc_loop_state1("headcoal_loop","窑头喂煤APC头煤","窑头喂煤APC头煤推优",sysFJZP_K3);

            let set_headcoal = document.getElementById("set_headcoal");
            set_headcoal.innerText = sysFJZP_K3["窑头喂煤喂煤量给定1"];

            let real_headcoal = document.getElementById("real_headcoal");
            real_headcoal.innerText = sysFJZP_K3["窑头喂煤喂煤量1"];

            apc_loop_state("kilnspeed_loop","回转窑APC窑转速",sysFJZP_K3);

            let set_kilnspeed = document.getElementById("set_kilnspeed");
            set_kilnspeed.innerText = sysFJZP_K3["回转窑窑速给定1"];

            let real_kilnspeed1 = document.getElementById("real_kilnspeed1");
            real_kilnspeed1.innerText = sysFJZP_K3["回转窑窑速1"];

            let real_kilnspeed2 = document.getElementById("real_kilnspeed2");
            real_kilnspeed2.innerText = sysFJZP_K3["回转窑窑速2"];

            /*--------------篦冷机APC回路-------------*/
            apc_loop_state("coolspeed_loop_1","篦冷机APC一段篦速",sysFJZP_K3);

            let set_coolspeed_1 = document.getElementById("set_coolspeed_1");
            set_coolspeed_1.innerText = sysFJZP_K3["篦冷机层压设定"];

            let real_coolspeed_1 = document.getElementById("real_coolspeed_1");
            real_coolspeed_1.innerText = sysFJZP_K3["篦冷机层压反馈"];

            let out_coolspeed_1 = document.getElementById("out_coolspeed_1");
            out_coolspeed_1.innerText = sysFJZP_K3["篦冷机篦速1"];

            apc_loop_state("coolspeed_loop_2","篦冷机APC二段篦速",sysFJZP_K3);

            let set_coolspeed_2 = document.getElementById("set_coolspeed_2");
            set_coolspeed_2.innerText = sysFJZP_K3["篦冷机篦速给定2"];

            let real_coolspeed_2 = document.getElementById("real_coolspeed_2");
            real_coolspeed_2.innerText = sysFJZP_K3["篦冷机篦速2"];

            apc_loop_state("headfan_loop","头排风机APC头排",sysFJZP_K3);

            let set_headfan_hz = document.getElementById("set_headfan_hz");
            set_headfan_hz.innerText = sysFJZP_K3["头排风机设定转速"];

            let real_headfan_hz = document.getElementById("real_headfan_hz");
            real_headfan_hz.innerText = sysFJZP_K3["头排风机实际转速"];

            apc_loop_state("Fxfan_loop_2","篦冷机APC二段风机",sysFJZP_K3);

            /*--------------余热系统APC回路-------------*/
            apc_loop_state_yure("AQChw_loop","AQC锅炉APC水位","AQC锅炉APC高压水位",sysFJZP_K3);
            let set_AQChw = document.getElementById("set_AQChw");
            set_AQChw.innerText = sysFJZP_K3["AQC锅炉高压设定水位"];

            let real_AQChw = document.getElementById("real_AQChw");
            real_AQChw.innerText = sysFJZP_K3["AQC锅炉高压实际水位"];

            apc_loop_state_yure("AQClw_loop","AQC锅炉APC水位","AQC锅炉APC低压水位",sysFJZP_K3);
            let set_AQClw = document.getElementById("set_AQClw");
            set_AQClw.innerText = sysFJZP_K3["AQC锅炉低压设定水位"];

            let real_AQClw = document.getElementById("real_AQClw");
            real_AQClw.innerText = sysFJZP_K3["AQC锅炉低压实际水位"];

            apc_loop_state_yure("SPAw_loop","AQC锅炉APC水位","SP锅炉SPA水位APC",sysFJZP_K3);
            let set_SPAw = document.getElementById("set_SPAw");
            set_SPAw.innerText = sysFJZP_K3['SP锅炉SPA设定水位'];

            let real_SPAw = document.getElementById("real_SPAw");
            real_SPAw.innerText = sysFJZP_K3["SP锅炉SPA实际水位"];

            apc_loop_state_yure("SPBw_loop","AQC锅炉APC水位","SP锅炉SPB水位APC",sysFJZP_K3);
            let set_SPBw = document.getElementById("set_SPBw");
            set_SPBw.innerText = sysFJZP_K3["SP锅炉SPB设定水位"];

            let real_SPBw = document.getElementById("real_SPBw");
            real_SPBw.innerText = sysFJZP_K3["SP锅炉SPB实际水位"];

            apc_loop_state("505_loop","汽轮机505负荷",sysFJZP_K3);


            /*--------------设备运行状态------------*/
            device_runstate("kiln_btn","回转窑电流1",sysFJZP_K3);
            device_runstate("coalmill_btn1","煤磨电流1",sysFJZP_K3);
            device_runstate("coalmill_btn2","煤磨电流2",sysFJZP_K3);
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

function apc_loop_state1(loop_btn,tagname1,tagname2,system){
    let loop = document.getElementById(loop_btn);
    let loop_data1 = system[tagname1];
    let loop_data2 = system[tagname2];

    if(loop_data1 === 0&&loop_data2===0){
        loop.innerText = "手动";
        loop.style.backgroundColor='#FFFFFF';
    }
    if(loop_data1 === 1||loop_data2 === 1){
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
}

function apc_fjzp3_flush(){

    clearInterval(data_t1);
    apc_fjzp3_dataRequest_raw();
    apc_fjzp3_dataRequest_fired();
    data_t1 =setInterval(apc_fjzp3_flush,3000);
}






















