
var data_t2;

function apc_fjzp3_looprate_raw(rate_name,tag_name){
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
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=raw&method=moredata&tagName="+tag_name+"&measurement=FJZP3&timespan=60",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_fjzp3_looprate_fired(rate_name,tag_name){
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
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=moredata&tagName="+tag_name+"&measurement=FJZP3&timespan=60",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_fjzp3_looprate_yure(tag_name){
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
            let loop_state = eval("dataObj."+tag_name);

            let statedata = eval(loop_state.join("+"));
            let totaldata = loop_state.length;

            loop_rate = statedata/totaldata;
        }
    };
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=moredata&tagName="+tag_name+"&measurement=FJZP3&timespan=60",false);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
    return loop_rate;
}

function apc_fjzp3_looprate(){

    clearInterval(data_t2);
    /*----生料磨系统投用率-----*/
    apc_fjzp3_looprate_raw("rawout_loop_rate1","Bfeeder1_auto");
    apc_fjzp3_looprate_raw("rawout_loop_rate2","Bfeeder2_auto");
    apc_fjzp3_looprate_fired("endfan_loop_rate","APC_421FN03_AUTO");

    /*----回转窑系统投用率-----*/
    apc_fjzp3_looprate_fired("endcoal_loop_rate","APC_WMC_AUTO");
    apc_fjzp3_looprate_fired("headcoal_loop_rate","APC_761RS03_AUTO");
    apc_fjzp3_looprate_fired("kilnspeed_loop_rate","APC_461KL01_AUTO");
    apc_fjzp3_looprate_fired("TX_loop_rate","TX_AUTO");

    /*----篦冷机系统投用率-----*/
    apc_fjzp3_looprate_fired("coolspeed_loop_rate1","APC_BLJ_AUTO1 ");
    apc_fjzp3_looprate_fired("coolspeed_loop_rate2","APC_BLJ2_AUTO ");
    apc_fjzp3_looprate_fired("headfan_loop_rate","APC_YTP_AUTO");
    apc_fjzp3_looprate_fired("Fxfan_loop_rate2","APC_GCF2_AUTO ");

    /*----煤磨系统投用率-----*/
    // apc_fjzp3_looprate_fired("airvalv_loop_rate","APC_KT");
    apc_fjzp3_looprate_fired("coaltemp_loop_rate1","APC_KT1");
    apc_fjzp3_looprate_fired("coaltemp_loop_rate2","APC_KT2");
    apc_fjzp3_looprate_fired("coalout_loop_rate1","Kfeeder1_auto");
    apc_fjzp3_looprate_fired("coalout_loop_rate2","Kfeeder2_auto");

    /*----余热系统投用率-----*/
    apc_fjzp3_looprate_fired("505_loop_rate","A_ZKSS505_SW");

    let AQChw_loop_rate_div = document.getElementById("AQChw_loop_rate");
    let AQClw_loop_rate_div = document.getElementById("AQClw_loop_rate");
    let SPAw_loop_rate_div = document.getElementById("SPAw_loop_rate");
    let SPBw_loop_rate_div = document.getElementById("SPBw_loop_rate");

    let water_loop_ratedata =  apc_fjzp3_looprate_yure("A_AQC_SW");
    let AQChw_loop_ratedata =  apc_fjzp3_looprate_yure("A_AQC_CVSW1");
    let AQClw_loop_ratedata =  apc_fjzp3_looprate_yure("A_AQC_CVSW2");
    let SPAw_loop_ratedata =  apc_fjzp3_looprate_yure("A_SP_CVSW1");
    let SPBw_loop_ratedata =  apc_fjzp3_looprate_yure("A_SP_CVSW2");

    AQChw_loop_rate_div.innerText =  smaller(water_loop_ratedata,AQChw_loop_ratedata);
    AQClw_loop_rate_div.innerText =  smaller(water_loop_ratedata,AQClw_loop_ratedata);
    SPAw_loop_rate_div.innerText =  smaller(water_loop_ratedata,SPAw_loop_ratedata);
    SPBw_loop_rate_div.innerText =  smaller(water_loop_ratedata,SPBw_loop_ratedata);

    data_t2 =setInterval(apc_fjzp3_looprate,10*60*1000);
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