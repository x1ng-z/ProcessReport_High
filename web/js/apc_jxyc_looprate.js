
function apc_jxyc_data(rate_name,tag_name){
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
            let loop_state =dataObj[tag_name];
            // console.log(tag_name+":"+loop_state);

            let statedata = eval(loop_state.join("+"));
            let totaldata = loop_state.length;
            let loop_rate = statedata/totaldata;

            let rate_div = document.getElementById(rate_name);

            let looprate = Number(loop_rate*100).toFixed();
            looprate+="%";
            rate_div.innerText = looprate;
        }
    };
    xmlhttp.open("GET","http://192.168.99.213:8080/Process/process.do?process=raw&method=moredata&tagName="+tag_name+"&measurement=JXYC&timespan=60",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

let data_t2;
function apc_jxyz_looprate(){

    clearInterval(data_t2);

    /**--生料--**/
    apc_jxyc_data("loop_rate_Silo","APC_SLM_AUTO.VALUE");
    apc_jxyc_data("loop_rate_outTemp","APC_CMWD_AUTO.VALUE");

    /**--尾排脱硝--**/
    apc_jxyc_data("loop_rate_idfanP","APC_YWP_AUTO.VALUE");
    apc_jxyc_data("loop_rate_TX","APC_TX_AUTO.VALUE");

    /**--煤磨--**/
    apc_jxyc_data("loop_rate_millCL","APC_MMCL_AUTO.VALUE");
    apc_jxyc_data("loop_rate_millTemp","APC_MMWD_AUTO.VALUE");

    /**--烧成--**/
    apc_jxyc_data("loop_rate_calTemp","APC_Ftemp_AUTO.VALUE");
    apc_jxyc_data("loop_rate_fanP","APC_YTM_AUTO.VALUE");
    apc_jxyc_data("loop_rate_coolrS","APC_BLJ1_AUTO.VALUE");
    apc_jxyc_data("loop_rate_headfanS","APC_YTP_AUTO.VALUE");

    data_t2 =setInterval(apc_jxyz_looprate,30*60*1000);
}
