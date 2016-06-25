var repeat = null;
var status = 't';

function received_data(data) {
  
  if (status != data) {
    // sound
    if (status != 't')
      mute(status);
    if (data != 't')
      unmute(data);
  }
  
  // screen
  clear();
  status = data;
  switch (data) {
    case 'r':
      $('#status-txt').html('RED')
      chess(255, 0, 0, 0.3, 15)
      break;
    case 'y':
      $('#status-txt').html('YELLOW')
      lines(255, 255, 50, 0.3, -45, 15, 10)
      break;
    case 'g':
      $('#status-txt').html('GREEN')
      lines(0, 255, 0, 0.3, 45, 15, 20)
      break;
    case 't':
      $('#status-txt').html('TRANSPARENT')
      break;
    default:
      $('#status-txt').html('INVALID DATA')
      break;
  }
}

function failed() {
  clear();
  if (status != 't')
    mute(status);
  status = 't';
  $('#status-txt').html('<span style="color:red">ERROR</span>');
}

function request() {
  $.ajax('/mask').done(received_data).fail(failed);
}

function start_conn(interval) {
  interval = interval || 500;
  if (!repeat)
    repeat = setInterval(request, interval);
}

function stop_conn() {
  if (repeat)
    clearInterval(repeat);
  repeat = null;
}

$(document).ready(start_conn);
