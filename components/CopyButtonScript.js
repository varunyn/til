'use client';

import { useEffect } from 'react';

export default function CopyButtonScript() {
  useEffect(() => {
    const handleCopyClick = async (event) => {
      const button = event.currentTarget;
      const codeBlock = button.parentElement.querySelector('code');

      if (!codeBlock) return;

      // Get the text content from the code block
      // For Prism-processed content, we just get the textContent directly
      const codeText = codeBlock.textContent.trim();

      try {
        await navigator.clipboard.writeText(codeText);

        // Update button text and icon
        const textSpan = button.querySelector('span');
        const svg = button.querySelector('svg');

        if (textSpan) textSpan.textContent = 'Copied!';
        if (svg) {
          svg.innerHTML =
            '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />';
        }
        button.title = 'Copied!';

        // Reset after 2 seconds
        setTimeout(() => {
          if (textSpan) textSpan.textContent = 'Copy';
          if (svg) {
            svg.innerHTML =
              '<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>';
          }
          button.title = 'Copy code';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    // Add event listeners to all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach((button) => {
      button.addEventListener('click', handleCopyClick);
    });

    // Cleanup
    return () => {
      copyButtons.forEach((button) => {
        button.removeEventListener('click', handleCopyClick);
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
