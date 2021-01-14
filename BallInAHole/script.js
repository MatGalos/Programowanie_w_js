let canvas=document.getElementById('canvas');
let windowHeight=window.innerHeight;
let windowWidth=window.innerWidth;
let bestTime;
appInit();
alert('Celem gry jest wpadnięcie do 99 dziur. Najlepszy czas: '+bestTime+
' Naciśnij ok aby uruchomić gre');
let holeAmmount=99;
let context=canvas.getContext('2d');
let startTime=Date.now();
let points=0;
let ball= {
    x:windowWidth/2,
    y:windowHeight/2,
    radius:15,
    speedX:0,
    speedY:0,
};
let position={
    initialAlpha:0,
    initialBeta:0,
    alpha:0,
    beta:0,
};
let holes = createHoles();
moveBall(0,0);
window.addEventListener('deviceorientation',getPosition);

function createHoles(){
    let array=[];
    for(let i=0;i<holeAmmount;i++){
        let y=Math.random()*windowHeight;
        let x=Math.random()*windowWidth;
        if((Math.abs(x-ball.x))<50){
            if((Math.abs(y-ball.y))<50){
                y+=70;
            }
            else x+=70;
            if ( x <= 26 )
            x+=25;
            if( windowWidth - 26 < x)
            x-=25;
            if ( y <= 26 )
            y+= 25;
            if ( windowHeight - 26 < y)
            y-=25;
        }
        let hole={
            x:x,
            y:y,
            radius:25,
        };
        array.push(hole);
    }
    return array;
}

function onMobileMove(ev){
    speedX = ev.alpha;
    speedY = ev.beta;
    moveBall();
}

function moveBall(){
    if(holes.length==0){
        end(true);
    }
    else if(ball.x>windowWidth+200 || ball.x<0-200 || ball.y>windowHeight+200||ball.y<0-200) end(false);
    let vertical=(position.beta-position.initialBeta)/30;
    let horizontal=(position.alpha-position.initialBeta)/30;
    ball.x+=horizontal*ball.speedX;
    ball.y+=vertical*ball.speedY;
    context.clearRect(0,0,windowWidth,windowHeight);
    collisions(holes);
    drawHoles(context,holes);
    context.beginPath();
    context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    context.fillStyle='black';
    context.fill();
}

function drawHoles(context,holes){
    let index=0;
        for(const hole of holes){
            context.beginPath()
            context.arc(hole.x,hole.y,hole.radius,0,Math.PI*2);
            if(index==holes.length-1) context.fillStyle='blue';
            else if (index==holes.length-2) context.fillStyle='red';
            else context.fillStyle='rgba(255, 255, 255, 0.5)';
            context.fill();
            index++;
        }
}

function collisions(holesArray){
    let index=0;
    for(const hole of holesArray){
        if(Math.abs(ball.x-hole.x)<=ball.radius+hole.radius &&Math.abs(ball.y-hole.y)<=ball.radius+hole.radius){
            if(index==holesArray.length-1){
                let newArray=holes.filter(i =>i!==hole);
                holes=newArray;
                console.log(points);
                points++;
            }
            else if(index==holesArray.length-2){
                if(Math.abs(ball.x-hole.x)<=hole.radius&& Math.abs(ball.y-hole.y)<=hole.radius){
                    end(false,points);
                }
            }
        }
        index++;
    }
}

function getPosition(ev){
    position.alpha=ev.alpha;
    position.beta=ev.beta;
    calculateSpeed();
}

function calculateSpeed(){
    ball.speedX=1+Math.abs((position.alpha-position.initialAlpha)/35);
    ball.speedY=1+Math.abs((position.beta-position.initialBeta)/35);
}

function appInit(){
    resizeCanvas();
    if(localStorage.getItem('bestTime')){
        let temp=localStorage.getItem('bestTime');
        bestTime=`${Math.floor(temp/60)}:${(temp%60).toFixed(0)}`;
    }
    else bestTime='00:00';
}

function resizeCanvas(){
    canvas.width=windowWidth;
    canvas.height=windowHeight;
}

let interval=setInterval(()=>{
    moveBall();
},1000/60)

function end(isWon,points){
    clearInterval(interval);
    window.removeEventListener('deviceorientation',getPosition);
    if(isWon==true){
        let stopTime=Date.now();
        let playtime=(stopTime-startTime)/1000;
        let output=`${Math.floor(playtime/60)}:${(playtime%60).toFixed(0)}`;
        if(playtime<bestTime||bestTime=='00:00'){
            localStorage.setItem('bestTime',playtime);
        }
        alert('Wpadłeś do wszystkich 99 dziur, gratulacje! zajeło ci to '+output+" minut. Naciśnij ok aby zacząć nową grę");
        location.reload();
    }
    else{
        alert('koniec gry. Uzyskałeś '+points+' punktów. Naciśnij ok aby rozpocząć ponownie.');
        location.reload();
    }
}