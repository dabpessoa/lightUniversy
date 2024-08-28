var GameLoop = function(renderLogics, updateLogics) {
  this.gameFrameVariable = undefined;
  this.running = false;
  this.render = renderLogics || function() {console.log("Você deve sobrescrever a função de 'render' do gameloop.")};
  this.update = updateLogics || function(elapsedTime) {console.log("Você deve sobrescrever a função de 'update' do gameloop.")};

  this.start = function() {
    this.running = true;
    if (!this.gameFrameVariable) {
      var now = (new Date()).getTime();
      this.process(now);
    }
  };

  this.stop = function() {
    this.running = false;
    if (this.gameFrameVariable) {
            this.cancelRequestAnimFrame() (this.gameFrameVariable);	
        } 
    this.gameFrameVariable = undefined;
  };

  this.continue = function() {
    this.start();
  };

  this.process = function(previousTime) {
    var now = (new Date()).getTime();
    var elapsedTime = now - previousTime;
    previousTime = now;
    
    this.render();
    this.update(elapsedTime);

    if (this.isRunning()) {
            var thisGame = this;
            this.gameFrameVariable = this.requestAnimFrame() (function() {
                thisGame.process(previousTime);
            });
        }
  };

  this.requestAnimFrame = function(callback) {
    return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame || 
           window.oRequestAnimationFrame || 
           window.msRequestAnimationFrame ||
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
           };
  };

  this.cancelRequestAnimFrame = function() {
        return window.cancelAnimationFrame          	||
               window.webkitCancelRequestAnimationFrame ||
               window.mozCancelRequestAnimationFrame    ||
               window.oCancelRequestAnimationFrame     	||
               window.msCancelRequestAnimationFrame     ||
               window.clearTimeout();
  };

  this.fullScreen = function(element) {
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

    this.isRunning = function() {
        return this.running;
    }
};