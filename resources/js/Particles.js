function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Particle {
    constructor({ gameCanvas, totalParticles, particleNumber, color }) {
        this.gameCanvas = gameCanvas;
        this.totalParticles = totalParticles;
        this.particleNumber = particleNumber;
        this.color = color;

        this.minRadius = 0;
        this.maxRadius = 1.5;
        this.minOpacity = 0;
        this.maxOpacity = 1;
        this.minSpeed = .005;
        this.maxSpeed = .1;

        this.radius = random(this.minRadius, this.maxRadius),
            this.xPos = random(0, this.gameCanvas.getCanvas().width),
            this.yPos = random(0, this.gameCanvas.getCanvas().height / this.totalParticles * this.particleNumber),
            this.xVelocity = random(this.minSpeed, this.maxSpeed),
            this.yVelocity = random(this.minSpeed, this.maxSpeed),
            this.color = 'rgba(' + this.color + ',' + random(this.minOpacity, this.maxOpacity) + ')'
    }

    draw() {
        this.gameCanvas.getContext().fillStyle = this.color;
        this.gameCanvas.getContext().beginPath();
        this.gameCanvas.getContext().arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
        this.gameCanvas.getContext().fill();
    }

    update() {
        this.xPos += this.xVelocity;
        this.yPos -= this.yVelocity;
    }

    checkReset() {
        if (this.xPos > this.gameCanvas.getCanvas().width + this.radius || this.yPos > this.gameCanvas.getCanvas().height + this.radius) {
            var rand = random(0, 1);

            if (rand > .5) {
                // 50% chance particle comes from left side of window...
                this.xPos = -this.radius;
                this.yPos = random(0, this.gameCanvas.getCanvas().height);
            } else {
                //... or bottom of window
                this.xPos = random(0, this.gameCanvas.getCanvas().width);
                this.yPos = this.gameCanvas.getCanvas().height + this.radius;
            }
        }
    }
}

class Particles {
    constructor({ gameCanvas }) {
        this.gameCanvas = gameCanvas;
        this.fps = 60;
        this.numParticles = 200;
        this.colors = [
            '255, 255, 255',
        ];
        this.particlesArray = this.createParticles();
    }

    createParticles() {
        var array = []
        for (var i = 0; i < this.numParticles; i++) {
            array.push(new Particle({
                'gameCanvas': this.gameCanvas,
                'totalParticles': this.numParticles,
                'particleNumber': i,
                'color': this.colors[~~(random(0, this.colors.length))]
            }));
        }
        return array;
    }

    draw() {
        for (var i = 0; i < this.numParticles; i++) {
            this.particlesArray[i].draw();
        }
    }

    update(time) {
        for (var i = 0; i < this.numParticles; i++) {
            // update
            this.particlesArray[i].update();
            this.particlesArray[i].checkReset();
        }
    }

    drawAndUpdate(time) {
        for (var i = 0; i < this.numParticles; i++) {
            // draw
            this.particlesArray[i].draw();

            // update
            this.particlesArray[i].update();
            this.particlesArray[i].checkReset();
        }
    }

    animate() {
        var self = this;
        setInterval(function () {
            self.gameCanvas.clear();
            self.drawAndUpdate();
        }, 1000 / this.fps);
    }

}