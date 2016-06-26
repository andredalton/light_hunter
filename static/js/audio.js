/**
 * Created by avale on 25/06/16.
 */
var sounds = {}
var colors = {}

var audio_files = {'r' : 'sound3', 'y': 'sound2', 'g': 'sound1', 't': null}
var default_sounds = {}

function create_audio_files() {
  for (key in audio_files) {
    if (audio_files[key] !== null) {
      var a = new Audio('/static/sound/' + audio_files[key] + '.mp3')
      default_sounds[key] = a;
    }
  }
}

function mute(key) {
  var s = sounds[key];
  if (s)
    s.pause();
}

function unmute(key) {
  var s = sounds[key];
  if (s) {
    s.volume = volume;
    s.loop = true;
    s.play();
  }
}

function muteAll() {
  for (var s of sounds)
    s.pause();
}

$(document).ready(create_audio_files);
