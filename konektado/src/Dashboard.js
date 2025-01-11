import React from "react";
import mockData from "./mockData.json";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export default function Dashboard() {
  const complaintsPerDay = getComplaintsPerDay(mockData);
  return (
    <div className="relative bg-[#111111] text-white min-h-screen">
      {/* Simple Header */}

      <div className="sticky top-0 z-50 bg-[#111111]/50 backdrop-blur-md border-b border-[#333333] p-6 flex items-center justify-center gap-2">
        <img
          src="/Icon.png" // Root-relative path from the public folder
          alt="App Icon"
          className="w-8 h-8"
        />
        <span className="text-2xl font-bold">Konektado</span>
      </div>

      <div className="p-6 md:px-36 md:py-8">
        {/* Row for heading/date, etc. */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="text-2xl font-semibold">
            Welcome to Your Dashboard
          </div>
          <div className="text-sm text-[#878787]">
            Current Month: January 2025
          </div>
        </div>

        {/* Main grid layout */}
        <div className="grid grid-rows-3 grid-cols-3 gap-4 min-h-[80vh]">
          {/* 1) Box spanning 2 columns */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg col-span-2 flex flex-col items-center justify-center p-4">
            <div className="text-lg font-semibold mb-4">Hourly Complaints</div>
            <div className="text-gray-400">No data available</div>
          </div>

          {/* 2) Single-cell box */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg row-span-2 text-white flex flex-col p-8">
            {/* Header text */}
            {/* <div className="text-4xl font-bold mb-4">Chart #2</div> */}

            <div className="scroll-container">
              <div className="scroll-content">
                {mockData.map((item, idx) => (
                  <div key={idx} className="mb-4 leading-relaxed">
                    {highlightMentions(item.full_text)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3) Single-cell box */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex flex-col items-center justify-center text-xl font-bold">
            <div className="text-lg font-semibold my-4">Chart #3</div>
            <div className="flex flex-col justify-between w-[80%] px-8">
              <div className="flex flex-row items-center justify-between">
                <div className="text-sm text-[#878787]">###</div>
                <div className="text-sm text-[#878787]">Test2</div>
              </div>
            </div>
          </div>

          {/* 4) Single-cell box */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg flex flex-col items-center justify-center text-xl font-bold">
            <div className="text-lg font-semibold mt-4 pb-4">Chart #4</div>
            <div className="text-4xl">###</div>
          </div>

          {/* 6) Box spanning full width (col-span-3) */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg col-span-3 flex flex-col items-center justify-center p-4">
            <div className="text-lg font-semibold mb-4">Complaints Per Day</div>
            {complaintsPerDay.length > 0 ? (
              <ResponsiveContainer width="95%" height={300}>
                <LineChart data={complaintsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "1px solid #444",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="complaints"
                    stroke="#FF9500"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-400">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function highlightMentions(text) {
  return text.split(/\s+/).map((word, index) => {
    if (word.startsWith("@")) {
      return (
        <span key={index} className="text-blue-300">
          {word}{" "}
        </span>
      );
    }
    return word + " ";
  });
}

function getComplaintsPerDay(data) {
  const countsByDay = {};

  data.forEach((item) => {
    const dateObj = new Date(item.created_at);
    if (isNaN(dateObj)) {
      // Skip invalid dates
      return;
    }
    const dayKey = dateObj.toISOString().split("T")[0];

    if (!countsByDay[dayKey]) {
      countsByDay[dayKey] = 0;
    }
    countsByDay[dayKey] += 1;
  });

  return Object.entries(countsByDay).map(([day, complaints]) => ({
    day,
    complaints,
  }));
}
