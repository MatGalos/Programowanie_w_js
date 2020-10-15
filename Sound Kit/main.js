document.body.addEventListener('keypress',onkeypress)
document.querySelector('#recordBtn').addEventListener('click'.onRecordButton());
document.querySelector('#playBtn').addEventListener('click'.onPlayButton());

let recordedSound=[];
let recordStartTime;

function onkeypress(ev){
    let soundId;
    switch (ev.code){
        case 'KeyA':
            soundId='boom';
            break;
        case 'KeyS':
            soundId='clap';
            break;
        case 'KeyD':
            soundId='hihat';
            break;
        case 'KeyF':
            soundId='kick';
            break;
    }
    if(soundId){
        const soundTime=Date.now()-recordStartTime;
        const sound=document.querySelector('#'+soundId);
        const soundObj=[soundId,soundTime]
        sound.play();
        recordedSound.push(soundObj);
    }
}

function onRecordButton(){
    recordedSound=Date.now;
}

function onPlayButton(){
    const soundId=recordedSound[5][0];
    const soundTime=recordedSound[5][1];
}