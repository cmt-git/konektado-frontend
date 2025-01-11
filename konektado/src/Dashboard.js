import React from "react";
import mockData from "./mockData.json";
import {
  ResponsiveContainer,
  LineChart,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Treemap,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";


export default function Dashboard() {
  const complaintsByRegion = getComplaintsByRegion(mockData)
  const complaintsPerDay = getComplaintsPerDay(mockData);
  const complaintsByType = getComplaintsByType(mockData);
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
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg col-span-2 p-4">
            <div className="text-xl font-bold mb-4">Complaints Per Region</div>
            {complaintsByRegion.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complaintsByRegion} barGap={8} barCategoryGap="20%">
                {/* Background grid */}
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            
                {/* X and Y axes */}
                <XAxis dataKey="region" stroke="#fff" />
                <YAxis 
                  stroke="#fff"
                  label={{
                    value: "Complaints",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#fff",
                    fontSize: 14,
                  }} 
                />
            
                {/* Tooltip and Legend */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "4px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
            
                {/* Define a linear gradient for the fill */}
                <defs>
                  <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
                    {/* Top color */}
                    <stop offset="0%" stopColor="#FF9500" />
                    {/* Bottom color */}
                    <stop offset="100%" stopColor="#FF3B30" />
                  </linearGradient>
                </defs>
            
                {/* The Bar itself, using the gradient */}
                <Bar
                  dataKey="complaints"
                  fill="url(#gradientColor)"
                  name="Complaints"            /* or "Complaints," depending on your label */
                  stroke="#FF3B30"      /* optional: a matching stroke */
                  strokeWidth={1}       /* thickness of that stroke */
                  radius={[4, 4, 0, 0]} /* rounded top corners */
                />
              </BarChart>
            </ResponsiveContainer>
            
            ) : (
              <div className="text-gray-400">No data available</div>
            )}
          </div>

          {/* 2) Single-cell box */}
          <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg row-span-2 text-white flex flex-col p-8">
            {/* Header text */}
            <div className="text-xl font-bold mb-4">Tweets</div>

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
            <div className="text-lg font-semibold mb-4">Complaints by Type</div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complaintsByType}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    label
                    labelLine={false}
                  >
                    {complaintsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(index)} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
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

function getNetworkIssueCounts(data) {
  let noInternetCount = 0;
  let slowInternetCount = 0;

  data.forEach((item) => {
    // If network_issue_type is missing or null, skip
    if (!item.network_issue_type) return;

    if (item.network_issue_type === "no_internet") {
      noInternetCount++;
    } else if (item.network_issue_type === "slow_internet") {
      slowInternetCount++;
    }
  });

  // Return the array that Recharts expects
  return [
    { name: "No Internet", value: noInternetCount },
    { name: "Slow Internet", value: slowInternetCount },
  ];
}


function getNCRComplaintsByCity(data) {
  const cityCounts = {};

  data.forEach((item) => {
    // Only consider if "ncr" is true
    if (!item.ncr) return;

    // Extract city from location; skip if blank
    const city = parseCity(item.location);
    if (!city) return;

    if (!cityCounts[city]) {
      cityCounts[city] = 0;
    }
    cityCounts[city] += 1;
  });

  // Convert to an array for Recharts' Treemap
  return Object.entries(cityCounts).map(([name, value]) => ({
    name,
    value,
  }));
}

/** Example parser: get the *last* city from "Iligan City / Quezon City" */
function parseCity(locationString) {
  if (!locationString || !locationString.trim()) return null;
  // Split by "/" and trim
  const parts = locationString.split("/").map((s) => s.trim());
  // Return the last part
  const city = parts[parts.length - 1];
  return city || null;
}


function getComplaintsByRegion(data) {
  const regionCounts = {};

  data.forEach((item) => {
    // Skip entries that have no region
    if (!item.region) return;

    if (!regionCounts[item.region]) {
      regionCounts[item.region] = 0;
    }
    regionCounts[item.region] += 1;
  });

  // Convert the counts object into an array for Recharts
  return Object.entries(regionCounts).map(([region, complaints]) => ({
    region,
    complaints,
  }));
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

function getComplaintsByType(data) {
  const complaintTypes = {
    "Network Issue": 0,
    "Other": 0,
  };

  data.forEach((item) => {
    const complaintType = item.network_issue ? "Network Issue" : "Other";
    complaintTypes[complaintType] += 1;
  });

  return Object.entries(complaintTypes).map(([name, value]) => ({
    name,
    value,
  }));
}

// Function to get color for each pie chart section
function getColor(index) {
  const colors = ["#FF9500", "#AA0600"]; // Adjust or add more colors as needed
  return colors[index % colors.length];
}