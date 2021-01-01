// stores the varialbles in memory
var PLAY=1
var END=0
var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var bgroup,ogroup
var survivalTime=0;

function preload(){
 
 // loads the animations and image 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}

function setup() {

  //creates the canvas
  createCanvas(600,200);
  
  //monkey properties
  monkey=createSprite(50,160,20,20); 
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
  monkey.setCollider("circle",0,0,295);

  //creates group for banana and obstacle
   bgroup = createGroup();
   ogroup = createGroup();
 
// creates ground and invisble ground sprite
   ground=createSprite(300,195,600,10);
   iground=createSprite(300,198,600,1);
  
}


function draw() {

//gives background a colour  
  background("white");
 
//collides the monkey with ground  
 monkey.collide(ground);  
 
//propeties about survival time  
 stroke("black");
 textSize(20);
 fill("black");
 text("Survival Time: "+ survivalTime, 100,50); 
  
  if(gameState === PLAY){
     
    //monkey jumps when space key is pressed
    if (keyDown("space") && monkey.y > 155){
      monkey.velocityY = -12;
    }
   
   //survivaltime 
    survivalTime=survivalTime + Math.round(getFrameRate()/60);
   
   //when monkey touches obs gamestate change to end 
    if(monkey.isTouching(ogroup)){
    gameState = END;
    }  
    if(monkey.isTouching(bgroup)){
    bgroup.destroyEach();   
    }
  }
  else if(gameState === END){
    
    //stops the movement of obs & banana
    bgroup.setVelocityXEach(0);
    ogroup.setVelocityXEach(0);
  }
      
  //gives gravity
  monkey.velocityY = monkey.velocityY + 0.8;  
  monkey.setCollider("circle",0,0,285); 
  
  //spawns banana and obstacles
  spawnBananas();
  spawnobstacles();
  
  //draws the sprites
  drawSprites(); 
}

//functions for banana
function spawnBananas(){
 if(frameCount % 100 === 0 && gameState === PLAY){
    banana=createSprite(600,100,10,10);
    banana.addImage("banana",bananaImage); 
    banana.scale=0.1; 
    banana.velocityX=-5;
    banana.y=Math.round(random(120,160));
    banana.lifetime=-1;
    bgroup.add(banana);
 }
}

//functions for obstacles
function spawnobstacles(){
  if(frameCount % 120 === 0 && gameState === PLAY){
    obstacle=createSprite(600,175,20,20);
    obstacle.addImage("obstacle",obstaceImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.lifetime=-1;
    ogroup.add(obstacle);
    obstacle.setCollider("circle",0,0,198);
  }
}