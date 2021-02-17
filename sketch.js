var backImage,backgr;
var player, player_running;
var ground,ground_img;
var food, foodImg;
var foodGroup;
var rock, rockImg;
var rockGroup;
var score;
var gameOver, gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  foodImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png")




}

function setup() {
  createCanvas(800,460);
  
  backgr=createSprite(0,-150,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,240,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,250,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400, 230, 1,1);
  gameOver.addImage(gameOverImg);

  rockGroup = new Group();
  foodGroup = new Group();

  score = 0;
  
}

function draw() { 
  background(0);

  textSize(20);
  text("Score: "+ score, 40, 450);


  if(gameState===PLAY){

    gameOver.visible = false;
  
  if(backgr.x<100){
   backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score+2
      player.scale = +0.1;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    player.collide(rockGroup);

    spawnFood();
    spawnObstacles();

    if(rockGroup.isTouching(player)){
      gameState = END;
    }

  }   else if (gameState === END) {
    backgr.velocityX = 0;

    player.visible = false;
    gameOver.visible = true;
   
   foodGroup.destroyEach();
   rockGroup.destroyEach();
 }

  drawSprites();
}

function spawnFood(){
  if (frameCount % 250 === 0) {
    food = createSprite(400,100,40,10);
    food.y = Math.round(random(50,100));
    food.addImage(foodImg);
    food.scale = 0.04;
    food.velocityY = 2;
    food.velocityX = -4;
    
    food.lifetime = 200;

    foodGroup.add(food);
  
    }

}

function spawnObstacles(){
  if (frameCount % 200 === 0) {
    rock = createSprite(800,100,40,10);
    rock.y = Math.round(random(230,230));
    rock.addImage(rockImg);
    rock.scale = 0.1;
    rock.velocityX = -4;
    
    rock.lifetime = 200;

    rockGroup.add(rock);
  
    }
}
