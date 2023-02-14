import { Rectangle } from './math.ts';
import Animal from './animal.ts';

class Duck extends Animal {
    private downMovingImage: Rectangle;
    private deadSpeed: number;

    constructor(position, speed, fieldBounds, rightMovingImages, downMovingImage, scale) {
        super(position, speed, fieldBounds, rightMovingImages, scale);
        this.downMovingImage = downMovingImage;
        this.deadSpeed = 10;
    }


    moveDown(): void {
        this.currentMove = -1;
        this.isReverse = false;
        this.isAlive = false;

        this.position.y += this.deadSpeed;
        this.currentImage = this.downMovingImage;
    }

    move(): void {
        if(this.isAlive) {
            if(this.currentMove === 0) {
                this.moveRight();
            }
            else if(this.currentMove === 1) {
                this.moveLeft();
            }
        }
        else {
            this.moveDown();
        }
    }

    isOut(): boolean {
        return this.position.y >= this.fieldBounds.height;
    }
}

class BlueDuck extends Duck {
    constructor(position, fieldBounds, speed, scale = 1) {
        super(position, speed, fieldBounds, [new Rectangle(0, -200, 80, 80), new Rectangle(-80, -200, 80, 80), new Rectangle(-160, -200, 80, 80)], new Rectangle(0, -450, 80, 80), scale);
    }
}

class BlackDuck extends Duck {
    constructor(position, fieldBounds, speed, scale = 1) {
        super(position, speed, fieldBounds, [new Rectangle(-250, -200, 80, 80), new Rectangle(-330, -200, 80, 80), new Rectangle(-410, -200, 80, 80)], new Rectangle(-250, -450, 80, 80), scale);
    }
}

class RedDuck extends Duck {
    constructor(position, fieldBounds, speed, scale = 1) {
        super(position, speed, fieldBounds, [new Rectangle(-510, -200, 80, 80), new Rectangle(-590, -200, 80, 80), new Rectangle(-670, -200, 80, 80)], new Rectangle(-510, -450, 80, 80), scale);
    }
}

export { Duck, BlueDuck, BlackDuck, RedDuck };