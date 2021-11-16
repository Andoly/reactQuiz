import { useRef } from "react";
import styles from "../global.module.css";

export default function Start({ handleUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && handleUsername(inputRef.current.value);
  };

  return (
    <div className={styles.start}>
      <input
        className={styles.startInput}
        placeholder="enter your name"
        ref={inputRef}
      />
      <button className={styles.startButton} onClick={handleClick}>
        Start
      </button>
    </div>
  );
}
