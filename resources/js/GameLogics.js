class GameLogics {
  constructor({gameCanvas}) {
    this.gameCanvas = gameCanvas;
    this.gameCanvas.getCanvas().width = window.innerWidth;
    this.gameCanvas.getCanvas().height = window.innerHeight;

    this.particles = new Particles({
      'gameCanvas': this.gameCanvas
    });
  }

  render() {
    // Clear screen.
    this.gameCanvas.clear();

    // Drawing and Updating Particles background.
    this.particles.drawAndUpdate();


    this.gameCanvas.context.fillStyle = 'red';
    this.gameCanvas.context.fillRect(10, 10, 200, 200);
  };

  update(time) {
    
  };

}