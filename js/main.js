"use strict";

var gameWidth = 1080;
var gameHeight = 1920;
var gameDiv = "";


var game = new Phaser.Game(gameWidth,gameHeight,Phaser.CANVAS,gameDiv);

game.state.add("boot",bootState);
game.state.add("preload",preloadState);
game.state.add("title",titleState);
game.state.add("select",selectState);
game.state.add("game",gameState);
game.state.add("result",resultState);

game.state.start("boot");
