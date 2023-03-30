var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var increment = 0;
var arrowLeft = false;
var arrowUp = false;
var arrowRight = false;
var arrowDown = false;
var spacebarPressed = false;
var carspeed = 1.0;
let carLength = 59.165;
let carHeight = 25.165;
var backgroundImage = new Image();
backgroundImage.src = "/images/racingtrackred.png";
backgroundImage.onload = function() {
  // Draw the image on the canvas
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
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

function getDistance(x1, y1, x2, y2){

var xDistance = x2 - x1; 
var yDistance = y2 - y1; 

return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

}

function Boundaries() {
  // var pixelDataHigh = ctx.getImageData(car.x+carLength, car.y+carHeight, 1, 1).data;
  // var pixelColorHigh = `rgb(${pixelDataHigh[0]}, ${pixelDataHigh[1]}, ${pixelDataHigh[2]})`;
  // var pixelDataMid = ctx.getImageData(car.x+(carLength/2), car.y+(carHeight/2), 1, 1).data;
  // var pixelColorMid = `rgb(${pixelDataMid[0]}, ${pixelDataMid[1]}, ${pixelDataMid[2]})`;
  // var pixelDataLow = ctx.getImageData(car.x, car.y, 1, 1).data;
  // var pixelColorLow = `rgb(${pixelDataLow[0]}, ${pixelDataLow[1]}, ${pixelDataLow[2]})`;
  // console.log(pixelColorHigh)
  // var tolerance = 50;
  // var isSimilar = isColorSimilar(pixelColorHigh, "rgb(255, 0, 0)", tolerance);
  // var isSimilar2 = isColorSimilar(pixelColorMid, "rgb(255, 0, 0)", tolerance);
  // var isSimilar3 = isColorSimilar(pixelColorLow, "rgb(255, 0, 0)", tolerance);
  // if (isSimilar || isSimilar2 || isSimilar3) {
  //   console.log("COLLISION DETECTED")
  //   car.x-=carspeed;
  //   car.y-=carspeed;
  // }
  let centerOvalX = 458
  let centerOvalY = 309
  if (getDistance(car.x, car.y,centerOvalX,centerOvalY) < 107){
    console.log("COLLISION DETECTED");
    car.x-=getDx();
    car.y-=getDy();
  }
  console.log(getDistance(car.x, car.y,centerOvalX,centerOvalY))
}

function isColorSimilar(color1, color2, tolerance) {
  var rgb1 = color1.match(/\d+/g);
  var rgb2 = color2.match(/\d+/g);
  for (var i = 0; i < 3; i++) {
    if (Math.abs(rgb1[i] - rgb2[i]) > tolerance) {
      return false;
    }
  }
  return true;
}

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
let rotationincrementleft = 0;
let rotationincrementright = 0;
function getDx() {
  var angle =   getRotation() * Math.PI / 180;
  var dx = Math.cos(angle) * carspeed;
  return dx;
}
function getDy(){
  var angle =   getRotation() * Math.PI / 180;
  var dy = Math.sin(angle) * carspeed;
return dy;
}
function controls() {
  Boundaries();

  let carele = document.getElementById("car");

  var dx = getDx();
  var dy = getDy();
 if (isNaN(dx)) {
    dx = carspeed;
  }
  if (isNaN(dy)) {
    dy = 0;
  }
  if (arrowUp) {
    car.x += dx;
    car.y += dy;
  }
  
  if (arrowDown) {
    car.x -= dx;

    car.y -= dy;
  }
  if (arrowLeft) {
    
    carele.style.transform = `rotate(${rotationincrementleft}deg)`;
    rotationincrementleft--;

  }
  if (arrowRight) {

    carele.style.transform = `rotate(${rotationincrementleft}deg)`;
    rotationincrementleft++;
  }
}

function getRotation(){
  var el = document.getElementById("car");
var st = window.getComputedStyle(el, null);
var tr = st.getPropertyValue("-webkit-transform") ||
         st.getPropertyValue("-moz-transform") ||
         st.getPropertyValue("-ms-transform") ||
         st.getPropertyValue("-o-transform") ||
         st.getPropertyValue("transform") ||
         "FAIL";

// With rotate(30deg)...
// matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)

// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
if (tr !== 'none') {
var values = tr.split('(')[1].split(')')[0].split(',');
var a = values[0];
var b = values[1];
var c = values[2];
var d = values[3];

var scale = Math.sqrt(a*a + b*b);


// arc sin, convert from radians to degrees, round
var sin = b/scale;
// next line works for 30deg but not 130deg (returns 50);
// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

}
return angle;
}
var carx = 345;
var cary = 425;
var car = new createElement('car', carx, cary, 100, 100);
function draw() {
  controls();
  showelements();
}
setInterval(draw, 2); 
