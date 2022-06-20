var road, road_img 
var cat, cat_img 
var ground
var stone, stone_img 
var fish, fish_img

var score = 0

var gameover, gameoverImg
var restart, restartImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
road_img = loadImage("road.jpg")
cat_img = loadImage("cat.gif")
stone_img = loadImage("stone.gif")
fish_img = loadImage("f.gif")
gameoverImg = loadImage("G_O.jpg")
restartImg = loadImage("R.jpg")
}

function setup() {

createCanvas(550, 200)

road = createSprite(250, 120, 1200, 50)
road.addImage(road_img)
road.scale = 1.8
road.velocityX = -2

cat = createSprite(50, 120, 10, 10)
cat.addImage("running",cat_img)
cat.scale = 0.7

ground = createSprite(0, 200, 600, 10)
ground.visible = false

stonesGroup = createGroup();

fishesGroup = createGroup();

gameover = createSprite(300, 100, 10, 10)
gameover.addImage(gameoverImg)
gameover.scale = 0.5

restart = createSprite(50, 100, 10, 10)
restart.addImage(restartImg)
restart.scale = 0.1
}


function draw() {
 background("white")

if(gameState===PLAY){

        text("SCORE: "+score, 460, 13)
        
        if (keyDown("space")&&cat.y>=50){
                cat.velocityY = -12    
             }
        cat.velocityY = cat.velocityY + 0.8

        if (road.x < 200){
                road.x = road.width/2;
              }

        gameover.visible = false 
        restart.visible = false  

        if (frameCount%150===0){ 
                var rand = Math.round(random(1,2)); 
                if (rand===1){
                       stone = createSprite(550, 160, 10, 10)
                       stone.addImage(stone_img)    
                       stone.scale = 0.15
                       stone.velocityX = -3
                       stone.lifetime = 135  
                       stonesGroup.add(stone)
                }
                else if(rand===2){
                       fish = createSprite(550, 160, 10, 10)
                       fish.addImage(fish_img)    
                       fish.scale = 0.15
                       fish.velocityX = -3
                       fish.lifetime = 135
                       fishesGroup.add(fish)
                }
                }

        if (cat.isTouching(fishesGroup)){
           score = score+1
        }        

        if (cat.isTouching(stonesGroup)){
                gameState = END
        }    
}

else if (gameState===END){
gameover.visible = true
restart.visible = true    
} 
 
 cat.collide(ground)

 if(mousePressedOver(restart)) {
        reset();
      }     

 drawSprites() 
}

function reset(){
        gameState= PLAY
        fishesGroup.destroyEach()
        stonesGroup.destroyEach();   
        score = 0
}