import { Hourglass, TimerReset } from "lucide-react";
import React, { useState, useEffect } from "react";
import CountDown from "react-countdown";

interface TimerProps {
  onExpire?: () => void;
  setTiming: (number: number) => void;
  handleStart: () => void;
  handleDelete: () => void;
  handleReset: () => void;
  setIsInputVisible: (isInputVisible: boolean) => void;
  isInputVisible?: boolean;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;

  timing: number;
}

export const Counter: React.FC<TimerProps> = ({
  onExpire,
  setTiming,
  handleDelete,
  handleReset,
  handleStart,
  setIsInputVisible,
  isInputVisible,
  timing,
  count,
  setCount,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setTiming(Math.max(0, value)); // Ensure non-negative input
  };

  const handleCompletion = () => {
    onExpire?.(); // Call parent's callback on expiration (optional)
    setIsInputVisible(true); // Show input after completion
    setCount(0); // Reset internal count
  };

  useEffect(() => {
    if (!isInputVisible) {
      // If input is not visible, update count every second
      const intervalId = setInterval(() => {
        setCount((number: number) => Math.max(0, number - 1)); // Decrease count by 1 second
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount or isInputVisible change
    }
  }, [isInputVisible]);

  console.log(count);

  return (
    <div className="flex justify-start space-x-6 items-center">
      {isInputVisible ? (
        <div className="flex justify-start space-x-6 items-center">
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <Hourglass />
              <input
                type="number"
                min="0"
                value={timing}
                onChange={handleInputChange}
                placeholder="Type here"
                className=" w-full grow h-10"
              />
              min
            </label>
          </div>
          <button onClick={handleStart}>Start</button>
        </div>
      ) : (
        <div className="flex justify-start space-x-6 items-center">
          <CountDown
            date={Date.now() + count * 1000} // Calculate end time based on count in seconds
            onComplete={handleCompletion} // Change prop name from onCompletion to onComplete
            renderer={(props) => (
              <span>
                <span className="countdown font-mono text-2xl">
                  <span
                    style={{ "--value": props.hours } as React.CSSProperties}
                  ></span>
                  :
                  <span
                    style={{ "--value": props.minutes } as React.CSSProperties}
                  ></span>
                  :
                  <span
                    style={{ "--value": props.seconds } as React.CSSProperties}
                  ></span>
                </span>
              </span>
            )}
          />
          <button onClick={handleReset} className="btn bg-base-100">
            {" "}
            <TimerReset />
            Rest
          </button>
        </div>
      )}
    </div>
  );
};
