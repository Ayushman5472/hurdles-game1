
class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player2 = createSprite(300,200);
    players = [player1, player2];

    InvisibleGround = createSprite(100,500,displayWidth*5, displayHeight*5)
    InvisibleGround.visible = false
    InvisibleGround2 = createSprite(100,500,displayWidth*5, displayHeight*5)
    InvisibleGround2.visible = false

    player1.addImage(playerImage)
    player2.addImage(playerImage)
  }

  play(){
    form.hide();
    distance.html(player.name+":"+player.distance)
   
    Player.getPlayerInfo();
    player.getRank();
    
    if(allPlayers !== undefined){
    background(trackImage)
      image(trackImage2,0,displayHeight,displayWidth*2,displayHeight*5)
      player1.collide(InvisibleGround)
      player2.collide(InvisibleGround2)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        if(player.distance<3400){
        players[index-1].x = x;
        players[index-1].y = y;
        } 
        if (index === player.index){
          stroke(12)
          fill("red")
          ellipse(x,y,100,100)
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.distance<3400){
      player.distance +=10
      player.update();
    }
    function keyPressed(){
      if(keyCode === 39){
      player.velocityX = 4
      }
      if (keyCode === 37){
        player.velocityX = -4
      }
  }
  function keyReleased(){
    if(keyCode === 39){
    player.velocityX = 0
    }
    if (keyCode === 37){
      player.velocityX = 0
    }
}

    drawSprites();
    if(player.distance===3400){
      gameState = 2
      player.rank = player.rank+1
      Player.updateRank(player.rank);
    }
 
  }
  end(){
    console.log("gameEnded"+player.index)
    console.log(player.distance)  
    distance.html(player.name+":"+player.rank)
    distance.position(displayWidth/5,50)

  }
  spawnObs(){
  if (frameCount % 50===0){
  obstacle = createSprite(displayWidth/2, displayHeight/2,50,50)
  obstacle.velocityX = -4
  }
  }
  
}

