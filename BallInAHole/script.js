window.addEventListener('deviceorientation', onMobileMove);
let score = 0;
let holes = [];
let speedX = 0;
let speedY = 0;
let ball = document.querySelector('#ball');
AppInit();

/*function onDeviceOrientationChange(ev){
    console.log(ev);
}*/

function onMobileMove(ev){
    speedX = ev.alpha;
    speedY = ev.beta;
    MoveBall();
}

function MoveBall(){
    ball.style.left += speedX;
    ball.style.top += speedY;
    window.requestAnimationFrame(MoveBall);
}

function AppInit(){
    const ballStartXPos = Math.random() * window.innerWidth;
    const ballStartYPos = Math.random() * window.innerHeight;

    ball.style.left = ballStartXPos;
    ball.style.top = ballStartYPos;
}