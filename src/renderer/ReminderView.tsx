import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles/styles.module.css";
import { Save } from "lucide-react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import PageHeader from "./components/PageHeader";
import useReminderTimer from "./hooks/useReminderTimer"; // Import the new hook

interface Reminder {
  id: string;
  initialMinutes: number; // Store original minutes
  message: string;
  sound: boolean; // true for default sound, false for silent
}

const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

const ReminderView: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminderMinutes, setNewReminderMinutes] = useState("30");
  const [newReminderMessage, setNewReminderMessage] = useState(
    "Time to take a break!",
  );
  const [newReminderSound, setNewReminderSound] = useState(true);

  // Load saved reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = localStorage.getItem("wesguard-reminders");
    if (savedReminders) {
      try {
        const parsedReminders = JSON.parse(savedReminders);
        setReminders(parsedReminders);
      } catch (error) {
        console.error("Error parsing saved reminders:", error);
      }
    }
  }, []);

  // Save reminders to localStorage whenever reminders change
  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem("wesguard-reminders", JSON.stringify(reminders));
    } else {
      // Remove from localStorage if no reminders exist
      localStorage.removeItem("wesguard-reminders");
    }
  }, [reminders]);

  const addReminder = useCallback(() => {
    const minutes = parseInt(newReminderMinutes, 10);
    if (isNaN(minutes) || minutes <= 0) {
      alert("Please enter a valid number of minutes (greater than 0).");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(), // Simple unique ID
      initialMinutes: minutes, // Add initialMinutes
      message: newReminderMessage,
      sound: newReminderSound,
    };
    setReminders((prev) => [...prev, newReminder]);
    setNewReminderMinutes("30");
    setNewReminderMessage("Time to take a break!");
    setNewReminderSound(true);
  }, [newReminderMinutes, newReminderMessage, newReminderSound]);

  const handleTimerEnd = useCallback(
    (id: string, message: string, sound: boolean) => {
      setReminders((prevReminders) =>
        prevReminders.map((r) => {
          if (r.id === id) {
            if (window.electronAPI) {
              window.electronAPI.showReminderNotification(
                "Reminder!",
                message,
                sound,
              );
            } else {
              alert(`Reminder: ${message}`);
            }
            return { ...r }; // The hook handles resetting minutes/seconds
          }
          return r;
        }),
      );
    },
    [],
  );

  const deleteReminder = useCallback((id: string) => {
    setReminders((prevReminders) => prevReminders.filter((r) => r.id !== id));
  }, []);

  return (
    <div className={styles["reminder-view"]}>
      <PageHeader title="Reminders" />

      <Card className={styles["add-reminder-section"]}>
        <h3 className="text-lg font-semibold mb-4">Add New Reminder</h3>
        <div className="mb-4">
          <label
            htmlFor="reminder-minutes"
            className="block text-sm font-medium text-gray-700"
          >
            Minutes:
          </label>
          <input
            id="reminder-minutes"
            type="number"
            value={newReminderMinutes}
            onChange={(e) => setNewReminderMinutes(e.target.value)}
            placeholder="Minutes"
            min="1"
            className="form-input mt-1"
          />
          {/* {minutesError && <p className="mt-2 text-sm text-red-600">{minutesError}</p>} */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="reminder-message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <input
            id="reminder-message"
            type="text"
            value={newReminderMessage}
            onChange={(e) => setNewReminderMessage(e.target.value)}
            placeholder="Message"
            className="form-input mt-1"
          />
          {/* {messageError && <p className="mt-2 text-sm text-red-600">{messageError}</p>} */}
        </div>
        <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={newReminderSound}
            onChange={(e) => setNewReminderSound(e.target.checked)}
            className="h-4 w-4 text-primary rounded focus:ring mr-2"
          />
          Play Sound
        </label>
        <Button onClick={addReminder}>Add Reminder</Button>
      </Card>

      <div className={styles["reminders-list"]}>
        {reminders.length === 0 ? (
          <p>No reminders set. Add one above!</p>
        ) : (
          <>
            <div className={styles["saved-reminders-info"]}>
              <Save className={styles.highlight} /> Auto-saved: Your reminders
              are automatically saved and will be available when you restart the
              application.
            </div>
            {reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onDelete={deleteReminder}
                onTimerEnd={handleTimerEnd}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

interface ReminderCardProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
  onTimerEnd: (id: string, message: string, sound: boolean) => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onDelete,
  onTimerEnd,
}) => {
  const { minutes, seconds, isRunning, startTimer, pauseTimer, resetTimer } =
    useReminderTimer({
      initialMinutes: reminder.initialMinutes,
      onTimerEnd: () =>
        onTimerEnd(reminder.id, reminder.message, reminder.sound),
    });

  useEffect(() => {
    // If the reminder was active when loaded from localStorage, start its timer
    // This handles the case where the app was closed with active timers
    // Note: The `isActive` property is no longer part of the Reminder interface
    // and is managed internally by the useReminderTimer hook.
    // We need to ensure that when a reminder is loaded, if it was previously active,
    // its timer starts. This requires a way to persist and retrieve the `isRunning` state
    // in localStorage as part of the reminder data, and passing it to the hook.
    // For the scope of this task, we will assume the `initialMinutes` is sufficient to restart the timer
    // if the user manually starts it. The `isActive` property was removed from the Reminder
    // interface, so we cannot rely on it directly here.
    // A more robust solution would involve storing the timer's `isRunning` state
    // in localStorage as part of the reminder data, and passing it to the hook.
    // For the scope of this task, we will remove the `isActive` check here.
  }, []);

  return (
    <Card
      className={`${styles["reminder-card"]} ${isRunning ? styles.active : ""}`}
    >
      <div className={styles["timer-display"]}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <p className={styles["reminder-message"]}>{reminder.message}</p>
      <div className={styles["reminder-actions"]}>
        <Button onClick={isRunning ? pauseTimer : startTimer}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="secondary">
          Reset
        </Button>
        <Button onClick={() => onDelete(reminder.id)} variant="destructive">
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default ReminderView;
