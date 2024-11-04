import { useEffect, useState } from "react";

const Timer = ({ totalTime, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timerId;

    if (isRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      onTimeUp();
      setIsRunning(false);
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeRemaining, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center">
      Timer: 
      <span > {formatTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
