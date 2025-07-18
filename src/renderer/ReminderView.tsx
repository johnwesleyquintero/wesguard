import React, { useState, useEffect, useRef } from "react";
import "./ReminderView.css";

const ReminderView: React.FC = () => {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("Bruh, the 30 mins is about to hit!");
  const [inputMinutes, setInputMinutes] = useState("30");
  const [inputMessage, setInputMessage] = useState(
    "Bruh, the 30 mins is about to hit!",
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds((s) => s - 1);
        } else if (minutes > 0) {
          setMinutes((m) => m - 1);
          setSeconds(59);
        } else {
          // Timer finished
          clearInterval(intervalRef.current!);
          setIsActive(false);
          alert(message); // Notification
        }
      }, 1000);
    } else if (!isActive && seconds === 0 && minutes === 0) {
      // Timer was reset or finished
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds, message]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setMinutes(parseInt(inputMinutes, 10) || 0);
    setSeconds(0);
    setMessage(inputMessage);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMinutes(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <div className="reminder-view">
      <h2>Slack Reminder</h2>
      <div className="timer-display">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="controls">
        <input
          type="number"
          value={inputMinutes}
          onChange={handleMinutesChange}
          placeholder="Set minutes"
          min="1"
        />
        <input
          type="text"
          value={inputMessage}
          onChange={handleMessageChange}
          placeholder="Set reminder message"
        />
        <button onClick={toggle}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p className="current-message">Current Reminder: {message}</p>
    </div>
  );
};

export default ReminderView;
