import { Point, Rectangle } from './math.ts';

class Animal {
    protected position : Point;
    protected speed: number;
    protected rightMovingImages: Rectangle[];
    protected fieldBounds: Rectangle;

    protected isReverse: boolean;
    protected currentImageIndex: number;
    protected currentImage: Rectangle;
    protected currentMove: number;
    protected isAlive: boolean;
    protected scale: number;

    constructor(position, speed, fieldBounds, rightMovingImages, scale) {
        this.position = position;
        this.speed = speed;
        this.fieldBounds = fieldBounds;
        this.rightMovingImages = rightMovingImages;
        this.currentImageIndex = 0;
        this.currentImage = rightMovingImages[0];
        this.isReverse = false;
        this.currentMove = 0;
        this.isAlive = true;
        this.scale = scale;
    }

    getPosition() : Point {
        return this.position;
    }

    getImageRectangle() : Rectangle {
        return this.currentImage;
    }

    getIsReverse(): boolean {
        return this.isReverse;
    }

    getIsAlive(): boolean {
        return this.isAlive;
    }

    getScale(): number {
        return this.scale;
    }

    kill(): void {
        this.isAlive = false;
    }

    moveRight(): void {
        if(this.position.x + this.rightMovingImages[this.currentImageIndex].width * this.scale + this.speed < this.fieldBounds.width) {
            this.position.x += this.speed;
        }
        else {
            this.currentMove = 1;
        }
        this.currentImageIndex = (this.currentImageIndex + 1) % this.rightMovingImages.length;
        this.currentImage = this.rightMovingImages[this.currentImageIndex];
        this.isReverse = false;
    }

    moveLeft(): void {
        if(this.position.x - this.speed > 0) {
            this.position.x -= this.speed;
        }
        else {
            this.currentMove = 0;
        }
        this.currentImageIndex = (this.currentImageIndex + 1) % this.rightMovingImages.length;
        this.currentImage = this.rightMovingImages[this.currentImageIndex];
        this.isReverse = true;
    }
}

export default Animal;