// components/DateRangePicker.jsx
"use client";
import React, { useState } from "react";

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState("2024-04-01");
  const [endDate, setEndDate] = useState("2024-05-15");

  return (
    <div className="w-fit items-center border border-gray-300 rounded-md px-3 py-1 bg-white text-sm space-x-2">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="bg-transparent outline-none text-gray-800 appearance-none w-[120px]"
      />
      <span className="text-gray-500">→</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="bg-transparent outline-none text-gray-800 appearance-none w-[120px]"
      />
    </div>
  );
}
