class GameLogics {
  constructor({gameCanvas}) {
    this.gameCanvas = gameCanvas;

    this.gameCanvas.getCanvas().width = window.innerWidth;
    this.gameCanvas.getCanvas().height = window.innerHeight;

    this.particles = new Particles({
      'gameCanvas': this.gameCanvas
    });
  }

  render(gameCanvas) {
    var selfGameCanvas = this.gameCanvas;
    return function () {
      // Clear screen.
      selfGameCanvas.clear();
    }
  };

  update() {
    var selfParticles = this.particles;
    return function (time) {
      // Drawing and Updating Particles background.
      selfParticles.drawAndUpdate(time);
    }
  };

}