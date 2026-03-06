"use client";

import { useState } from "react";
import { useConsent } from "./consent-manager";

export default function CookieBanner() {
  const {
    consent: _consent,
    showBanner,
    acceptAll,
    rejectAll,
    setShowBanner: _setShowBanner,
  } = useConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-md rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="p-4">
        {showDetails ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 text-sm dark:text-white">
                Cookie Preferences
              </h3>
              <button
                className="text-gray-500 text-sm hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowDetails(false)}
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded bg-gray-50 p-2 text-xs dark:bg-gray-800">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Functional Cookies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Essential for website functionality.
                  </p>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  Always Active
                </div>
              </div>

              <div className="flex items-center justify-between rounded bg-gray-50 p-2 text-xs dark:bg-gray-800">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Analytics Cookies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Help us understand site usage.
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    className="peer sr-only"
                    defaultChecked={false}
                    id="analytics-toggle"
                    type="checkbox"
                  />
                  <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-gray-600" />
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                className="rounded bg-gray-900 px-3 py-1.5 font-medium text-white text-xs transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                onClick={() => {
                  const analyticsEnabled =
                    document.getElementById("analytics-toggle").checked;
                  if (analyticsEnabled) {
                    acceptAll();
                  } else {
                    rejectAll();
                  }
                }}
                type="button"
              >
                Save Preferences
              </button>
              <button
                className="rounded border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={acceptAll}
                type="button"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="mb-1 font-medium text-gray-900 text-sm dark:text-white">
                  We value your privacy
                </h3>
                <p className="text-gray-600 text-xs dark:text-gray-300">
                  This site uses cookies to improve your browsing experience,
                  analyze site traffic, and show personalized content.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="rounded border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={rejectAll}
                type="button"
              >
                Reject All
              </button>
              <button
                className="rounded bg-gray-900 px-3 py-1.5 font-medium text-white text-xs transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                onClick={acceptAll}
                type="button"
              >
                Accept All
              </button>
              <button
                className="rounded border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => setShowDetails(true)}
                type="button"
              >
                Customize
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
