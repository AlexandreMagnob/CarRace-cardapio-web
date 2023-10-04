"use strict";

var resultState = function(game){

};

resultState.prototype = {

  init:function()
  {
    this.centerX = this.world.centerX;
    this.centerY = this.world.centerY;
  },

  create:function()
  {
    var bg = this.add.sprite(0,0,"resultbg");

    var gameover = this.add.sprite(this.centerX,240,"gameover");
    gameover.anchor.set(0.5);
    gameover.scale.setTo(1.5);

    if(localStorage.getItem("highScore") !== null)
    {
      Global.highScore = localStorage.getItem("highScore");
    }
    if(Global.score >= Global.highScore)
    {
      Global.highScore = Global.score;
      localStorage.setItem("highScore",Global.highScore);
    }

    var text_style = {
      font:'Arial Black',
      fontSize:'90px',
      align:'center',
      fill:'#ffffff',
      stroke:'#000000',
      strokeThickness:18
    };

    var scoreField = this.add.text(this.centerX,650,"Pontos\n"+Global.score.toString(),text_style);
    scoreField.anchor.set(0.5);

    var highScoreField = this.add.text(this.centerX,950,"Pontuação Mais Alta\n" + Global.highScore.toString(),text_style);
    highScoreField.anchor.set(0.5);

    this.retryButton = this.addButton(this.centerX,1500,"retry_button");
    this.retryButton.events.onInputDown.add(this.onRetryDown,this);
    this.retryButton.events.onInputUp.add(this.onRetryUp,this);

  },
  onRetryDown:function()
  {
    this.onDown(this.retryButton);
  },
  onRetryUp:function()
  {
    this.onUp(this.retryButton);
    this.state.start('game');
  },

  addButton:function(x,y,str)
  {
    var button = this.add.sprite(x,y,str);
    button.anchor.set(0.5);
    button.inputEnabled = true;
    button.useHandCursor = true;
    return button;
  },
  onDown:function (button) {
    button.alpha = 0.65;
    button.scale.setTo(0.95);
  },
  onUp:function (button) {
    button.alpha = 1;
    button.scale.setTo(1);
  },

};
