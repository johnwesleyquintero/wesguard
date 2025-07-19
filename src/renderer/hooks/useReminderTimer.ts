import { useState, useEffect, useRef, useCallback } from "react";

interface ReminderTimerProps {
  initialMinutes: number;
  initialSeconds: number;
  onComplete: () => void;
  isActive: boolean;
}

const useReminderTimer = ({
  initialMinutes,
  initialSeconds,
  onComplete,
  isActive,
}: ReminderTimerProps) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(!isActive);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              return prevMinutes - 1;
            } else {
              // Timer finished
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              onComplete();
              setIsPaused(true); // Pause after completion
              return 0;
            }
          });
          return 59;
        }
      });
    }, 1000);
  }, [onComplete]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPaused(true);
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsPaused(true);
  }, [initialMinutes, initialSeconds]);

  useEffect(() => {
    if (isActive && isPaused) {
      // If reminder is active and currently paused (e.g., after initial load or reset)
      startTimer();
    } else if (!isActive && !isPaused) {
      // If reminder is inactive and currently running
      pauseTimer();
    }
    // Cleanup on unmount or when isActive changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, startTimer, pauseTimer]);

  // Sync internal state with external initial values if they change
  useEffect(() => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  }, [initialMinutes, initialSeconds]);

  return { minutes, seconds, isPaused, startTimer, pauseTimer, resetTimer };
};

export default useReminderTimer;
