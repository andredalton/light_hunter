function hexToRGB(hex) {
  var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  var result = regex.exec(hex);
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

function demoClear() {
  clear();
}

function demoChess() {
  var rgb = hexToRGB($('#chess-colour').val());
  var alpha = $('#chess-opacity').val();
  var rows = $('#chess-rows').val();
  chess(rgb[0], rgb[1], rgb[2], alpha, rows);
}

function demoLines() {
  var rgb = hexToRGB($('#line-colour').val());
  var alpha = $('#line-opacity').val();
  var angle = $('#line-angle').val();
  var number = $('#line-number').val();
  var lineWidth = $('#line-width').val();
  console.log(rgb[0], rgb[1], rgb[2], alpha, angle, number, lineWidth);
  lines(rgb[0], rgb[1], rgb[2], alpha, angle, number, lineWidth);
}
