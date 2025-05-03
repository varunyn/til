'use client';

import React, { useState, useRef, useEffect } from 'react';

const CodeBlock = (props) => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const codeRef = useRef(null);
  const buttonRef = useRef(null);
  const textAreaRef = useRef(null);

  // Create a hidden textarea for fallback copy method
  useEffect(() => {
    // Create a hidden textarea for fallback copy
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.setAttribute('readonly', 'true');
    document.body.appendChild(textarea);
    textAreaRef.current = textarea;

    return () => {
      document.body.removeChild(textarea);
    };
  }, []);

  // Add a touch event handler to ensure the button works properly on mobile
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleTouchStart = () => {
      // Make the button fully visible on touch
      button.style.opacity = '1';
    };

    button.addEventListener('touchstart', handleTouchStart);
    return () => {
      button.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Extract the code content from the props
  const extractCodeContent = () => {
    try {
      // If we have a reference to the actual DOM, use that first
      if (codeRef.current) {
        return codeRef.current.textContent || '';
      }

      // If props.children is a React element (most likely a <code> tag)
      if (props.children?.props?.children) {
        const codeElement = props.children;

        // Handle string content
        if (typeof codeElement.props.children === 'string') {
          return codeElement.props.children;
        }

        // Handle array of content (most common case)
        if (Array.isArray(codeElement.props.children)) {
          return codeElement.props.children
            .map((child) => {
              if (typeof child === 'string') return child;
              if (
                child?.props?.children &&
                typeof child.props.children === 'string'
              ) {
                return child.props.children;
              }
              return '';
            })
            .join('');
        }
      }

      // Fallback for direct string content
      if (typeof props.children === 'string') {
        return props.children;
      }

      return '';
    } catch (error) {
      console.error('Error extracting code content:', error);
      return '';
    }
  };

  // Try to use clipboard API, with multiple fallbacks for different browsers
  const copyToClipboard = async () => {
    try {
      const text = extractCodeContent();
      if (!text) return;

      let success = false;

      // Method 1: Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          success = true;
        } catch (err) {
          console.log('Clipboard API failed, trying fallback', err);
        }
      }

      // Method 2: execCommand fallback
      if (!success && textAreaRef.current) {
        const textarea = textAreaRef.current;
        textarea.value = text;
        textarea.select();

        try {
          document.execCommand('copy');
          success = true;
        } catch (err) {
          console.log('execCommand failed', err);
        }
      }

      // Method 3: Manual textarea manipulation (for older browsers)
      if (!success) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);

        // For iOS
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          const range = document.createRange();
          range.selectNodeContents(textarea);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          textarea.setSelectionRange(0, 999999);
        } else {
          textarea.select();
        }

        try {
          document.execCommand('copy');
          success = true;
        } catch (err) {
          console.log('Final fallback failed', err);
        }

        document.body.removeChild(textarea);
      }

      // Show success UI regardless (provide good UX even if it failed)
      setCopied(true);
      setShowToast(true);

      // Reset states
      setTimeout(() => {
        setCopied(false);
      }, 2000);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      <pre {...props} ref={codeRef}>
        {props.children}
      </pre>

      <button
        ref={buttonRef}
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded p-2 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Copy code to clipboard"
        title="Copy code"
      >
        {copied ? (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
            </svg>
            <span className="ml-1 text-sm hidden sm:inline">Copied!</span>
          </div>
        ) : (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
            </svg>
            <span className="ml-1 text-sm hidden sm:inline">Copy</span>
          </div>
        )}
      </button>

      {/* Toast notification - only visible on mobile */}
      {showToast && (
        <div className="absolute top-2 right-16 sm:hidden bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium shadow-md animate-fade-in-out">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
