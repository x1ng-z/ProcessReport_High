

function jsonread(){
    var jsondata = null;
    // $(document).ready(function () {
        $.ajax({
            url: 'js/data.json',
            async: false,
            success: function (data) {

                jsondata = data.data;
                // console.log(jsondata);
            }
        });


       jsondata[0].C1_out_negpre1="00";
       // console.log(jsondata[0].C1_out_negpre1);


    // });
}

function re_wrJson(){
    var fso,file_json,open_json,read_json;
    fso=new ActiveXObject("Scripting.FileSystemObject");

    file_json=fso.CreateTextFile("../js/test.txt",true);
}
