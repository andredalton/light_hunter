"use strict";

// frame (image)
// the image is 1400x2000 and its screen is 1188x774
// the top left corner of the phone on the image is the point (358, 314)
var frameImageWidth =  1400;
var frameImageHeight = 2000;
var screenOnImage = {'top': 358, 'left': 314, 'width': 774, 'height': 1188}
var backButtonOnImage = {'top': 1548, 'left': 312, 'width': 260, 'height': 100}
var homeButtonOnImage = {'top': 1548, 'left': 596, 'width': 220, 'height': 100}

// height/width of screen (this does not include the buttons)
var ratio = screenOnImage.height / screenOnImage.width;

var statusBarFraction = 0.045;

var ctx;
var browserWidth, browserHeight;
var screenWidth, screenHeight;
var frameHeight, frameWidth;
var statusBarHeight;

var image;


function init() {
  
  ctx = $('#screen')[0].getContext('2d');
  
  // browser
  browserWidth = $(window).width();
  browserHeight = $(window).height();
  
  // frame (image)
  frameHeight = browserHeight;
  frameWidth = Math.floor(1/ratio * frameHeight);
  $('#phone-frame').width(frameWidth).height(frameHeight);
  
  // screen (canvas)
  screenWidth  = screenOnImage.width / frameImageWidth  * frameWidth;
  screenWidth = Math.ceil(screenWidth);
  screenHeight = screenOnImage.height / frameImageHeight * frameHeight;
  screenHeight = Math.ceil(screenHeight);
  statusBarHeight = statusBarFraction * screenHeight;
  
  $('#screen')[0].setAttribute('width', screenWidth);
  $('#screen')[0].setAttribute('height', screenHeight);
  var left, top;
  left = Math.floor(screenOnImage.left / frameImageWidth * frameWidth);
  top = Math.floor(screenOnImage.top / frameImageHeight * frameHeight);
  $('#screen').css('left', left).css('top', top);
  
  // Light Hunter interface: on the screen
  var lhi = $('#light-hunter-interface');
  lhi.css('left', left).css('top', top + statusBarHeight);
  lhi.css('width', screenWidth).height(screenHeight - statusBarHeight);
  
  // back button (canvas)
  var w = Math.ceil(backButtonOnImage.width  / frameImageWidth  * frameWidth);
  var h = Math.ceil(backButtonOnImage.height / frameImageHeight * frameHeight);
  left = Math.floor(backButtonOnImage.left / frameImageWidth * frameWidth);
  top = Math.floor(backButtonOnImage.top / frameImageHeight * frameHeight);
  $('#back-button').css('left', left).css('top', top);
  $('#back-button')[0].setAttribute('width', w);
  $('#back-button')[0].setAttribute('height', h);
  
  // home button (canvas)
  w = Math.ceil(homeButtonOnImage.width  / frameImageWidth  * frameWidth);
  h = Math.ceil(homeButtonOnImage.height / frameImageHeight * frameHeight);
  left = Math.floor(homeButtonOnImage.left / frameImageWidth * frameWidth);
  top = Math.floor(homeButtonOnImage.top / frameImageHeight * frameHeight);
  $('#home-button').css('left', left).css('top', top);
  $('#home-button')[0].setAttribute('width', w);
  $('#home-button')[0].setAttribute('height', h);

  // load screen image
  image = new Image();
  image.src = '/static/img/celular_com_app.png';
  image.onload = function() { clear(); }
  
  // add event listeners
  $('#back-button')[0].addEventListener('mousedown', backButtonClicked);
  $('#home-button')[0].addEventListener('mousedown', homeButtonClicked);
  $('#screen')[0].addEventListener('mousedown', screenMouseDown);
  $('#screen')[0].addEventListener('mouseup', screenMouseUp);
  $('#screen')[0].addEventListener('mousemove', screenMouseMove);
  $('#screen')[0].addEventListener('mouseout', screenMouseUp);
  
  // create tabs
  $('#tab-container').tabs();
  $('#tab-audio, #tab-mask, #tab-general').css('height', 0.6 * screenHeight + 'px');
  $('#tab-audio hr, #tab-mask hr').css('display', 'table-row');
  $('#tab-audio, #tab-mask, #tab-general').css('padding', 0);
  $('.ui-tabs-anchor').css('padding', '0.3em')
  
}

function clear() {
  // background
  ctx.drawImage(image, 0, 0, screenWidth, screenHeight);
  // clock
  updateHomeScreenClock();
}



function chess(red, green, blue, alpha, rows) {
  // red, green and blue in [0, 255]
  // alpha in [0, 1]
  var minY = statusBarFraction * screenHeight;
  var height =  screenHeight - minY;
  
  var h = height / rows;
  var w = h;
  var columns = Math.ceil(screenWidth / w);
  ctx.fillStyle = 'rgba(' + [red, green, blue, alpha].join() + ')';
  for (var i = 0; i < columns; i++) {
    for (var j = +!(i % 2); j < rows; j += 2)
      ctx.fillRect(i * w, minY + j * h, w, h);
  }
  drawStatusBar();
}

function lines(red, green, blue, alpha, angle, number, lineWidth) {
  // red, green and blue in [0, 255]
  // alpha in [0, 1]
  // angle must be in [-90, 90]
  
  if (angle < -90 || angle > 90)
    return;
  var useVerticalBorder = (Math.abs(angle) <= 45);
  var tangent = Math.tan(Math.PI / 180 * angle);
  var horStep = screenWidth  / number;
  var verStep = screenHeight / number;
  var x0, x1, x2, y0, y1, y2;
  
  ctx.lineWidth = lineWidth;
  for (var i = 0; i <= number; i++) { // n + 1
    x0 = i * horStep;
    y0 = (angle >= 0) ? (i * verStep) : (screenHeight - i * verStep);
    if (useVerticalBorder) {
      x1 = screenWidth;
      y1 = y0 + (screenWidth - x0) * (-tangent);
      x2 = 0;
      y2 = y0 - x0 * (-tangent);
    } else {
      x1 = x0 - (screenHeight - y0) / tangent;
      y1 = screenHeight;
      x2 = x0 + y0 / tangent;
      y2 = 0;
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'rgba(' + [red, green, blue, alpha].join() + ')';
    ctx.stroke();
  }
  drawStatusBar();
}

function hexToRGB(hex) {
  var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  var result = regex.exec(hex);
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

$(document).ready(init);

