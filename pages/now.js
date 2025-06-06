import React, { useState } from 'react';
import Head from 'next/head';
import { getTimelineEntries } from '../lib/timeline';

const NowPage = ({ timelineEntries }) => {
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  // Sample data - you can replace this with real data later
  const profileData = {
    name: 'Varun',
    bio: 'Learning new stuff and building things using AI',
    location: 'Austin, TX',
    avatar: '/avatar.jpg' // You'll need to add your avatar image
  };

  const goals = [
    { text: 'Ship more 🚀', color: 'bg-blue-100 text-blue-800' },
    { text: 'eat healthier', color: 'bg-green-100 text-green-800' }
  ];

  // Generate activity heatmap data (simplified)
  const generateHeatmapData = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
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
              ? 'high'
              : activity > 0.4
                ? 'medium'
                : activity > 0.1
                  ? 'low'
                  : 'none'
        });
      }
    });

    return data;
  };

  const heatmapData = generateHeatmapData();

  // Helper function to check if a date has data using timelineEntries
  const hasDataForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    return timelineEntries.some((entry) => entry.date === dateString);
  };

  return (
    <>
      <Head>
        <title>Now - TIL</title>
        <meta name="description" content="What I'm working on now" />
      </Head>

      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    V
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {profileData.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {profileData.username}
                </p>

                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {profileData.bio}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  📍 {profileData.location}
                </p>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Working towards
                  </h3>
                  <div className="space-y-2">
                    {goals.map((goal, index) => (
                      <span
                        key={index}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${goal.color} mr-2 mb-2`}
                      >
                        {goal.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Activity & Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activity Heatmap */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="overflow-x-auto">
                  {/* Month labels positioned exactly like the SVG */}
                  <div className="relative mb-4 ml-8 h-4">
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '0px' }}
                    >
                      Jan
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '80px' }}
                    >
                      Feb
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '144px' }}
                    >
                      Mar
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '224px' }}
                    >
                      Apr
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '288px' }}
                    >
                      May
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '352px' }}
                    >
                      Jun
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '432px' }}
                    >
                      Jul
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '496px' }}
                    >
                      Aug
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '576px' }}
                    >
                      Sep
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '640px' }}
                    >
                      Oct
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '704px' }}
                    >
                      Nov
                    </span>
                    <span
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{ left: '784px' }}
                    >
                      Dec
                    </span>
                  </div>

                  {/* Heatmap grid matching SVG structure exactly */}
                  <div className="flex items-start relative">
                    {/* Activity squares grid - exactly like SVG with 16px spacing */}
                    <div className="flex" style={{ gap: '4px' }}>
                      {Array.from({ length: 54 }, (_, weekIndex) => (
                        <div
                          key={weekIndex}
                          className="flex flex-col"
                          style={{ gap: '4px' }}
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
                              (!isFirstWeek && !isLastWeek);

                            if (!shouldShowSquare) {
                              return (
                                <div key={dayIndex} className="w-3 h-3"></div>
                              );
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
                            currentDate.setDate(
                              startDate.getDate() + dayOffset
                            );

                            const dayNames = [
                              'Sunday',
                              'Monday',
                              'Tuesday',
                              'Wednesday',
                              'Thursday',
                              'Friday',
                              'Saturday'
                            ];
                            const monthNames = [
                              'Jan',
                              'Feb',
                              'Mar',
                              'Apr',
                              'May',
                              'Jun',
                              'Jul',
                              'Aug',
                              'Sep',
                              'Oct',
                              'Nov',
                              'Dec'
                            ];

                            const dayName = dayNames[currentDate.getDay()];
                            const monthName =
                              monthNames[currentDate.getMonth()];
                            const dateStr = `${monthName} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
                            const tooltipText = `${dayName}, ${dateStr}`;

                            // Check if this date has actual data
                            let bgColor = '#f0f0f0'; // Light gray for no data

                            if (hasDataForDate(currentDate)) {
                              bgColor = '#52525b'; // Dark gray for days with actual data
                            }

                            const handleMouseEnter = (e) => {
                              const rect = e.target.getBoundingClientRect();
                              setTooltip({
                                show: true,
                                text: tooltipText,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 10
                              });
                            };

                            const handleMouseLeave = () => {
                              setTooltip({ show: false, text: '', x: 0, y: 0 });
                            };

                            const handleClick = () => {
                              const dateString = currentDate
                                .toISOString()
                                .split('T')[0];
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
                                    behavior: 'smooth',
                                    block: 'center'
                                  });
                                  // Add a brief highlight effect
                                  timelineElement.classList.add(
                                    'ring-2',
                                    'ring-blue-500'
                                  );
                                  setTimeout(() => {
                                    timelineElement.classList.remove(
                                      'ring-2',
                                      'ring-blue-500'
                                    );
                                  }, 2000);
                                }
                              }
                            };

                            return (
                              <div
                                key={dayIndex}
                                className={`w-3 h-3 rounded-sm transition-all ${
                                  hasDataForDate(currentDate)
                                    ? 'cursor-pointer hover:ring-2 hover:ring-blue-400'
                                    : 'cursor-default hover:ring-1 hover:ring-gray-400'
                                }`}
                                style={{
                                  backgroundColor: bgColor,
                                  border: '0.5px solid rgba(0, 0, 0, 0.08)'
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={
                                  hasDataForDate(currentDate)
                                    ? handleClick
                                    : undefined
                                }
                              ></div>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Custom Tooltip */}
                    {tooltip.show && (
                      <div
                        className="fixed z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg pointer-events-none"
                        style={{
                          left: tooltip.x,
                          top: tooltip.y,
                          transform: 'translateX(-50%) translateY(-100%)'
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
                    key={index}
                    id={`timeline-${entry.date}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.date}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                        {entry.tag}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {entry.title}
                    </h3>

                    <div className="space-y-1">
                      {entry.content.map((item, itemIndex) => (
                        <p
                          key={itemIndex}
                          className="text-gray-700 dark:text-gray-300 text-sm"
                        >
                          {Array.isArray(item)
                            ? // Render parsed content with links
                              item.map((part, partIndex) => {
                                if (part.type === 'link') {
                                  return (
                                    <a
                                      key={partIndex}
                                      href={part.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                                    >
                                      {part.text}
                                    </a>
                                  );
                                } else {
                                  return (
                                    <span key={partIndex}>{part.content}</span>
                                  );
                                }
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
    </>
  );
};

export async function getStaticProps() {
  const timelineEntries = getTimelineEntries();

  return {
    props: {
      timelineEntries
    }
  };
}

export default NowPage;
