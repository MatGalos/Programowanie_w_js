import snowFlake from './snowFlakes.js';
export default class FlakesCreator{
    constructor(flakesNumber,flakesSpeed, flakesFallingRadius, windowWidth,windowHeight){
        this.flakesArray = [];
        this.flakesNumber = flakesNumber;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.flakesFallingRadius = flakesFallingRadius;
        this.flakesSpeed = flakesSpeed;
    }

    createFlakes(){
        const rand = Math;
        for(let i = 0; i< this.flakesNumber; i++){
            const randomXPosition = rand.random() * this.windowWidth;
            const randomYPosition = rand.random() * this.windowHeight;
            const randomRadius = rand.floor(rand.random() * (10 - 1)) + 1;
            const randomFallingRadius = rand.random() * this.flakesFallingRadius;
            const randomSpeed = rand.random() * this.flakesSpeed;
            const flake = new snowFlake(randomXPosition,randomYPosition,randomRadius,randomFallingRadius,randomSpeed);
            this.flakesArray.push(flake);
        }
    }
    getFlakes(){
        return this.flakesArray;
    }
}