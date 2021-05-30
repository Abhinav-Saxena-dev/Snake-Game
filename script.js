let inputDir = {x:0, y:0};  
let speed = 9.7;
let lastpainttime=0;
let snakeArr= [
    { x:13, y:15 }
];
let food = {x: 12, y: 2}; // food is not an array, it will not grow like snake. so It's just a normal object.
let score=0;

// Game loop is a technique, render animations with changing state over time.  Use requestAnimationFrame. may also use setTimeout();

//Game Functions.

let main= (ctime) =>{
    
    window.requestAnimationFrame(main); // calling it from inside so as to make a game loop.
    // console.log(ctime); note that ctime is not declared anywhere, but on printing it, still prints milliseconds maybe.
    
    if((ctime-lastpainttime)/1000 < 1/speed){
        return; 
    }
    lastpainttime = ctime;
    gameEngine();
}
const isCollide= (snek) =>{
    for (let i = 1; i < snakeArr.length; i++){
        if(snek[i].x === snek[0].x && snek[i].y === snek[0].y){
            return true;
        }
    }
    if(snek[0].x >=18 || snek[0].x <=0 || snek[0].y >=18 || snek[0].y <=0 ){
            return true;
        }
}

let gameEngine= () =>{

    // part 1 : updating snake array and food.
      if(isCollide(snakeArr)){
          inputDir={x:0, y:0};
          alert("Game over, press any key to play again");
          snakeArr= [
            { x:13, y:15 }
        ];
        score=0;
      }
    
    // if food has been eaten.

       if(snakeArr[0].x=== food.x && snakeArr[0].y===food.y){
           snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
           food.x= Math.round(Math.random()*(16-2+1)) + 2;
           food.y= Math.round(Math.random()*(16-2+1)) + 2;
           if(speed < 15){
               speed= speed + 0.3;
           }
           score+=1;
           scor.innerHTML = "Score: "+ score;
           if(score > hs){
               hs=score;
               localStorage.setItem('hsc', hs);
           }
       }
    
    // Moving the Snake.

    for (let i = snakeArr.length-2; i >= 0; i--){
        // snakeArr[i+1]=snakeArr[i]; doing it like this is wrong. Referencing problem?
        snakeArr[i+1]= {...snakeArr[i]};
       }
      snakeArr[0].x+=inputDir.x;
      snakeArr[0].y+=inputDir.y;
    
    // part 2 : render the snake and food.
      //Snake display
       board.innerHTML = "";              // used ID directly without using get.
       snakeArr.forEach((e, index)=>{     // array.forEach(function(currentValue, index, arr), thisValue)
        let snakeElem = document.createElement('div');
        snakeElem.style.gridRowStart = e.y;                // gridRowStart and gridColumnStart determine from which line element will start.
        snakeElem.style.gridColumnStart= e.x;
        if(index === 0){
            snakeElem.classList.add("head");
        }
        else{
            snakeElem.classList.add("snake");
        }
        board.appendChild(snakeElem);   
       });
      
       // food display
       let foodelem= document.createElement('div');
       foodelem.style.gridRowStart= food.y;       
       foodelem.style.gridColumnStart= food.x;
       foodelem.classList.add('food');
       board.appendChild(foodelem);  

}






// Main Logic.

    let hscore= localStorage.getItem('hsc');
    let hs;
    if(hscore  === null){
        hs = 0;
        localStorage.setItem('hsc', JSON.stringify(hs));
    }
    else{
        hs = JSON.parse(hscore);
        Hiscor.innerHTML = "High Score: "+ hs;
    }

window.requestAnimationFrame(main); //this will call main function only once, so we are calling main from inside main which creates a game loop, basically recusrsion.

window.addEventListener('keydown',(e)=>{
   inputDir={x:0, y:0};
   switch(e.code){
       case 'ArrowUp':
       inputDir.x=0;
       inputDir.y=-1;
       break;
       case 'ArrowDown':
       inputDir.x=0;
       inputDir.y=1;
       break;
       case 'ArrowLeft':
       inputDir.x=-1;
       inputDir.y=0;
       break;
       case 'ArrowRight':
       inputDir.x=1;
       inputDir.y=0;
       break;

   }
});  