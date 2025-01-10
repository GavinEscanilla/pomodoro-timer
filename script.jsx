const {useState,useEffect,useRef} = React;

const App = () => {
    const [breakValue, setBreak] = useState(5);
    const [sessionValue, setSession] = useState(25);
    

    return (
        <div id="container">
            <h1>25 + 5 Clock</h1>
            <Break  breakValue={breakValue} setBreak={setBreak}/>
            <Session sessionValue={sessionValue} setSession={setSession} />
            <Timer  breakValue={breakValue} sessionValue={sessionValue} setBreak={setBreak} setSession={setSession}/>
        </div>
    )
}
const Break = ({breakValue,setBreak}) => {
    const increment = () => {
        if(breakValue < 60){
        setBreak(breakValue + 1);
        }
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

const Session = ({sessionValue,setSession}) => {
    const increment = () => {
        if(sessionValue < 60){
        setSession(sessionValue + 1);
        }
    }
    const decrement = () => {
        if(sessionValue > 1){
            setSession(sessionValue - 1);
        }
    }
    return (
        <div id="session-label">
            <h3>Session Length</h3>
            <button id="session-increment" onClick={increment}>+</button>
            <button id="session-decrement" onClick={decrement}>-</button>
            <h2 id="session-length">{sessionValue}</h2>
        </div>
    )
}

const Timer = ({ breakValue, sessionValue, setBreak, setSession }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(sessionValue * 60);
    const [isSession, setIsSession] = useState(true);
    const isSessionRef = useRef(isSession);
    useEffect(() => {
        isSessionRef.current = isSession;
    },[isSession]);
    useEffect(() => {
        setTimeLeft(sessionValue * 60);
    }, [sessionValue]);

 
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    setIsSession((prevstate) => !prevstate);  
                    
                    return (!isSessionRef.current ? sessionValue : breakValue) * 60; 
                }
                return prev - 1; 
            });
        }, 1000);

        return () => clearInterval(timer); 
    }, [isRunning, isSession, breakValue, sessionValue]); 

    const reset = () => {
        setBreak(5); 
        setSession(25); 
        setTimeLeft(25 * 60); 
        setIsSession(true); 
        setIsRunning(false);
    };

    const startnstop = () => {
        setIsRunning((prev) => !prev); 
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60); 
        const seconds = time % 60; 
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <div id="timer-container">
            <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
            <h2 id="time-left">{formatTime(timeLeft)}</h2>
            <button id="start_stop" onClick={startnstop}>{isRunning ? "Stop" : "Start"}</button>
            <button id="reset" onClick={reset}>Reset</button>
        </div>
    );
};
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);