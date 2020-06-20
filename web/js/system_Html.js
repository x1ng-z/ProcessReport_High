
var obj_Raw_system;

function raw_system(){
    var target = "Raw_Vision.html";
    if (obj_Raw_system == null || obj_Raw_system.closed) {
        obj_Raw_system = window.open(target);
    } else {
        obj_Raw_system.location.replace(target);
    }
}

var obj_Burning_system;

function burning_system(){
    var target = "Burning_Vision.html";
    if (obj_Burning_system == null || obj_Burning_system.closed) {
        obj_Burning_system = window.open(target);
    } else {
        obj_Burning_system.location.replace(target);
    }
}


var obj_S28day_system;

function S28day_system(){
    var target = "S28.html";
    if (obj_S28day_system == null || obj_S28day_system.closed) {
        obj_S28day_system = window.open(target);
    } else {
        obj_S28day_system.location.replace(target);
    }
}


function open_Raw_system_set() {
    var diag = new Dialog();
    diag.Width = 320;
    diag.Height = 200;
    diag.Left=10;
    diag.Top=10;
    diag.Title = "生料系统设置";
    diag.URL = "Raw_System_set.html";
    // diag.MsgForESC = "你确定要关闭当前对话框？";
    diag.show();
}

function open_Burning_system_set() {
    var diag = new Dialog();
    diag.Width = 320;
    diag.Height = 200;
    diag.Left=10;
    diag.Top=10;
    diag.Title = "烧成系统设置";
    diag.URL = "Burning_System_set.html";
    // diag.MsgForESC = "你确定要关闭当前对话框？";
    diag.show();
}



var welcom_diag;

function open_Welcome(welcom_diag) {
    welcom_diag = new Dialog();
    welcom_diag.Width = 500;
    welcom_diag.Height = 200;
    welcom_diag.Left=550;
    welcom_diag.Top=200;
    welcom_diag.Title = "欢迎界面";
    welcom_diag.URL = "Welcome.html";
    // diag.MsgForESC = "你确定要关闭当前对话框？";
    welcom_diag.show();
    return welcom_diag;
}

function close_Welcome(){
    var dialog = open_Welcome(welcom_diag);
    console.log("dialog:",dialog);
    dialog.close();

}



