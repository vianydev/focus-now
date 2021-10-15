import IconButton from '@material-ui/core/IconButton';

const Session = (props) => {
    const {length, increment, decrement} = props;

    return ( 
        <div>
            <p id="session-label"> Session</p>
            <IconButton id="session-increment" color="primary" onClick={increment}> 
                <span className="material-icons iconApp">arrow_drop_up</span> 
            </IconButton>

            <p id="session-length"> {length/60} </p>

            <IconButton id="session-decrement" color="primary" onClick={decrement}>
                <span className="material-icons iconApp">arrow_drop_down</span> 
            </IconButton>
        </div>
    )
}

export default Session;