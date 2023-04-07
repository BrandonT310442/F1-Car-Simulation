var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var increment = 0;
var arrowLeft = false;
var arrowUp = false;
var arrowRight = false;
var arrowDown = false;
var spacebarPressed = false;
var elapsedTime;
const startingVelocity = 0;
var currVelocity = 0;
let carLength = 59.165;
let bufferLength = 7;
let carHeight = 25.165;
let maxVelocity =  330; 
maxVelocity = (maxVelocity/3.6)/(carLength) // convert to km/h divide by car length to get pixels per second
console.log(maxVelocity)
let time = 3.5; // time to acclerate to max velocity
let acceleration = (maxVelocity/time); // vf = vi + at but vi = 0 so vf/t = a;
let timeElapsed = 0;
let isAccelerating = false;
var backgroundImage = new Image();
backgroundImage.src = "/images/racingtrackred.png";
var startTime = Date.now();
 

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

function countMilliseconds() {
  var startTime = new Date().getTime(); // get the current time in milliseconds
  setInterval(function() {
    elapsedTime = new Date().getTime() - startTime; // calculate the elapsed time
    
  }, 1); // run the function every 1 millisecond
}
countMilliseconds();
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
  //   car.x-=getDx();
  //   car.y-=getDy();
  // }

  let dx2 = getDx();
  let dy2 = getDy();
  if (isNaN(dx2)) {
    dx2 = currVelocity;
  }
  if (isNaN(dy2)) {
    dy2 = 0;
  }
  const centerX = 460;
  const centerY = 285;
  ctx.fillStyle = 'red';

// Draw a circle
ctx.beginPath();
ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
ctx.fill();
  const innerRadius = 120;

  const centerSemi2X = 612
  ctx.beginPath();
ctx.arc(centerSemi2X, centerY, 10, 0, 2 * Math.PI);
ctx.fill();
const centerSemi1X = 270
ctx.beginPath();
ctx.arc(centerSemi1X, centerY, 10, 0, 2 * Math.PI);
ctx.fill();
const centerBTX = 365
ctx.beginPath();
ctx.arc(centerBTX, centerY, 10, 0, 2 * Math.PI);
ctx.fill();
const centerBTX2 = 545
ctx.beginPath();
ctx.arc(centerBTX2, centerY, 10, 0, 2 * Math.PI);
ctx.fill();
const centerOuter1 = 60;
ctx.beginPath();
ctx.arc(centerOuter1, centerY, 10, 0, 2 * Math.PI);
ctx.fill();

  // console.log(getDistance(car.x, car.y,centerX,centerY))
  let currRotation = getRotation();
  let yDistance = centerY-car.y;
   if (getDistance(car.x, car.y,centerX,centerY) < innerRadius){
 
    const angle = Math.atan2(car.y - centerY, car.x - centerX);
const forceX = Math.cos(angle) * currVelocity;
    const forceY = Math.sin(angle) * currVelocity;
    if (arrowDown) {
      dx2-=forceX;
      dy2-=forceY;
    }else{
    dx2 += forceX;
    dy2 += forceY;
    }
    return {dx2,dy2};
   }

  if ( Math.sqrt(Math.pow(yDistance, 2)) >=160){
    const angle = Math.atan2(car.y - centerY, car.x - centerX);
    const forceX = Math.cos(angle) * currVelocity;
        const forceY = Math.sin(angle) * currVelocity;
        if (arrowDown) {
          dx2 += forceX;
          dy2 += forceY;
        }else{
        dx2 -= forceX;
        dy2 -= forceY;
        }
        return {dx2,dy2};
  }

  if (getDistance(car.x, car.y,centerSemi1X,centerY) >= 167 && car.x <300){
    const angle = Math.atan2(car.y - centerY, car.x - centerX);
    const forceX = Math.cos(angle) * currVelocity;
        const forceY = Math.sin(angle) * currVelocity;
        if (arrowDown) {
          dx2 += forceX;
          dy2 += forceY;
        }else{
        dx2 -= forceX;
        dy2 -= forceY;
        }
        return {dx2,dy2};
      }

      if (getDistance(car.x, car.y,centerSemi2X,centerY) >= 167 && car.x >=670 && car.x <830){
        const angle = Math.atan2(car.y - centerY, car.x - centerX);
        const forceX = Math.cos(angle) * currVelocity;
            const forceY = Math.sin(angle) * currVelocity;
            if (arrowDown) {
              dx2 += forceX;
              dy2 += forceY;
            }else{
            dx2 -= forceX;
            dy2 -= forceY;
            }
            return {dx2,dy2};
          }
// if (getDistance(car.x, car.y,centerOuter1,centerY) <60){
//   const angle = Math.atan2(car.y - centerY, car.x - centerOuter1);
//   const forceX = Math.cos(angle) * currVelocity;
//       const forceY = Math.sin(angle) * currVelocity;
//       if (arrowDown) {
//         dx2 -= forceX;
//         dy2 -= forceY;
//       }else{
//       dx2 += forceX;
//       dy2 += forceY;
//       }
//       return {dx2,dy2};
// }



   if (getDistance(car.x, car.y,centerSemi1X,centerY) < innerRadius ){
    const angle = Math.atan2(car.y - centerY, car.x - centerSemi1X);
const forceX = Math.cos(angle) * currVelocity;
    const forceY = Math.sin(angle) * currVelocity;
    if (arrowDown) {
      dx2 -= forceX;
      dy2 -= forceY;
    }else{
    dx2 += forceX;
    dy2 += forceY;
    }
    
    return {dx2,dy2};
   }

   if (getDistance(car.x, car.y,centerSemi2X,centerY) < innerRadius ){
    const angle = Math.atan2(car.y - centerY, car.x - centerSemi2X);
const forceX = Math.cos(angle) * currVelocity;
    const forceY = Math.sin(angle) * currVelocity;
    if (arrowDown) {
      dx2-=forceX;
      dy2-=forceY;
    }else{
    dx2 += forceX;
    dy2 += forceY;
    }
    
    return {dx2,dy2};
   }

   if (getDistance(car.x, car.y,centerBTX,centerY) < innerRadius ){
    const angle = Math.atan2(car.y - centerY, car.x - centerBTX);
const forceX = Math.cos(angle) * currVelocity;
    const forceY = Math.sin(angle) * currVelocity;
    if (arrowDown) {
      dx2-=forceX;
      dy2-=forceY;
    }else{
    dx2 += forceX;
    dy2 += forceY;
    }
    
    return {dx2,dy2};
   }



   if (getDistance(car.x, car.y,centerBTX2,centerY) < innerRadius ){
    const angle = Math.atan2(car.y - centerY, car.x - centerBTX2);
const forceX = Math.cos(angle) * currVelocity;
    const forceY = Math.sin(angle) * currVelocity;
    if (arrowDown) {
      dx2-=forceX;
      dy2-=forceY;
    }else{
    dx2 += forceX;
    dy2 += forceY;
    }
    
    return {dx2,dy2};
   }
   return null;

  // console.log(getDistance(car.x, car.y,centerOvalX,centerOvalY))
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
  var dx = Math.cos(angle) * currVelocity;
  return dx;
}
function getDy(){
  var angle =   getRotation() * Math.PI / 180;
  var dy = Math.sin(angle) * currVelocity;
return dy;
}

function setTopSpeed(){
 let hp = parseFloat(document.getElementById("hp").value);
 let w = parseFloat(document.getElementById("w").value);
 let h = parseFloat(document.getElementById("h").value);
 let dragc = parseFloat(document.getElementById("dragc").value);
 let p = 1.225;
 hp = hp*745.7;
// console.log(w + " " + h + " " + dragc + " " + p)
//  console.log(w*h*dragc*0.5*p)
//  console.log((hp)/(w*h*dragc*0.5*p))
maxVelocity = Math. cbrt((hp)/(w*h*dragc*0.5*p))*3.6;
console.log(maxVelocity)
}
function modifyVelo(){
  console.log(elapsedTime)
  currVelocity += acceleration;
  if (currVelocity > maxVelocity) {
    currVelocity = maxVelocity;
  }
}
function slowVelo(){
  currVelocity -= acceleration;
  if (currVelocity <= 0) {
    currVelocity = 0;
  }
}
let intervalId;
let intervalId2;

function controls() {

 console.log(currVelocity)
let dx = 0;
let dy = 0; 
  let carele = document.getElementById("car");
// add if statement
if (Boundaries() != null){
  let {dx2, dy2} = Boundaries();
 dx = dx2
 dy = dy2
}else{
   dx = getDx();
   dy = getDy();
}
 if (isNaN(dx)) {
    dx = currVelocity;
  }
  if (isNaN(dy)) {
    dy = 0;
  }
  if (arrowUp) {
    clearInterval(intervalId2);
    intervalId2 = null;
    if (!intervalId){
      intervalId =setInterval(modifyVelo, 1000);
    }
        car.x += dx;
    car.y += dy;
  }
  
  if (arrowLeft) {
    // modifyVelo();
    carele.style.transform = `rotate(${rotationincrementleft}deg)`;
    rotationincrementleft--;
  }
  if (arrowRight) {
    // modifyVelo();
    carele.style.transform = `rotate(${rotationincrementleft}deg)`;
    rotationincrementleft++;
  }
  if (!(arrowUp)) {
    clearInterval(intervalId);
    intervalId = null;
    currVelocity = 0;
//  if (!intervalId2){
//   intervalId2 =setInterval(slowVelo, 1000);
//  }
//     car.x += dx;
//     car.y += dy;
//   }
car.x += 0;
car.y +=0;
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
setInterval(draw, 1); 
