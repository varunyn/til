"use client";

import { useCallback, useState } from "react";
import styles from "./now.module.css";

const DAY_MS = 86_400_000;
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const dayFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeZone: "UTC",
});

function revealEntry(event) {
  const entry = document.getElementById(event.currentTarget.hash.slice(1));
  const archive = entry?.closest("details");
  if (archive) {
    archive.open = true;
  }
}

export default function JournalHeatmap({ dates }) {
  const years = [...new Set(dates.map((date) => date.slice(0, 4)))].sort(
    (first, second) => Number(second) - Number(first)
  );
  const [year, setYear] = useState(years[0]);
  const selectYear = useCallback(
    (event) => setYear(event.currentTarget.dataset.year),
    []
  );
  if (!year) {
    return null;
  }
  const activeDates = new Set(dates);
  const start = Date.UTC(Number(year), 0, 1);
  const end = Date.UTC(Number(year) + 1, 0, 1);
  const offset = new Date(start).getUTCDay();
  const days = Array.from({ length: (end - start) / DAY_MS }, (_, index) => {
    const date = new Date(start + index * DAY_MS);
    const [key] = date.toISOString().split("T");
    return { active: activeDates.has(key), date, key };
  });

  return (
    <div className={styles.heatmap}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-[13px]">
        <p aria-live="polite">
          {days.filter((day) => day.active).length} days with journal entries
        </p>
        <fieldset className={`topic-filter shrink-0 ${styles.yearFilter}`}>
          <legend className="sr-only">Journal activity year</legend>
          {years.map((option) => (
            <button
              aria-pressed={year === option}
              className="focus-visible:outline-2 focus-visible:outline-sorbus-700 focus-visible:outline-offset-2 dark:focus-visible:outline-sorbus-300"
              data-year={option}
              key={option}
              onClick={selectYear}
              type="button"
            >
              {option}
            </button>
          ))}
        </fieldset>
      </div>
      <fieldset
        aria-label={`Journal activity for ${year}. Scroll to see the full year.`}
        className={styles.heatmapScroll}
        key={year}
      >
        <div className={styles.heatmapCalendar}>
          <div aria-hidden="true" className={styles.heatmapMonths}>
            {days
              .filter((day) => day.date.getUTCDate() === 1)
              .map((day) => (
                <span
                  key={day.key}
                  style={{
                    gridColumn:
                      Math.floor(
                        ((day.date.getTime() - start) / DAY_MS + offset) / 7
                      ) + 1,
                  }}
                >
                  {monthFormat.format(day.date)}
                </span>
              ))}
          </div>
          <div className={styles.heatmapDays}>
            {Array.from({ length: offset }, (_, index) => (
              <span aria-hidden="true" key={`padding-${index}`} />
            ))}
            {days.map((day) =>
              day.active ? (
                <a
                  aria-label={`${dayFormat.format(day.date)}: read journal entry`}
                  className={styles.heatmapActive}
                  href={`#timeline-${day.key}`}
                  key={day.key}
                  onClick={revealEntry}
                  title={`${dayFormat.format(day.date)}: journal entry`}
                >
                  <span className="sr-only">
                    {dayFormat.format(day.date)}: read journal entry
                  </span>
                </a>
              ) : (
                <span
                  aria-hidden="true"
                  className={styles.heatmapEmpty}
                  key={day.key}
                  title={`${dayFormat.format(day.date)}: no entry`}
                />
              )
            )}
          </div>
        </div>
      </fieldset>
      <p className={styles.footnote}>
        Highlighted days have an entry. Select a day to read it.
      </p>
    </div>
  );
}
