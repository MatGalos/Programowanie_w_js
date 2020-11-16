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
}
function onPlayBtnClick() {
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