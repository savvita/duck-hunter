class Point {
    public x : number;
    public y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    private topLeftCorner: Point;
    private width: number;
    private height: number;

    constructor(x, y, width, height) {
        this.topLeftCorner = new Point(x, y);
        this.width = width;
        this.height = height;
    }

    getTopLeftCorner(): Point {
        return this.topLeftCorner;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    setWidth(width: number): void {
        if(width >= 0) {
            this.width = width;
        }
    }
    
    setHeight(height: number): void {
        if(height >= 0) {
            this.height = height;
        }
    }
}


export { Point, Rectangle };