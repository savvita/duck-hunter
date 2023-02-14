import { Rectangle } from './math.ts';
import Animal from './animal.ts';

class Dog extends Animal{
    private awayMovingImages: Rectangle[];
    private isAway: boolean;

    constructor(position, speed, fieldBounds, rightMovingImages, awayMovingImages) {
        super(position, speed, fieldBounds, rightMovingImages, 1);
        this.awayMovingImages = awayMovingImages;
        this.isAway = false;
    }

    getIsAway(): boolean {
        return this.isAway;
    }


    kill(): void {
        this.isAway = true;      
        this.currentImageIndex = 0;
    }

    moveAway(): void {
        this.isReverse = false;
        this.isAway = true;

        this.currentImageIndex++;

        if(this.currentImageIndex < this.awayMovingImages.length) {

            this.currentImage = this.awayMovingImages[this.currentImageIndex];
            this.position.y -= 40;

            if(this.currentMove === 0) {
                this.position.x += 40;
            }
            else {
                this.position.x -= 40;
            }
        }
        else {
            this.isAlive = false;
        }
    }

    move(): void {
        if(!this.isAway) {
            if(this.currentMove === 0) {
                this.moveRight();
            }
            else if(this.currentMove === 1) {
                this.moveLeft();
            }
        }
        else {
            this.moveAway();
        }
    }
}

class Pluffy extends Dog {
    constructor(position, fieldBounds, speed) {
        super(position, speed, fieldBounds, [new Rectangle(0, 0, 120, 95), new Rectangle(-120, 0, 120, 95), new Rectangle(-240, 0, 120,95), new Rectangle(-360, 0, 120,95), new Rectangle(-480, 0, 120,95)], [new Rectangle(0, -95, 120, 95), new Rectangle(-120, -95, 120, 95), new Rectangle(-240, -95, 120, 95)]);
    }
}

export default Pluffy;