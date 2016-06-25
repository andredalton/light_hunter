/**
 * Created by avale on 25/06/16.
 */
var sounds = {}
var colors = {}

var audio_files = {'r' : 'sound3', 'y': 'sound2', 'g': 'sound1', 't': null}

function create_audio_files() {
  for (key in audio_files) {
    if (audio_files[key] !== null) {
      var a = new Audio('/static/sound/' + audio_files[key] + '.mp3')
      a.volume = 0;
      a.loop = true;
      a.play();
      sounds[audio_files[key]] = a;
    }
  }
}

function mute(key) {
  sounds[audio_files[key]].volume = 0;
}

function unmute(key) {
  sounds[audio_files[key]].volume = 1;
}

$(document).ready(create_audio_files);
