var mouseIsDown = false;
var isDraggingNotif = false;
var visibleNotifHeight = 0;
var oldVisibleNotifHeight = 0;
var notifOffset;
var statusBarHeight;
var notifTimer = null;

function initUI() {
  notifOffset = 1.5 * statusBarFraction * screenHeight;
  statusBarHeight = statusBarFraction * screenHeight;
}

function addLeadingZero(number) {
  if (number < 10)
    return '0' + number;
  else
    return number;
} 

function drawClock(left, top, width, height, bgColour, fgColour, withSeconds) {
  var d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  var timeString = addLeadingZero(hours) + ':' + addLeadingZero(minutes);
  if (withSeconds)
    timeString += ':' + addLeadingZero(seconds);
  
  // draw
  ctx.fillStyle = bgColour;
  ctx.fillRect(left, top, width, height);
  ctx.fillStyle = fgColour;
  ctx.font = Math.floor(0.5 * height) + 'pt sans';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(timeString, left + width/2, top + height/2);
}

function drawStatusBar() {
  ctx.drawImage(image,
                0, 0, image.width, statusBarFraction * image.height,
                0, 0, screenWidth, statusBarFraction * screenHeight);
  updateStatusBarClock();
  drawNotificationBar();
}

function updateStatusBarClock() {
  var top = 0;
  var left = 0.8 * screenWidth;
  var width = screenWidth - left;
  var height = statusBarFraction * screenHeight;
  drawClock(left, top, width, height, '#02868B', '#FFFFFF', false);
}

function drawNotificationBar() {
  if (visibleNotifHeight == 0)
    return;
  var top = statusBarFraction * screenHeight;
  var left = 0;
  var width = screenWidth;
  var height = visibleNotifHeight;
  ctx.fillStyle = '#000000';
  ctx.fillRect(left, top, width, height);
}

function backButtonClicked() {
  console.log('BACK!');
}

function homeButtonClicked() {
  console.log('HOME!');
}

function setVisibleNotifHeight(height) {
  height = Math.min(screenHeight - statusBarHeight, Math.max(0, height))
  if (height != visibleNotifHeight) {
    oldVisibleNotifHeight = visibleNotifHeight;
    visibleNotifHeight = height;
    drawNotificationBar();
  }
}

function screenMouseUp(evt) {
  mouseIsDown = false;
  isDraggingNotif = false;
  if (visibleNotifHeight < oldVisibleNotifHeight) {
    notifTimer = setInterval(notifStepUp, 25);
  } else {
    notifTimer = setInterval(notifStepDown, 25);
  }
}

function screenMouseDown(evt) {
  mouseIsDown = true;
  if (notifTimer) {
    clearInterval(notifTimer);
  }
  if (evt.offsetY / screenHeight <= statusBarFraction ||
      evt.offsetY - notifOffset <= visibleNotifHeight) {
    isDraggingNotif = true;
  }
}

function screenMouseMove(evt) {
  if (isDraggingNotif) {
    setVisibleNotifHeight(evt.offsetY - statusBarHeight + notifOffset);
  }
}

function notifStepUp() {
  setVisibleNotifHeight(visibleNotifHeight - 0.2 * screenHeight);
  if (visibleNotifHeight == 0) {
    clearInterval(notifTimer);
  }
}

function notifStepDown() {
  setVisibleNotifHeight(visibleNotifHeight + 0.2 * screenHeight);
  if (visibleNotifHeight == screenHeight - statusBarHeight) {
    clearInterval(notifTimer);
  }
}

$(document).ready(initUI);
