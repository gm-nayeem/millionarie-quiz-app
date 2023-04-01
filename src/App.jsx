import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import { questions, amounts } from "./utils/dataSource";

const App = () => {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");

  // amounts
  const moneyPyramid = useMemo(() => {
    return amounts.reverse();
  }, [amounts]);

  // questions
  const questionSet = useMemo(() => {
    return questions;
  }, [questions]);

  // check questions lengths
  useEffect(() => {
    if (questionNumber > questionSet.length) {
      setTimeOut(true);
      setQuestionNumber(prev => prev-1);
    }
  }, [questionNumber, questionSet]);


  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              !(questionNumber > questionSet.length) && (
                <>
                  <div className="top">
                    <div className="timer">
                      <Timer
                        setTimeOut={setTimeOut}
                        questionNumber={questionNumber}
                      />
                    </div>
                  </div>
                  <div className="bottom">
                    <Trivia
                      questionSet={questionSet}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      setTimeOut={setTimeOut}
                      setEarned={setEarned}
                      moneyPyramid={moneyPyramid}
                    />
                  </div>
                </>
              )
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid?.map((m) => (
                <li
                  key={m.id}
                  className={
                    (
                      !(questionNumber > questionSet.length) 
                      && questionNumber === m.id
                    )
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;