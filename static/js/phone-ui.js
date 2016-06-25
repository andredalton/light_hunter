function backButtonClicked() {
  console.log('BACK!');
}

function homeButtonClicked() {
  console.log('HOME!');
}

function drawClock(left, top, width, height, bgColour, fgColour, timeString) {
  ctx.fillStyle = bgColour;
  ctx.fillRect(left, top, width, height);
  ctx.fillStyle = fgColour;;
  ctx.font = Math.floor(0.5 * height) + 'pt sans';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(timeString, left + width/2, top + height/2);
}
