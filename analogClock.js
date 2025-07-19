function setup() {
    frameRate(120);
    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
}

var googleWebFonts = ['Lexend','Kablammo', 'Manufacturing Consent', 'Chokokutai', 'Nabla', 'Foldit', 'Rubik Glitch Pop', 'Sankofa Display','Miss Fajardose'];
var fontChooser = 0;
var font = googleWebFonts[fontChooser];
var fontWeight = 'normal';

var size;
var centerX;
var centerY;
var numbersDrawn = false;
var distanceFromCenter = 150;
var XdistanceFromCenter = 0;
var belowCenter = 1;


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

    //Clock Numbers
    for (var i = 0; i<12; i++) {

        let textXPos = cos(90-i*30)*size/3.45;
        let textYPos = sin(90-i*30)*size/3.45;

        let p = createP(i+2);

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

        p.id('number'+ i);
        var numberWidth = document.getElementById('number' + i).offsetWidth;
        p.position(centerX+textXPos - (4/8*numberWidth), centerY-textYPos);
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
    
    //Change these length/size variables
    size = 1.25 * Math.min(window.innerHeight,window.innerWidth);

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

//Change mouseClicked to mouseDragged or to mouseMoved to change the effect
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


