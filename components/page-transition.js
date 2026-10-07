import { ViewTransition } from "react";

const ENTER = {
  default: "fade-in",
  "nav-back": "nav-back",
  "nav-forward": "nav-forward",
};

const EXIT = {
  default: "fade-out",
  "nav-back": "nav-back",
  "nav-forward": "nav-forward",
};

/** Each page owns this boundary so route changes trigger enter and exit. */
export default function PageTransition({ children }) {
  return (
    <ViewTransition default="none" enter={ENTER} exit={EXIT}>
      {children}
    </ViewTransition>
  );
}
