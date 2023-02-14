import { Duck, BlueDuck, BlackDuck, RedDuck } from './ducks.ts';
import Dog from './dog.ts';
import { Point, Rectangle } from './math.ts';

class Game {
    private static duckScore: number = 10; 
    private static dogScore: number = 100; 
    private static bonusScore: number = 1000; 
    private static armorScore: number = 50; 
    private static clipCapacity: number = 10; 
    private static timeToPlay: number = 10000; 

    private ducks: Duck[];
    private dog: Dog;

    private score: number;
    private clip: number;

    constructor() {
        this.ducks = [];
        this.dog = new Dog(new Point(0, window.innerHeight - 100), new Rectangle(0, 0, window.innerWidth, window.innerHeight), 30);
    }

    startGame(count: number) {
        this.initializeDucks(count);
        this.dog = new Dog(new Point(0, window.innerHeight - 100), new Rectangle(0, 0, window.innerWidth, window.innerHeight), 30);

        this.score = 0;
        this.clip = Game.clipCapacity;
    }

    getDog(): Dog {
        return this.dog;
    }

    getDucks(): Duck[] {
        return this.ducks;
    }

    getScore(): number {
        return this.score;
    }

    getClip(): number {
        return this.clip;
    }

    static getClipCapacity(): number {
        return Game.clipCapacity;
    }

    static getTimeToPlay(): number {
        return Game.timeToPlay;
    }

    private initializeDucks(count: number) {
        this.ducks = [];
        this.addDucks(count);
    }

    addDucks(count: number) {
        let ch;
        const w = window.innerWidth;
        const h = window.innerHeight;
        for(let i = 0; i < count; i++) {
            ch = Math.random();
    
            if(ch < 0.33) {
                this.ducks.push(new BlueDuck(new Point(Math.random() * w, Math.random() * (h - 200)), new Rectangle(0, 0, window.innerWidth, window.innerHeight), 5 + Math.random() * 40, 0.5 + Math.random() * 2));
            }
            else if(ch < 0.66) {
                this.ducks.push(new BlackDuck(new Point(Math.random() * w, Math.random() * (h - 200)), new Rectangle(0, 0, window.innerWidth, window.innerHeight), 5 + Math.random() * 40, 0.5 + Math.random() * 2));
            }
            else {
                this.ducks.push(new RedDuck(new Point(Math.random() * w, Math.random() * (h - 200)), new Rectangle(0, 0, window.innerWidth, window.innerHeight), 5 + Math.random() * 40, 0.5 + Math.random() * 2));
            }    
        }
    }

    moveDucks(): void {
        this.ducks = this.ducks.filter(duck => !duck.isOut());

        this.ducks.forEach(duck => duck.move());
    }

    moveDog(): void {
        this.dog.move();
    }

    fireDuck(idx: number): void {
        if(this.clip === 0) {
            return;
        }

        this.clip--;
        if(this.ducks[idx].getIsAlive()) {
            this.ducks[idx].kill();
            this.score += Math.floor(Game.duckScore / this.ducks[idx].getScale());

            if(this.ducks.filter(d => d.getIsAlive()).length < 5) {
                this.addDucks(1 + Math.random()* 5);
            }
        }
    }

    fireDog(): void {
        if(this.clip === 0) {
            return;
        }

        this.clip--;
        if(this.dog !== undefined && this.dog.getIsAlive()) {
            if(this.dog.getIsAway()) {
                this.score += Game.bonusScore;    
            }
            else {
                this.score -= Game.dogScore;
                this.dog.kill();
            }
        }
    }

    miss(): void {
        if(this.clip === 0) {
            return;
        }

        this.clip--;
    }

    rechargeArmor(): void {
        this.clip = Game.clipCapacity;
        this.score -= Game.armorScore;
    }
}

export default Game;