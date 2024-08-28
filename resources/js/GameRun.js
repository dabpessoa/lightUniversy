var GameRun = function() {
  if (GameLoop && GameCanvas && GameLogics) {
    const gameCanvas = new GameCanvas('canvas', '2d');
    const gameLogics = new GameLogics();
    
    // Cria e prepara valores e variáveis.
    gameLogics.create({
      'gameCanvas': gameCanvas
    });

    const functionRender = gameLogics.render(gameCanvas);
    const functionUpdate = gameLogics.update();

    const gameLoop = new GameLoop(functionRender, functionUpdate);

    this.init = function() {
      gameLoop.start();
    };

    this.stop = function() {
      gameLoop.stop();
    };

    this.fullscreen = function() {
      gameLoop.fullScreen(gameCanvas.getCanvas());
    }
  }
}

const gameRun = new GameRun();