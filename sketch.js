var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var heart1, heart2,heart3;
var heart1Img, heart2Img,heart3Img;
var bulletGroup;
var bullets = 31;
var bullet;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.5;
   player.debug = true
   player.setCollider("rectangle",0,0,300,300);

heart1 = createSprite(displayWidth-150,40,20,20);
heart1.addImage(heart1Img);
  heart1.scale = 0.4;
  heart1.visible = false

heart2 = createSprite(displayWidth-100,40,20,20);
heart2.addImage(heart2Img);
   heart2.scale = 0.4;
   heart2.visible = false

heart3 = createSprite(displayWidth-150,40,20,20);
heart3.addImage(heart3Img);
    heart3.scale = 0.4;

zombieGroup = new Group()
bulletGroup = new Group()
}

function draw() {
  background(0); 




  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10);
  bullet.velocityX = 30;
  bulletGroup.add(bullet);
  player.depth = bullet.depth;
  player.depth = player.depth+2;
  player.addImage(shooter_shooting)
  bullets = bullets -1;
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

enemy()

if (zombieGroup.isTouching(bulletGroup)) {
  for(var i=0;i < zombieGroup.length;i++) {
    if (zombieGroup[i].isTouching(bulletGroup)) {
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
    }
  }
  
}

if (zombieGroup.isTouching(player)) {
  for(var i=0;i < zombieGroup.length;i++) {
    if (zombieGroup[i].isTouching(player)) {
      zombieGroup[i].destroy()
    }
  }

}

drawSprites();

}

function enemy() {
  if (frameCount%70==0) {
    zombie = createSprite(random(500,1100),random(200,500),40,40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.22;
    zombie.velocityX = -3;
    zombie.setCollider("rectangle", 0,0,400,400,400);
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }


}


