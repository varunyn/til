'use client';

import { useConsent } from './ConsentManager';
import { useState } from 'react';

export default function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, setShowBanner } = useConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-md">
      <div className="p-4">
        {!showDetails ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  We value your privacy
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  This site uses cookies to improve your browsing experience,
                  analyze site traffic, and show personalized content.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={rejectAll}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
              >
                Customize
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
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

              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Analytics Cookies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Help us understand site usage.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={false}
                    id="analytics-toggle"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  const analyticsEnabled =
                    document.getElementById('analytics-toggle').checked;
                  if (analyticsEnabled) {
                    acceptAll();
                  } else {
                    rejectAll();
                  }
                }}
                className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
