var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var increment = 0;
var arrowLeft = false;
var arrowUp = false;
var arrowRight = false;
var arrowDown = false;
var spacebarPressed = false;
var carspeed = 2.5;
var alienheight = 50;
var alienwidth = 50;
var spawnRate = 1000;
var carx1 = canvas.width / 2;
var cary1 = 500
var gravity = 3;
class createElement {
  constructor(element, x, y, w, h) {
    this.element = element;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
function setpositionelements(car) {
  var a = document.getElementById(car.element);
  a.style.left = car.x + 'px';
  a.style.top = car.y + 'px';
}
function gameover() {
  var getscore = document.getElementById("number").innerHTML;
  localStorage.setItem("getscore", getscore)
  window.location.href = "gameoverdefaultgame.html";
}

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
}
function getDistance(x1, y1, x2, y2) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
  if (e.key == "ArrowRight" || e.key == "ArrowRight") {
    arrowRight = true;
  }
  else if (e.key == "ArrowLeft" || e.key == "ArrowLeft") {
    arrowLeft = true;
  } else if (e.key == "ArrowUp" || e.key == "ArrowUp") {
    arrowUp = true;
  }
  else if (e.key == "ArrowDown" || e.key == "ArrowDown") {
    arrowDown = true;
  }
  else if (e.key == " " || e.key == "Space") {
    spacebarPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "ArrowRight" || e.key == "ArrowRight") {
    arrowRight = false;
  }
  else if (e.key == "ArrowLeft" || e.key == "ArrowLeft") {
    arrowLeft = false;
  }
  else if (e.key == "ArrowUp" || e.key == "ArrowUp") {
    arrowUp = false;
  }
  else if (e.key == "ArrowDown" || e.key == "ArrowDown") {
    arrowDown = false;
  }
  else if (e.key == " " || e.key == "Space") {
    spacebarPressed = false;
  }
}
let rotationincrement = 5;
function controls() {
  let carele = document.getElementById("car");
  if (arrowUp) {
    car.y -= carspeed;
    cary1 -= carspeed;
  }
  if (arrowDown) {
    car.y += carspeed;
    cary1 += carspeed;
  }
  if (arrowLeft) {
    car.x -= carspeed;
    carx1 -= carspeed;
    carele.style.transform = `rotate(${rotationincrement}deg)`;
    rotationincrement--;
  }
  if (arrowRight) {
    car.x += carspeed;
    carx1 += carspeed;
  }
  // Boundaries(car);
}
var carx = (screen.width / 2) - 50
var cary = 425;
console.log(carx)
var car = new createElement('car', carx, cary, 100, 100);
function draw() {
  controls();
  showelements();
}
setInterval(draw, 2); 
