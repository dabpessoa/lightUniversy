var SpeedPosition = function(posX, posY, speedX, speedY) {
  this.posX = posX || 0;
  this.posY = posY || 0;
  this.speedX = speedX || 0;
  this.speedY = speedY || 0;
  this.proccessPositionByTime = function(time) {
     // pixels / second
     this.posX += (time * this.speedX) / 1000;
     this.posY += (time * this.speedY) / 1000;
  }
}