class Graph {
    constructor(points = [], segments = [] ) {
        this.points = points;
        this.segments = segments;
    }
    static load(info) {
        const points = info.points.map((i) => new Point(i.x, i.y));
        const segments = info.segments.map((i) => new Segment(
                points.find((p) => p.equals(i.p1)),
                points.find((p) => p.equals(i.p2))
            ));
        return new Graph(points, segments);
    }

    hash() {
        return JSON.stringify(this);
    }
    
    addPoint(point) {
        this.points.push(point);
    }

    tryAddPoint(point){
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }
    
    removePoint(point) {
        const segs = this.getSegmentsWithPoint(point);
        for (const seg of segs) {
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }

    containsPoint(point) {
        return this.points.find(p => p.equals(point));
    }

    addSegment(segment) {
        this.segments.push(segment);
    }

    tryAddSegment(segment) {
        if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
            this.addSegment(segment);
            return true;
        }
        return false;
    }

    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    containsSegment(segment) {
        return this.segments.find(s => s.equals(segment));
    }

    getSegmentsWithPoint(point) {
        const segs = [];
        for ( const seg of this.segments ) {
            if (seg.includes(point)) {
                segs.push(seg);
            }
        }
        return segs;
    }
    
    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(ctx) {
        for (const segment of this.segments ) {
            segment.draw(ctx);
        }
        for (const point of this.points) {
            point.draw(ctx);
        }
    }

}


