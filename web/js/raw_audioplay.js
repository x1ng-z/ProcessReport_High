
function raw_doTTS(siloLevel_audio_mess) {

    var siloLevelArr = siloLevel_audio_mess;

    for(var i=0;i<siloLevelArr.length;i++){

        var raw_audio_mess = siloLevelArr[i].name_ch +"生料均化库位:"+ siloLevelArr[i].value +",库位过低,请注意";

        console.log("raw_audio_mess:",raw_audio_mess);

        var msg = new SpeechSynthesisUtterance(raw_audio_mess);

        msg.volume = 100;
        msg.rate = 1;
        msg.pitch = 1.5;
        window.speechSynthesis.speak(msg);
    }
}