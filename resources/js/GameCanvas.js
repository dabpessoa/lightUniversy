var GameCanvas = function(canvasId, contextDimension) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext(contextDimension);

  // Limpar a tela
  this.clear = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  this.getCanvas = function() {
    return canvas;
  };

  this.getContext = function() {
    return context;
  };
}