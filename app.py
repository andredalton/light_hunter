#!/usr/bin/env python
from flask import Flask, render_template, Response

# emulated camera
from camera import Camera
from clock import Clock

app = Flask(__name__)


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

def gen2(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_mask()
        yield (b'--frame\r\n'
               b'Content-Type: image/png\r\n\r\n' + frame + b'\r\n')



@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    global cam
    return Response(gen(cam),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/mask_feed')
def mask_feed():
    global cam
    return Response(gen2(cam),
                    mimetype='multipart/x-mixed-replace; boundary=frame')




if __name__ == '__main__':
    clock = Clock(25)
    cam = Camera(clock)
    app.run(host='0.0.0.0', debug=True, threaded=True)
    clock.exit()