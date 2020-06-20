
/*-----------------------弹出历史记录查询对话框界面---------------------------*/
function open_table() {
    var diag = new Dialog();
    diag.Width = 700;
    diag.Height = 610;
    diag.Title = "工艺参数变化记录";
    diag.URL = "teTable.html";
    diag.MsgForESC = "你确定要关闭当前对话框？";
    diag.show();
}

/*-----------------------主界面最近5条记录获取刷新---------------------------*/

function dataremove(tbodyID)
{

    var bodyObj11=document.getElementById(tbodyID);

    if(bodyObj11==null)
    {
        console.log("Body of Table not Exist!");
        return;
    }
    for (var i = 0; i < bodyObj11.rows.length; )
        bodyObj11.deleteRow(i);
}

var operateTable_t1;
function operateTableflush(){

    clearInterval(operateTable_t1);

    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            dataremove('operateTbody');

            var jsonObject = JSON.parse(xmlhttp.responseText);
            var operateObj = jsonObject.operatehistory;

            var splitArray = new Array();

            for(var i=0;i<operateObj.length;i++){
                var regex = /%/;
                splitArray=operateObj[i].split(regex);

                var sysNo= splitArray[1].charAt(splitArray[1].length-1);

                var tr=document.createElement('tr');
                var tdNo=document.createElement('td');
                var tdChatime=document.createElement('td');
                var tdProline=document.createElement('td');
                var tdDevicename=document.createElement('td');
                var tdTecpara=document.createElement('td');
                var tdOldPadata=document.createElement('td');
                var tdNewPadata=document.createElement('td');
                var tdOldElecuse=document.createElement('td');
                var tdNewElecuse=document.createElement('td');

                tdNo.innerHTML = i+1;
                tdChatime.innerHTML = splitArray[9].substring(5,19);
                tdProline.innerHTML = splitArray[0];
                if(sysNo==2){
                    tdDevicename.innerHTML = "2#"+splitArray[2];
                }else {
                    tdDevicename.innerHTML = splitArray[2];
                }
                tdTecpara.innerHTML = splitArray[3];
                tdOldPadata.innerHTML = splitArray[5];
                tdNewPadata.innerHTML = splitArray[6];
                tdOldElecuse.innerHTML = splitArray[7];
                tdNewElecuse.innerHTML = splitArray[8];

                tr.appendChild(tdNo);
                tr.appendChild(tdChatime);
                tr.appendChild(tdProline);
                tr.appendChild(tdDevicename);
                tr.appendChild(tdTecpara);
                tr.appendChild(tdOldPadata);
                tr.appendChild(tdNewPadata);
                tr.appendChild(tdOldElecuse);
                tr.appendChild(tdNewElecuse);

                var operateTbody =document.getElementById('operateTbody');
                operateTbody.appendChild(tr);
            }

        }
    }
    // xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    // xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    operateTable_t1 = setInterval(operateTableflush,30000);
}


/*-------------------Enter键执行查询按钮动作-----------------*/
document.onkeydown = function(e){
    if((e||event).keyCode==13){
        submit();
    }
}

/*-------------------查询按钮事件，提交时间，产线，设备名进行历史查询-----------------*/
var startdate;
var starttime;
var enddate;
var endtime;
var proline;
var praName;

function submit(){

    startdate = document.getElementById("startdate").value;
    starttime = document.getElementById("starttime").value;
    enddate = document.getElementById("enddate").value;
    endtime = document.getElementById("endtime").value;
    proline = document.getElementById("proline").value;
    praName = document.getElementById("praName").value;

    dataremove('rawHDtbody');

    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            var jsonObject = JSON.parse(xmlhttp.responseText);
            var operateObj = jsonObject.operatehistory;

            var splitArray = new Array();
            var hisNum = 1;

            for(var i=0;i<operateObj.length;i++){
                var regex = /%/;
                splitArray=operateObj[i].split(regex);

                var sysNo= splitArray[1].charAt(splitArray[1].length-1);

                if(proline==splitArray[0]&&praName==""){
                    var tr=document.createElement('tr');
                    var tdNo=document.createElement('td');
                    var tdChatime=document.createElement('td');
                    var tdProline=document.createElement('td');
                    var tdDevicename=document.createElement('td');
                    var tdTecpara=document.createElement('td');
                    var tdOldPadata=document.createElement('td');
                    var tdNewPadata=document.createElement('td');
                    var tdOldElecuse=document.createElement('td');
                    var tdNewElecuse=document.createElement('td');

                    tdNo.innerHTML = hisNum++;
                    tdChatime.innerHTML = splitArray[9];
                    tdProline.innerHTML = splitArray[0];
                    if(sysNo==2){
                        tdTecpara.innerHTML = "2#"+splitArray[2]+ splitArray[3];
                    }else {
                        tdTecpara.innerHTML = splitArray[2]+ splitArray[3];
                    }
                    // tdTecpara.innerHTML = splitArray[2]+ splitArray[3];
                    tdOldPadata.innerHTML = splitArray[5];
                    tdNewPadata.innerHTML = splitArray[6];
                    tdOldElecuse.innerHTML = splitArray[7];
                    tdNewElecuse.innerHTML = splitArray[8];

                    tr.appendChild(tdNo);
                    tr.appendChild(tdChatime);
                    tr.appendChild(tdProline);
                    tr.appendChild(tdDevicename);
                    tr.appendChild(tdTecpara);
                    tr.appendChild(tdOldPadata);
                    tr.appendChild(tdNewPadata);
                    tr.appendChild(tdOldElecuse);
                    tr.appendChild(tdNewElecuse);

                    var operateTbody =document.getElementById('rawHDtbody');
                    operateTbody.appendChild(tr);
                }
                if(praName==splitArray[2]&&proline==""){
                    var tr=document.createElement('tr');
                    var tdNo=document.createElement('td');
                    var tdChatime=document.createElement('td');
                    var tdProline=document.createElement('td');
                    var tdDevicename=document.createElement('td');
                    var tdTecpara=document.createElement('td');
                    var tdOldPadata=document.createElement('td');
                    var tdNewPadata=document.createElement('td');
                    var tdOldElecuse=document.createElement('td');
                    var tdNewElecuse=document.createElement('td');

                    tdNo.innerHTML = hisNum++;
                    tdChatime.innerHTML = splitArray[9].substring(5,19);
                    tdProline.innerHTML = splitArray[0];
                    if(sysNo==2){
                        tdDevicename.innerHTML = "2#"+splitArray[2];
                    }else {
                        tdDevicename.innerHTML = splitArray[2];
                    }
                    tdTecpara.innerHTML = splitArray[3];
                    tdOldPadata.innerHTML = splitArray[5];
                    tdNewPadata.innerHTML = splitArray[6];
                    tdOldElecuse.innerHTML = splitArray[7];
                    tdNewElecuse.innerHTML = splitArray[8];

                    tr.appendChild(tdNo);
                    tr.appendChild(tdChatime);
                    tr.appendChild(tdProline);
                    tr.appendChild(tdDevicename);
                    tr.appendChild(tdTecpara);
                    tr.appendChild(tdOldPadata);
                    tr.appendChild(tdNewPadata);
                    tr.appendChild(tdOldElecuse);
                    tr.appendChild(tdNewElecuse);

                    var operateTbody =document.getElementById('rawHDtbody');
                    operateTbody.appendChild(tr);
                }
                if(proline==splitArray[0]&&praName==splitArray[2]){
                    var tr=document.createElement('tr');
                    var tdNo=document.createElement('td');
                    var tdChatime=document.createElement('td');
                    var tdProline=document.createElement('td');
                    var tdDevicename=document.createElement('td');
                    var tdTecpara=document.createElement('td');
                    var tdOldPadata=document.createElement('td');
                    var tdNewPadata=document.createElement('td');
                    var tdOldElecuse=document.createElement('td');
                    var tdNewElecuse=document.createElement('td');

                    tdNo.innerHTML = hisNum++;
                    tdChatime.innerHTML = splitArray[9].substring(5,19);
                    tdProline.innerHTML = splitArray[0];
                    if(sysNo==2){
                        tdDevicename.innerHTML = "2#"+splitArray[2];
                    }else {
                        tdDevicename.innerHTML = splitArray[2];
                    }
                    tdTecpara.innerHTML = splitArray[3];
                    tdOldPadata.innerHTML = splitArray[5];
                    tdNewPadata.innerHTML = splitArray[6];
                    tdOldElecuse.innerHTML = splitArray[7];
                    tdNewElecuse.innerHTML = splitArray[8];

                    tr.appendChild(tdNo);
                    tr.appendChild(tdChatime);
                    tr.appendChild(tdProline);
                    tr.appendChild(tdDevicename);
                    tr.appendChild(tdTecpara);
                    tr.appendChild(tdOldPadata);
                    tr.appendChild(tdNewPadata);
                    tr.appendChild(tdOldElecuse);
                    tr.appendChild(tdNewElecuse);

                    var operateTbody =document.getElementById('rawHDtbody');
                    operateTbody.appendChild(tr);
                }

                if(proline==""&&praName==""){
                    var tr=document.createElement('tr');
                    var tdNo=document.createElement('td');
                    var tdChatime=document.createElement('td');
                    var tdProline=document.createElement('td');
                    var tdDevicename=document.createElement('td');
                    var tdTecpara=document.createElement('td');
                    var tdOldPadata=document.createElement('td');
                    var tdNewPadata=document.createElement('td');
                    var tdOldElecuse=document.createElement('td');
                    var tdNewElecuse=document.createElement('td');

                    tdNo.innerHTML = hisNum++;
                    tdChatime.innerHTML = splitArray[9].substring(5,19);
                    tdProline.innerHTML = splitArray[0];
                    if(sysNo==2){
                        tdDevicename.innerHTML = "2#"+splitArray[2];
                    }else {
                        tdDevicename.innerHTML = splitArray[2];
                    }
                    tdTecpara.innerHTML = splitArray[3];
                    tdOldPadata.innerHTML = splitArray[5];
                    tdNewPadata.innerHTML = splitArray[6];
                    tdOldElecuse.innerHTML = splitArray[7];
                    tdNewElecuse.innerHTML = splitArray[8];

                    tr.appendChild(tdNo);
                    tr.appendChild(tdChatime);
                    tr.appendChild(tdProline);
                    tr.appendChild(tdDevicename);
                    tr.appendChild(tdTecpara);
                    tr.appendChild(tdOldPadata);
                    tr.appendChild(tdNewPadata);
                    tr.appendChild(tdOldElecuse);
                    tr.appendChild(tdNewElecuse);

                    var operateTbody =document.getElementById('rawHDtbody');
                    operateTbody.appendChild(tr);
                }

            }
        }
    }
    // xmlhttp.open("GET","process.do?method=HD&process=raw&start="+startdate+" "+starttime+"&end="+enddate+" "+endtime,true);
    xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=HD&process=raw&start="+startdate+" "+starttime+"&end="+enddate+" "+endtime,true);
    // xmlhttp.open("GET","process.do?method=HD&process=raw&start="+startdate+" "+starttime+"&end="+enddate+" "+endtime,true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}