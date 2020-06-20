
/*------------------表格界面1,2,3跳转----------------------*/

function pagetable1(){
    window.location.href="Burning_Frame1.html";
}

function pagetable2(){
    window.location.href="Burning_Frame2.html";
}

function pagetable3(){
    window.location.href="Burning_Frame3.html";
}


/*------------------表格界面数据定时获取，刷新----------------------*/

var sldata_t1;
function burningdataRequest(){
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
            var sysZJLX_K1 = dataObj.ZJLX_K1;
            var name = document.getElementsByName("ZJLX_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysZJLX_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysZJLX_K2 = dataObj.ZJLX_K2;
            var name = document.getElementsByName("ZJLX_K2");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysZJLX_K2."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysZJLX_K3 = dataObj.ZJLX_K3;
            var name = document.getElementsByName("ZJLX_K3");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysZJLX_K3."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

//杭州区域
            var sysHZJD_K1 = dataObj.HZJD_K1;
            var name = document.getElementsByName("HZJD_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHZJD_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysHZJD_K2 = dataObj.HZJD_K2;
            var name = document.getElementsByName("HZJD_K2");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHZJD_K2."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysHZTL_K1 = dataObj.HZTL_K1;
            var name = document.getElementsByName("HZTL_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHZTL_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysHZQLS_K1 = dataObj.HZQLS_K1;
            var name = document.getElementsByName("HZQLS_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysHZQLS_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }


//江西区域
            var sysJXGA_K1 = dataObj.JXGA_K1;
            var name = document.getElementsByName("JXGA_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysJXGA_K1.回转窑台时1,sysJXGA_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysJXGA_K1.回转窑台时1,sysJXGA_K1.回转窑台时2)
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysJXGA_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysJXGA_K2 = dataObj.JXGA_K2;
            var name = document.getElementsByName("JXGA_K2");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysJXGA_K2.回转窑台时1,sysJXGA_K2.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysJXGA_K2.回转窑台时1,sysJXGA_K2.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysJXGA_K2."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysJXHC_K1 = dataObj.JXHC_K1;
            var name = document.getElementsByName("JXHC_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysJXHC_K1.回转窑台时1,sysJXHC_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysJXHC_K1.回转窑台时1,sysJXHC_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysJXHC_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysJXHY_K1 = dataObj.JXHY_K1;
            var name = document.getElementsByName("JXHY_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXHY_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysJXNY_K1 = dataObj.JXNY_K1;
            var name = document.getElementsByName("JXNY_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysJXNY_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysJXYZ_K1 = dataObj.JXYZ_K1;
            var name = document.getElementsByName("JXYZ_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysJXYZ_K1.回转窑台时1,sysJXYZ_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysJXYZ_K1.回转窑台时1,sysJXYZ_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysJXYZ_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysJXYP_K1 = dataObj.JXYP_K1;
            var name = document.getElementsByName("JXYP_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysJXYP_K1.回转窑台时1,sysJXYP_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysJXYP_K1.回转窑台时1,sysJXYP_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysJXYP_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

 //福建区域
            var sysFJZP_K1 = dataObj.FJZP_K1;
            var name = document.getElementsByName("FJZP_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysFJZP_K1.回转窑台时1,sysFJZP_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysFJZP_K1.回转窑台时1,sysFJZP_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysFJZP_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysFJZP_K2 = dataObj.FJZP_K2;
            var name = document.getElementsByName("FJZP_K2");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysFJZP_K2.回转窑台时1,sysFJZP_K2.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysFJZP_K2.回转窑台时1,sysFJZP_K2.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysFJZP_K2."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysFJZP_K3 = dataObj.FJZP_K3;
            var name = document.getElementsByName("FJZP_K3");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysFJZP_K3."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysFJDT_K1 = dataObj.FJDT_K1;
            var name = document.getElementsByName("FJDT_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysFJDT_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

//云南区域
            var sysYNYL_K1 = dataObj.YNYL_K1;
            var name = document.getElementsByName("YNYL_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNYL_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNYL_K2 = dataObj.YNYL_K2;
            var name = document.getElementsByName("YNYL_K2");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNYL_K2."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNCZ_K1 = dataObj.YNCZ_K1;
            var name = document.getElementsByName("YNCZ_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysYNCZ_K1.回转窑台时1,sysYNCZ_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysYNCZ_K1.回转窑台时1,sysYNCZ_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysYNCZ_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNMX_K1 = dataObj.YNMX_K1;
            var name = document.getElementsByName("YNMX_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysYNMX_K1.回转窑台时1,sysYNMX_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysYNMX_K1.回转窑台时1,sysYNMX_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysYNMX_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNNN_K1 = dataObj.YNNN_K1;
            var name = document.getElementsByName("YNNN_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNNN_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNLL_K1 = dataObj.YNLL_K1;
            var name = document.getElementsByName("YNLL_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if((sysYNLL_K1.回转窑台时1+sysYNLL_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = sysYNLL_K1.回转窑台时1+sysYNLL_K1.回转窑台时2;
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysYNLL_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNLL_K2 = dataObj.YNLL_K2;
            var name = document.getElementsByName("YNLL_K2");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysYNLL_K2.回转窑台时1,sysYNLL_K2.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysYNLL_K2.回转窑台时1,sysYNLL_K2.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysYNLL_K2."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNHQ_K1 = dataObj.YNHQ_K1;
            var name = document.getElementsByName("YNHQ_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysYNHQ_K1.回转窑台时1,sysYNHQ_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysYNHQ_K1.回转窑台时1,sysYNHQ_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysYNHQ_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysYNWLS_K1 = dataObj.YNWLS_K1;
            var name = document.getElementsByName("YNWLS_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysYNWLS_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

//四川区域
            var sysSCLS_K1 = dataObj.SCLS_K1;
            var name = document.getElementsByName("SCLS_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysSCLS_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysSCLS_K2 = dataObj.SCLS_K2;
            var name = document.getElementsByName("SCLS_K2");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysSCLS_K2."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysSCJY_K1 = dataObj.SCJY_K1;
            var name = document.getElementsByName("SCJY_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysSCJY_K1.回转窑台时1,sysSCJY_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysSCJY_K1.回转窑台时1,sysSCJY_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysSCJY_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysSCCN_K1 = dataObj.SCCN_K1;
            var name = document.getElementsByName("SCCN_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }else{
                    var value = eval("sysSCCN_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

//集团直属
            var sysJTKC_K1 = dataObj.JTKC_K1;
            var name = document.getElementsByName("JTKC_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysJTKC_K1.回转窑台时1,sysJTKC_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysJTKC_K1.回转窑台时1,sysJTKC_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysJTKC_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysJTLZ_K1 = dataObj.JTLZ_K1;
            var name = document.getElementsByName("JTLZ_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysJTLZ_K1.回转窑台时1,sysJTLZ_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysJTLZ_K1.回转窑台时1,sysJTLZ_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysJTLZ_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

//海外区域
            var sysHWWX_K1 = dataObj.HWWX_K1;
            var name = document.getElementsByName("HWWX_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysHWWX_K1.回转窑台时1,sysHWWX_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysHWWX_K1.回转窑台时1,sysHWWX_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysHWWX_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

            var sysHWXW_K1 = dataObj.HWXW_K1;
            var name = document.getElementsByName("HWXW_K1");
            for(var i=0;i<name.length; i++){
                var subtag=name[i].title;
                if(name[i].title==null ||name[i].title==""){
                    delete name[i].title;
                }
                else if(name[i].title=="回转窑台时1"){
                    if(Math.max(sysHWXW_K1.回转窑台时1,sysHWXW_K1.回转窑台时2)<5){
                        name[i].innerHTML=0;
                    }else{
                        var tsTotal = Math.max(sysHWXW_K1.回转窑台时1,sysHWXW_K1.回转窑台时2);
                        name[i].innerHTML=Math.round(tsTotal*100)/100;
                    }
                }
                else{
                    var value = eval("sysHWXW_K1."+subtag);
                    name[i].innerHTML = Math.round(value*100)/100;
                }
            }

        }
    }
    xmlhttp.open("GET","process.do?process=fired&method=FiredRD",true);
    // xmlhttp.open("GET","http://192.168.10.212:8080/Process/process.do?process=fired&method=FiredRD",true);
    xmlhttp.overrideMimeType('text/json; charset=utf-8');
    xmlhttp.send();
}

function burningdataflush1(){

    clearInterval(sldata_t1);

    burningdataRequest();

    sldata_t1 =setInterval(burningdataflush1,3000);
}


















