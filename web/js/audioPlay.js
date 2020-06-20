
function doTTS(audio_message) {

    var msg = new SpeechSynthesisUtterance(audio_message);
    msg.volume = 100;
    msg.rate = 1;
    msg.pitch = 1.5;
    window.speechSynthesis.speak(msg);
}

function connnectMsg(){
    if(window.WebSocket) {
        // var url = 'ws://172.16.22.107:61614';
        // console.log(document.location.hostname)
        var url = 'ws://'+document.location.hostname+':61614';
        var login = "admin";
        var passcode = "admin";
        var destination = "/topic/process";
        var client = Stomp.client(url);

        client.debug = function(str) {
            console.log(str);
            if( str.substring(0,6)=='Whoops'){
                //client.disconnect();

                client.connect(login, passcode, function (frame) {
                    // console.log(frame);
                    client.subscribe(destination, function (message) {
                        audio_message = message.body;
                        // console.log("audio_message:",audio_message);
                        doTTS(audio_message);
                    })
                }/* duration subscribe:{"activemq.subscriptionName": "procestest", "client-id": "procestest"}*/);



            }
        };
        client.connect(login, passcode, function (frame) {
            // console.log(frame);
            client.subscribe(destination, function (message) {
                audio_message = message.body;
                // console.log("audio_message:",audio_message);
                doTTS(audio_message);
                })
        }/* duration subscribe:{"activemq.subscriptionName": "procestest", "client-id": "procestest"}*/);
    }
}


/*
$(document).ready(function() {
    // localStorage.clear();
    if(window.WebSocket) {
        console.log(222222);
            var url = 'ws://172.16.22.107:61614';
            var login = "admin";
            var passcode = "admin";
            var destination = "/topic/event";
            var client = Stomp.client(url);

            client.connect(login, passcode, function () {
                client.subscribe(destination, function (message) {
                    audio_message = message.body;

                    doTTS(audio_message);
                }, {"activemq.subscriptionName": "procestest", "client-id": "procestest"});
            });
    }

});
*/

window.onbeforeunload = function () {
        client.disconnect(function() {
            audio_message="";
        });
}

/*
window.onbeforeunload=function(e){
    e=e||window.event;
    if(e){
        e.returnValue='确定退出吗？';

    }
    return'确定退出吗？';

};
*/
/*
window.onbeforeunload = function () {
    localStorage.setItem("onbeforeunload","window.beforeunload");
}
*/