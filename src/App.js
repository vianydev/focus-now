import React, { useState, useEffect } from 'react';
import Break from './Break';
import Session from './Session';
import Timer from './Timer';
import IconButton from '@material-ui/core/IconButton';
import "./App.css";
import logo from "./logo-focus-now.png";

function App(){
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerType, setTimerType] = useState("Session");
  const beep = "https://freesound.org/data/previews/336/336892_4939433-lq.mp3";

  function incrementBreakLength() {
    const incrementedBreakLength =
    breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60;
    setBreakLength(incrementedBreakLength);
  }

  function decrementBreakLength() {
    const decreasedBreakLength = 
    breakLength - 60 > 60 ? breakLength - 60 : 60;
    setBreakLength(decreasedBreakLength);
  }

  function incrementSessionLength() {
    const incrementedSessionLength =
    sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60 * 60;
    setSessionLength(incrementedSessionLength);
  }

  function decrementSessionLength() {
    const decrementedSessionLength =
    sessionLength - 60 > 60 ? sessionLength - 60 : 60;
    setSessionLength(decrementedSessionLength);
  }

  const isActiveOn = () => {
    setIsActive(true);
  }

  const isActiveOff = () => {
    setIsActive(false);
  }

  const reset = () => {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(1500);
    setTimeSpent(0);
    setTimerType("Session");
    setIsActive(false);
    document.getElementById("beep").load();
  }


  useEffect(() => {
    setTimeLeft(timerType === "Session" ? sessionLength : breakLength);
  }, [sessionLength, breakLength]);

  useEffect(() => {
    let intervalId = null;

    if (isActive && timeLeft >= 1) {
      setTimeLeft(timerType === "Session" ?
      sessionLength * 1 - timeSpent
      : breakLength * 1 - timeSpent);

      intervalId = setInterval(() => {
        setTimeSpent((timeSpent) => timeSpent + 1);
      }, 100);
    } else {
      clearInterval(intervalId);
    }
    if (timeLeft === 0) {
      document.getElementById("beep").play();
      setTimerType((type) => (type === "Session" ? "Break" : "Session"));
      setTimeLeft(
        timerType === "Session" ? sessionLength : breakLength
      );
      setTimeSpent(0);
    }
    return () => clearInterval(intervalId);
  }, [isActive, timeSpent]);

  return (
      <div id="container">

        <div id="timer">
          <div id="title"> 
              <img src={logo} width="30%" alt="logo" /> 
              <h1>Focus <span>Now</span></h1>
          </div>
          <Timer time={timeLeft} type={timerType} />
          <audio id="beep" src={beep}></audio>
        </div>

        <div id="timer-control">
          <IconButton id="reset" color="primary" onClick={reset}>  
            <span className="material-icons iconApp">restart_alt</span>
          </IconButton>
          <IconButton id="pause" color="primary" onClick={isActiveOff}>
            <span className="material-icons iconApp">pause</span>
          </IconButton>
          <IconButton id="play" color="primary" onClick={isActiveOn}>
            <span className="material-icons iconApp">play_arrow</span>
          </IconButton>
        </div>

        <div id="labels">
          <div id="label">
            <Break 
            length={breakLength}
            increment={incrementBreakLength}
            decrement={decrementBreakLength} />
          </div>
          <div id="label">
            <Session 
            length={sessionLength}
            increment={incrementSessionLength}
            decrement={decrementSessionLength} />
          </div>
        </div>
        
      </div>
  )
}

export default App;
