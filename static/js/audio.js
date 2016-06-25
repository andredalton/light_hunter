/**
 * Created by avale on 25/06/16.
 */
var sounds = {}
var colors = {}

sounds['g'] = new Audio('/static/sound/sound1.mp3');
sounds['g'].volume = 0;
sounds['g'].loop=true;
sounds['g'].play();

sounds['y'] = new Audio('/static/sound/sound2.mp3');
sounds['y'].volume = 0;
sounds['y'].loop=true;
sounds['y'].play();

sounds['r'] = new Audio('/static/sound/sound3.mp3');
sounds['r'].volume = 0;
sounds['r'].loop=true;
sounds['r'].play();

colors['g'] = 'green';
colors['y'] = 'yellow';
colors['r'] = 'red';

if (frame_rate === undefined) {
    var frame_rate = 25;
}

var status;

function get_status() {
    $.get('mask', function(data){
        if (!status) {
            status = data;
        }
        if (data != status) {
            if (status != 't') {
                sounds[status].volume = 0;
            }
            if (data != 't') {
                sounds[data].volume = 1;
                $('.mask').css({'background-color': colors[data], 'opacity': 0.3});
            }
            else {
                $('.mask').css({'opacity': 0});
            }
            status = data
        }
    });
}

setInterval(get_status, 1000/frame_rate);