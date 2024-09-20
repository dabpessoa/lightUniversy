class GameLogics {
  constructor({gameCanvas}) {
    this.gameCanvas = gameCanvas;
    this.gameCanvas.getCanvas().width = window.innerWidth;
    this.gameCanvas.getCanvas().height = window.innerHeight;

    this.particles = new Particles({
      'gameCanvas': this.gameCanvas,
      'numParticles': 150,
      'colors': [
        '255, 255, 255',
        '125, 190, 255',
        '255, 255, 169'
      ]
    });
  }

  render() {
    // Clear screen.
    this.gameCanvas.clear();

    // Drawing Particles background.
    this.particles.draw();

    this.gameCanvas.context.fillStyle = 'red';
    this.gameCanvas.context.fillRect(10, 10, 200, 200);
  };

  update(elapsedTime) {
    // Updating Particles background.
    this.particles.update(elapsedTime);
  };

}