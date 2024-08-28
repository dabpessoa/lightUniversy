var ObjectStyle = function({fillStyle, lineWidth, strokeStyle, shadow}) {
  this.fillStyle = fillStyle || 'black';
  this.lineWidth = lineWidth;
  this.strokeStyle = strokeStyle;
  this.shadow = shadow || {
    color: undefined,
    blur: undefined,
    offSetX: undefined,
    offSetY: undefined
  };

  this.checkStyle = function(context) {
    if (this.fillStyle) {
      context.fillStyle = this.fillStyle;
    }

    if (this.shadow) {
      if (this.shadow.color) {
        context.shadowColor = this.shadow.color;
      }

      if (this.shadow.blur) {
        context.shadowBlur = this.shadow.blur;
      }
      
      if (this.shadow.offSetX) {
        context.shadowOffsetX = this.shadow.offSetX;
      }
      
      if (this.shadow.offSetY) {
        context.shadowOffsetY = this.shadow.offSetY;
      }
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