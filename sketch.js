    //create variables
    var monkey , monkey_running
    var banana ,bananaImage, obstacle, obstacleImage
    var FoodGroup, obstacleGroup
    var score
    var SurvivalTime;
    var ground;
    var PLAY=1;
    var END=0;
    gameState=PLAY;
    
    function preload(){
    //load images
    var survivaltime=0;
    monkey_running =  
loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png     ","sprite_8.png"     )
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
    }

    function setup() {
    //create canvas
    createCanvas(600,400);
      
    //making monkey sprite
    monkey=createSprite(40,355,20,20);
    monkey.addAnimation("moving",monkey_running);
    monkey.scale=0.12;
      
    //making ground sprite
    ground = createSprite(300,395,600,10);
    ground.shapeColor="green";
   
    ground.x = ground.width/2;
      
    //create groups
    FoodGroup=createGroup();
    obstacleGroup=createGroup();
    }

    function draw() {
    //give blue to the background
    background("Lightblue");
     
    if(gameState===PLAY){
    //draw functions  
    Food();
    obstacles();
    ground.velocityX=-4;
    //when 'space' key is pressed make the monkey jump  
    if(keyDown("space")&&monkey.y>=300)
    {
    monkey.velocityY=-15;
    }
    //make the background infinite scrolling  
    if (ground.x < 300){
    ground.x = ground.width/2;
    }
    if(obstacleGroup.isTouching(monkey)){
    gameState=END; 
    ground.velocityX = 0;
    monkey.velocityY=0;  
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    }
    } 
      
    //add gravity 
    monkey.velocityY=monkey.velocityY+0.8;
      
    //add collision 
    monkey.collide(ground); 
      
    //create score   
    stroke("black");  
    fill("black");
    text("Survival Time:"+SurvivalTime,500,50);  
    SurvivalTime=Math.ceil(frameCount/10);
      
    //create sprites
    drawSprites();  
    }

    //create food 
    function Food(){
    if(frameCount%80===0){
    var banana=createSprite(600,300,100,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX=-3
    banana.scale = 0.1;
    banana.lifetime=200;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    } 
    }

    //create obstacle
    function obstacles(){
    if(frameCount%200===0){
    var obstacle=createSprite(400,355);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale = 0.18;
    obstacle.lifetime=190;
    obstacleGroup.add(obstacle);
    }  
    }





