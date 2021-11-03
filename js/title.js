"use strict";

var titleState = function(game){

};

titleState.prototype = {

  init:function()
  {
    this.centerX = this.world.centerX;
    this.centerY = this.world.centerY;
  },
  create:function()
  {
    this.add.sprite(0,0,"titlebg");

    var title = this.add.sprite(this.centerX,400,"title");
    title.anchor.set(0.5);

    this.playButton = this.addButton(this.centerX,this.centerY + 80,"play_button");

    this.playButton.events.onInputDown.add(this.onPlayButtonDown,this);
    this.playButton.events.onInputUp.add(this.onPlayButtonUp,this);

  },
  onPlayButtonDown:function()
  {
    this.onDown(this.playButton);
  },
  onPlayButtonUp:function()
  {
    this.onUp(this.playButton);
    this.state.start('select');
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
