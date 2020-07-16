
/*------------------界面数据定时获取，刷新----------------------*/
let data_t1;

function apc_jxyc_dataRequest_raw(){
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
            let sysJXYC_11 = dataObj.JXYC_11;

            /*--------------设备运行状态------------*/
            device_runstate("rawmill_btn","B30生料辊压机B30生料辊压机",sysJXYC_11);
            device_runstate("endfan_btn","E20窑尾排风机E20窑尾排风机",sysJXYC_11);

            /*--------------生料磨APC回路-------------*/
            apc_loop_state("loop_Silo","B30生料辊压机APC产量控制",sysJXYC_11);
            let target_Silo = document.getElementById("target_Silo");
            target_Silo.innerText = sysJXYC_11["B30生料辊压机仓重设定"];
            let current_Silo = document.getElementById("current_Silo");
            current_Silo.innerText = sysJXYC_11["B30生料辊压机仓重反馈"];

            let target_millElec = document.getElementById("target_millElec");
            target_millElec.innerText = sysJXYC_11["B30生料辊压机电流设定"];
            let current_millElec = document.getElementById("current_millElec");
            current_millElec.innerText = sysJXYC_11["B30生料辊压机电流反馈"];

            let set_Silo = document.getElementById("set_Silo");
            set_Silo.innerText = sysJXYC_11["B30生料辊压机产量设定"];
            let back_Silo = document.getElementById("back_Silo");
            back_Silo.innerText = sysJXYC_11["B30生料辊压机台时"];


            apc_loop_state("loop_outTemp","B30生料辊压机APC温度控制",sysJXYC_11);
            let target_outTemp = document.getElementById("target_outTemp");
            target_outTemp.innerText = sysJXYC_11["B30生料辊压机出磨温度设定"];
            let current_outTemp = document.getElementById("current_outTemp");
            current_outTemp.innerText = sysJXYC_11["B30生料辊压机出磨温度反馈"];

            /*--------------尾排APC回路-------------*/
            apc_loop_state("loop_idfanP","E20窑尾排风机APC尾排风机",sysJXYC_11);
            let target_idfanP = document.getElementById("target_idfanP");
            target_idfanP.innerText = sysJXYC_11["E20窑尾排风机负压设定1"];
            let current_idfanP = document.getElementById("current_idfanP");
            current_idfanP.innerText = sysJXYC_11["E20窑尾排风机高温风机出口压力"];

            let target_espP = document.getElementById("target_espP");
            target_espP.innerText = sysJXYC_11["E20窑尾排风机负压设定2"];
            let current_espP = document.getElementById("current_espP");
            current_espP.innerText = sysJXYC_11["E20窑尾排风机袋收尘入口压力"];

            let set_idfanP = document.getElementById("set_idfanP");
            set_idfanP.innerText = sysJXYC_11["E20窑尾排风机转速设定"];
            let back_idfanP = document.getElementById("back_idfanP");
            back_idfanP.innerText = sysJXYC_11["E20窑尾排风机转速"];

        }
    };
    xmlhttp.open("GET","http://192.168.99.213:8080/Process/process.do?method=RD&process=raw&zh=ch",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_jxyc_dataRequest_fired(){
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
            let sysJXYC_K1 = dataObj.JXYC_K1;

            /*--------------设备运行状态------------*/
            device_runstate("coalmill_btn","K40煤立磨K40煤立磨",sysJXYC_K1);
            device_runstate("kiln_btn","F50回转窑F50回转窑",sysJXYC_K1);

            /*--------------脱硝APC回路-------------*/
            apc_loop_state("loop_TX","氨水泵APC脱硝控制",sysJXYC_K1);

            let target_TX = document.getElementById("target_TX");
            target_TX.innerText = sysJXYC_K1["氨水泵NOX设定"];
            let current_TX = document.getElementById("current_TX");
            current_TX.innerText = sysJXYC_K1["氨水泵NOX反馈"];
            let set_TX = document.getElementById("set_TX");
            set_TX.innerText = sysJXYC_K1["氨水泵氨水频率设定"];
            let back_TX = document.getElementById("back_TX");
            back_TX.innerText = sysJXYC_K1["氨水泵氨水频率反馈2"];


            /*--------------煤磨APC回路-------------*/
            apc_loop_state("loop_millCL","K40煤立磨APC产量控制",sysJXYC_K1);
            let target_millCL = document.getElementById("target_millCL");
            target_millCL.innerText = sysJXYC_K1["K40煤立磨电流设定"];
            let current_millCL = document.getElementById("current_millCL");
            current_millCL.innerText = sysJXYC_K1["K40煤立磨电流反馈"];
            let set_millCL = document.getElementById("set_millCL");
            set_millCL.innerText = sysJXYC_K1["K40煤立磨产量设定"];
            let back_millCL = document.getElementById("back_millCL");
            back_millCL.innerText = sysJXYC_K1["K40煤立磨实时产量"];


            apc_loop_state("loop_millTemp","K40煤立磨APC产量控制",sysJXYC_K1);
            let target_millTemp = document.getElementById("target_millTemp");
            target_millTemp.innerText = sysJXYC_K1["K40煤立磨煤磨温度设定"];
            let current_millTemp = document.getElementById("current_millTemp");
            current_millTemp.innerText = sysJXYC_K1["K40煤立磨煤磨温度反馈"];
            let set_millTemp = document.getElementById("set_millTemp");
            set_millTemp.innerText = sysJXYC_K1["K40煤立磨热风阀开度设定"];
            let back_millTemp = document.getElementById("back_millTemp");
            back_millTemp.innerText = sysJXYC_K1["K40煤立磨热风阀开度反馈"];

            let target_valve = document.getElementById("target_valve");
            target_valve.innerText = sysJXYC_K1["K40煤立磨阀门总开度设定"];
            let current_valve = document.getElementById("current_valve");
            current_valve.innerText = sysJXYC_K1["K40煤立磨阀门总开度反馈"];
            let set_valve = document.getElementById("set_valve");
            set_valve.innerText = sysJXYC_K1["K40煤立磨冷风阀开度设定"];
            let back_valve = document.getElementById("back_valve");
            back_valve.innerText = sysJXYC_K1["K40煤立磨冷风阀开度反馈"];

            /*--------------回转窑APC回路-------------*/
            apc_loop_state("loop_calTemp","尾煤秤APC尾煤控制",sysJXYC_K1);
            let target_calTemp = document.getElementById("target_calTemp");
            target_calTemp.innerText = sysJXYC_K1["尾煤秤分解炉温度设定"];
            let current_calTemp = document.getElementById("current_calTemp");
            current_calTemp.innerText = sysJXYC_K1["尾煤秤分解炉温度反馈"];
            let set_calTemp = document.getElementById("set_calTemp");
            set_calTemp.innerText = sysJXYC_K1["尾煤秤尾煤秤设定"];
            let back_calTemp = document.getElementById("back_calTemp");
            back_calTemp.innerText = sysJXYC_K1["尾煤秤尾煤秤反馈"];

            apc_loop_state("loop_fanP","头煤秤APC头煤控制",sysJXYC_K1);
            let target_fanP = document.getElementById("target_fanP");
            target_fanP.innerText = sysJXYC_K1["头煤秤罗茨风机出口压力设定"];
            let current_fanP = document.getElementById("current_fanP");
            let current_roomNOx = document.getElementById("current_roomNOx");
            current_roomNOx.innerText = sysJXYC_K1["头煤秤烟室NOX反馈"];
            current_fanP.innerText = sysJXYC_K1["头煤秤罗茨风机出口压力反馈"];
            let set_fanP = document.getElementById("set_fanP");
            set_fanP.innerText = sysJXYC_K1["头煤秤头煤秤设定"];
            let back_fanP = document.getElementById("back_fanP");
            back_fanP.innerText = sysJXYC_K1["头煤秤头煤秤反馈"];


            apc_loop_state("loop_coolrS","G10篦冷机APC篦速控制",sysJXYC_K1);
            let target_coolrS = document.getElementById("target_coolrS");
            target_coolrS.innerText = sysJXYC_K1["G10篦冷机层压设定"];
            let current_coolrS = document.getElementById("current_coolrS");
            current_coolrS.innerText = sysJXYC_K1["G10篦冷机层压反馈"];
            let set_coolrS = document.getElementById("set_coolrS");
            set_coolrS.innerText = sysJXYC_K1["G10篦冷机篦速设定"];
            let back_coolrS = document.getElementById("back_coolrS");
            back_coolrS.innerText = sysJXYC_K1["G10篦冷机篦速1"];


            apc_loop_state("loop_headfanS","G50窑头排风机APC头排转速",sysJXYC_K1);
            let target_headfanS = document.getElementById("target_headfanS");
            target_headfanS.innerText = sysJXYC_K1["G50窑头排风机窑头罩负压设定"];
            let current_headfanS = document.getElementById("current_headfanS");
            current_headfanS.innerText = sysJXYC_K1["G50窑头排风机窑头罩负压反馈"];
            let set_headfanS = document.getElementById("set_headfanS");
            set_headfanS.innerText = sysJXYC_K1["G50窑头排风机转速设定"];
            let back_headfanS = document.getElementById("back_headfanS");
            back_headfanS.innerText = sysJXYC_K1["G50窑头排风机转速"];
        }
    };
    xmlhttp.open("GET","http://192.168.99.213:8080/Process/process.do?process=fired&method=FiredRD",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function apc_loop_state(loop_btn,tagname,system){
    let loop = document.getElementById(loop_btn);
    let loop_data =system[tagname];
    if(loop_data === 0){
        loop.innerText = "手动";
        loop.style.backgroundColor='#FFFFFF';
    }
    if(loop_data === 1){
        loop.innerText = "自动";
        loop.style.backgroundColor='#00FF00';
    }
}

function device_runstate(state_btn,tagname,system){
    let state = document.getElementById(state_btn);
    let state_data =system[tagname];
    if(state_data===2||state_data===3){
        state.innerText = "运行";
        state.style.backgroundColor='#00FF00';
    }else {
        state.innerText = "停机";
        state.style.backgroundColor='#FFFFFF';
    }
    // return state;
}

function apc_jxyc_flush(){

    clearInterval(data_t1);
    apc_jxyc_dataRequest_raw();
    apc_jxyc_dataRequest_fired();
    data_t1 =setInterval(apc_jxyc_flush,3000);
}





















