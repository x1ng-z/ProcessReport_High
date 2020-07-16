
/*-------全表与简表界面跳转---------*/
function table_select_total() {
    let target = "APC_ALL.html";
    window.location.replace(target);
}

function table_select_simple() {
    let target = "APC_ALL_Simple.html";
    window.location.replace(target);
}

/*-------table单元格数据刷新填充---------*/

function apc_all_dataflush(sysLine,table_Item){
    let apc_all_table_head = document.getElementById("apc_all_table_head");
    let apc_all_table_body = document.getElementById("apc_all_table_body");
    apc_all_table_body.width = apc_all_table_head.offsetWidth;

    let table_data=[];
    for(let i=0;i<table_Item.length;i++){
        let looplength = table_Item[i].loop.length;
        for(let j=0;j<looplength;j++){
            let loopdatalength = table_Item[i].loop[j].loopdata.length;
            for(let k=0;k<loopdatalength;k++){
                let cell_data = table_Item[i].loop[j].loopdata[k];
                table_data.push(td_text_deal(cell_data));
            }
        }
    }

    let apc_all_head_1 = document.getElementById("apc_all_head_1");
    let ZJLX_K1_line = document.getElementById("ZJLX_K1");
    for(let i=0;i<2;i++){
        ZJLX_K1_line.cells[i].width = apc_all_head_1.cells[i].offsetWidth-2;
    }

    let cells_length = [];
    let apc_all_head_3 = document.getElementById("apc_all_head_3");

    for(let i=0; i< apc_all_head_3.cells.length; i++){
        let cell_length = apc_all_head_3.cells[i].offsetWidth;
        cells_length.push(cell_length);
    }

    // console.log(apc_all_head_1);
    // console.log(apc_all_head_3);

    let sysLine_row = document.getElementById(sysLine);
    if(sysLine==="ZJLX_K1"||sysLine==="JXGA_K1"||sysLine==="JXHY_K1"||sysLine==="FJZP_K1"||sysLine==="SCLS_K1"||sysLine==="YNYL_K1"||
       sysLine==="YNLL_K1"||sysLine==="YNNN_K1"||sysLine==="JTLZ_K1"||sysLine==="JTKC_K1"||sysLine==="HWWX_K1"){

        for(let i=2;i<sysLine_row.cells.length;i++){
            sysLine_row.cells[i].width = cells_length[i-2];
            sysLine_row.cells[i].innerText = table_data[i-2];

            if(table_data[i-2]==="手动"){
                sysLine_row.cells[i].style.color="#ff0000";
            }
            if(table_data[i-2]==="自动"){
                sysLine_row.cells[i].style.color="#0e9c67";
            }
        }

    }else{
        for(let i=1;i<sysLine_row.cells.length;i++){
            sysLine_row.cells[i].width = cells_length[i-1];
            sysLine_row.cells[i].innerText = table_data[i-1];

    if(table_data[i-1]==="手动"){
        sysLine_row.cells[i].style.color="#ff0000";
    }
    if(table_data[i-1]==="自动"){
        sysLine_row.cells[i].style.color="#0e9c67";
    }

}
}

}


function total_use_flush(use_cols_Arr) {

    let total_using = document.getElementById("total_using");

    for(let i=0;i<use_cols_Arr.length;i++){
        let total_use = 0;
        for(let j=0;j<use_cols_Arr[i].length;j++){
            if(use_cols_Arr[i][j] === "自动"){
                total_use++;
            }
        }
        total_using.cells[i+1].innerText = total_use;
        total_using.cells[i].style.borderColor = "#1a529d"
    }
}


/*-------结果数据为undefined&null时处理---------*/
function td_text_deal(td_text) {
    if(td_text===undefined||td_text==="null"){
        td_text = "-";
    }
    return td_text;
}

/*-------回路状态结果处理---------*/
function apc_loop_state(tagname,system){
    let loop_state="";
    let loop_data = eval("system."+tagname);
    if(loop_data === 0){
        loop_state = "手动";
    } else{
        loop_state = "自动";
    }
    return loop_state;
}

/*-------回路值获取-------*/
function apc_loop_value(tagname,system){
    return eval("system."+ tagname);
}

/*-------余热回路状态结果处理-------*/
function apc_loop_state_yure(tagname1,tagname2,system){
    let loop_state="";
    let loop_data1 = eval("system."+tagname1);
    let loop_data2 = eval("system."+tagname2);
    let loop_data = loop_data1 + loop_data2;
    if(loop_data === 0||loop_data === 1){
        loop_state = "手动";
    }else{
        loop_state = "自动";
    }
    return loop_state;
}


