#!/usr/bin/env python
from flask import Flask, render_template, Response

from camera import Camera
from clock import Clock

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/phone')
def phone():
    return render_template('phone.html')


@app.route('/teste')
def teste():
    return render_template('teste.html')


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


def gen():
    """Video streaming generator function."""
    global cam
    while True:
        frame = cam.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/mask')
def mask_feed():
    global cam
    return Response(cam.get_mask())


if __name__ == '__main__':
    clock = Clock(25)
    cam = Camera(clock)
    app.run(host='0.0.0.0', debug=True, threaded=True)
    clock.exit()