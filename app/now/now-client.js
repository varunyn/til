"use client";

import Image from "next/image";
import { useState } from "react";

const NowClient = ({ timelineEntries }) => {
  const [tooltip, setTooltip] = useState({ show: false, text: "", x: 0, y: 0 });

  // Sample data - you can replace this with real data later
  const profileData = {
    name: "Varun",
    bio: "Learning new stuff and building things using AI",
    location: "Austin, TX",
    avatar: "/avatar.png", // You'll need to add your avatar image
  };

  const goals = [
    { text: "Ship more 🚀", color: "bg-blue-100 text-blue-800" },
    { text: "eat healthier", color: "bg-green-100 text-green-800" },
  ];

  // Generate activity heatmap data (simplified)
  const generateHeatmapData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const data = [];

    months.forEach((month, monthIndex) => {
      const daysInMonth =
        monthIndex === 1 ? 28 : monthIndex % 2 === 0 ? 31 : 30;
      for (let day = 1; day <= daysInMonth; day++) {
        const activity = Math.random();
        data.push({
          month,
          day,
          activity:
            activity > 0.7
              ? "high"
              : activity > 0.4
                ? "medium"
                : activity > 0.1
                  ? "low"
                  : "none",
        });
      }
    });

    return data;
  };

  const _heatmapData = generateHeatmapData();

  // Helper function to check if a date has data using timelineEntries
  const hasDataForDate = (date) => {
    const dateString = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    return timelineEntries.some((entry) => entry.date === dateString);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-center">
                <Image
                  alt={profileData.name}
                  className="h-16 w-16 rounded-full object-cover"
                  height={64}
                  src={profileData.avatar}
                  width={64}
                />
              </div>

              <h2 className="mb-1 font-bold text-gray-900 text-xl dark:text-white">
                {profileData.name}
              </h2>
              <p className="mb-2 text-gray-600 dark:text-gray-400">
                {profileData.username}
              </p>

              <p className="mb-2 text-gray-700 dark:text-gray-300">
                {profileData.bio}
              </p>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                📍 {profileData.location}
              </p>

              <div className="mt-6">
                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Working towards
                </h3>
                <div className="space-y-2">
                  {goals.map((goal, index) => (
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-medium text-xs ${goal.color} mr-2 mb-2`}
                      key={index}
                    >
                      {goal.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Timeline */}
          <div className="space-y-6 lg:col-span-2">
            {/* Activity Heatmap */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="overflow-x-auto">
                {/* Month labels positioned exactly like the SVG */}
                <div className="relative mb-4 ml-8 h-4">
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "0px" }}
                  >
                    Jan
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "80px" }}
                  >
                    Feb
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "144px" }}
                  >
                    Mar
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "224px" }}
                  >
                    Apr
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "288px" }}
                  >
                    May
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "352px" }}
                  >
                    Jun
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "432px" }}
                  >
                    Jul
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "496px" }}
                  >
                    Aug
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "576px" }}
                  >
                    Sep
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "640px" }}
                  >
                    Oct
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "704px" }}
                  >
                    Nov
                  </span>
                  <span
                    className="absolute text-gray-500 text-xs dark:text-gray-400"
                    style={{ left: "784px" }}
                  >
                    Dec
                  </span>
                </div>

                {/* Heatmap grid matching SVG structure exactly */}
                <div className="relative flex items-start">
                  {/* Activity squares grid - exactly like SVG with 16px spacing */}
                  <div className="flex" style={{ gap: "4px" }}>
                    {Array.from({ length: 54 }, (_, weekIndex) => (
                      <div
                        className="flex flex-col"
                        key={weekIndex}
                        style={{ gap: "4px" }}
                      >
                        {Array.from({ length: 7 }, (_, dayIndex) => {
                          // First week starts on Wednesday (Jan 1, 2025 is a Wednesday)
                          const isFirstWeek = weekIndex === 0;
                          const isLastWeek = weekIndex === 53;

                          // First week: only show Wed, Thu, Fri, Sat (dayIndex 3-6)
                          // Last week: only show Sun (dayIndex 0) for Dec 31
                          const shouldShowSquare =
                            (isFirstWeek && dayIndex >= 3) ||
                            (isLastWeek && dayIndex === 0) ||
                            !(isFirstWeek || isLastWeek);

                          if (!shouldShowSquare) {
                            return <div className="h-3 w-3" key={dayIndex} />;
                          }

                          // Calculate the actual date
                          const startDate = new Date(2025, 0, 1); // January 1, 2025 (Wednesday)
                          // For first week, dayIndex 3 = Wednesday (Jan 1), dayIndex 4 = Thursday (Jan 2), etc.
                          // For subsequent weeks, dayIndex 0 = Sunday, dayIndex 1 = Monday, etc.
                          let dayOffset;
                          if (isFirstWeek) {
                            dayOffset = dayIndex - 3; // Jan 1 is at dayIndex 3 (Wednesday)
                          } else if (isLastWeek) {
                            dayOffset = 364; // Dec 31, 2025 (365th day, 0-indexed = 364)
                          } else {
                            dayOffset = (weekIndex - 1) * 7 + dayIndex + 4; // +4 because first week only has 4 days
                          }

                          const currentDate = new Date(startDate);
                          currentDate.setDate(startDate.getDate() + dayOffset);

                          const dayNames = [
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ];
                          const monthNames = [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ];

                          const dayName = dayNames[currentDate.getDay()];
                          const monthName = monthNames[currentDate.getMonth()];
                          const dateStr = `${monthName} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
                          const tooltipText = `${dayName}, ${dateStr}`;

                          const hasData = hasDataForDate(currentDate);
                          const cellClasses = hasData
                            ? "bg-gray-600 border border-gray-500/30 dark:bg-gray-500 dark:border-gray-400/30"
                            : "bg-gray-200 border border-gray-300/20 dark:bg-gray-600 dark:border-gray-500/20";

                          const handleMouseEnter = (e) => {
                            const rect = e.target.getBoundingClientRect();
                            setTooltip({
                              show: true,
                              text: tooltipText,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10,
                            });
                          };

                          const handleMouseLeave = () => {
                            setTooltip({ show: false, text: "", x: 0, y: 0 });
                          };

                          const handleClick = () => {
                            const dateString = currentDate
                              .toISOString()
                              .split("T")[0];
                            const timelineEntry = timelineEntries.find(
                              (entry) => entry.date === dateString
                            );

                            if (timelineEntry) {
                              // Find the timeline entry element and scroll to it
                              const timelineElement = document.getElementById(
                                `timeline-${dateString}`
                              );
                              if (timelineElement) {
                                timelineElement.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                });
                                // Add a brief highlight effect
                                timelineElement.classList.add(
                                  "ring-2",
                                  "ring-blue-500"
                                );
                                setTimeout(() => {
                                  timelineElement.classList.remove(
                                    "ring-2",
                                    "ring-blue-500"
                                  );
                                }, 2000);
                              }
                            }
                          };

                          return (
                            <div
                              className={`h-3 w-3 rounded-sm transition-all ${cellClasses} ${
                                hasData
                                  ? "cursor-pointer hover:ring-2 hover:ring-blue-400"
                                  : "cursor-default hover:ring-1 hover:ring-gray-400"
                              }`}
                              key={dayIndex}
                              onClick={hasData ? handleClick : undefined}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Custom Tooltip */}
                  {tooltip.show && (
                    <div
                      className="pointer-events-none fixed z-50 rounded bg-gray-900 px-2 py-1 text-white text-xs shadow-lg"
                      style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: "translateX(-50%) translateY(-100%)",
                      }}
                    >
                      {tooltip.text}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {timelineEntries.map((entry, index) => (
                <div
                  className="rounded-lg bg-white p-6 shadow-sm transition-all dark:bg-gray-800"
                  id={`timeline-${entry.date}`}
                  key={index}
                >
                  <div className="mb-3 flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-gray-400" />
                    <span className="text-gray-500 text-sm dark:text-gray-400">
                      {entry.date}
                    </span>
                    <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900 dark:text-blue-200">
                      {entry.tag}
                    </span>
                  </div>

                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    {entry.title}
                  </h3>

                  <div className="space-y-1">
                    {entry.content.map((item, itemIndex) => (
                      <p
                        className="text-gray-700 text-sm dark:text-gray-300"
                        key={itemIndex}
                      >
                        {Array.isArray(item)
                          ? // Render parsed content with links
                            item.map((part, partIndex) => {
                              if (part.type === "link") {
                                return (
                                  <a
                                    className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    href={part.url}
                                    key={partIndex}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    {part.text}
                                  </a>
                                );
                              }
                              return (
                                <span key={partIndex}>{part.content}</span>
                              );
                            })
                          : // Fallback for simple text
                            item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowClient;
