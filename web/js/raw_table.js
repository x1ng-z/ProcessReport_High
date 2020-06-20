
/*-----------------------弹出历史记录查询对话框界面---------------------------*/
function open_rawtable() {
    var diag = new Dialog();
    diag.Width = 700;
    diag.Height = 610;
    diag.Title = "参数变化及报警记录";
    diag.URL = "Raw_Tetable.html";
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

var raw_alop_Table_t1;
function raw_alop_flush(){

    clearInterval(raw_alop_Table_t1);

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
            var jsonObj = jsonObject.operatehistory;

            var  opeArr = new Array();
            var operateObj = new Array();

            for(var i=0;i<jsonObj.length;i++){
                var regex = /%/;
                opeArr=jsonObj[i].split(regex);
                if(opeArr[5]!=="0.0"&&opeArr[6]!=="0.0"){
                    operateObj.push({td_Chatime:opeArr[1], td_Proline:opeArr[2], td_Devicename:opeArr[3], td_Tecpara:opeArr[4], td_OldPadata:opeArr[5], td_NewPadata:opeArr[6], td_Alarmtype:opeArr[7]});
                }
            }

            function sortValue_time(a,b){
                // return Date.parse(b.td_Chatime.replace(/-/g,"/"))-Date.parse(a.td_Chatime.replace(/-/g,"/"));
                return Date.parse(b.td_Chatime)-Date.parse(a.td_Chatime);
            }
            operateObj.sort(sortValue_time);

            for(var i=0;i<6;i++){

                var tr=document.createElement('tr');
                var tdNo=document.createElement('td');
                var tdChatime=document.createElement('td');
                var tdProline=document.createElement('td');
                var tdDevicename=document.createElement('td');
                var tdTecpara=document.createElement('td');
                var tdOldPadata=document.createElement('td');
                var tdNewPadata=document.createElement('td');
                var tdAlarmtype=document.createElement('td');

                tdNo.innerHTML = i+1;
                tdChatime.innerHTML = operateObj[i].td_Chatime.substring(5,19);
                tdProline.innerHTML = operateObj[i].td_Proline;
                tdDevicename.innerHTML = operateObj[i].td_Devicename;
                tdTecpara.innerHTML = operateObj[i].td_Tecpara;
                tdOldPadata.innerHTML = operateObj[i].td_OldPadata;
                tdNewPadata.innerHTML = operateObj[i].td_NewPadata;
                if(operateObj[i].td_Alarmtype==0){
                    tdAlarmtype.innerHTML = "低低报";
                    tr.style.backgroundColor="rgba(245,78,76,0.5)";
                }
                if(operateObj[i].td_Alarmtype==1){
                    tdAlarmtype.innerHTML = "低报";
                    tr.style.backgroundColor="rgba(248,167,78,0.5)";
                }
                if(operateObj[i].td_Alarmtype==2){
                    tdAlarmtype.innerHTML = "高报";
                    tr.style.backgroundColor="rgba(248,167,78,0.5)";
                }
                if(operateObj[i].td_Alarmtype==3){
                    tdAlarmtype.innerHTML = "高高报";
                    tr.style.backgroundColor="rgba(245,78,76,0.5)";
                }
                if(operateObj[i].td_Alarmtype==10){
                    tdAlarmtype.innerHTML = "操作";
                }

                tr.appendChild(tdNo);
                tr.appendChild(tdChatime);
                tr.appendChild(tdProline);
                tr.appendChild(tdDevicename);
                tr.appendChild(tdTecpara);
                tr.appendChild(tdOldPadata);
                tr.appendChild(tdNewPadata);
                tr.appendChild(tdAlarmtype);

                var operateTbody =document.getElementById('operateTbody');
                operateTbody.appendChild(tr);

            }

        }
    }
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    raw_alop_Table_t1 = setInterval(raw_alop_flush,30000);
}


/*-------------------Enter键执行查询按钮动作-----------------*/
document.onkeydown = function(e){
    if((e||event).keyCode==13){
        submit();
    }
}

/*-------------------查询按钮事件，提交时间，产线，设备名进行历史查询-----------------*/
var startdate,starttime;
var enddate,endtime;
var operatebox,alarmbox;
var proline,praName;

function submit(){

    startdate = document.getElementById("startdate").value;
    starttime = document.getElementById("starttime").value;
    enddate = document.getElementById("enddate").value;
    endtime = document.getElementById("endtime").value;
    operatebox = document.getElementById("opratefilebox").checked;
    alarmbox = document.getElementById("alarmfilebox").checked;

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
            var operateArr = new Array();
            var alarmArr = new Array();
            var allArr = new Array();

            for(var i=0;i<operateObj.length;i++){
                var regex = /%/;
                splitArray=operateObj[i].split(regex);

                if(splitArray[7]=="10"){
                    operateArr.push(operateObj[i]);
                } else{
                    alarmArr.push(operateObj[i]);
                }
                allArr.push(operateObj[i]);
            }

//操作记录+报警记录
            if(operatebox==true&&alarmbox==true){
                tablecontent(allArr);
            }

//操作记录
            if(operatebox==true&&alarmbox==false){
                tablecontent(operateArr);
            }

//报警记录
            if(operatebox==false&&alarmbox==true){
                tablecontent(alarmArr);
            }

//无
            if(operatebox==false&&alarmbox==false){
                alert("未查询到相关结果！");
            }

        }
    }
    xmlhttp.open("GET","process.do?method=HD&process=raw&start="+startdate+" "+starttime+"&end="+enddate+" "+endtime,true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=HD&process=raw&start="+startdate+" "+starttime+"&end="+enddate+" "+endtime,true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function tablecontent(dataArr){
    startdate = document.getElementById("startdate").value;
    starttime = document.getElementById("starttime").value;
    enddate = document.getElementById("enddate").value;
    endtime = document.getElementById("endtime").value;

    proline = document.getElementById("proline").value;
    praName = document.getElementById("praName").value;

    var prolineReg = new RegExp(proline);
    var praNameReg = new RegExp(praName);
    var dataNum1 = 1;
    var dataNum2 = 1;
    var dataNum3 = 1;
    var dataNum4 = 1;

    var SplitArr = new Array();
    for(var i=0;i<dataArr.length;i++) {
        var regex = /%/;
        SplitArr = dataArr[i].split(regex);

        var tr = document.createElement('tr');
        var tdNo = document.createElement('td');
        var tdChatime = document.createElement('td');
        var tdProline = document.createElement('td');
        var tdDevicename = document.createElement('td');
        var tdTecpara = document.createElement('td');
        var tdOldPadata = document.createElement('td');
        var tdNewPadata = document.createElement('td');
        var tdAlarmtype = document.createElement('td');

        if (SplitArr[2].match(prolineReg) && praName == "") {
            tdNo.innerHTML = dataNum1++;
            tdChatime.innerHTML = SplitArr[1].substring(5, 19);
            tdProline.innerHTML = SplitArr[2];
            tdDevicename.innerHTML = SplitArr[3];
            tdTecpara.innerHTML = SplitArr[4];
            tdOldPadata.innerHTML = SplitArr[5];
            tdNewPadata.innerHTML = SplitArr[6];
            if(SplitArr[7]==0){
                tdAlarmtype.innerHTML = "低低报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==1){
                tdAlarmtype.innerHTML = "低报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==2){
                tdAlarmtype.innerHTML = "高报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==3){
                tdAlarmtype.innerHTML = "高高报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==10){
                tdAlarmtype.innerHTML = "操作";
            }

            tr.appendChild(tdNo);
            tr.appendChild(tdChatime);
            tr.appendChild(tdProline);
            tr.appendChild(tdDevicename);
            tr.appendChild(tdTecpara);
            tr.appendChild(tdOldPadata);
            tr.appendChild(tdNewPadata);
            tr.appendChild(tdAlarmtype);

            var operateTbody = document.getElementById('rawHDtbody');
            operateTbody.appendChild(tr);
        }
        if (SplitArr[3].match(praNameReg) && proline == "") {
            tdNo.innerHTML = dataNum2++;
            tdChatime.innerHTML = SplitArr[1].substring(5, 19);
            tdProline.innerHTML = SplitArr[2];
            tdDevicename.innerHTML = SplitArr[3];
            tdTecpara.innerHTML = SplitArr[4];
            tdOldPadata.innerHTML = SplitArr[5];
            tdNewPadata.innerHTML = SplitArr[6];
            if(SplitArr[7]==0){
                tdAlarmtype.innerHTML = "低低报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==1){
                tdAlarmtype.innerHTML = "低报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==2){
                tdAlarmtype.innerHTML = "高报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==3){
                tdAlarmtype.innerHTML = "高高报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==10){
                tdAlarmtype.innerHTML = "操作";
            }

            tr.appendChild(tdNo);
            tr.appendChild(tdChatime);
            tr.appendChild(tdProline);
            tr.appendChild(tdDevicename);
            tr.appendChild(tdTecpara);
            tr.appendChild(tdOldPadata);
            tr.appendChild(tdNewPadata);
            tr.appendChild(tdAlarmtype);

            var operateTbody = document.getElementById('rawHDtbody');
            operateTbody.appendChild(tr);
        }
        if (SplitArr[2].match(prolineReg) && SplitArr[3].match(praNameReg)) {
            tdNo.innerHTML = dataNum3++;
            tdChatime.innerHTML = SplitArr[1].substring(5, 19);
            tdProline.innerHTML = SplitArr[2];
            tdDevicename.innerHTML = SplitArr[3];
            tdTecpara.innerHTML = SplitArr[4];
            tdOldPadata.innerHTML = SplitArr[5];
            tdNewPadata.innerHTML = SplitArr[6];
            if(SplitArr[7]==0){
                tdAlarmtype.innerHTML = "低低报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==1){
                tdAlarmtype.innerHTML = "低报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==2){
                tdAlarmtype.innerHTML = "高报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==3){
                tdAlarmtype.innerHTML = "高高报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==10){
                tdAlarmtype.innerHTML = "操作";
            }

            tr.appendChild(tdNo);
            tr.appendChild(tdChatime);
            tr.appendChild(tdProline);
            tr.appendChild(tdDevicename);
            tr.appendChild(tdTecpara);
            tr.appendChild(tdOldPadata);
            tr.appendChild(tdNewPadata);
            tr.appendChild(tdAlarmtype);

            var operateTbody = document.getElementById('rawHDtbody');
            operateTbody.appendChild(tr);
        }

        if (proline == "" && praName == "") {
            tdNo.innerHTML = dataNum4++;
            tdChatime.innerHTML = SplitArr[1].substring(5, 19);
            tdProline.innerHTML = SplitArr[2];
            tdDevicename.innerHTML = SplitArr[3];
            tdTecpara.innerHTML = SplitArr[4];
            tdOldPadata.innerHTML = SplitArr[5];
            tdNewPadata.innerHTML = SplitArr[6];
            if(SplitArr[7]==0){
                tdAlarmtype.innerHTML = "低低报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==1){
                tdAlarmtype.innerHTML = "低报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==2){
                tdAlarmtype.innerHTML = "高报";
                tr.style.backgroundColor="rgba(248,167,78,0.5)";
            }
            if(SplitArr[7]==3){
                tdAlarmtype.innerHTML = "高高报";
                tr.style.backgroundColor="rgba(245,78,76,0.5)";
            }
            if(SplitArr[7]==10){
                tdAlarmtype.innerHTML = "操作";
            }

            tr.appendChild(tdNo);
            tr.appendChild(tdChatime);
            tr.appendChild(tdProline);
            tr.appendChild(tdDevicename);
            tr.appendChild(tdTecpara);
            tr.appendChild(tdOldPadata);
            tr.appendChild(tdNewPadata);
            tr.appendChild(tdAlarmtype);

            var operateTbody = document.getElementById('rawHDtbody');
            operateTbody.appendChild(tr);
        }
    }
}