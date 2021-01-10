import FlakesCreator from './creator.js';

const canvas = document.getElementById('canvas');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const context = canvas.getContext('2d');
const flakesNumber = Math.floor(Math.random()*1000)+1;
const flakesSpeed = Math.floor(Math.random()*50)+1;
const flakesFallingRadius = Math.floor(Math.random()*6-4)+1;;
const flakesCreator = new FlakesCreator(flakesNumber,flakesSpeed, flakesFallingRadius, width,height);
flakesCreator.createFlakes();
const flakesArray = flakesCreator.getFlakes();
const rand = Math;

function animation(){
    context.clearRect(0,0,width,height);
    for(const [index,flake] of flakesArray.entries()){
        context.beginPath();
        const xMove = 1+flake.fallingRadius;
        const yMove = 1+flake.speed;
        context.arc(flake.positionOfX+=xMove, flake.positionOfY+=yMove,flake.radius,0,Math.PI*2);
        if(flake.positionOfX > width || flake.positionOfY > height){
            flakesArray[index].positionOfX = rand.floor(rand.random() * (width)-1/16*width);
            flakesArray[index].positionOfY = 0;
        }
        context.fillStyle = '#ffffff';
        context.fill();
    }
    requestAnimationFrame(animation);
}
requestAnimationFrame(animation);