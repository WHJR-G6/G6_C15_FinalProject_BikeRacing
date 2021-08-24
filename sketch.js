var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2,op1,op2,op3

var END =0;
var PLAY =1;
var gameState = PLAY;
var ridergroup;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  gm=loadImage("gameOver.png");
  opp1=loadAnimation("opponent1.png","opponent2.png");
  opp2=loadAnimation("opponent7.png","opponent8.png");
}

function setup(){
  
createCanvas(600,800);
  
// Moving background
path=createSprite(100,250);
path.scale=2
path.addImage(pathImg);
path.velocityX = -7;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("stop",mainRacerImg2);
//mainCyclist.debug = true;
mainCyclist.setCollider("circle",0,0,600)
  
mainCyclist.scale=0.1;
  
//opponent.addImage(opp2Img)
 ridergroup=new Group()
  
  gameOver=createSprite(300,300);
  gameOver.addImage(gm);
  gameOver.visible =false;
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;

   distance = distance + Math.round(getFrameRate()/60);
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  riders()  
    
    if(ridergroup.isTouching(mainCyclist)){
      gameState=END;
    }
 }
  
  if(gameState === END){
    gameOver.visible = true;
  path.velocityX = 0;
    textSize(20);
    mainCyclist.velocityY=0;
    mainCyclist.changeAnimation("stop",mainRacerImg2)
  }
  
}

function riders(){
  if (frameCount%130===0){
    var rider=createSprite(800,random(100,500))
    rider.velocityX=-6
    var r = Math.round(random(1,2))
    if(r==1){
      rider.addAnimation("running",opp1) 
    }
    else{
      rider.addAnimation("running",opp2) 
    }
    //rider.debug=true;
    rider.setCollider("circle",0,0,600)
    rider.scale=0.1
    rider.lifetime=300
    ridergroup.add(rider)
  }
}
