var ObjectStyle = function(fillStyle) {
  this.fillStyle = fillStyle || 'black';
  this.lineWidth = undefined;
  this.strokeStyle = undefined;
  this.shadow = {
    color: '#000',
    blur: 20,
    offSetX: 10,
    offSetY: 10
  };
  this.checkStyle = function(context) {
    if (this.fillStyle) {
      context.fillStyle = this.fillStyle;
    }

    if (this.shadow) {
      context.shadowColor = this.shadow.color;
      context.shadowBlur = this.shadow.blur;
      context.shadowOffsetX = this.shadow.offSetX;
      context.shadowOffsetY = this.shadow.offSetY;
    }

    if (this.fillStyle || this.shadow) {
      context.fill();
    }

    if (this.lineWidth && this.lineWidth > 0) {
      context.lineWidth = this.lineWidth;
      if (this.strokeStyle) {
        context.strokeStyle = this.strokeStyle;
      }
      context.stroke();
    }
  }
}