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
      console.log('render...');
      // Clear screen.
      gameCanvas.clear();

      // Draw Particles background.
      selfParticles.draw();
    }
  };

  this.update = function () {
    var selfParticles = this.particles;
    return function (time) {
      console.log('update... Time: '+time);

      // Update Particles background.
      selfParticles.update(time);
    }
  };

}