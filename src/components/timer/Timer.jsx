import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "../buttons/PlayButton";
import PauseButton from "../buttons/PauseButton";
import SettingsButton from "../buttons/SettingsButton";
import { useSettings } from "../../context/SettingsContext";
import { useEffect, useRef, useState } from "react";
const red = "#f54e4e";
const green = "#4aec8c";

function Timer() {
  const { settingsOnClick, isPaused, setIsPaused, workMinutes, breakMinutes } = useSettings();
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState('work');

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  
  const switchMode = () => {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60;

    setMode(nextMode)
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
    // setSecondsLeft(nextSeconds)
  }

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  const initTimer = () => {
    setSecondsLeft(workMinutes * 60);
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000)

    return () => clearInterval(interval);
  }, [useSettings])

  const totalSeconds = mode === 'work'
   ? workMinutes * 60 
   : breakMinutes * 60;

  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  const pauseOrPlay = () => {
    if (isPausedRef.current === true) {
      isPausedRef.current = false
      setIsPaused(false)
    } else {
      isPausedRef.current = true
      setIsPaused(true)
    }
  }

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: "butt",
          textColor: "#fff",
          pathColor:mode === 'work' ? red :  green,
          trailColor: "rgba(255, 255, 255, .2)",
        })}
      />
      
      <div style={{marginTop: "20px"}}>
        {isPaused 
        ? <PlayButton onClick={pauseOrPlay}/> 
        : <PauseButton onClick={pauseOrPlay}/>}
        {/*  */}
      </div>
      <div style={{marginTop: "20px"}}>
        <SettingsButton  onClick={settingsOnClick}/>
      </div>
    </div>
  );
}

export default Timer;
