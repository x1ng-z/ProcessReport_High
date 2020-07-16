
function table_total(){

    let total_table = [
        {system:"生料磨系统",
            loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-","-"]},
                {loopname:"2#磨产量",loopdata:["-","-","-","-","-"]}
            ]},
        {system:"回转窑系统",
            loop:[{loopname:"尾煤",loopdata:["-","-","-","-","-"]},
                {loopname:"头煤",loopdata:["-","-","-","-"]},
                {loopname:"窑速",loopdata:["-","-","-","-"]}
            ]},
        {system:"篦冷机系统",
            loop:[{loopname:"一段篦速",loopdata:["-","-","-","-","-"]},
                {loopname:"二段篦速",loopdata:["-","-","-","-"]},
                {loopname:"头排",loopdata:["-","-","-","-"]}
            ]},
        {system:"煤磨系统",
            loop:[{loopname:"1#磨产量",loopdata:["-","-","-","-"]},
                {loopname:"1#磨温度",loopdata:["-","-","-","-"]},
                {loopname:"2#磨产量",loopdata:["-","-","-","-"]},
                {loopname:"2#磨温度",loopdata:["-","-","-","-"]}
            ]},
        {system:"废气系统",
            loop:[{loopname:"尾排控制",loopdata:["-","-","-","-"]},
                {loopname:"脱硝控制",loopdata:["-","-","-","-"]}
            ]},
        {system:"余热系统",
            loop:[{loopname:"AQC高压水位",loopdata:["-","-","-","-"]},
                {loopname:"AQC低压水位",loopdata:["-","-","-","-"]},
                {loopname:"SPA水位",loopdata:["-","-","-","-"]},
                {loopname:"SPB水位",loopdata:["-","-","-","-"]},
                {loopname:"汽机负荷",loopdata:["-","-"]}
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
    ];

    let headhtml_1 = "<td rowspan='3' nowrap='ture'>区域</td><td rowspan='3' nowrap='ture'>生产线别</td>";
    let headhtml_2 = "";
    let headhtml_3 = "";
    let total_last = "<td colspan='2'>投用共计</td>";

    for(let i=0;i<total_table.length;i++){
        let looplength = total_table[i].loop.length;
        let system_cols = 0;

        for(let j=0;j<looplength;j++){
            let loopdatalength = total_table[i].loop[j].loopdata.length;
            system_cols += loopdatalength;

            if(loopdatalength===5){
                headhtml_2+="<td colspan=5>"+ total_table[i].loop[j].loopname +"</td>";
                headhtml_3+="<td>状态</td><td>设定值</td><td>反馈值</td><td>输出值</td><td>投用率</td>";
                total_last+="<td colspan=5></td>"
            }else if(loopdatalength===4){
                headhtml_2+="<td colspan=4>"+ total_table[i].loop[j].loopname +"</td>";
                headhtml_3+="<td>状态</td><td>设定值</td><td>反馈值</td><td>投用率</td>";
                total_last+="<td colspan=4></td>"
            }else{
                headhtml_2+="<td colspan=2>"+ total_table[i].loop[j].loopname +"</td>";
                headhtml_3+="<td>状态</td><td>投用率</td>";
                total_last+="<td colspan=2></td>"
            }
        }
        headhtml_1 +="<td colspan="+ system_cols +">"+total_table[i].system+"</td>";
    }

    let apc_all_head_1 = document.getElementById("apc_all_head_1");
    apc_all_head_1.innerHTML=headhtml_1;
    let apc_all_head_2 = document.getElementById("apc_all_head_2");
    apc_all_head_2.innerHTML=headhtml_2;
    let apc_all_head_3 = document.getElementById("apc_all_head_3");
    apc_all_head_3.innerHTML=headhtml_3;

    let total_using = document.getElementById("total_using");
    total_using.innerHTML = total_last;

    let sysLineArr = ["ZJLX_K1","ZJLX_K2","ZJLX_K3","HZJD_K1","HZJD_K2","HZTL_K1","HZQLS_K1",
        "JXGA_K1","JXGA_K2","JXHC_K1","JXYP_K1",
        "JXHY_K1","JXNY_K1","JXYZ_K1",
        "FJZP_K1","FJZP_K2","FJZP_K3","FJDT_K1",
        "SCLS_K1","SCLS_K2","SCJY_K1","SCCN_K1",
        "YNYL_K1","YNYL_K2","YNWLS_K1",
        "YNLL_K1","YNLL_K2","YNMX_K1",
        "YNNN_K1","YNCZ_K1","YNHQ_K1",
        "JTLZ_K1","JTKC_K1",
        "HWWX_K1","HWXW_K1"];

    for(let i=0;i<sysLineArr.length;i++){
        let sysLine = document.getElementById(sysLineArr[i]);
        table_create_td(total_table,sysLine);
    }

}

function table_simple(){

    let total_table = [
        {system:"生料磨系统",
            loop:[{loopname:"1#磨产量",loopdata:["-","-"]},
                {loopname:"2#磨产量",loopdata:["-","-"]}
            ]},
        {system:"回转窑系统",
            loop:[{loopname:"尾煤",loopdata:["-","-"]},
                {loopname:"头煤",loopdata:["-","-"]},
                {loopname:"窑速",loopdata:["-","-"]}
            ]},
        {system:"篦冷机系统",
            loop:[{loopname:"一段篦速",loopdata:["-","-"]},
                {loopname:"二段篦速",loopdata:["-","-"]},
                {loopname:"头排",loopdata:["-","-"]}
            ]},
        {system:"煤磨系统",
            loop:[{loopname:"1#磨产量",loopdata:["-","-"]},
                {loopname:"1#磨温度",loopdata:["-","-"]},
                {loopname:"2#磨产量",loopdata:["-","-"]},
                {loopname:"2#磨温度",loopdata:["-","-"]}
            ]},
        {system:"废气系统",
            loop:[{loopname:"尾排控制",loopdata:["-","-"]},
                {loopname:"脱硝控制",loopdata:["-","-"]}
            ]},
        {system:"余热系统",
            loop:[{loopname:"AQC高压水位",loopdata:["-","-"]},
                {loopname:"AQC低压水位",loopdata:["-","-"]},
                {loopname:"SPA水位",loopdata:["-","-"]},
                {loopname:"SPB水位",loopdata:["-","-"]},
                {loopname:"汽机负荷",loopdata:["-","-"]}
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

    let headhtml_1 = "<td rowspan='3' nowrap='ture'>区域</td><td rowspan='3' nowrap='ture'>生产线别</td>";
    let headhtml_2 = "";
    let headhtml_3 = "";
    let total_last = "<td colspan='2'>投用共计</td>";

    for(let i=0;i<total_table.length;i++){
        let looplength = total_table[i].loop.length;
        let system_cols = 0;

        for(let j=0;j<looplength;j++){
            let loopdatalength = total_table[i].loop[j].loopdata.length;
            system_cols += loopdatalength;

            headhtml_2+="<td colspan=2>"+ total_table[i].loop[j].loopname +"</td>";
            headhtml_3+="<td>状态</td><td>投用率</td>";
            total_last+="<td colspan=2></td>"
        }
        headhtml_1 +="<td colspan="+ system_cols +">"+total_table[i].system+"</td>";
    }

    let apc_all_head_1 = document.getElementById("apc_all_head_1");
    apc_all_head_1.innerHTML=headhtml_1;
    let apc_all_head_2 = document.getElementById("apc_all_head_2");
    apc_all_head_2.innerHTML=headhtml_2;
    let apc_all_head_3 = document.getElementById("apc_all_head_3");
    apc_all_head_3.innerHTML=headhtml_3;

    let total_using = document.getElementById("total_using");
    total_using.innerHTML = total_last;

    let sysLineArr = ["ZJLX_K1","ZJLX_K2","ZJLX_K3","HZJD_K1","HZJD_K2","HZTL_K1","HZQLS_K1",
        "JXGA_K1","JXGA_K2","JXHC_K1","JXYP_K1",
        "JXHY_K1","JXNY_K1","JXYZ_K1",
        "FJZP_K1","FJZP_K2","FJZP_K3","FJDT_K1",
        "SCLS_K1","SCLS_K2","SCJY_K1","SCCN_K1",
        "YNYL_K1","YNYL_K2","YNWLS_K1",
        "YNLL_K1","YNLL_K2","YNMX_K1",
        "YNNN_K1","YNCZ_K1","YNHQ_K1",
        "JTLZ_K1","JTKC_K1",
        "HWWX_K1","HWXW_K1"];

    for(let i=0;i<sysLineArr.length;i++){
        let sysLine = document.getElementById(sysLineArr[i]);
        table_create_td(total_table,sysLine);
    }

}

function table_create_td(table_Item,company_td) {
    for(let i=0;i<table_Item.length;i++){
        let looplength = table_Item[i].loop.length;
        for(let j=0;j<looplength;j++){
            let loopdatalength = table_Item[i].loop[j].loopdata.length;
            for(let k=0;k<loopdatalength;k++){
                let td_state =document.createElement("td");
                company_td.appendChild(td_state);
                td_state.width = 44+'px';
            }
        }
    }
}

function ToLinedata(line) {

    switch (line.innerText) {
        case "漳平3#":
            window.open("APC_FJZP3.html");
            break;
        case "永州":
            window.open("APC_HNYZ.html");
            break;
        default:
            break;
    }
}

function openApc_report(){
    window.open("APC_System/APC_Report.html");
}


/*----------点击table行加亮变色---------------*/

function ClickEvent() {
    let table = document.getElementById("apc_all_table_body");
    let trs = table.getElementsByTagName("tr");
    console.log("trs:",trs);
    for (let i = 0; i < trs.length; i++) {
        trs[i].onclick = TrOnClick;
    }
}

function TrOnClick() {
    let table = document.getElementById("apc_all_table_body");
    let trs = table.getElementsByTagName("tr");
    let sysLine = $(this).attr("id");

    for (let i = 0; i < trs.length; i++) {
        if(sysLine==="ZJLX_K1"||sysLine==="JXGA_K1"||sysLine==="JXHY_K1"||sysLine==="FJZP_K1"||sysLine==="SCLS_K1"||sysLine==="YNYL_K1"||
            sysLine==="YNLL_K1"||sysLine==="YNNN_K1"||sysLine==="JTLZ_K1"||sysLine==="JTKC_K1"||sysLine==="HWWX_K1") {
            for (let j = 1; j < trs[i].cells.length; j++) {
                if (trs[i] === this) {
                    trs[i].cells[j].style.background = "yellow";
                }
                else {
                    trs[i].cells[j-1].style.background = "";
                }
            }
        }
        else{
            for (let j = 0; j < trs[i].cells.length; j++) {
                if (trs[i] === this) {
                    trs[i].cells[j].style.background = "yellow";
                }
                else {
                    trs[i].cells[j].style.background = "";
                }
            }
        }

    }
}
