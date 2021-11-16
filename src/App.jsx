import styles from "./global.module.css";
import { useState, useMemo, useEffect } from "react";
import Trivia from "../src/components/Trivia";
import Timer from "./components/Timer";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const questions = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        {timeOut ? (
          <h1 className={styles.endText}>You earned: {earned}</h1>
        ) : (
          <>
            <div className={styles.top}>
              <div className={styles.timer}>
                <Timer
                  handleSetTimeOut={setTimeOut}
                  questionNumber={questionNumber}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <Trivia
                data={questions}
                handleSetTimeOut={setTimeOut}
                questionNumber={questionNumber}
                handleSetQuestionNumber={setQuestionNumber}
              />
            </div>
          </>
        )}
      </div>

      <div className={styles.pyramid}>
        <ul className={styles.moneyList}>
          {moneyPyramid.map((item) => (
            <li
              key={item.id}
              className={
                questionNumber === item.id
                  ? styles.moneyListItem + " " + styles.active
                  : styles.moneyListItem
              }
            >
              <span className={styles.moneyListItemNumber}>{item.id}</span>
              <span className={styles.moneyListItemAmount}>{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
