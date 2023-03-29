
var canvas = document.getElementById("myCanvas"); // My partner wrote this
var ctx = canvas.getContext("2d"); // My partner wrote this




  var increment = 0;

var arrowLeft = false; // My partner wrote this
var arrowUp = false; // My partner wrote this
var arrowRight = false; // My partner wrote this
var arrowDown = false; // My partner wrote this
var spacebarPressed = false; // My partner wrote this 
var carspeed = 2.5; // My partner and I wrote this

var alienheight = 50; // I wrote this
var alienwidth = 50; // I wrote this
var spawnRate = 1000; // My partner and I wrote this

var carx1 = canvas.width/2; // I wrote this

var cary1 = 500 // My partner and I wrote this

var gravity = 3; // My partner and I wrote this



class createElement{


  constructor(element,x,y,w,h){
  this.element = element;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;


  }
} // I wrote this 



function setpositionelements(car) {
  var a = document.getElementById(car.element);
  a.style.left = car.x + 'px';
  a.style.top = car.y + 'px';
} // I wrote this





function gameover() {

var getscore = document.getElementById("number").innerHTML;

localStorage.setItem("getscore", getscore)
  window.location.href="gameoverdefaultgame.html";
} // My partner wrote this

// function Boundaries(car) {

//   var rightboundary = screen.width/2+200
//   var leftboundary = screen.width/2-100;

//   if (car.y < 2) {
//     car.y = 2;
//   }

//   if (car.x + car.w < leftboundary) {
//     car.x = leftboundary - car.w;
//   }
//   if (car.x + car.w > rightboundary) {
//     car.x = rightboundary - car.w;
//   }
//   if (car.y + car.h > 560) {
//     car.y = 560 - car.h;
//   }
// } // My partner and I wrote this









function showelements() {
  setpositionelements(car);

 

} // I wrote this





  
function getDistance(x1, y1, x2, y2){

var xDistance = x2 - x1; 
var yDistance = y2 - y1; 

return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

} // I wrote this




document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {

    if(e.key == "ArrowRight" || e.key == "ArrowRight") {

        arrowRight = true;
    }
    else if(e.key == "ArrowLeft" || e.key == "ArrowLeft") {

        arrowLeft = true;
    } else if(e.key == "ArrowUp" || e.key == "ArrowUp") {
      arrowUp = true;
  }
  else if(e.key == "ArrowDown" || e.key == "ArrowDown") {
      arrowDown = true;
  }

    else if(e.key == " " || e.key == "Space"){
        spacebarPressed = true;
    }

} // My partner wrote this

function keyUpHandler(e) {
    if(e.key == "ArrowRight" || e.key == "ArrowRight") { 
        arrowRight = false;
    }
    else if(e.key == "ArrowLeft" || e.key == "ArrowLeft") {
        arrowLeft = false;
    }    
    else if(e.key == "ArrowUp" || e.key == "ArrowUp") {
        arrowUp = false;
    }
    else if(e.key == "ArrowDown" || e.key == "ArrowDown") {
        arrowDown = false;
    }

        else if(e.key == " " || e.key == "Space"){

        spacebarPressed = false;
        }

 

} // My partner wrote this

let rotationincrement = 5;

function controls() {
  let carele = document.getElementById("car");

  if (arrowUp) {
    car.y -= carspeed;
     cary1 -= carspeed;

  } // My partner wrote this
  if (arrowDown) {
    car.y += carspeed;
    cary1 += carspeed;
  } // My partner wrote this
  if (arrowLeft) {
    car.x -= carspeed;
    carx1 -= carspeed;
    carele.style.transform = `rotate(${rotationincrement}deg)`;
    rotationincrement--;
  } //My partner wrote this
  if (arrowRight) {
    car.x += carspeed;
    carx1 += carspeed;
  } //My partner wrote this


  
  // Boundaries(car);
  // I wrote this
} 



var carx = (screen.width/2)-50 // I wrote this
var cary = 425; // I wrote this

console.log(carx) // I wrote this
var car = new createElement('car', carx, cary, 100, 100); // I wrote this




function draw() {
  

    controls();
    showelements();


    
  } // I wrote this


  setInterval(draw, 2); // I wrote this





