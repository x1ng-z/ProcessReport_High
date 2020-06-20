var sldata_t1;
function rawdataRequest(){
    var xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var jsonObject = JSON.parse(xmlhttp.responseText);

             var dataObj = jsonObject.data;

//浙江区域
            var sysZJLX_11 = dataObj.ZJLX_11;
            var name = document.getElementsByName("ZJLX_11");
                for(var i=0;i<name.length; i++){
                    var subtag=name[i].title;
                    if(name[i].title==null ||name[i].title==""){
                        delete name[i].title;
                    }else{
                        var value = eval("sysZJLX_11."+subtag);
                        name[i].innerHTML =  Math.round(value*100)/100;
                    }
            }

            var sysZJLX_21 = dataObj.ZJLX_21;
            var name = document.getElementsByName("ZJLX_21");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysZJLX_21."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysZJLX_31 = dataObj.ZJLX_31;
            var name = document.getElementsByName("ZJLX_31");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysZJLX_31."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }


//杭州区域
            var sysHZJD_11 = dataObj.HZJD_11;
            var name = document.getElementsByName("HZJD_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHZJD_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysHZJD_21 = dataObj.HZJD_21;
            var name = document.getElementsByName("HZJD_21");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHZJD_21."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysHZTL_11 = dataObj.HZTL_11;
            var name = document.getElementsByName("HZTL_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHZTL_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

//江西区域
        var sysJXGA_11 = dataObj.JXGA_11;
            var name = document.getElementsByName("JXGA_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXGA_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJXGA_21 = dataObj.JXGA_21;
            var name = document.getElementsByName("JXGA_21");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXGA_21."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJXHC_11 = dataObj.JXHC_11;
            var name = document.getElementsByName("JXHC_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXHC_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJXHY_11 = dataObj.JXHY_11;
            var name = document.getElementsByName("JXHY_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXHY_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJXNY_11 = dataObj.JXNY_11;
            var name = document.getElementsByName("JXNY_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else{
                    var value = eval("sysJXNY_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJXYZ_11 = dataObj.JXYZ_11;
            var name = document.getElementsByName("JXYZ_11");
            for(var i=0;i<name.length; i++){
                  var subtag=name[i].title;
                  if(name[i].title==null ||name[i].title==""){
                     delete name[i].title;
                  }
                  else{
                      var value = eval("sysJXYZ_11."+subtag);
                      name[i].innerHTML =  Math.round(value*100)/100;
                            }
                        }

            var sysJXYZ_12 = dataObj.JXYZ_12;
            var name = document.getElementsByName("JXYZ_12");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
            else{
                    var value = eval("sysJXYZ_12."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJXYP_11 = dataObj.JXYP_11;
            var name = document.getElementsByName("JXYP_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXYP_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJXYP_12 = dataObj.JXYP_12;
            var name = document.getElementsByName("JXYP_12");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXYP_12."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

//福建区域
            var sysFJZP_11 = dataObj.FJZP_11;
            var name = document.getElementsByName("FJZP_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysFJZP_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysFJZP_21 = dataObj.FJZP_21;
            var name = document.getElementsByName("FJZP_21");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysFJZP_21."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysFJZP_31 = dataObj.FJZP_31;
            var name = document.getElementsByName("FJZP_31");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysFJZP_31."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysFJZP_32 = dataObj.FJZP_32;
            var name = document.getElementsByName("FJZP_32");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysFJZP_32."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysFJDT_11 = dataObj.FJDT_11;
            var name = document.getElementsByName("FJDT_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysFJDT_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

//云南区域
            var sysYNYL_11 = dataObj.YNYL_11;
            var name = document.getElementsByName("YNYL_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNYL_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNYL_21 = dataObj.YNYL_21;
            var name = document.getElementsByName("YNYL_21");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNYL_21."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNNN_11 = dataObj.YNNN_11;
            var name = document.getElementsByName("YNNN_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNNN_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNLL_11 = dataObj.YNLL_11;
            var name = document.getElementsByName("YNLL_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                } else{
                    var value = eval("sysYNLL_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNLL_21 = dataObj.YNLL_21;
            var name = document.getElementsByName("YNLL_21");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNLL_21."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNLL_22 = dataObj.YNLL_22;
            var name = document.getElementsByName("YNLL_22");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNLL_22."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNCZ_11 = dataObj.YNCZ_11;
            var name = document.getElementsByName("YNCZ_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNCZ_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNCZ_12 = dataObj.YNCZ_12;
            var name = document.getElementsByName("YNCZ_12");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNCZ_12."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNMX_11 = dataObj.YNMX_11;
            var name = document.getElementsByName("YNMX_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNMX_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNMX_12 = dataObj.YNMX_12;
            var name = document.getElementsByName("YNMX_12");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNMX_12."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysYNHQ_11 = dataObj.YNHQ_11;
            var name = document.getElementsByName("YNHQ_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNHQ_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

//四川区域
            var sysSCLS_11 = dataObj.SCLS_11;
            var name = document.getElementsByName("SCLS_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysSCLS_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysSCLS_21 = dataObj.SCLS_21;
            var name = document.getElementsByName("SCLS_21");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysSCLS_21."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysSCJY_11 = dataObj.SCJY_11;
            var name = document.getElementsByName("SCJY_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysSCJY_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysSCCN_11 = dataObj.SCCN_11;
            var name = document.getElementsByName("SCCN_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysSCCN_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

//集团直属
            var sysJTKC_11 = dataObj.JTKC_11;
            var name = document.getElementsByName("JTKC_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJTKC_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJTLZ_11 = dataObj.JTLZ_11;
            var name = document.getElementsByName("JTLZ_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJTLZ_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysJTLZ_12 = dataObj.JTLZ_12;
            var name = document.getElementsByName("JTLZ_12");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJTLZ_12."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

//海外区域
            var sysHWWX_11 = dataObj.HWWX_11;
            var name = document.getElementsByName("HWWX_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHWWX_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }

            var sysHWXW_11 = dataObj.HWXW_11;
            var name = document.getElementsByName("HWXW_11");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHWXW_11."+subtag);
                    name[i].innerHTML =  Math.round(value*100)/100;
                }
            }


        }
    }
    xmlhttp.open("GET","process.do?method=RD&process=raw",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?method=RD&process=raw",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function rawdataflush(){

    clearInterval(sldata_t1);

    rawdataRequest();

    sldata_t1 =setInterval(rawdataflush,3000);
}
















