//blev stressad och irriterad att min första projekt inte funkade 
//efter att ha skrivit så mycke kod att jag skapade en ny mini projekt

//på grund av att jag inte hade mycket med tid på mig här så är 
//mycket av den här koden tagen från internet och inte från mig 

var context, controller, mario, loop, Audio;


context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width = 320;

mario = {

  height:32,
  jumping:true,
  width:32,
  x:144, // mitten av hemsidan
  x_velocity:0,
  y:0,
  y_velocity:0

};

/*var Sprite = function(mario, is_pattern){
  this.image = null;
  this.pattern = null;
  this.TO_RADIANS = Math.PI/180;

  if (mario != undefined && mario != "" && mario != null){
    this.image = new Image();
    this.image.src = "mario.png";

    if (is_pattern){this.pattern=context.context.createPattern(thi)}
  }
};*///oanvänd och inte färdig skapat kod som jag skulle tänka kanske skulle få fram mario

controller = {
  
  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// vänster
        controller.left = key_state;
      break;
      case 38:// upp
        controller.up = key_state;
      break;
      case 39:// ner
        controller.right = key_state;
      break;

    }

  }

};



loop = function() {

  if (controller.up && mario.jumping == false) {

    mario.y_velocity -= 20;
    mario.jumping = true;

  }

  if (controller.left) {

    mario.x_velocity -= 0.5;

  }

  if (controller.right) {

    mario.x_velocity += 0.5;

  }

  //gravitaion och SLIDE
  mario.y_velocity += 1.5;
  mario.x += mario.x_velocity;
  mario.y += mario.y_velocity;
  mario.x_velocity *= 0.9;
  mario.y_velocity *= 0.9;

  
  if (mario.y > 180 - 16 - 32) {

    mario.jumping = false;
    mario.y = 180 - 16 - 32;
    mario.y_velocity = 0;

  }

  //så att man inte stannar när man åker in i vägen
  if (mario.x < -32) {

    mario.x = 320;

  } else if (mario.x > 320) {

    mario.x = -32;

  }

  context.fillStyle = "#BD85CC";
  context.fillRect(0, 0, 320, 180);// x, y, width, height
  context.fillStyle = "goldenrod";// för att kunna see vart mario SKULLE vara
  context.beginPath();
  context.rect(mario.x, mario.y, mario.width, mario.height);
  context.fill();
  context.strokeStyle = "#ECA6FF";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(320, 164);
  context.stroke();

  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);