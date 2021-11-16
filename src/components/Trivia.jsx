import styles from "../global.module.css";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Trivia({
  data,
  handleSetTimeOut,
  questionNumber,
  handleSetQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState(styles.answer);
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName(styles.answer + " " + styles.active);
    delay(3000, () => {

      setClassName(
        a.correct
          ? styles.answer + " " + styles.correct
          : styles.answer + " " + styles.wrong
      );
    });

    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          handleSetQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          handleSetTimeOut(true);
        });
      }
    });
  };

  return (
    <div className={styles.trivia}>
      <div className={styles.question}>{question?.question}</div>
      <div className={styles.answers}>
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : styles.answer}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
