import { useEffect, useState } from "react";
import Game from '../game.ts';

import './DuckHunter.css';

function Duck() {
    const [game] = useState(new Game());
    const [timeLeft, setTimeLeft] = useState(Game.getTimeToPlay());
    const [score, setScore] = useState(0);
    const [clip, setClip] = useState(Game.getClipCapacity());

    const [isPlay, setIsPlay] = useState(false);
    const [isStart, setIsStart] = useState(true);

    useEffect(() => {
        if(!isPlay || isStart) {
            return;
        }

        if(timeLeft === 0) {
            stopGame();
        }

        const timer = setInterval(() => {
            game.moveDucks();

            if(game.getDog().getIsAlive()) {
                game.moveDog();
            }

            setTimeLeft(timeLeft - 100)
        }, 100);

        return () => clearTimeout(timer);
    });

    function start() {
        game.startGame(10);
        setScore(0);
        setClip(Game.getClipCapacity());
        setIsPlay(true);
        setIsStart(false);
        setTimeLeft(Game.getTimeToPlay());
    }

    function fireDuck(idx) {
        game.fireDuck(idx);
        setScore(game.getScore());
        setClip(game.getClip());
    }

    function fireDog() {
        game.fireDog();
        setScore(game.getScore());
        setClip(game.getClip());
    }

    function miss(e) {
        e.stopPropagation();

        if(isPlay) {
            game.miss();
            setClip(game.getClip());
        }
    }

    function rechargeArmor(e) {
        e.preventDefault();
        game.rechargeArmor();
        setClip(game.getClip());
        setScore(game.getScore());
    }

    function stopGame() {
        setIsPlay(false);
    }

  return (
    <div className="container" onClick={ miss } onContextMenu={ rechargeArmor }>
        <div className={ isPlay ? "stats" : "d-none" }>
            <p>Time left: { (timeLeft / 1000).toFixed(1) } s</p>
            <p>Score: {score}</p>
            <p>Clip: {clip}</p>
        </div>
        {game.getDucks().map((x, i) => <div key={ i } className="duck" onClick={(e) => { fireDuck(i); e.stopPropagation() }} style={{
            zIndex: 1,
            left: x.getPosition().x, 
            top: x.getPosition().y,
            backgroundPositionX: x.getImageRectangle().getTopLeftCorner().x, 
            backgroundPositionY: x.getImageRectangle().getTopLeftCorner().y,
            transform: `rotateY(${ x.getIsReverse() ? 180 : 0 }deg) scale(${x.getScale()})`
        }} ></div>)}

        { game.getDog().getIsAlive() ? <div className={ isPlay ? "dog" : "d-none"} onClick={(e) => { fireDog(); e.stopPropagation() }} style={{
            zIndex: 1,
            left: game.getDog().getPosition().x, 
            top: game.getDog().getPosition().y, 
            backgroundPositionX: game.getDog().getImageRectangle().getTopLeftCorner().x, 
            backgroundPositionY: game.getDog().getImageRectangle().getTopLeftCorner().y,
            transform: `rotateY(${ game.getDog().getIsReverse() ? 180 : 0 }deg)`
        }} ></div> : ''}

        <div className={ !isPlay && !isStart ? "results" : "d-none" }>
            <p>Your score: { score }</p>
            <button onClick={ () => { setIsStart(true); setIsPlay(false); } }>Ok</button>
        </div>
        <div className={ isStart ? "start-screen" : "d-none" }>
            <button onClick={ start }>Start</button>
        </div>
    </div>
  );
}

export default Duck;