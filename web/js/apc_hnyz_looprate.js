
var data_t2;

function apc_hnyz_looprate_raw(rate_name,tag_name){
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
            let loop_rate = statedata/totaldata;

            let rate_div = document.getElementById(rate_name);

            let looprate = Number(loop_rate*100).toFixed();
            looprate+="%";
            rate_div.innerText = looprate;
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=raw&method=moredata&tagName="+tag_name+"&measurement=JXYZ&timespan=60",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_hnyz_looprate_fired(rate_name,tag_name){
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
            let loop_rate = statedata/totaldata;

            let rate_div = document.getElementById(rate_name);

            let looprate = Number(loop_rate*100).toFixed();
            looprate+="%";
            rate_div.innerText = looprate;
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=moredata&tagName="+tag_name+"&measurement=JXYZ&timespan=60",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_hnyz_looprate_yure(tag_name){
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
            let loop_state = eval("dataObj."+ tag_name);
            // let loop_state =dataObj[tag_name];

            let statedata = eval(loop_state.join("+"));
            let totaldata = loop_state.length;

            loop_rate = statedata/totaldata;
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=moredata&tagName="+tag_name+"&measurement=JXYZ&timespan=60",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return loop_rate;
}

function apc_hnyz_looprate_1(){
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

function apc_hnyz_looprate(){

    clearInterval(data_t2);
    /*----生料磨系统投用率-----*/
    apc_hnyz_looprate_raw("rawout_loop_rate1","APC_SLM1_AUTO");
    apc_hnyz_looprate_raw("rawfeed_loop_rate1","APC_SLM1_SW2");
    apc_hnyz_looprate_raw("rawtemp_loop_rate1","APC_SLM1T_AUTO");
    apc_hnyz_looprate_raw("cyclefan_loop_rate1","APC_XHFJ1_AUTO");

    apc_hnyz_looprate_raw("rawout_loop_rate2","APC_SLM2_AUTO");
    apc_hnyz_looprate_raw("rawfeed_loop_rate2","APC_SLM2_SW2");
    apc_hnyz_looprate_raw("rawtemp_loop_rate2","APC_SLM2T_AUTO");
    apc_hnyz_looprate_raw("cyclefan_loop_rate2","APC_XHFJ2_AUTO");

    /*----回转窑系统投用率-----*/
    apc_hnyz_looprate_fired("endcoal_loop_rate","Ftemp_auto");
    apc_hnyz_looprate_fired("headcoal_loop_rate","APC_761RS03_AUTO");
    // apc_hnyz_looprate_fired("kilnspeed_loop_rate","");
    apc_hnyz_looprate_fired("kilnfeed_loop_rate","APC_ZZC_AUTO");

    /*----篦冷机系统投用率-----*/
    apc_hnyz_looprate_fired("coolspeed_loop_rate1","Gcool_auto");
    apc_hnyz_looprate_fired("coolspeed_loop_rate2","S2SP_SW");
    apc_hnyz_looprate_fired("headfan_loop_rate","APC_YTP_AUTO");

    /*----煤磨系统投用率-----*/
    apc_hnyz_looprate_fired("coalout_loop_rate1","APC_MMCL_AUTO");
    let coaltemp_loop_rate1 = document.getElementById("coaltemp_loop_rate1");
    let coaltemp_loop = Number(apc_hnyz_looprate_1("PID_MMFF.SWAM")*100).toFixed();
    coaltemp_loop+="%";
    coaltemp_loop_rate1.innerText=coaltemp_loop;


    /*----脱硝系统投用率-----*/
    apc_hnyz_looprate_fired("TX_loop_rate1","APC_TX_AUTO");
    apc_hnyz_looprate_fired("endfan_loop_rate1","APC_YWP_AUTO");

    /*----水泥磨系统投用率-----*/
    apc_hnyz_looprate_fired("cementout_loop_rate1","APC_SNM1_AUTO");
    apc_hnyz_looprate_fired("cementfeed_loop_rate1","APC_SNM1_SW2");

    apc_hnyz_looprate_fired("cementout_loop_rate2","APC_SNM2_AUTO");
    apc_hnyz_looprate_fired("cementfeed_loop_rate2","APC_SNM2_SW2");

    apc_hnyz_looprate_fired("cementout_loop_rate3","APC_SNM3_AUTO");
    apc_hnyz_looprate_fired("cementfeed_loop_rate3","APC_SNM3_SW2");

    apc_hnyz_looprate_fired("cementout_loop_rate4","APC_SNM4_AUTO");
    apc_hnyz_looprate_fired("cementfeed_loop_rate4","APC_SNM4_SW2");

    /*----余热系统投用率-----*/
    // apc_hnyz_looprate_fired("Cyclew_loop_rate","A_21TT0XDT_SW");
    apc_hnyz_looprate_fired("505_loop_rate","A_ZKSS505_SW");

    let AQChw_loop_rate_div = document.getElementById("AQChw_loop_rate");
    let AQClw_loop_rate_div = document.getElementById("AQClw_loop_rate");
    let SPAw_loop_rate_div = document.getElementById("SPAw_loop_rate");
    let SPBw_loop_rate_div = document.getElementById("SPBw_loop_rate");

    // let water_loop_ratedata =  apc_hnyz_looprate_yure("A_AQC_SW.VALUE");
    let water_loop_ratedata =  apc_hnyz_looprate_1();
    // let water_loop_ratedata =  1;
    let AQChw_loop_ratedata =  apc_hnyz_looprate_yure("A_AQC_CVSW1");
    let AQClw_loop_ratedata =  apc_hnyz_looprate_yure("A_AQC_CVSW2");
    let SPAw_loop_ratedata =  apc_hnyz_looprate_yure("A_SP_CVSW1");
    let SPBw_loop_ratedata =  apc_hnyz_looprate_yure("A_SP_CVSW2");

    AQChw_loop_rate_div.innerText =  smaller(water_loop_ratedata,AQChw_loop_ratedata);
    AQClw_loop_rate_div.innerText =  smaller(water_loop_ratedata,AQClw_loop_ratedata);
    SPAw_loop_rate_div.innerText =  smaller(water_loop_ratedata,SPAw_loop_ratedata);
    SPBw_loop_rate_div.innerText =  smaller(water_loop_ratedata,SPBw_loop_ratedata);

    data_t2 =setInterval(apc_hnyz_looprate,30*60*1000);
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