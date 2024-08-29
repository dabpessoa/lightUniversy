class GameRun {
  constructor({canvasId, contextDimension}) {
    this.gameCanvas = new GameCanvas({"canvasId": canvasId, "contextDimension": contextDimension});
    this.gameLogics = new GameLogics({"gameCanvas": this.gameCanvas});

    this.gameLoop = new GameLoop({
      'gameLogics': this.gameLogics,
      'fps': new FPS({'fps': 120}) 
    });
  }

  init() {
    this.gameLoop.start();
  };

  stop() {
    this.gameLoop.stop();
  };

  fullscreen() {
    this.gameLoop.fullScreen(this.gameCanvas.getCanvas());
  }

  getGameLoop() {
    return this.gameLoop;
  }
}

const gameRun = new GameRun(
  {
    "canvasId": "canvas", 
    "contextDimension": "2d"
  });