
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

var datatable_t1;
function datatable_flush(){

    clearInterval(datatable_t1);

    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            dataremove('real28data_tbody');
            dataremove('hispre28data_tbody');

            var jsonObject = JSON.parse(xmlhttp.responseText);
            var realdataObj = jsonObject.real;
            var historydataObj = jsonObject.history;

            var splitArr_real = new Array();
            var splitArr_history = new Array();
            var regex = /%/;

            for(var i=0;i<realdataObj.length;i++){

                splitArr_real=realdataObj[i].split(regex);

                var tr=document.createElement('tr');
                var td_TIME=document.createElement('td');
                var td_LOSS=document.createElement('td');
                var td_SIO2=document.createElement('td');
                var td_AL2O3=document.createElement('td');
                var td_FE2O3=document.createElement('td');
                var td_CAO=document.createElement('td');
                var td_MGO=document.createElement('td');
                var td_FCAO=document.createElement('td');
                var td_KH=document.createElement('td');
                var td_KH1=document.createElement('td');
                var td_N=document.createElement('td');
                var td_P=document.createElement('td');
                var td_C3S=document.createElement('td');
                var td_C2S=document.createElement('td');
                var td_C3A=document.createElement('td');
                var td_C4AF=document.createElement('td');
                var td_28daypre=document.createElement('td');

                td_TIME.innerHTML =splitArr_real[0];
                td_LOSS.innerHTML =splitArr_real[1];
                td_SIO2.innerHTML =splitArr_real[2];
                td_AL2O3.innerHTML = splitArr_real[3];
                td_FE2O3.innerHTML = splitArr_real[4];
                td_CAO.innerHTML = splitArr_real[5];
                td_MGO.innerHTML = splitArr_real[6];
                td_FCAO.innerHTML = splitArr_real[7];
                td_KH.innerHTML = splitArr_real[8];
                td_KH1.innerHTML = splitArr_real[9];
                td_N.innerHTML = splitArr_real[10];
                td_P.innerHTML = splitArr_real[11];
                td_C3S.innerHTML = splitArr_real[12];
                td_C2S.innerHTML = splitArr_real[13];
                td_C3A.innerHTML = splitArr_real[14];
                td_C4AF.innerHTML = splitArr_real[15];
                td_28daypre.innerHTML = splitArr_real[17];


                td_LOSS.style.backgroundColor="rgba(233,233,233,0.2)";
                td_SIO2.style.backgroundColor="rgba(233,233,233,0.2)";
                td_AL2O3.style.backgroundColor="rgba(233,233,233,0.2)";
                td_FE2O3.style.backgroundColor="rgba(233,233,233,0.2)";
                td_CAO.style.backgroundColor="rgba(233,233,233,0.2)";
                td_MGO.style.backgroundColor="rgba(233,233,233,0.2)";
                td_FCAO.style.backgroundColor="rgba(233,233,233,0.2)";
                td_28daypre.style.backgroundColor ="rgba(233,233,233,0.2)";

                tr.appendChild(td_TIME);
                tr.appendChild(td_LOSS);
                tr.appendChild(td_SIO2);
                tr.appendChild(td_AL2O3);
                tr.appendChild(td_FE2O3);
                tr.appendChild(td_CAO);
                tr.appendChild(td_MGO);
                tr.appendChild(td_FCAO);
                tr.appendChild(td_KH);
                tr.appendChild(td_KH1);
                tr.appendChild(td_N);
                tr.appendChild(td_P);
                tr.appendChild(td_C3S);
                tr.appendChild(td_C2S);
                tr.appendChild(td_C3A);
                tr.appendChild(td_C4AF);
                tr.appendChild(td_28daypre);

                var realTbody =document.getElementById('real28data_tbody');
                realTbody.appendChild(tr);
            }

            for(var i=0;i<historydataObj.length;i++) {

                splitArr_history = historydataObj[i].split(regex);

                var tr = document.createElement('tr');
                var td_TIME = document.createElement('td');
                var td_LOSS = document.createElement('td');
                var td_SIO2 = document.createElement('td');
                var td_AL2O3 = document.createElement('td');
                var td_FE2O3 = document.createElement('td');
                var td_CAO = document.createElement('td');
                var td_MGO = document.createElement('td');
                var td_FCAO = document.createElement('td');
                var td_KH = document.createElement('td');
                var td_KH1 = document.createElement('td');
                var td_N = document.createElement('td');
                var td_P = document.createElement('td');
                var td_C3S = document.createElement('td');
                var td_C2S = document.createElement('td');
                var td_C3A = document.createElement('td');
                var td_C4AF = document.createElement('td');
                var td_28dayreal = document.createElement('td');
                var td_28daypre = document.createElement('td');
                var td_rate = document.createElement('td');

                td_TIME.style.width ="8%";
                td_LOSS.style.width ="5%";  td_LOSS.style.backgroundColor="rgba(233,233,233,0.2)";
                td_SIO2.style.width ="5%";  td_SIO2.style.backgroundColor="rgba(233,233,233,0.2)";
                td_AL2O3.style.width ="5%"; td_AL2O3.style.backgroundColor="rgba(233,233,233,0.2)";
                td_FE2O3.style.width ="5%"; td_FE2O3.style.backgroundColor="rgba(233,233,233,0.2)";
                td_CAO.style.width ="5%";   td_CAO.style.backgroundColor="rgba(233,233,233,0.2)";
                td_MGO.style.width ="5%";   td_MGO.style.backgroundColor="rgba(233,233,233,0.2)";
                td_FCAO.style.width ="5%";  td_FCAO.style.backgroundColor="rgba(233,233,233,0.2)";
                td_KH.style.width ="5.5%";
                td_KH1.style.width ="5.5%";
                td_N.style.width ="5%";
                td_P.style.width ="5%";
                td_C3S.style.width ="5.5%";
                td_C2S.style.width ="5%";
                td_C3A.style.width ="5.3%";
                td_C4AF.style.width ="5%";
                td_28dayreal.style.width ="6%";
                td_28daypre.style.width ="6%";
                td_rate.style.width ="6%";   td_rate.style.backgroundColor ="rgba(233,233,233,0.2)";

                var rate;
                if(splitArr_history[16]==0){
                    rate ="NULL";
                }else{
                    rate = splitArr_history[17]-splitArr_history[16];
                }

                td_TIME.innerHTML = splitArr_history[0];
                td_LOSS.innerHTML = splitArr_history[1];
                td_SIO2.innerHTML = splitArr_history[2];
                td_AL2O3.innerHTML = splitArr_history[3];
                td_FE2O3.innerHTML = splitArr_history[4];
                td_CAO.innerHTML = splitArr_history[5];
                td_MGO.innerHTML = splitArr_history[6];
                td_FCAO.innerHTML = splitArr_history[7];
                td_KH.innerHTML = splitArr_history[8];
                td_KH1.innerHTML = splitArr_history[9];
                td_N.innerHTML = splitArr_history[10];
                td_P.innerHTML = splitArr_history[11];
                td_C3S.innerHTML = splitArr_history[12];
                td_C2S.innerHTML = splitArr_history[13];
                td_C3A.innerHTML = splitArr_history[14];
                td_C4AF.innerHTML = splitArr_history[15];
                td_28dayreal.innerHTML = splitArr_history[16];
                td_28daypre.innerHTML = splitArr_history[17];
                td_rate.innerHTML = Math.round(rate*100)/100;

                tr.appendChild(td_TIME);
                tr.appendChild(td_LOSS);
                tr.appendChild(td_SIO2);
                tr.appendChild(td_AL2O3);
                tr.appendChild(td_FE2O3);
                tr.appendChild(td_CAO);
                tr.appendChild(td_MGO);
                tr.appendChild(td_FCAO);
                tr.appendChild(td_KH);
                tr.appendChild(td_KH1);
                tr.appendChild(td_N);
                tr.appendChild(td_P);
                tr.appendChild(td_C3S);
                tr.appendChild(td_C2S);
                tr.appendChild(td_C3A);
                tr.appendChild(td_C4AF);
                tr.appendChild(td_28dayreal);
                tr.appendChild(td_28daypre);
                tr.appendChild(td_rate);

                var hispreTbody =document.getElementById('hispre28data_tbody');
                hispreTbody.appendChild(tr);
            }

        }
    }

    xmlhttp.open("GET","process.do?method=quality",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=quality",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();

    datatable_t1 = setInterval(datatable_flush,10000);
}
