var score =0;

var spaceShip,spaceShip2, laser, explosion, galaxy, alien;
var spaceShipImg,spaceShip2Img, laserImg, explosionImg, galaxyImg, alienImg;

var laserGroup;
var alienGroup;
var spaceShip2Group;

var life =3;
var score=0;
var gameState=1

function preload(){
  spaceShipImg = loadImage("spaceship.png");
  spaceShip2Img = loadImage("spaceship2.png");
  explosionImg = loadImage("explosion.gif");
  laserImg = loadImage("laser.png");
  galaxyImg= loadImage("galaxy.png");
  alienImg = loadImage("alien.png");
}
function setup() {
  createCanvas(800, 800);
  //galaxy = createSprite(50, 50, windowWidth,windowHeight);
  //galaxy.addImage(galaxyImg);
  
  spaceShip= createSprite(100, height-200, 50,50);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale=0.3;

  
  
  //alien= createSprite(100, height/2, 50,50);
  //alien.addImage(alienImg);
  //alien.scale=0.1;
  
  alienGroup = createGroup();   
  laserGroup = createGroup(); 
  spaceShip2Group = createGroup(); 
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(galaxyImg);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    spaceShip.x=mouseX

    if (frameCount % 80 === 0) {
      drawAlien();
    }

    if (frameCount % 100 === 0) {
      drawAlien();
    }

    if(frameCount % 250 === 0) {
      drawspaceShip2();
    }

    if(keyDown("space")){
      shootLaser();
    }

    if (alienGroup.collide(spaceShip)){
      handleGameover(alienGroup);
    }

    if (spaceShip2Group.collide(spaceShip)){
      handleGameover2(spaceShip2Group);
    }
    
    
    
    /*if(blueBubbleGroup.(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }*/

    /*if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision();
    }*/
    
    /*if(blueBubbleGroup.collide()){
      handleBubbleCollision(blueBubbleGroup);
    }*/
    
    if(alienGroup.collide(laserGroup)){
      handlealienCollision(alienGroup);
    }
    
    if(spaceShip2Group.collide(laserGroup)){
      handleGameover2(spaceShip2Group);
    }
   
    
    
    drawSprites();
  }
    
  
}

function drawAlien(){
  alien = createSprite(50,50,40,40);
  alien.addImage(alienImg);
  alien.x = Math.round(random(50,750));
  alien.scale = 0.1;
  alien.velocityY = 8;
  alien.lifetime = 400;
  alienGroup.add(alien);
}

function drawspaceShip2(){
  var spaceShip2 = createSprite(750,50,40,40);
  spaceShip2.addImage(spaceShip2Img);
  spaceShip2.y = Math.round(random(50,750));
  spaceShip2.scale = 0.2;
  spaceShip2.velocityX = -5;

  spaceShip2.lifetime = 400;
spaceShip2Group.add(spaceShip2);
}


function shootLaser(){
  laser= createSprite(150, width/2, 50,20);
  laser.y = spaceShip.y;
  laser.x= spaceShip.x;
  laser.addImage(laserImg);
  laser.scale=0.1;
  laser.velocityY= -7;
  laserGroup.add(laser);
}

function handlealienCollision(alienGroup){
    if (life > 0) {
       score=score+1;
    }

     explosion= createSprite(laser.x, laser.y-20, 50,50);
    explosion.addImage(explosionImg) 

    
    
    explosion.scale=0.8
    explosion.life=20
    laserGroup.destroyEach()
    alienGroup.destroyEach()
}

function handleGameover(alienGroup){
  
    life=life-1;
    alienGroup.destroyEach();

    
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
}

    function handleGameover2(spaceShip2Group){
  
      life=0;
      spaceShip2Group.destroyEach();
  
      
      
  
      if (life === 0) {
        gameState=2
        
        swal({
          title: `Game Over`,
          text: "Oops you lost the game....!!!",
          text: "Your Score is " + score,
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }
}
