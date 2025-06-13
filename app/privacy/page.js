export const metadata = {
  title: 'Privacy Policy - Today I Learned',
  description: 'Privacy policy for til.varunyadav.com'
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Privacy Policy
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Information We Collect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We collect information you provide directly to us and information we
            collect automatically when you use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Cookies and Analytics
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use Google Analytics to understand how visitors interact with our
            website. This service may set cookies on your device. You can
            control cookie preferences through our consent banner.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The following cookies may be set:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>
              <strong>_ga:</strong> Used to distinguish users
            </li>
            <li>
              <strong>_ga_*:</strong> Used to persist session state
            </li>
            <li>
              <strong>_gid:</strong> Used to distinguish users
            </li>
            <li>
              <strong>_gat:</strong> Used to throttle request rate
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Your Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>Withdraw consent for cookies at any time</li>
            <li>Request information about data we collect</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact
            us at{' '}
            <a
              href="mailto:hi@varunyadav.com"
              className="text-smalt-600 dark:text-smalt-400 hover:underline"
            >
              hi@varunyadav.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
