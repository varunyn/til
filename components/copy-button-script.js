"use client";

import { useEffect } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export default function CopyButtonScript() {
  useEffect(() => {
    const handleCopyClick = async (event) => {
      const button = event.currentTarget;
      const codeEl = button.parentElement?.querySelector("code");
      if (!codeEl) {
        return;
      }

      const success = await copyToClipboard(codeEl.textContent ?? "");
      if (!success) {
        return;
      }

      const textSpan = button.querySelector("span");
      const svg = button.querySelector("svg");
      if (textSpan) {
        textSpan.textContent = "Copied";
      }
      if (svg) {
        svg.innerHTML =
          '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />';
      }
      button.title = "Copied";

      setTimeout(() => {
        if (textSpan) {
          textSpan.textContent = "Copy";
        }
        if (svg) {
          svg.innerHTML =
            '<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>';
        }
        button.title = "Copy code";
      }, 2000);
    };

    function attachListeners() {
      const copyButtons = document.querySelectorAll(".copy-button");
      for (const button of copyButtons) {
        if (!button.dataset.copyAttached) {
          button.dataset.copyAttached = "true";
          button.addEventListener("click", handleCopyClick);
        }
      }
      return copyButtons;
    }

    attachListeners();
    const t = setTimeout(attachListeners, 100);
    const t2 = setTimeout(attachListeners, 500);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      for (const button of document.querySelectorAll(".copy-button")) {
        button.removeEventListener("click", handleCopyClick);
        delete button.dataset.copyAttached;
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
