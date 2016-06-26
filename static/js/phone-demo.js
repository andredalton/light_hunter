"use strict";

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
  lines(rgb[0], rgb[1], rgb[2], alpha, angle, number, lineWidth);
}
