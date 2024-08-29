class GameLoop {
  constructor({gameLogics, fps = new FPS({'fps': 120}), loopsToSleep = 600}) {
    this.gameFrameVariable = undefined;
    this.running = false;
    this.fps = fps;
    this.loopsToSleep = loopsToSleep;
    this.gameLogics = gameLogics;
    if (!this.gameLogics || !this.gameLogics.render || !this.gameLogics.update) {
      console.log("Você deve criar os métodos 'render' e 'update(time)' na classe 'GameLogics'.");
    }
  }

  start() {
    this.running = true;
    if (!this.gameFrameVariable) {
      this.process(performance.now());
    }
  }

  stop() {
    this.running = false;
    if (this.gameFrameVariable) {
      window.cancelAnimationFrame(this.gameFrameVariable);
    }
    this.gameFrameVariable = undefined;
  }

  continue() {
    this.start();
  }

  async process(previousTime) {
    var now = performance.now();
    var elapsedTime = now - previousTime;
    previousTime = now;

    if (this.fps.tick({"elapsedTime": elapsedTime})) {
      this.gameLogics.render();
      this.gameLogics.update(elapsedTime);
    }

    // Quando atingir determinada quantidade de loops, dormir por um curto espaço de tempo para desafogar o processador.
    if (this.loopsToSleep && ((this.fps.tickCounter % this.loopsToSleep) == 0)) {
      await sleep(100);
    }

    if (this.isRunning()) {
      var thisGame = this;
      this.gameFrameVariable = window.requestAnimationFrame(
        function() {
          thisGame.process(previousTime);
        }
      );
    }
  }

  fullScreen(element) {
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
  }

  isRunning() {
    return this.running;
  }

  getFPS() {
    return this.fps;
  }
}

class FPS {
  constructor({fps, interval = 1000 /* milliseconds */}) {
    this.fps = fps
    this.lastTickTime = undefined;
    this.interval = interval;
    this.loopFrequency = interval / fps;
    this.tickCounter = 0;
    this.fpsCounter = 0;
    this.intervalTimeCounter = 0;
    this.loopFrequencyTimeCounter = 0;
    this.timeBetweenTicks = undefined;
  }

  tick({elapsedTime}) {
    if (!this.lastTickTime) {
      this.lastTickTime = performance.now();
    }

    this.timeBetweenTicks = performance.now() - this.lastTickTime;
    this.lastTickTime = performance.now();

    if (this.tickCounter == Number.MAX_VALUE) {
      this.tickCounter = 0;
    }

    this.tickCounter++;
    this.intervalTimeCounter += elapsedTime;
    this.loopFrequencyTimeCounter += elapsedTime;

    // Verifica se atingiu o tempo de intervalo definido.
    if (this.intervalTimeCounter >= this.interval) {
      this.intervalTimeCounter = 0;
      this.fpsCounter = 0;
    }

    if (this.loopFrequencyTimeCounter >= this.loopFrequency) {
      this.loopFrequencyTimeCounter = 0;
      this.fpsCounter++;
      return true;
    }

    return false;
  }
  
}