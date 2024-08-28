var GameLoop = function ({renderLogics, updateLogics, fps = new FPS({'fps': 120})}) {
  this.gameFrameVariable = undefined;
  this.running = false;
  this.fps = fps;
  this.render = renderLogics || function () { console.log("Você deve sobrescrever a função de 'render' do gameloop.") };
  this.update = updateLogics || function (elapsedTime) { console.log("Você deve sobrescrever a função de 'update' do gameloop.") };

  this.start = function () {
    this.running = true;
    if (!this.gameFrameVariable) {
      this.process(performance.now());
    }
  };

  this.stop = function () {
    this.running = false;
    if (this.gameFrameVariable) {
      this.cancelRequestAnimFrame()(this.gameFrameVariable);
    }
    this.gameFrameVariable = undefined;
  };

  this.continue = function () {
    this.start();
  };

  this.process = function (previousTime) {
    if (this.fps.tick()) {
      var now = performance.now();
      var elapsedTime = now - previousTime;
      previousTime = now;

      this.render();
      this.update(elapsedTime);
    }

    if (this.isRunning()) {
      var thisGame = this;
      this.gameFrameVariable = this.requestAnimFrame()(function () {
        thisGame.process(previousTime);
      });
    }
  };

  this.requestAnimFrame = function (callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  };

  this.cancelRequestAnimFrame = function () {
    return window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      window.clearTimeout();
  };

  this.fullScreen = function (element) {
    // full-screen available?
    if (document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled) {

      // go full-screen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  this.isRunning = function () {
    return this.running;
  }
};

var FPS = function ({fps}) {
  this.fps = fps || 60;
  this.lastTickTime = undefined;
  this.frameCounter = 0;
  this.timeValueToUse = 1000; // Milliseconds.

  // On every loop iterate, this tick method must be called.
  this.tick = function () {
    if (!this.lastTickTime) {
      this.lastTickTime = this.now();
    }

    this.frameCounter++;
    var ellapsedTime = this.ellapsedTime(this.lastTickTime);
    var isReachedSecond = this.isReachedTheSecond(ellapsedTime);
    var isReachedFrameRate = this.isReachedFrameRate();

    if (isReachedFrameRate && !isReachedSecond) {
      return false;
    }

    if (isReachedSecond && isReachedFrameRate) {
      this.clear();
    }

    return true;
  }

  this.clear = function() {
    this.lastTickTime = undefined;
    this.frameCounter = 0;
  }

  // FPS rate is based on a second.
  this.isReachedTheSecond = function(ellapsedTime) {
    return ellapsedTime >= this.timeValueToUse;
  }

  this.isReachedFrameRate = function() {
    var isReached = this.frameCounter >= this.fps || this.frameCounter >= Number.MAX_VALUE;

    if (this.frameCounter >= Number.MAX_VALUE) {
      this.frameCounter = 0;
    }

    return isReached;
  }

  this.now = function () {
    return performance.now();
  }

  this.ellapsedTime = function(previousTime) {
    if (!previousTime) {
      previousTime = this.now();
    }

    return this.now() - previousTime;
  }

}