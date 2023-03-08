var canvasElement = document.querySelector("canvas");
var context = canvasElement.getContext("2d");

// makeRamp()

// function makeRamp(){
//     let img = new Image();
//     img.src = "/images/ramp.png";
//     img.onload = function(){
//         context.drawImage(img, 0, 400, 100, 100);
//     }
// }]

class createElement{


    constructor(element,x,y,w,h){
    this.element = element;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  
  
    }
    
  }


 let canvasHeight = canvasElement.height;
 let canvasWidth = canvasElement.width;
 let rampx = (screen.width/2)-350; 
 let rampy = canvasHeight-335;


  

  function showElements(){
    setpositionelements(ramp);
    }

    function drawShape(){
        context.beginPath();
        context.rotate(329 * Math.PI/180);

context.rect(20, 429, 150, 100);
// context.arc(0, 0, 0, 31, true);
context.stroke();
    }
function setpositionelements(img) {
    var a = document.getElementById(img.element);
    a.style.left = img.x + 'px';
    a.style.top = img.y + 'px';
  } 
  var ramp = new createElement('ramp', rampx, rampy, 812, 415); 

  drawShape();

function draw() {
showElements();
   
  } 

  setInterval(draw, 2); // I wrote this

  