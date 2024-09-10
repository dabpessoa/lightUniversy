class Particle {
    constructor({gameCanvas, totalParticles, particleNumber, color, particleConfig}) {
        this.gameCanvas = gameCanvas;
        this.totalParticles = totalParticles;
        this.particleNumber = particleNumber;
        this.particleConfig = particleConfig;

        this.radius = random(this.particleConfig.minRadius, this.particleConfig.maxRadius);
        this.color = 'rgba(' + color + ',' + random(this.particleConfig.minOpacity, this.particleConfig.maxOpacity) + ')';

        this.speedPosition = new SpeedPosition({
            "posX": random(0, this.gameCanvas.getCanvas().width),
            "posY": random(0, this.gameCanvas.getCanvas().height / this.totalParticles * this.particleNumber),
            "speedX": random(this.particleConfig.minSpeed, this.particleConfig.maxSpeed),
            "speedY": random(this.particleConfig.minSpeed, this.particleConfig.maxSpeed)
        });
    }

    draw() {
        this.gameCanvas.getContext().fillStyle = this.color;
        this.gameCanvas.getContext().beginPath();
        this.gameCanvas.getContext().arc(this.speedPosition.posX, this.speedPosition.posY, this.radius, 0, 2 * Math.PI, false);
        this.gameCanvas.getContext().fill();
    }

    update(elapsedTime) {
        this.speedPosition.proccessPositionByTime(elapsedTime);
        this.checkReset();
    }

    checkReset() {
        if (this.speedPosition.posX > this.gameCanvas.getCanvas().width + this.radius || this.speedPosition.posY > this.gameCanvas.getCanvas().height + this.radius) {
            var rand = random(0, 1);

            if (rand > .5) {
                // 50% chance particle comes from left side of window...
                this.speedPosition.posX = -this.radius;
                this.speedPosition.posY = random(0, this.gameCanvas.getCanvas().height);
            } else {
                //... or bottom of window
                this.speedPosition.posX = random(0, this.gameCanvas.getCanvas().width);
                this.speedPosition.posY = this.gameCanvas.getCanvas().height + this.radius;
            }
        }
    }
}

class Particles {
    constructor({gameCanvas, numParticles, colors}) {
        this.gameCanvas = gameCanvas;
        this.numParticles = numParticles || 200;
        this.colors = colors || [
            '255, 255, 255',
        ];

        var particleConfig = new ParticleConfig({
            'minRadius': 0,
            'maxRadius': 1.5,
            'minOpacity': 0,
            'maxOpacity': 1,
            'minSpeed': .00001,
            'maxSpeed': .003,
        });

        this.particlesArray = this.createParticles(particleConfig);
    }

    createParticles(particleConfig) {
        var array = []
        
        for (var i = 0; i < this.numParticles; i++) {
            array.push(new Particle({
                'gameCanvas': this.gameCanvas,
                'totalParticles': this.numParticles,
                'particleNumber': i,
                'color' : this.colors[~~(random(0, this.colors.length))],
                'particleConfig': particleConfig
            }));
        }

        return array;
    }

    draw() {
        for (var i = 0; i < this.numParticles; i++) {
            this.particlesArray[i].draw();
        }
    }

    update(elapsedTime) {
        for (var i = 0; i < this.numParticles; i++) {
            // update
            this.particlesArray[i].update(elapsedTime);
        }
    }

    drawAndUpdate(elapsedTime) {
        for (var i = 0; i < this.numParticles; i++) {
            // draw
            this.particlesArray[i].draw();

            // update
            this.particlesArray[i].update(elapsedTime);
        }
    }

    // Usado para executar animação fora do gameLoop. Geralmente utilizado somente para testes.
    animate() {
        var self = this;
        setInterval(function () {
            self.gameCanvas.clear();
            self.drawAndUpdate(.1);
        }, 1000 / 60);
    }

}

class ParticleConfig {
    constructor({minRadius, maxRadius, minOpacity, maxOpacity, minSpeed, maxSpeed}) {
        this.minRadius = minRadius || 0;
        this.maxRadius = maxRadius || 1.5;
        this.minOpacity = minOpacity || 0;
        this.maxOpacity = maxOpacity || 1;
        this.minSpeed = minSpeed || .002;
        this.maxSpeed = maxSpeed || .009;
    }
}