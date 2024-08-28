var GameLogics = function () {
  this.particles = undefined;

  this.create = function ({ gameCanvas }) {
    gameCanvas.getCanvas().width = window.innerWidth;
    gameCanvas.getCanvas().height = window.innerHeight;

    this.particles = new Particles({
      'gameCanvas': gameCanvas
    });
    // this.particles.animate();
  }

  this.render = function (gameCanvas) {
    var selfParticles = this.particles;
    return function () {
      // Clear screen.
      gameCanvas.clear();
    }
  };

  this.update = function () {
    var selfParticles = this.particles;
    return function (time) {
      // Drawing and Updating Particles background.
      selfParticles.drawAndUpdate(time);
    }
  };

}