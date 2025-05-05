"use client";
import React from "react";

type Duration = {
  days: number;
  nights: number;
};

type Props = {
  selectedDurations: number[];
  setSelectedDurations: (durations: number[]) => void;
};

const durations: Duration[] = [2, 3, 4, 5, 6, 7].map((day) => ({
  days: day,
  nights: day - 1,
}));

const DurationFilter = ({ selectedDurations, setSelectedDurations }: Props) => {
  const toggleDuration = (day: number) => {
    if (selectedDurations.includes(day)) {
      setSelectedDurations(selectedDurations.filter((d) => d !== day));
    } else {
      setSelectedDurations([...selectedDurations, day]);
    }
  };

  return (
    <div className="p-2 mx-auto">
      <h1 className="text-xl font-semibold mb-4">Select Duration</h1>
      <div className="space-y-3">
        {durations.map(({ days, nights }) => {
          const isSelected = selectedDurations.includes(days);
          return (
            <label
              key={days}
              className="flex items-center gap-1 cursor-pointer p-3 border border-orange-300 rounded-lg hover:border-orange-300"
            >
              {/* Checkbox wrapper */}
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleDuration(days)}
                  className="w-5 h-5 appearance-none rounded-sm border border-gray-400 bg-orange-100 checked:bg-orange-400 checked:border-orange-400"
                />
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-white absolute pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-gray-600">
                {days} Days ({nights} Night{nights > 1 ? "s" : ""})
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default DurationFilter;
