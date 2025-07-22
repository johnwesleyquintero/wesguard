import { useState, useEffect, useRef, useCallback } from "react";

interface UseReminderTimerProps {
  initialMinutes: number;
  onTimerEnd?: () => void;
}

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
}

const useReminderTimer = ({
  initialMinutes,
  onTimerEnd,
}: UseReminderTimerProps) => {
  const [timerState, setTimerState] = useState<TimerState>({
    minutes: initialMinutes,
    seconds: 0,
    isRunning: false,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimerState({
      minutes: initialMinutes,
      seconds: 0,
      isRunning: false,
    });
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialMinutes]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState({
      minutes: 0,
      seconds: 0,
      isRunning: false,
    });
  }, []);

  useEffect(() => {
    if (timerState.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerState((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Timer finished
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            onTimerEnd?.();
            return { ...prev, isRunning: false }; // Keep at 0:00 until reset
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, onTimerEnd]);

  return {
    minutes: timerState.minutes,
    seconds: timerState.seconds,
    isRunning: timerState.isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    clearTimer,
  };
};

export default useReminderTimer;
