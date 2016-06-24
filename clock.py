import threading
import time


class Clock(threading.Thread):
    def __init__(self, frame_rate):
        threading.Thread.__init__(self)
        self.frame_rate = frame_rate
        self.tic = 0
        self.max_tic = 0
        self.stop = False

    def get_tic(self):
        return self.tic

    def reset(self):
        self.tic = 0

    def set_max_tic(self, max_tic):
        self.max_tic = max_tic

    def get_frame_rate(self):
        return self.frame_rate

    def _tic_up(self):
        if self.tic < self.max_tic:
            self.tic += 1

    def exit(self):
        self.stop = True

    def run(self):
        while self.stop is False:
            time.sleep(1.0/self.frame_rate)
            self._tic_up()


if __name__ == '__main__':
    clock = Clock(25)
    clock.set_max_tic(100000)

    clock.start()

    time.sleep(3)
    print clock.get_tic()
    clock.exit()

    print "Exiting Main Thread"