import { DM_Sans, Source_Serif_4 } from "next/font/google";

/** Neo-grotesque sans — stands in for Lab Grotesque (headings, UI). */
export const fontHeading = DM_Sans({
  adjustFontFallback: true,
  display: "swap",
  subsets: ["latin"],
  variable: "--font-heading",
});

/** Serif text — stands in for Ivar Text (body copy). */
export const fontBody = Source_Serif_4({
  adjustFontFallback: true,
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
});
