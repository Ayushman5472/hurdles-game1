var canvas, backgroundImage;

var distance

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players, player1, player2

var playerImage

var trackImage, trackImage2;

var obstacle;

var InvisibleGround, InvisibleGround2;

function preload(){
  playerImage = loadImage("images/player.png")
 
  trackImage = loadImage("images/track.png")

  trackImage2 = loadImage("images/track.jpg")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  distance = createElement('h3')
  distance.position(displayWidth/5,50)
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (gameState===2){
    game.end()
  }
}
