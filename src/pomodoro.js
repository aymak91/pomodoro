import React, {useState, useEffect} from "react";
import {Howl} from "howler";


export default function Pomodoro() {
    const [seconds, setSeconds] = useState(1500);
    const [tempTime, setTempTime] = useState(25);
    const [timerOn, setTimerOn] = useState(false);
    const audioClip = {
      sound: "https://www.youtube.com/watch?v=lgyaM9ueMuk",
      label: "alarm",
    };

    // const alarm = new Audio("https://www.youtube.com/watch?v=lgyaM9ueMuk");
    // console.log("alarm", alarm);
    // alarm.play();
    const soundPlay = (src) => {
        const sound = new Howl({
            src,
            html5: true
        })
        console.log(src);
        sound.play();
    }

    useEffect(() => {
        let interval = null;

        if(timerOn && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevTime => prevTime - 1)
            }, 1000);
        } else {
            clearInterval(interval)
        }

        if(seconds === 0) {
            console.log("stuff");
            soundPlay(audioClip);
        }
        

        return () => {
            clearInterval(interval);
        }
    }, [timerOn, seconds]);


    return (
      <div className="container">
        <div className="timer">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSeconds(tempTime * 60);
            }}
          >
            <label>Set Time (minutes):</label>
            <input
              name="time"
              value={tempTime}
              onChange={(event) => setTempTime(event.target.value)}
            />
            <button>Set Time</button>
          </form>

          <span className="time">
            {Math.floor(seconds / 60)}:{Math.floor((seconds % 60) / 10)}
            {(seconds % 60) % 10}
          </span>
        </div>
        <button onClick={() => setTimerOn(true)}>START</button>
        <button onClick={() => setTimerOn(false)}>STOP</button>
        <button onClick={() => setSeconds(tempTime * 60)}>RESET</button>

      </div>
    );
}