"use strict";

var gameState = function(game) {

}

gameState.prototype = {

  init:function()
  {
    gameState.obj = this;
    this.centerX = this.world.centerX;
    this.centerY = this.world.centerY;

    this.score = 0;
    this.speed = 1500;
    this.maxSpeed = 0;
    this.playerLife = 3;

    this.LEFT = false;
    this.RIGHT = false;

    this.start = false;

    this.gameOverFlag = false;

    this.heartCount = 0;

    this.carSpeed = 900;

  },
  create:function()
  {
    this.setScreen();

    this.addHud();

  },

  addHud:function()
  {
    var hudbar = this.add.sprite(0,0,"hudbar");
    hudbar.alpha = 0.65;

    var style = {font: "50px Arial Black", fill: "#fff",align: "left"};

    var scoreLabel = this.add.text(20, 20,"SCORE:",style);
    this.scoreField = this.add.text(scoreLabel.x+220, 20,this.score.toString(),style);

    var lifeLabel = this.add.text(880, 20,"LIFE:",style);
    this.lifeField = this.add.text(lifeLabel.x+150, 20,this.playerLife.toString(),style);

    var str;

    if(Phaser.Device.desktop === true)
    {
       str = "desktop_instruction";
       this.addKeyBoardEvents();
    }
    else {
      this.game.input.onDown.add(this.onTapDown,this);
      this.game.input.onUp.add(this.onTapUp,this);
      str = "mobile_instruction";
    }

    this.instruction = this.add.sprite(this.centerX,this.centerY-100,str);
    this.instruction.anchor.set(0.5);

  },

  setScreen:function()
  {
    this.track = this.game.add.sprite(this.centerX,0,'road');
    this.track.anchor.set(0.5,0);

    this.track1 = this.game.add.sprite(this.centerX,0,'track');
    this.track1.anchor.set(0.5,0);
    this.track1.y = 0-this.track1.height;
    this.physics.arcade.enable(this.track1);

    this.track2 = this.game.add.sprite(this.centerX,0,'track');
    this.track2.anchor.set(0.5,0);
    this.track2.y = this.track1.y+this.track1.height;
    this.physics.arcade.enable(this.track2);

    this.coinGroup = this.add.physicsGroup();
    this.oppCarsGroup = this.add.physicsGroup();

    this.playerVehicle = this.add.sprite(this.centerX,this.world.height-350,Global.playerCarType);
    this.playerVehicle.anchor.set(0.5,0);
    this.playerVehicle.scale.setTo(0.9);

    this.playerVehicle.hitted = false;
    this.playerVehicle.iy = this.playerVehicle.y;
    this.physics.arcade.enable(this.playerVehicle);

  },
  addGameObjects:function()
  {
    if(this.start === false){ return; }

    var rnd = this.randomRange(1,3);

    if(rnd === 1){ this.addCoins(); }
    else { this.addOpponentCars();}

  },
  addOpponentCars:function()
  {
    if(this.oppCarsGroup.children.length >= 3) { return; }

    if(this.oppCarsGroup.children.length > 0)
    {
     var lastObstacle = this.oppCarsGroup.children[this.oppCarsGroup.children.length-1];
     if(lastObstacle.y < 300){
       return;
      }
    }

    var rnd = this.randomRange(0,Global.vehiclesArr.length-1);

    var frame = Global.vehiclesArr[rnd];

    Global.vehiclesArr.splice(rnd,1);

    if(Global.vehiclesArr.length === 0)
    {
      Global.vehiclesArr = ["car1","car2","car3","car4","car5","car6","car7","car8","car9"];
      var index = Global.vehiclesArr.indexOf(Global.playerCarType);
      Global.vehiclesArr.splice(index,1);

    }

    var xpos = this.randomRange(this.centerX-300,this.centerX+300);
    var ypos = -200;

    var oppCar = this.oppCarsGroup.create(xpos,ypos,frame);
    oppCar.anchor.set(0.5);
    oppCar.scale.setTo(0.9);

    oppCar.type = frame;
    oppCar.vy = this.randomRange(1,5)*10;

  },
  addCoins:function()
  {
    if(this.coinGroup.children.length >= 2) { return; }

    if(this.coinGroup.children.length > 0)
    {
     var lastObstacle = this.coinGroup.children[this.coinGroup.children.length-1];
     if(lastObstacle.y < 300){ return; }
    }

    var xpos = this.randomRange(this.centerX-300,this.centerX+300);
    var ypos = -1000;
    var type = "coin";

    this.heartCount++;

    if(this.heartCount === 20)
    {
      this.heartCount = 0;
      type = "heart";
    }

    var coin = this.coinGroup.create(xpos,ypos,type);
    coin.anchor.set(0.5);
    coin.type = type;


  },
  setScore:function(n=1)
  {
    this.score += n;
    this.scoreField.text = this.score.toString();
  },

  gameOver:function()
  {
    let _self = this;
    this.gameOverFlag = true;

    this.speed = 0;
    this.track1.body.velocity.x = 0;
    this.track2.body.velocity.y = 0;

    for(var i=0; i < this.oppCarsGroup.children.length; i++)
    {
      var obs = this.oppCarsGroup.children[i];
      obs.body.velocity.x = 0;
      obs.body.velocity.y = 0;
    }

    for(var j=0; j < this.coinGroup.children.length; j++)
    {
      var coin = this.coinGroup.children[j];
      coin.body.velocity.x = 0;
      coin.body.velocity.y = 0;
    }

      setTimeout(function(){
       _self.showGameOver();
     },1000);
  },
  showGameOver:function()
  {
    Global.score = this.score;
    this.state.start("result");
  },
  onTapDown:function(pointer,evt)
  {
    if(self.gameOverFlag === true){return;}

    this.start = true;
    this.instruction.visible = false;

    if(pointer.x < this.centerX)
    {
      this.LEFT = true;
      this.RIGHT = false;
    }
    else if(pointer.x > this.centerX)
    {
      this.RIGHT = true;
      this.LEFT = false;
    }
  },
  onTapUp:function()
  {
    this.playerVehicle.angle = 0;
    this.RIGHT = false;
    this.LEFT = false;
  },
  addKeyBoardEvents:function()
  {
    var key_LEFT = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    var key_RIGHT = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    key_LEFT.onDown.add(this.onKeyDown, this);
    key_RIGHT.onDown.add(this.onKeyDown, this);

    key_LEFT.onUp.add(this.onKeyUp, this);
    key_RIGHT.onUp.add(this.onKeyUp, this);

    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.LEFT);
    this.input.keyboard.removeKeyCapture(Phaser.Keyboard.RIGHT);

 },

  onKeyDown:function(obj)
  {
    var self = gameState.obj;
    var key = "";

    if(this.gameOverFlag === true){return;}

    this.instruction.visible = false;

    key = obj.event.key;

    this.start = true;

    if(key === "ArrowLeft") { this.LEFT = true; this.playerVehicle.angle = -1; }
    else if(key === "ArrowRight") { this.RIGHT = true; this.playerVehicle.angle = 1; }


  },
  onKeyUp:function(obj)
  {
    var self = gameState.obj;
    var key = "";

    key = obj.event.key;

    if(key === "ArrowLeft") { self.LEFT = false; self.playerVehicle.angle = 0; }
    else if(key === "ArrowRight") { self.RIGHT = false; self.playerVehicle.angle = 0; }

  },

  /*--------------------UPDATE--------------------------------*/

   update:function()
   {
     if(this.start === false){ return; }

     this.playerVehicle.y = this.playerVehicle.iy;

     if(this.gameOverFlag === true) {

       this.playerVehicle.body.velocity.x = 0;
       this.playerVehicle.body.velocity.y = 0;

       this.track2.body.velocity.y = 0;
       this.track1.body.velocity.y = 0;

       return;
     }

     this.movePlayerVehicle();

     this.moveObstacles();

     this.moveCoins();

     this.addGameObjects();

     this.Collisions();

     this.speed += 0.2;

   },
   movePlayerVehicle:function()
   {
     if(this.track2.y >= this.world.height) {
       this.track2.y = this.track1.y-this.track1.height;
     }

     if(this.track1.y >= this.world.height) {
       this.track1.y = this.track2.y-this.track1.height;
     }

     this.track1.body.velocity.y = this.speed;
     this.track2.body.velocity.y = this.speed;

     if(this.playerVehicle.hitted===false) { this.setScore(1); }

     if(this.LEFT === true) { this.playerVehicle.x += -15; this.playerVehicle.angle = -10;}
     if(this.RIGHT === true) { this.playerVehicle.x += 15; this.playerVehicle.angle = 10;}

     var centerDistance = 280;

     if(this.playerVehicle.x <= this.centerX - centerDistance) {
       this.playerVehicle.x = this.centerX - centerDistance;
     }
     else if(this.playerVehicle.x >= this.centerX + centerDistance) {
       this.playerVehicle.x = this.centerX + centerDistance;
     }

   },
   moveObstacles:function()
   {
     var len = this.oppCarsGroup.children.length;
     if(len < 1){ return; }

     for(var i=0; i < len; i++)
     {
       var obs = this.oppCarsGroup.children[i];

       obs.body.velocity.y = this.speed-this.carSpeed-obs.vy;

       if(obs.y > this.world.height + obs.height)
       {
         obs.destroy();
         len = this.oppCarsGroup.children.length;
       }
     }
   },
   moveCoins:function()
   {
     var len = this.coinGroup.children.length;
     if(len <= 0){ return; }

     for(var i=0; i < len; i++)
     {
       var coin = this.coinGroup.children[i];

        coin.body.velocity.y = this.speed;

       if(coin.y > this.world.height + coin.height)
       {
         coin.destroy();
         len = this.oppCarsGroup.children.length;
         break;
       }


     }
   },
   Collisions:function()
   {
     this.physics.arcade.collide(this.playerVehicle,this.oppCarsGroup,this.obstacleHit,null,this);
     this.physics.arcade.overlap(this.playerVehicle,this.coinGroup,this.coinHit,null,this);
   },
   coinHit:function(player,coin)
   {
     coin.destroy();
     this.setScore(10);

     if(coin.type === "heart")
     {
       if(this.playerLife < 5){
         this.setPlayerLife(1);
       }
     }
   },
   obstacleHit:function(player,obs)
   {
     if(this.playerVehicle.hitted===true) {return;}

      var prevSpeed = this.speed;

      if(this.playerLife > 0) {

        this.playerVehicle.hitted = true;
        this.speed = 0;

        this.setPlayerLife(-1);
        var tween = this.add.tween(this.playerVehicle).to( { alpha: 0 }, 300, "Linear", true, 0, -1);

        setTimeout(function() {

          tween.stop();
          gameState.obj.onBlinkStop(prevSpeed);

        },1500);

      }

   },
   onBlinkStop:function(prevSpeed)
   {
     this.resetCar();
     this.speed = prevSpeed;

     if(this.playerLife === 0) {
        this.gameOver();
     }
   },
   resetCar:function()
   {
     this.playerVehicle.hitted = false;
     this.playerVehicle.alpha = 1;
   },
   setPlayerLife:function(n)
   {
     this.playerLife += n;
     this.lifeField.text = this.playerLife.toString();
   },
   randomRange:function(min, max)
   {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min)) + min;
   }

};
