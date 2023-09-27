"use strict";
var preloadState = function(game) {

};

preloadState.prototype = {

  init:function()
  {
      //preloader

      var loadingbar_bg = this.add.sprite(this.world.centerX-411*0.5,this.world.centerY,"loadingbar_bg");
      loadingbar_bg.anchor.set(0,0.5);
      loadingbar_bg.width = 411;

      this.loadingbar = this.add.sprite(this.world.centerX-411*0.5,this.world.centerY,"loadingbar");
      this.loadingbar.anchor.set(0,0.5);

      this.loadingbar.scale.x = 0;

  },
  preload:function()
  {
     var d = new Date();
     var t = d.getTime();

     this.load.baseURL = "assets/";

     this.load.image('titlebg','titlebg.png?v='+t);
     this.load.image('selectbg','selectbg.png?v='+t);
     this.load.image('resultbg','resultbg.png?v='+t);

     this.load.image('title','ui/title.png?v='+t);
     this.load.image('selectcar','ui/selectcar.png?v='+t);

     this.load.image('gameover','ui/gameover.png?v='+t);
     this.load.image('hudbar','ui/hudbar.png?v='+t);

     //ui images

     this.load.image('desktop_instruction','ui/desktop_instruction.png?v='+t);
     this.load.image('mobile_instruction','ui/mobile_instruction.png?v='+t);

     this.load.image('play_button','ui/play_button.png?v='+t);
     this.load.image('start_button','ui/start_button.png?v='+t);

     this.load.image('retry_button','ui/retry_button.png?v='+t);
     this.load.image('prev_button','ui/prev_button.png?v='+t);
     this.load.image('next_button','ui/next_button.png?v='+t);

     this.load.image('road','road.png?v='+t);
     this.load.image('track','track.png?v='+t);

     this.load.image('coin','coin.png?v='+t);
     this.load.image('heart','heart.png?v='+t);

     this.load.image('car1','cars/car1.png?v='+t);
     this.load.image('car2','cars/car2.png?v='+t);
     this.load.image('car3','cars/car3.png?v='+t);
     this.load.image('car4','cars/car4.png?v='+t);
     this.load.image('car5','cars/car5.png?v='+t);
     this.load.image('car6','cars/car6.png?v='+t);
     this.load.image('car7','cars/car7.png?v='+t);
     this.load.image('car8','cars/car8.png?v='+t);
     this.load.image('car9','cars/car9.png?v='+t);

     this.load.image('car_shadow','cars/car_shadow.png?v='+t);

     this.load.spritesheet('selectCars', 'spriteSheets/selectCars.png',106,175,9);

  },

  loadUpdate()
  {
    var per = this.load.progress*0.01;
    this.loadingbar.scale.x = per;
  },
  create:function()
  {
    this.state.start('title');
  }

};
