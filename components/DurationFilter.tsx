"use client";
import React from "react";

type Duration = {
  days: number;
  nights: number;
};

type Props = {
  selectedDurations: number[]; // This can still be based on days
  setSelectedDurations: (durations: number[]) => void;
};



const DurationFilter = ({ selectedDurations, setSelectedDurations }: Props) => {


  return (
    <div className="flex flex-wrap gap-3 justify-center py-4">
      <h1>Durations</h1>
    </div>
  );
};

export default DurationFilter;
