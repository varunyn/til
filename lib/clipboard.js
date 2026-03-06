const IOS_REGEX = /ipad|ipod|iphone/i;

/**
 * Copy text to clipboard with Clipboard API and execCommand fallbacks.
 * @param {string} text
 * @returns {Promise<boolean>} true if copy succeeded
 */
export async function copyToClipboard(text) {
  const trimmed = String(text).trim();
  if (!trimmed) {
    return false;
  }

  let success = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(trimmed);
      return true;
    } catch {
      // Fall through
    }
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = trimmed;
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

    success = document.execCommand("copy");
    document.body.removeChild(textarea);
  } catch {
    // Ignore
  }

  return success;
}
