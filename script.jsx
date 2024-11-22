const {useState} = React;

const App = () => {
    const [breakValue, setBreak] = useState(5);
    const [SessionValue, setSession] = useState(25);

    return (
        <div id="container">
            <h1>25 + 5 Clock</h1>
            <Break  breakValue={breakValue} setBreak={setBreak}/>
            <Session SessionValue={SessionValue} setSession={setSession} />
            <Timer  breakValue={breakValue} SessionValue={SessionValue} setBreak={setBreak} setSession={setSession}/>
        </div>
    )
}
const Break = ({breakValue,setBreak}) => {
    const increment = () => {
        setBreak(breakValue + 1);
    }
    const decrement = () => {
        if(breakValue > 1){
            setBreak(breakValue - 1);
        }
    }
    return (
        <div id="break-label">
            <h2 >Break Length</h2>
            <button id="break-increment" onClick={increment}>+</button>
            <button id="break-decrement" onClick={decrement}>-</button>
            <h2 id="break-length">{breakValue}</h2>
        </div>
    )
}

const Session = ({SessionValue,setSession}) => {
    const increment = () => {
        setSession(SessionValue + 1);
    }
    const decrement = () => {
        if(SessionValue > 1){
            setSession(SessionValue - 1);
        }
    }
    return (
        <div id="session-label">
            <h3>Session Length</h3>
            <button id="session-increment" onClick={increment}>+</button>
            <button id="session-decrement" onClick={decrement}>-</button>
            <h2 id="session-length">{SessionValue}</h2>
        </div>
    )
}

const Timer = ({breakValue,SessionValue,setBreak, setSession}) => {
    const reset = () => {
        setBreak(5);
        setSession(25);
    }
    return (
        <div id="timer-container">
            <h2 id="timer-label">Session</h2>
            <h2 id="time-left">{SessionValue}:00</h2>
            <button id="start_stop">Start</button>
            <button id="reset" onClick={reset}>Reset</button>
        </div>
    )
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);