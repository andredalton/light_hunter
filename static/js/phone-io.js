"use strict";

var connectionTimer = null;
var transparentTimer = null;
var status = 't';
var lhEnabled = false;
var soundEnabled = false;
var maskEnabled = false;
var volume = 1;


var masks = {
  't': null,
  'r': null,
  'y': null,
  'g': null
};

function initIO() {
  stop_lh();
}

function received_data(data) {
  
  if (soundEnabled && status != data) {
    // sound
    if (status != 't')
      mute(status);
    if (data != 't')
      unmute(data);
  }

  clear();
  if (maskEnabled) {
    // screen
    if (masks[data]) {
      var func = masks[data][0];
      var args = masks[data][1];
      func.apply(null, args);
    }
  }

  $('#status-txt').html(data);
  status = data;
  drawStatusBar();
}

function failed() {
  clear();
  if (soundEnabled && status != 't')
    mute(status);
  status = 't';
  $('#status-txt').html('<span style="color:red">ERROR</span>');
}

function request() {
  $.ajax('/mask').done(received_data).fail(failed);
}

function start_lh(interval) {
  
  if (lhEnabled)
    return;
  
  lhEnabled = true;
  
  interval = interval || 250;
  
  soundEnabled = $('#chk-audio').is(':checked');
  maskEnabled  = $('#chk-mask' ).is(':checked');
  
  if (soundEnabled) {
    volume = $('#volume').val();
  }
  
  if (maskEnabled) {
    
    var opacity = $('#opacity').val();
    
    for (var colour of ['red', 'yellow', 'green']) {
      
      
      if ($('#chk-mask-' + colour).is(':checked')) {
        var args = hexToRGB($('#colour-' + colour).val());
        args.push(opacity);
        var func;
        switch($('#mask-' + colour).val()) {
          case 'chess':
            func = chess;
            args.push(15);
            break;
          case 'vertical':
            func = lines;
            args.push(90, 15, 10);
            break;
          case 'oblique':
            func = lines;
            args.push(45, 20, 10);
            break;
        }
        masks[colour[0]] = [func, args];
      } else {
        masks[colour[0]] = null; 
      }

    }
    
  }
  
  if (transparentTimer !== null) {
    clearInterval(transparentTimer);
    transparentTimer = null;
  }

  if (connectionTimer === null)
    connectionTimer = setInterval(request, interval);
  
  homeButtonClicked();
}

function stop_lh() {
  soundEnabled = false;
  maskEnabled = false;
  lhEnabled = false;
  muteAll();
  if (connectionTimer !== null)
    clearInterval(connectionTimer);
  connectionTimer = null;
  if (transparentTimer === null)
    transparentTimer = setInterval(received_data, 250, 't');
}

function showLightHunterInterface() {
  stop_lh();
  $('#light-hunter-interface').css('z-index', 3);
}

function hideLightHunterInterface() {
  $('#light-hunter-interface').css('z-index', -1);
}

function openWaze() {
  displayingWaze = true;
}

function closeWaze() {
  if (displayingWaze) {
    displayingWaze = false;
  }
}

$(document).ready(initIO);
