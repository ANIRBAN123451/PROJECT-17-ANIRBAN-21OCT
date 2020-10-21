
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;

var score=0;
var points=0;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500);
  monkey=createSprite(150,250,10,10)
  monkey.addAnimation("monkey running",monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(450,284,900,10)
  ground.velocityX=-4;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
}


function draw() {
background("white")
textSize(12);
fill("Blue");
text("SURVIVAL TIME="+score,450,20);
text("BANANA POINTS="+points,250,20)
score=score+Math.round(getFrameRate()/60);
monkey.collide(ground);
if(gameState==PLAY){
ground.x=ground.width/2;
if(keyDown("space")){
  monkey.velocityY=-10;
}
if(monkey.y<-20){
  monkey.y=250;
}
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    points=points+1;
}
  monkey.velocityY=monkey.velocityY+0.5;
if(monkey.isTouching(obstacleGroup)){
  gameState=END;
}
obstacles();
food();
}else if(gameState==END){
  ground.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  score=0;
  point=0;
}
  drawSprites();
}

function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,250,10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.17;
    obstacle.lifetime=160;
    obstacleGroup.add(obstacle);
  }
}

function food(){
  if(frameCount%80===0){
    banana=createSprite(600,250,10,10);
    banana.addImage("food",bananaImage);
    banana.velocityX=-4;
    banana.y=Math.round(random(10,250))
    banana.scale=0.1;
    banana.lifetime=160;
    foodGroup.add(banana);
  }
}


