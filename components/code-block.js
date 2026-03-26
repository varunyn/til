"use client";

import { useEffect, useRef, useState } from "react";

const IOS_REGEX = /ipad|ipod|iphone/i;

export default function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const codeRef = useRef(null);
  const buttonRef = useRef(null);
  const textAreaRef = useRef(null);

  // Create a hidden textarea for fallback copy method
  useEffect(() => {
    // Create a hidden textarea for fallback copy
    const textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.setAttribute("readonly", "true");
    document.body.appendChild(textarea);
    textAreaRef.current = textarea;

    return () => {
      document.body.removeChild(textarea);
    };
  }, []);

  // Add a touch event handler to ensure the button works properly on mobile
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }

    const handleTouchStart = () => {
      // Make the button fully visible on touch
      button.style.opacity = "1";
    };

    button.addEventListener("touchstart", handleTouchStart);
    return () => {
      button.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  // Extract the code content from the props
  const extractCodeContent = () => {
    try {
      // If we have a reference to the actual DOM, use that first
      if (codeRef.current) {
        return codeRef.current.textContent || "";
      }

      // If props.children is a React element (most likely a <code> tag)
      if (children?.props?.children) {
        const codeElement = children;

        // Handle string content
        if (typeof codeElement.props.children === "string") {
          return codeElement.props.children;
        }

        // Handle array of content (most common case)
        if (Array.isArray(codeElement.props.children)) {
          return codeElement.props.children
            .map((child) => {
              if (typeof child === "string") {
                return child;
              }
              if (
                child?.props?.children &&
                typeof child.props.children === "string"
              ) {
                return child.props.children;
              }
              return "";
            })
            .join("");
        }
      }

      // Fallback for direct string content
      if (typeof children === "string") {
        return children;
      }

      return "";
    } catch (error) {
      console.error("Error extracting code content:", error);
      return "";
    }
  };

  const handleCopy = async () => {
    const text = extractCodeContent();
    if (!text.trim()) {
      return;
    }

    let success = false;

    try {
      // Method 1: Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          success = true;
        } catch {
          // Fall through to fallbacks
        }
      }

      // Method 2: execCommand fallback (hidden textarea)
      if (!success && textAreaRef.current) {
        const textarea = textAreaRef.current;
        textarea.value = text;
        textarea.select();
        try {
          success = document.execCommand("copy");
        } catch {
          // Fall through
        }
      }

      // Method 3: Temporary textarea for older browsers / iOS
      if (!success) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);

        if (IOS_REGEX.test(navigator.userAgent)) {
          const range = document.createRange();
          range.selectNodeContents(textarea);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          textarea.setSelectionRange(0, 999_999);
        } else {
          textarea.select();
        }

        try {
          success = document.execCommand("copy");
        } catch {
          // Ignore
        }
        document.body.removeChild(textarea);
      }

      if (success) {
        setCopied(true);
        setShowToast(true);
        setTimeout(() => {
          setCopied(false);
          setShowToast(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="group relative">
      <pre className={className} {...props}>
        <code className="code-highlight" ref={codeRef}>
          {children}
        </code>
      </pre>
      <button
        aria-label="Copy code to clipboard"
        className="absolute top-2 right-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded bg-gray-700 p-2 text-white transition-opacity hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-sorbus-500 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={handleCopy}
        ref={buttonRef}
        title={copied ? "Copied!" : "Copy code"}
        type="button"
      >
        <span className="flex items-center gap-1.5">
          {copied ? (
            <>
              <svg
                aria-hidden
                className="h-5 w-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="text-sm">Copied</span>
            </>
          ) : (
            <>
              <svg
                aria-hidden
                className="h-5 w-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
              </svg>
              <span className="text-sm">Copy</span>
            </>
          )}
        </span>
      </button>

      {/* Toast so "Copied" is visible on small screens where button label can be tight */}
      {showToast && (
        <output
          aria-live="polite"
          className="absolute top-2 right-16 animate-fade-in-out rounded-md bg-green-600 px-3 py-1.5 font-medium text-sm text-white shadow-md"
        >
          Copied
        </output>
      )}
    </div>
  );
}
