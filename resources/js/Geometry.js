class Point {
    constructor({ x, y }) {
        this.x = x;
        this.y = y;
    }
}

class Edge {
    constructor({ p1, p2 }) {
        this.p1 = p1;
        this.p2 = p2;
    }

    intersects({ edge, asSegment = true }) {
        const a = this.p1;
        const b = this.p2;
        const e = edge.p1;
        const f = edge.p2;

        const a1 = b.y - a.y;
        const a2 = f.y - e.y;
        const b1 = a.x - b.x;
        const b2 = e.x - f.x;
        const c1 = (b.x * a.y) - (a.x * b.y);
        const c2 = (f.x * e.y) - (e.x * f.y);
        const denom = (a1 * b2) - (a2 * b1);

        if (denom === 0) {
            return null;
        }

        var point = new Point();
        point.x = ((b1 * c2) - (b2 * c1)) / denom;
        point.y = ((a2 * c1) - (a1 * c2)) / denom;

        if (asSegment) {
            const uc = ((f.y - e.y) * (b.x - a.x) - (f.x - e.x) * (b.y - a.y));
            const ua = (((f.x - e.x) * (a.y - e.y)) - (f.y - e.y) * (a.x - e.x)) / uc;
            const ub = (((b.x - a.x) * (a.y - e.y)) - ((b.y - a.y) * (a.x - e.x))) / uc;

            if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
                return point;
            } else {
                return null;
            }
        }

        return point;
    }
}

class Polygon {
    constructor({ points }) {
        this.points = points;
        this.edges = [];
        this.createEdges();

        this.centerX = undefined;
        this.centerY = undefined;
    }

    createEdges() {
        if (this.points) {
            this.edges = [];

            for (var i = 0 ; i < this.points.length ; i ++) {
                if (i + 1 < this.points.length) {
                    let p1 = this.points[i];
                    let p2 = this.points[i+1];
                    this.edges.push(new Edge({"p1": p1, "p2": p2}));
                }
            }

            // Final Edge.
            let p1 = this.points[this.points.length - 1];
            let p2 = this.points[0];
            this.edges.push(new Edge({"p1": p1, "p2": p2}));
        }
    }

    createARegularPolygon({centerX, centerY, size, sides}) {
        this.points = [];
        this.centerX = centerX;
        this.centerY = centerY;

        for (var i = 0; i < sides; i++) {
            let x = this.centerX + size * Math.cos(i * 2 * Math.PI / sides);
            let y = this.centerY + size * Math.sin(i * 2 * Math.PI / sides);
            this.points.push(new Point({"x": x, "y": y}));
        }

        this.createEdges();
    }

    intersects(polygon) {
        const edges1 = this.edges;
        const edges2 = polygon.edges;

        for (let i = 0; i < edges1.length; i++) {
            const edge1 = edges1[i];

            for (let j = 0; j < edges2.length; j++) {
                const edge2 = edges2[j];

                if (edge1.intersects({ "edge": edge2 })) {
                    return true;
                }
            }
        }

        return false;
    }

    draw({context, strokeStyle = "#c3c3c3", lineWidth = 2, fillStyle = "#c3c3c3"}) {
        if (this.centerX && this.centerY) {
            context.beginPath();
            context.arc(this.centerX, this.centerY, 2, 0, 2 * Math.PI, false);
            context.fillStyle = fillStyle;
            context.fill();
        }

        if (this.points && this.points.length > 2) { // Se forem somente 2 pontos, então trata-se de uma reta, e não um polígono.
            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y);
            for (var i = 1 ; i < this.points.length ; i++) {
                let point = this.points[i];
                context.lineTo(point.x, point.y);
            }
            context.lineTo(this.points[0].x, this.points[0].y);
            context.closePath();

            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.stroke();
        }
    }
}