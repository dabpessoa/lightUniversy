class GameCanvas {
  constructor({canvasId, contextDimension}) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext(contextDimension)
  }

  // Limpar a tela
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getCanvas() {
    return this.canvas;
  };

  getContext() {
    return this.context;
  };
}