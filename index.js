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
let prevMaxvelo = maxVelocity;
maxVelocity = (maxVelocity/3.6)/(carLength) // convert to m/s divide by car length to get pixels per second
console.log(maxVelocity)
let time = 3.5; // time to acclerate to max velocity
let acceleration = (maxVelocity/(time))*0.1; // vf = vi + at but vi = 0 so vf/t = a; // convert to m/0.25 s since we update the acceleration every 0.25s since if it was ever 1m/s it becomes too inaccurate
let timeElapsed = 0;
let isAccelerating = false;
const gravity = 9.81;
var backgroundImage = new Image();
backgroundImage.src = "/images/racingtrackred.png";
var startTime = Date.now();
window.onload = function() {
  WebFont.load({
    google: {
      families: ['Montserrat']
    },
    active: function() {
      // Font is now loaded and ready to use
    }
  });

  // Your canvas code here
};

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
      intervalId =setInterval(modifyVelo, 100);
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


let spedometerCanvas = document.getElementById("spedometer");
let ctx2 = spedometerCanvas.getContext("2d");

var speedGradient = ctx2.createLinearGradient(0, 500, 0, 0);
speedGradient.addColorStop(0, '#00b8fe');
speedGradient.addColorStop(1, '#41dcf4');

var rpmGradient = ctx2.createLinearGradient(0, 500, 0, 0);
rpmGradient.addColorStop(0, '#f7b733');
rpmGradient.addColorStop(1, '#fc4a1a');
//rpmGradient.addColorStop(1, '#EF4836');

function speedNeedle(rotation) {
    ctx2.lineWidth = 2;

    ctx2.save();
    ctx2.translate(250, 250);
    ctx2.rotate(rotation);
    ctx2.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
    ctx2.restore();

    rotation += Math.PI / 180;
}

function rpmNeedle(rotation) {
    ctx2.lineWidth = 2;

    ctx2.save();
    ctx2.translate(250, 250);
    ctx2.rotate(rotation);
    ctx2.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
    ctx2.restore();

    rotation += Math.PI / 180;
}

function drawMiniNeedle(rotation, width, speed) {
    ctx2.lineWidth = width;

    ctx2.save();
    ctx2.translate(250, 250);
    ctx2.rotate(rotation);
    ctx2.strokeStyle = "#333";
    ctx2.fillStyle = "#333";
    ctx2.strokeRect(-20 / 2 + 220, -1 / 2, 20, 1);
    ctx2.restore();

    let x = (250 + 180 * Math.cos(rotation));
    let y = (250 + 180 * Math.sin(rotation));

    ctx2.font = "200 20px Montserrat";
    ctx2.fillText(speed, x, y);

    rotation += Math.PI / 180;
}

function calculateSpeedAngle(x, a, b) {
    let degree = (a - b) * (x) + b;
    let radian = (degree * Math.PI) / 180;
    return radian <= 1.45 ? radian : 1.45;
}

function calculateRPMAngel(x, a, b) {
    let degree = (a - b) * (x) + b;
    let radian = (degree * Math.PI) / 180;
    return radian >= -0.46153862656807704 ? radian : -0.46153862656807704;
}

function drawSpeedo(speed, gear, rpm, topSpeed) {

    ctx2.clearRect(0, 0, 500, 500);

    ctx2.beginPath();
    ctx2.fillStyle = 'rgba(0, 0, 0, .9)';
    ctx2.arc(250, 250, 240, 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.save()
    ctx2.restore();
    ctx2.fillStyle = "#FFF";
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.strokeStyle = "#333";
    ctx2.lineWidth = 10;
    ctx2.arc(250, 250, 100, 0, 2 * Math.PI);
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.lineWidth = 1;
    ctx2.arc(250, 250, 240, 0, 2 * Math.PI);
    ctx2.stroke();

    ctx2.font = "200 70px Montserrat";
    ctx2.textAlign = "center";
    ctx2.fillText(speed, 250, 220);

    ctx2.font = "200 15px Montserrat";
    ctx2.fillText("mph", 250, 235);

    if (gear == 0 && speed > 0) {
        ctx2.fillStyle = "#999";
        ctx2.font = "200 70px Montserrat";
        ctx2.fillText('R', 250, 460);

        ctx2.fillStyle = "#333";
        ctx2.font = "50px Montserrat";
        ctx2.fillText('N', 290, 460);
    } else if (gear == 0 && speed == 0) {
        ctx2.fillStyle = "#999";
        ctx2.font = "200 70px Montserrat";
        ctx2.fillText('N', 250, 460);

        ctx2.fillStyle = "#333";
        ctx2.font = "200 50px Montserrat";
        ctx2.fillText('R', 210, 460);

        ctx2.font = "200 50px Montserrat";
        ctx2.fillText(parseInt(gear) + 1, 290, 460);
    } else if (gear - 1 <= 0) {
        ctx2.fillStyle = "#999";
        ctx2.font = "200 70px Montserrat";
        ctx2.fillText(gear, 250, 460);

        ctx2.fillStyle = "#333";
        ctx2.font = "50px Montserrat";
        ctx2.fillText('R', 210, 460);

        ctx2.font = "200 50px Montserrat";
        ctx2.fillText(parseInt(gear) + 1, 290, 460);
    } else {
        ctx2.font = "200 70px Montserrat";
        ctx2.fillStyle = "#999";
        ctx2.fillText(gear, 250, 460);

        ctx2.font = "200 50px Montserrat";
        ctx2.fillStyle = "#333";
        ctx2.fillText(gear - 1, 210, 460);
        if (parseInt(gear) + 1 < 7) {
            ctx2.font = "200 50px Montserrat";
            ctx2.fillText(parseInt(gear) + 1, 290, 460);
        }
    }

    ctx2.fillStyle = "#FFF";
    for (var i = 10; i <= Math.ceil(topSpeed / 20) * 20; i += 10) {
        console.log();
        drawMiniNeedle(calculateSpeedAngle(i / topSpeed, 83.07888, 34.3775) * Math.PI, i % 20 == 0 ? 3 : 1, i%20 == 0 ? i : '');
        
        if(i<=100) { 
            drawMiniNeedle(calculateSpeedAngle(i / 47, 0, 22.9183) * Math.PI, i % 20 == 0 ? 3 : 1, i % 20 ==
            0 ?
            i / 10 : '');
        }
    }

    ctx2.beginPath();
    ctx2.strokeStyle = "#41dcf4";
    ctx2.lineWidth = 25;
    ctx2.shadowBlur = 20;
    ctx2.shadowColor = "#00c6ff";

    ctx2.strokeStyle = speedGradient;
    ctx2.arc(250, 250, 228, .6 * Math.PI, calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.lineWidth = 25;
    ctx2.strokeStyle = rpmGradient;
    ctx2.shadowBlur = 20;
    ctx2.shadowColor = "#f7b733";

    ctx2.arc(250, 250, 228, .4 * Math.PI, calculateRPMAngel(rpm / 4.7, 0, 22.9183) * Math.PI, true);
    ctx2.stroke();
    ctx2.shadowBlur = 0;


    ctx2.strokeStyle = '#41dcf4';
    speedNeedle(calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI);

    ctx2.strokeStyle = rpmGradient;
    rpmNeedle(calculateRPMAngel(rpm / 4.7, 0, 22.9183) * Math.PI);

    ctx2.strokeStyle = "#000";
}


function setSpeed () {

let speedM = 0;
let gear = 0;
let rpm = 0
setInterval(function(){
// if (speedM > 160){
// speedM = 0;
// rpm = 0;
// }
let speed =  Math.round((currVelocity*3.6*carLength)*0.621371)
if (speed == 0){
  gear = 0
}
if (speed > 1 && speed< 30){
gear = 1;
rpm += .03;
} else if (speed > 30 && speed < 50) {
gear = 2;
rpm += .03;
  } else if (speed > 50 &&   speed < 70) {
gear = 3;
rpm += .03;
} else if (speed > 70 &&   speed < 100)      {
gear = 4;
rpm += .03;
  } else if (speed > 200)      {
gear = 5;
rpm += .03;
}

if (rpm < 1){
rpm += .03; 
}
drawSpeedo(speed,gear,rpm,200);

}, 40);

}

document.addEventListener('DOMContentLoaded', function() {
  ctx2.scale(0.65,0.65);
//setInterval(setSpeed, 2000)
//renderCanvas();
setSpeed();
//drawSpeedo(120,4,.8,160);
}, false);
let sideview = document.getElementById('sideview');
let sidectx = sideview.getContext('2d');
let sideImg = new Image();
sideImg.src = "/images/beachbg.png";

let carnonA = new Image();
carnonA.src = "/images/f1.gif";
carnonA.onload = function() {
  sidectx.drawImage(carnonA, 170, 220, 150, 150);
};

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'sideview',
  width: width,
  height: height,
});

var layer = new Konva.Layer();
stage.add(layer);
setInterval(function() {
  if (currVelocity > 0){
function onDrawFrame(ctx, frame) {
  // update canvas size
  frame.delay = 1000;
  
      if (currVelocity >0){
        frame.delay = 10;
      }
  // update canvas that we are using for Konva.Image
  sidectx.drawImage(frame.buffer, 170, 220,150,150);
  // redraw the layer
  layer.draw();
}

 var gif = gifler('/images/f1.gif').frames(sideview, onDrawFrame);
}
}, 500)
// draw resulted canvas into the stage as Konva.Image
var image = new Konva.Image({
  image: canvas,

});


layer.add(image);


  sidectx.drawImage(sideImg, 0, 0,sideview.width, sideview.height);

  // DYNAMICS
let mass = 780;
let ma = 0
let cofric = 1.7 // standard coefficient of friction for f1 tires
let FN = mass*gravity;
let staticFric = 0;
let forceRizzistance = 0;
function calcMA(){
return ((prevMaxvelo/3.6)/time)*mass;
}

function calcFric(){
  return FN*cofric;
}

function calcRizzistance(){
  return ma-staticFric
}
setInterval(function() {
  ma = calcMA();
 staticFric = calcFric();
  forceRizzistance = calcRizzistance();
  console.log(ma)
  console.log(staticFric)
  console.log(forceRizzistance)
}, 500);
