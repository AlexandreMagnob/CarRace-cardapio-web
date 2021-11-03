"use strict";

var selectState = function(game) {

};

selectState.prototype = {

  init:function()
  {
    this.centerX = this.world.centerX;
    this.centerY = this.world.centerY;
  },

  create:function()
  {
    var bg = this.add.sprite(0,0,"selectbg");

    var selectText = this.add.sprite(this.centerX,200,"selectcar");
    selectText.anchor.set(0.5);

    var frameNo = 3;

    this.vehicle = this.add.sprite(this.centerX,this.centerY-50,"selectCars",frameNo);
    this.vehicle.anchor.set(0.5);
    this.vehicle.frame = frameNo;
    Global.playerCarType = "car" + (this.vehicle.frame + 1);

    this.prevButton = this.add.button(200,this.centerY-50,"prev_button",this.onPrevButton,this);
    this.prevButton.anchor.set(0.5);
    this.prevButton.alpha = 0.5;

    this.nextButton = this.add.button(880,this.centerY-50,"next_button",this.onNextButton,this);
    this.nextButton.anchor.set(0.5);

    this.startButton = this.addButton(this.centerX,1580,"start_button");
    this.startButton.events.onInputDown.add(this.onStartButtonDown,this);
    this.startButton.events.onInputUp.add(this.onStartButtonUp,this);

    this.vehicle.scale.setTo(2);

  },
  onPrevButton:function() {

    if(this.vehicle.frame > 0)
    {
     this.vehicle.frame -= 1;
     this.nextButton.alpha = 1;

     Global.playerCarType = "car" + (this.vehicle.frame + 1);

     if(this.vehicle.frame === 0) {
       this.prevButton.alpha = 0.5;
     }

    }

  },
  onNextButton:function() {

     if(this.vehicle.frame < 8)
     {
      this.vehicle.frame += 1;
      this.prevButton.alpha = 1;

      Global.playerCarType = "car" + (this.vehicle.frame + 1);

      if(this.vehicle.frame === 8) {
        this.nextButton.alpha = 0.5;
      }

     }
  },
  onStartButtonDown:function()
  {
    this.onDown(this.startButton);
  },
  onStartButtonUp:function()
  {
    this.onUp(this.startButton);

    var index = Global.vehiclesArr.indexOf(Global.playerCarType);
    Global.vehiclesArr.splice(index,1);

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
