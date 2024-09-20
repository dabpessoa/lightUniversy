class Smoke {
    constructor({gameCanvas, numberOfSmokePoints, polygonBox, speedX, speedY}) {
      this.gameCanvas = gameCanvas;
      this.numberOfSmokePoints = numberOfSmokePoints;
      this.polygonBox = polygonBox || this.createDefaultPolygon();
      this.speedPosition = new SpeedPosition({
        "speedX": speedX,
        "speedY": speedY
      });
    }

    createDefaultPolygon() {
      for(i = 0 ; i < this.polygonBox.length ; i++) {
        var coordinates = polygonBox[i];
      }
    }

    draw() {
        for(i = 0 ; i < this.polygonBox.length ; i++) {
            var coordinates = polygonBox[i];

            this.gameCanvas.getContext().fillStyle = 'white';
            this.gameCanvas.getContext().beginPath();
            this.gameCanvas.getContext().arc(coordinates.posX, coordinates.posY, 1, 0, 2 * Math.PI, false);
            this.gameCanvas.getContext().fill();
        }
    }

    update(elapsedTime) {
        for(i = 0 ; i < this.polygonBox.length ; i++) {
            var coordinates = polygonBox[i];

            var speedPosition = new SpeedPosition({
                "posX": coordinates.posX,
                "posY": coordinates.posY,
                "speedX": this.speedX,
                "speedY": this.speedY
            });

            speedPosition.proccessPositionByTime(elapsedTime);

            coordinates.posX = speedPosition.posX;
            coordinates.posY = speedPosition.posY;

            this.checkReset(coordinates);
        }
    }

    checkReset(coordinates) {
      
    }

    // Usado para executar animação fora do gameLoop. Geralmente utilizado somente para testes.
    animate() {
        var self = this;
        setInterval(function () {
            self.gameCanvas.clear();
            self.draw();
            self.update(.1);
        }, 1000 / 60);
    }
}