import glob
import os
import json
from clock import Clock

class Camera(object):
    """An emulated camera implementation that streams a repeated sequence of
    files 1.jpg, 2.jpg and 3.jpg at a rate of one frame per second."""

    def __init__(self, clock):
        self.__load()
        self.tic = 0
        self.frame_rate = clock.get_frame_rate()
        self.clock = clock
        self.clock.set_max_tic(len(self.frames)-1)
        self.clock.start()

    def __load(self):
        self.frames = []
        self.masks = []
        self.masks_txt = ['t', 'g', 'y', 'r']
        cores = dict(verde=1, amarelo=2, vermelho=3)
        for d in os.listdir('videos'):
            i = len(self.frames)
            self.frames.extend([open(f, 'rb').read() for f in sorted(glob.glob('videos/%s/*.jpg' % d))])
            j = len(self.frames)
            self.masks.extend([self.masks_txt[0]]*(j-i))
            with open('videos/%s/meta.json' % d) as data_file:
                data = json.load(data_file)
            for key, value in data.iteritems():
                for v in value:
                    for k in xrange(v[0], v[1]+1):
                        self.masks[k+i] = self.masks_txt[cores[key]]

    def get_frame(self):
        if len(self.frames)-1 == self.clock.get_tic():
            self.clock.reset()
        return self.frames[self.clock.get_tic()]

    def get_mask(self):
        print self.clock.get_tic()
        return self.masks[self.clock.get_tic()]

if __name__ == '__main__':
    from time import sleep
    clk = Clock(100)
    cam = Camera(clk)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    sleep(1)
    print cam.get_mask()
    clk.exit()