document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#recordBtn').addEventListener('click', onRecordBtnClick);
document.querySelector('#playBtn').addEventListener('click', onPlayBtnClick);
document.querySelectorAll('.keycaps').forEach(button=>{
    button.addEventListener('transitionend',removeTransition);
})

let recordStartTime;
const recordedSounds = [];

function removeTransition(ev){
    console.log(ev.propertyName);
    if(ev.propertyName==='transform') this.classList.remove('playing');
}

function onKeyPress(ev) {
    let soundName;
    const key=document.querySelector(`div[data-key="${ev.code}"]`);
    switch (ev.code) {

    case 'Digit1':
        soundName = 'A2';
        break;
    case 'Digit2':
        soundName = 'B1';
        break;
    case 'Digit3':
        soundName = 'C3';
        break;
    case 'Digit4':
        soundName = 'C4';
        break;
    case 'Digit5':
        soundName = 'D2';
        break;
    case 'Digit6':
        soundName = 'E3';
        break;
    case 'Digit7':
        soundName = 'F4';
        break;
    case 'Digit8':
        soundName = 'G2';
        break;
    case 'Digit9':
        soundName = 'G4';
        break;
    case 'KeyQ':
        soundName = 'pianoA3';
        break;
    case 'KeyW':
        soundName = 'pianoA5';
        break;
    case 'KeyE':
        soundName = 'pianoB3';
        break;
    case 'KeyR':
        soundName = 'pianoC3';
        break;
    case 'KeyT':
        soundName = 'pianoC5';
        break;
    case 'KeyY':
        soundName = 'pianoD4';
        break;
    case 'KeyU':
        soundName = 'pianoE5';
        break;
    case 'KeyI':
        soundName = 'pianoF4';
        break;
    case 'KeyO':
        soundName = 'pianoG3';
        break;
    case 'KeyA':
        soundName = 'boom';
        break;
    case 'KeyS':
        soundName = 'clap';
        break;
    case 'KeyD':
        soundName = 'hihat';
        break;
    case 'KeyF':
        soundName = 'kick';
        break;
    case 'KeyG':
        soundName = 'openhat';
        break;
    case 'KeyH':
        soundName = 'ride';
        break;
    case 'KeyJ':
        soundName = 'snare';
        break;
    case 'KeyK':
        soundName = 'tink';
        break;
    case 'KeyL':
        soundName = 'tom';
        break;
    case 'KeyZ':
        soundName = 'guitarA2';
        break;
    case 'KeyX':
        soundName = 'guitarAs2';
        break;
    case 'KeyC':
        soundName = 'guitarB3';
        break;
    case 'KeyV':
        soundName = 'guitarB5';
        break;
    case 'KeyB':
        soundName = 'guitarC3';
        break;
    case 'KeyN':
        soundName = 'guitarD4';
        break;
    case 'KeyM':
        soundName = 'guitarE2';
        break;
    case 'Comma':
        soundName = 'guitarFs4';
        break;
    case 'Period':
        soundName = 'guitarG5';
        break;
    }
    if (soundName) {
        const soundTime = Date.now() - recordStartTime;
        const soundObj = {
            id: soundName, 
            time: soundTime
        };
        recordedSounds.push(soundObj);
        key.classList.add('playing');
        playSound(soundName);
    }
}

function onRecordBtnClick() {
    recordStartTime = Date.now();
    let light=document.querySelector('#light');
    light.classList.add('rec');
    light.classList.remove('play');
}
function onPlayBtnClick() {
    let light=document.querySelector('#light');
    light.classList.remove('rec');
    light.classList.add('play');
    for (let index = 0; index < recordedSounds.length; index++) {
        const soundObj = recordedSounds[index];
        setTimeout(
            () => {
                playSound(soundObj.id);
            },
            soundObj.time
        );
        
    }
}

function playSound(id) {
    const sound = document.querySelector('#' + id);
    sound.currentTime = 0;
    sound.play();
}