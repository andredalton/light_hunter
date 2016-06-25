// height/width of screen (this does not include the buttons)
var ratio = 1184/774;

// frame (image)
// the image is 1400x2000 and its screen is 1188x774
// the top left corner of the phone on the image is the point (358, 314)
var frameImageWidth =  {'phone' :  774, 'total': 1400}
var frameImageHeight = {'phone' : 1188, 'total': 2000}
var screenOnImage = {'top': 358, 'left': 314}

var ctx;
var browserWidth, browserHeight;
var screenWidth, screenHeight;

var image;


function init() {
  
  ctx = $('#screen')[0].getContext('2d');
  
  // browser
  browserWidth = $(window).width();
  browserHeight = $(window).height();
  
  // frame (image)
  frameHeight = browserHeight;
  frameWidth = Math.floor(1/ratio * frameHeight);
  
  // screen (canvas)
  screenWidth  = frameImageWidth.phone  / frameImageWidth.total  * frameWidth;
  screenWidth = Math.ceil(screenWidth);
  screenHeight = frameImageHeight.phone / frameImageHeight.total * frameHeight;
  screenHeight = Math.ceil(screenHeight);
  
  $('#screen').width(screenWidth).height(screenHeight);
  $('#phone-frame').width(frameWidth).height(frameHeight);
  $('#screen')[0].setAttribute('width', screenWidth);
  $('#screen')[0].setAttribute('height', screenHeight);
  var left, top;
  left = Math.floor(screenOnImage.left / frameImageWidth.total * frameWidth);
  top = Math.floor(screenOnImage.top / frameImageHeight.total * frameHeight);
  $('#screen').css('left', left).css('top', top);

  // load screen image
  image = new Image();
  image.src = 'screenshot-1.jpg';
  image.onload = function() { clear(); }
  

}

function clear() {
  // background
  ctx.drawImage(image, 0, 0, screenWidth, screenHeight);
}

function chess(red, green, blue, alpha, rows) {
  // red, green and blue in [0, 255]
  // alpha in [0, 1]
  
  var h = screenHeight / rows;
  var w = h;
  var columns = Math.ceil(screenWidth / w);
  ctx.fillStyle = 'rgba(' + [red, green, blue, alpha].join() + ')';
  for (var i = 0; i < columns; i++) {
    for (var j = +!(i % 2); j < rows; j += 2)
      ctx.fillRect(i * w, j * h, w, h);
  }
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
}

$(document).ready(init);
