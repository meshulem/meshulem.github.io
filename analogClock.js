function setup() {
    frameRate(120);
    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
}

var googleWebFonts = ['none','Manufacturing Consent', 'Chokokutai','Miss Fajardose','Rubik Glitch', 'Nabla','Kablammo','Kalnia Glaze', 'Sankofa Display','VT323',];
var fontChooser = 0;
var font = googleWebFonts[fontChooser];
var fontWeight = 'normal';

var size;
var counter;
var centerX;
var centerY;
var numbersDrawn = false;
var distanceFromCenter = 150;
var XdistanceFromCenter = 0;
var belowCenter = 1;
var digtalClockWidth;


var link = document.createElement('link');
document.body.appendChild(link);
var fontWithPluses = font.replace(/\s/g, '+');

link.href = href='https://fonts.googleapis.com/css?family=' + fontWithPluses;
link.type = 'text/css';
link.rel = 'stylesheet';

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  removeElements();
  drawNumbers();
}

function drawNumbers() {

  if (font !== 'none') {
    if (font !== 'VT323') {
      //Analog clock Numbers
      for (var i = 0; i<13; i++) {

        let analogNumberXPos = cos(90-i*30)*size/3.45;
        let analogNumberYPos = sin(90-i*30)*size/3.45;
        
        var analogNumber = i
        if (i === 0) {
            analogNumber = 12
        }


        let p = createP(analogNumber);

        p.style('color', 'black');
        p.style('font-family', font);
        p.style('font-weight', fontWeight);
        p.style('font-size', '' + Math.round(size/15.00) + 'px');
        p.style('line-height', '0');
        p.style('margin', '0');

        p.style('transform', 'rotate(' + i*30 + 'deg)');
        p.style('transform-origin', 'center');

        p.style('position', 'fixed');
        p.style('text-anchor', 'middle');

        p.id('analogNumber'+ i);
        var numberWidth = document.getElementById('analogNumber' + i).offsetWidth;
        p.position(centerX+analogNumberXPos - (4/8*numberWidth), centerY-analogNumberYPos);
      }
    }
    
    //Digital clock numbers
    let digitalNumberYPos = 0.5*size/1.45 + size/70;

    var newHourVar = hour();

    if (hour()>12) {
        newHourVar = hour() - 12;
    }
    
    if (newHourVar>9) {
        var a = 1;
        var b = newHourVar-10
    } else {
        var a = 0;
        var b = newHourVar
    }


    if (minute()>9) {
        var c = (minute() - (minute() % 10))/10;
        var d= minute() % 10;
    } else {
        var c = 0;
        var d = minute();
    }
    /*let div = document.createElement("div");

    div.style('margin', 'auto');
    div.style('position', 'fixed');
    div.style('width', 'fit-content');
    div.style('height', 'fit-content');
    div.style('margin', 'auto');*/

    let n = createP(a +''+b+':'+c+''+d);
    n.style('color', 'black');
    //n.style('text-align', 'center');
    //n.style('vertical-align', 'middle')
    n.style('font-family', font);
    n.style('font-weight', fontWeight);
    n.style('font-size', '' + Math.round(size/15.00) + 'px');
    n.style('line-height', '8 rem');
    n.style('margin', 'auto');
    n.style('position', 'fixed');
    n.style('text-anchor', 'middle');
    n.id('digitalNumber' + fontChooser);
    digtalClockWidth = document.getElementById('digitalNumber' + fontChooser).offsetWidth;
    n.position(centerX - (1/2*digtalClockWidth), centerY+digitalNumberYPos);
  } 

    
}
function draw() {
    
    background(30, 112, 115);

    //leave these time and degree variables
    var hourOffset = 0;
    var hourVar = hour() + hourOffset;
    var minuteVar = minute();
    var secondVar = second();
    var hourDegree = 90 - 30*(hourVar+minuteVar/60+secondVar/3600);
    var rightHourDegree = hourDegree-90;
    var leftHourDegree = hourDegree+90;
    var minDegree =  90 - 6*(minuteVar+secondVar/60);
    var secDegree = 90 - 6*secondVar;

    if (secondVar<1) {
       windowResized();
    }

    //Change these length/size variables
    if (window.innerWidth > 0.8*window.innerHeight){
        size = 1.1 * Math.min(window.innerHeight,window.innerWidth);
    } else {
        size = 1.35 * Math.min(window.innerHeight,window.innerWidth);
    }
    

    var hourLength = size/5.5;
    var minLength = size/3.8;
    var secLength = size/3.25;

    var hourWeight = size/140;
    var minWeight = size/125;
    var secWeight = size/500;

    var halfHourWidth = size/140;
    var hourTopLength = size/23;

    var secCircleSize = 1;
    var middleCircleSize = size/30;

    var shadowDistance = 1;

    //leave these positional variables
    centerX = window.innerWidth/2;
    centerY = window.innerHeight/2;
    
    var hourXPos = cos(hourDegree)*hourLength;
    var hourYPos = sin(hourDegree)*hourLength;
    var hourTopXPos = cos(hourDegree)*hourTopLength;
    var hourTopYPos = sin(hourDegree)*hourTopLength;
    var righthourXPos = cos(rightHourDegree)*halfHourWidth;
    var righthourYPos = sin(rightHourDegree)*halfHourWidth;
    var lefthourXPos = cos(leftHourDegree)*halfHourWidth;
    var lefthourYPos = sin(leftHourDegree)*halfHourWidth;
    var minXPos = cos(minDegree)*minLength;
    var minYPos = sin(minDegree)*minLength;
    var secXPos = cos(secDegree)*secLength;
    var secYPos = sin(secDegree)*secLength;
    var secCircleXPos = cos(secDegree-180)*secLength*0.3*secCircleSize;
    var secCircleYPos = sin(secDegree-180)*secLength*0.3*secCircleSize;

    var finalShadowLength = shadowDistance * sqrt(0.7*distanceFromCenter);
    var shadowDegrees = (acos(XdistanceFromCenter/distanceFromCenter)+180)*belowCenter;
    var shadowX = cos(shadowDegrees)*finalShadowLength; 
    var shadowY = sin(shadowDegrees)*finalShadowLength;

    var shadowCenterX = centerX+shadowX;
    var shadowCenterY = centerY-shadowY;

    //Clock
    strokeWeight(size/200);
    stroke(0, 0, 0);
    fill(255, 255, 255);
    ellipse(centerX,centerY,size/1.45,size/1.45);

    //Hour marks
    strokeWeight(size/200);
    stroke(0, 0, 0);
    for (var i = 0; i<12; i++) {
        let markOneX = cos(90-i*30)*size/3.05;
        let markOneY = sin(90-i*30)*size/3.05;
        let markTwoX = cos(90-i*30)*size/3;
        let markTwoY = sin(90-i*30)*size/3;
        line(centerX+markOneX,centerY-markOneY,centerX+markTwoX,centerY-markTwoY);
    }

    //shadow color
    stroke(150);

    //Hour hand shadow
    strokeWeight(hourWeight);
    fill(255, 255,255)
    quad(shadowCenterX+lefthourXPos,shadowCenterY-lefthourYPos,
        shadowCenterX+righthourXPos,shadowCenterY-righthourYPos,
        shadowCenterX+hourXPos+righthourXPos,shadowCenterY-hourYPos-righthourYPos,
        shadowCenterX+hourXPos+lefthourXPos,shadowCenterY-hourYPos-lefthourYPos);
    fill(150);
    ellipse(shadowCenterX+hourXPos,shadowCenterY-hourYPos,halfHourWidth*2.05,halfHourWidth*2.05);
    line(shadowCenterX+hourXPos,shadowCenterY-hourYPos,shadowCenterX+hourXPos+hourTopXPos,shadowCenterY-hourYPos-hourTopYPos);

    //hour hand bottom shadow
    strokeWeight(size/50);
    line(shadowCenterX,shadowCenterY,centerX,centerY);

    //Second hand shadow
    strokeWeight(secWeight);
    line(shadowCenterX,shadowCenterY,shadowCenterX+secXPos,shadowCenterY-secYPos);
    line(shadowCenterX,shadowCenterY,shadowCenterX+0.77*secCircleXPos,shadowCenterY-0.77*secCircleYPos);
    noFill();
    ellipse(shadowCenterX+secCircleXPos,shadowCenterY-secCircleYPos,size/25,size/25);

    //Minute hand shadow
    strokeWeight(minWeight);
    line(shadowCenterX,shadowCenterY,shadowCenterX+minXPos,shadowCenterY-minYPos);

    //Middle circle shadow
    noStroke();
    fill(150);
    ellipse(shadowCenterX,shadowCenterY,middleCircleSize,middleCircleSize);
    
    if (!numbersDrawn) {
        drawNumbers();
        numbersDrawn = true;
    }

    //Hour hand
    strokeWeight(hourWeight);
    stroke(207, 87, 87);
    noFill();
    quad(centerX+lefthourXPos,centerY-lefthourYPos,
        centerX+righthourXPos,centerY-righthourYPos,
        centerX+hourXPos+righthourXPos,centerY-hourYPos-righthourYPos,
        centerX+hourXPos+lefthourXPos,centerY-hourYPos-lefthourYPos);
    fill(207, 87, 87);
    ellipse(centerX+hourXPos,centerY-hourYPos,halfHourWidth*2.05,halfHourWidth*2.05);
    line(centerX+hourXPos,centerY-hourYPos,centerX+hourXPos+hourTopXPos,centerY-hourYPos-hourTopYPos);

    //Minute hand
    strokeWeight(minWeight);
    stroke(0, 21, 255);
    line(centerX,centerY,centerX+minXPos,centerY-minYPos);
    
    //Second hand
    strokeWeight(secWeight);
    stroke(0, 0, 0);
    line(centerX,centerY,centerX+secXPos,centerY-secYPos);
    line(centerX,centerY,centerX+0.77*secCircleXPos,centerY-0.77*secCircleYPos);
    noFill();
    ellipse(centerX+secCircleXPos,centerY-secCircleYPos,size/25,size/25);

    //Middle circles
    noStroke();
    fill(220, 220, 156);
    ellipse(centerX,centerY,middleCircleSize,middleCircleSize);
    fill(0, 0, 0);
    ellipse(centerX,centerY,3/5*middleCircleSize,3/5*middleCircleSize);

}


function mouseClicked() {

    distanceFromCenter = dist(mouseX,mouseY,window.innerWidth/2,window.innerHeight/2);
    XdistanceFromCenter = mouseX-window.innerWidth/2;

    if (mouseY>window.innerHeight/2) {
        belowCenter = -1;
    } else {
        belowCenter = 1;

    }

  fontChooser += 1
  if (fontChooser > googleWebFonts.length-1){
    fontChooser = 0;
  }
  font = googleWebFonts[fontChooser]
  fontWithPluses = font.replace(/\s/g, '+');
  link.href = href='https://fonts.googleapis.com/css?family=' + fontWithPluses;

  removeElements();
  drawNumbers();    
}


