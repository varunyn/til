import { DM_Sans, Source_Serif_4 } from "next/font/google";

/** Neo-grotesque sans — stands in for Lab Grotesque (headings, UI). */
export const fontHeading = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: true,
});

/** Serif text — stands in for Ivar Text (body copy). */
export const fontBody = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: true,
});
