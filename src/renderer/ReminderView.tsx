import React, { useState, useEffect, useCallback, useRef } from "react";
import { Save } from "lucide-react";
import "./ReminderView.css";

interface Reminder {
  id: string;
  minutes: number;
  seconds: number;
  message: string;
  isActive: boolean;
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

  // Use a ref to store interval IDs
  const intervalRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Load saved reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = localStorage.getItem("wesguard-reminders");
    if (savedReminders) {
      try {
        const parsedReminders = JSON.parse(savedReminders);
        // Reset all reminders to inactive state on app launch
        const inactiveReminders = parsedReminders.map((reminder: Reminder) => ({
          ...reminder,
          isActive: false,
        }));
        setReminders(inactiveReminders);
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
      minutes: minutes,
      seconds: 0,
      message: newReminderMessage,
      isActive: false,
      sound: newReminderSound,
    };
    setReminders((prev) => [...prev, newReminder]);
    setNewReminderMinutes("30");
    setNewReminderMessage("Time to take a break!");
    setNewReminderSound(true);
  }, [newReminderMinutes, newReminderMessage, newReminderSound]);

  const toggleReminder = useCallback((id: string) => {
    setReminders((prevReminders) =>
      prevReminders.map((r) => {
        if (r.id === id) {
          if (r.isActive) {
            // Pause
            const intervalId = intervalRefs.current.get(id);
            if (intervalId) {
              clearInterval(intervalId);
              intervalRefs.current.delete(id);
            }
            return { ...r, isActive: false };
          } else {
            // Start
            return { ...r, isActive: true };
          }
        }
        return r;
      }),
    );
  }, []);

  const resetReminder = useCallback(
    (id: string) => {
      setReminders((prevReminders) =>
        prevReminders.map((r) => {
          if (r.id === id) {
            const intervalId = intervalRefs.current.get(id);
            if (intervalId) {
              clearInterval(intervalId);
              intervalRefs.current.delete(id);
            }
            // Find the original reminder data to reset to initial values
            const originalReminder = prevReminders.find(
              (reminder) => reminder.id === id,
            );
            const originalMinutes = originalReminder
              ? parseInt(originalReminder.minutes.toString(), 10)
              : parseInt(newReminderMinutes, 10) || 30;

            return {
              ...r,
              minutes: originalMinutes,
              seconds: 0,
              isActive: false,
            };
          }
          return r;
        }),
      );
    },
    [newReminderMinutes],
  );

  const deleteReminder = useCallback((id: string) => {
    setReminders((prevReminders) =>
      prevReminders.filter((r) => {
        if (r.id === id) {
          const intervalId = intervalRefs.current.get(id);
          if (intervalId) {
            clearInterval(intervalId);
            intervalRefs.current.delete(id);
          }
        }
        return r.id !== id;
      }),
    );
  }, []);

  // Effect to manage individual reminder timers
  useEffect(() => {
    reminders.forEach((reminder) => {
      if (reminder.isActive && !intervalRefs.current.has(reminder.id)) {
        const intervalId = setInterval(() => {
          setReminders((prevReminders) => {
            const updatedReminders = prevReminders.map((r) => {
              if (r.id === reminder.id) {
                if (r.seconds > 0) {
                  return { ...r, seconds: r.seconds - 1 };
                } else if (r.minutes > 0) {
                  return { ...r, minutes: r.minutes - 1, seconds: 59 };
                } else {
                  // Timer finished
                  const finishedIntervalId = intervalRefs.current.get(r.id);
                  if (finishedIntervalId) {
                    clearInterval(finishedIntervalId);
                    intervalRefs.current.delete(r.id);
                  }
                  if (window.electronAPI) {
                    window.electronAPI.showReminderNotification(
                      "Reminder!",
                      r.message,
                      r.sound,
                    );
                  } else {
                    alert(`Reminder: ${r.message}`);
                  }
                  // Reset to original time after completion instead of staying at 0
                  const originalReminder = prevReminders.find(
                    (orig) => orig.id === r.id,
                  );
                  const originalMinutes = originalReminder
                    ? parseInt(originalReminder.minutes.toString(), 10)
                    : 30;

                  return {
                    ...r,
                    isActive: false,
                    minutes: originalMinutes,
                    seconds: 0,
                  };
                }
              }
              return r;
            });
            return updatedReminders;
          });
        }, 1000);
        intervalRefs.current.set(reminder.id, intervalId);
      }
    });

    // Capture the current value of intervalRefs.current for the cleanup function
    const currentIntervalRefs = intervalRefs.current;

    // Cleanup function for when component unmounts or reminders array changes
    return () => {
      const intervalIdsToClear = Array.from(currentIntervalRefs.values());
      intervalIdsToClear.forEach(clearInterval);
      currentIntervalRefs.clear();
    };
  }, [reminders]); // This dependency is still needed to react to new reminders being added or deleted

  return (
    <div className="reminder-view">
      <h2>Reminders</h2>

      <div className="add-reminder-section">
        <h3>Add New Reminder</h3>
        <input
          type="number"
          value={newReminderMinutes}
          onChange={(e) => setNewReminderMinutes(e.target.value)}
          placeholder="Minutes"
          min="1"
        />
        <input
          type="text"
          value={newReminderMessage}
          onChange={(e) => setNewReminderMessage(e.target.value)}
          placeholder="Message"
        />
        <label className="sound-toggle">
          <input
            type="checkbox"
            checked={newReminderSound}
            onChange={(e) => setNewReminderSound(e.target.checked)}
          />
          Play Sound
        </label>
        <button onClick={addReminder}>Add Reminder</button>
      </div>

      <div className="reminders-list">
        {reminders.length === 0 ? (
          <p>No reminders set. Add one above!</p>
        ) : (
          <>
            <div className="saved-reminders-info">
              <Save className="highlight" /> Auto-saved: Your reminders are
              automatically saved and will be available when you restart the
              application.
            </div>
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`reminder-card ${reminder.isActive ? "active" : ""}`}
              >
                <div className="timer-display">
                  {formatTime(reminder.minutes)}:{formatTime(reminder.seconds)}
                </div>
                <p className="reminder-message">{reminder.message}</p>
                <div className="reminder-actions">
                  <button onClick={() => toggleReminder(reminder.id)}>
                    {reminder.isActive ? "Pause" : "Start"}
                  </button>
                  <button onClick={() => resetReminder(reminder.id)}>
                    Reset
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReminderView;
