var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zombieGroup = new Group()
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
 
  player.addImage(shooter_shooting)
 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

enemy()
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


