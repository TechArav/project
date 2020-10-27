
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600, 400);
  


  var survivalTime=0;
  
 
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
 
   monkey.scale=0.1
  
  ground = createSprite(400,400,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  

  FoodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  ground.visible=false
 
  
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)){
FoodGroup.destroyEach();
score=score+2;
  }
   
    if(keyDown("space")&& monkey.y>300 ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("red");
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);        
  
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
 
}



function spawnFood() {
  
  if (frameCount % 100 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(200,300);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    
     banana.addImage(bananaImage);
     banana.scale=0.09;
    
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,370,10,40);
    obstacle.velocityX = -6;
    
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
  
    
    obstacle.lifetime = 300;
    
    
    obstacleGroup.add(obstacle);
  }
}
