import { useEffect, useState } from "react";

const Timer = ({ setTimeOut, questionNumber }) => {
    const [timer, setTimer] = useState(30);

    // handle timer  based on set interval
    useEffect(() => {
        if (timer === 0) return setTimeOut(true);

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, setTimeOut]);

    // handle timer based on question number
    useEffect(() => {
        setTimer(30);
    }, [questionNumber]);


    return timer;
}

export default Timer;