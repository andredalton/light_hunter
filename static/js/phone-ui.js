function backButtonClicked() {
  console.log('BACK!');
}

function homeButtonClicked() {
  console.log('HOME!');
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

