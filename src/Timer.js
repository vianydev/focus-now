const Timer = (props) => {
    const {type, time} = props;

    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return(
 
        <div id="timer">
            <div id="timer-display">
                <p id="timer-label">{type}</p>
                <p id="time-left">{minutes + ':' + seconds}</p>
            </div>
        </div>
        
    )
}

export default Timer;

