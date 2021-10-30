var gameState = "PLAY";

var ghost, ghost_jump, ghost_standing;

var climberImg, climber,climbersGroup;

var doorImg, door, doorsGroup;

var towerImg, tower;

var spookySound;

var invisibleBlockGroup, invisibleBlock;

var score;

function preload(){
  
ghost_jump = loadImage("ghost-jumping.png");

ghost_standing = loadImage("ghost-standing.png");
  
climberImg = loadImage("climber.png");
  
doorImg = loadImage("door.png");
  
spookySound = loadSound("spooky.wav"); 
  
towerImg = loadImage("tower.png");
}



function setup(){
  createCanvas(600,600);

  spookySound.loop();
  score = 0;
 
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 0.3;
  
  ghost = createSprite(260,200,50,50);
  ghost.addImage("ghost",ghost_standing);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(220);  
  
  text("Puntaje"+ score, 260,200);
  fill("blue");
  textSize(20);
  
  if(gameState === "PLAY"){
    
    if(keyDown("space")){
      ghost.velocityY = -10;
      ghost.changeAnimation("jumping",ghost_jump);
    }
    if(keyDown("LEFT_ARROW")){
      ghost.velocityX = -2;
    }
    if(keyDown("RIGHT_ARROW"))
      ghost.velocityX = 2;
  }
  //gravedad  
  ghost.velocityY = ghost.velocityY+3;
  
  if(tower.y > 400){
    tower.y = 300;
  }

  spawnDoors();  
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "END";
  }
  
  
  drawSprites();
  

 if(gameState === "END"){
   background("black");
   stroke("yellow");
   fill("yellow");
   textSize(30);
   text("Game Over",260,200);
 }
} 
  function spawnDoors() {
    
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
  }


  
