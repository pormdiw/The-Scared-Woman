var PLAY = 1;
var END = 0;
var gameState = PLAY;

var woman, woman_running;
var invisibleGround;
var obstacle;

var score;


function preload(){
  
    woman_running = loadImage("running woman animation.gif");
    obstacle = loadImage("Obstacle.png")
    backgroundImage = loadImage("Background.png")
}

function setup() {
  createCanvas(600, 200);
  
  woman = createSprite(50,180,20,50);
  woman.addAnimation("running", woman_running);
  woman.scale = 0.5;
  
  background = createSprite(200,180,400,20);
  background.addImage("background",backgroundImage);
  background.x = background.width /2;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  
  console.log("By Prince" + 13);
  
  woman.setCollider("circle",0,0,40);
  woman.debug = true
  
  score = 0
}

function draw() {
  //background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    //move the background
    background.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (background.x < 0){
      background.x = background.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& woman.y >=100) {
        woman.velocityY = -13;
    }
    
    //add gravity
    woman.velocityY = woman.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(woman)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      backgroundground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     
   }
  
    //stop woman from falling down
    woman.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle);
              break;
      case 2: obstacle.addImage(obstacle);
              break;
      case 3: obstacle.addImage(obstacle);
              break;
      case 4: obstacle.addImage(obstacle);
              break;
      case 5: obstacle.addImage(obstacle);
              break;
      case 6: obstacle.addImage(obstacle);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
