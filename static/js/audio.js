"use strict";

var sounds = {}
var colors = {}

var audio_files = {'r' : 'sound3', 'y': 'sound2', 'g': 'sound1', 't': null}
var default_sounds = {}

function create_audio_files() {
  for (var key in audio_files) {
    if (audio_files[key] !== null) {
      var a = new Audio('/static/sound/' + audio_files[key] + '.mp3')
      sounds[key] = default_sounds[key] = a;
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
  for (var s in sounds)
    sounds[s].pause();
}

function playOnce(key) {
  volume = $('#volume').val();
  key = key[0];
  var s = sounds[key];
  if (s) {
    s.loop = false;
    s.volume = volume;
    s.play();
  }
}

function setNewAudioFile(colour) {
  var key = colour[0];
  var file = $('#aud-file-' + colour)[0].files[0];
  if (!file) {
    sounds[key] = null;
    return;
  }
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    sounds[key] = new Audio(reader.result);
  }, false);
  reader.readAsDataURL(file);
}

$(document).ready(create_audio_files);
