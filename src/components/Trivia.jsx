import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

const Trivia = ({
    questionSet,
    questionNumber,
    setQuestionNumber,
    setTimeOut,
    setEarned,
    moneyPyramid
}) => {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    // handle sounds 
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    // play once when the quiz starts
    useEffect(() => {
        letsPlay();
    }, [letsPlay]);

    // set question
    useEffect(() => {
        setQuestion(questionSet[questionNumber - 1]);
    }, [questionSet, questionNumber]);

    // handle timeouts
    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    // sumbit answers
    const handleClick = (ans) => {
        setSelectedAnswer(ans);
        setClassName("answer active");

        // set earned
        if(ans.correct) {
            setEarned(
                moneyPyramid.find((m) => m.id === questionNumber).amount
            );
        }

        // set classname after 3 seconds
        delay(2000, () => {
            setClassName(ans.correct ? "answer correct" : "answer wrong");
        });

        // update question number
        delay(4000, () => {
            if (ans.correct) {
                correctAnswer();              

                delay(1000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                    setClassName("");
                });

            } else {
                wrongAnswer();
                delay(1000, () => {
                    setTimeOut(true);
                });
            }
        });
    };


    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((ans) => (
                    <div
                        key={ans.id}
                        className={selectedAnswer===ans ? className : "answer"}
                        onClick={() => !selectedAnswer && handleClick(ans)}
                    >
                        {ans.answer}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trivia;