const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
  theme: {
    screens: {
      mobile: { max: "640px" },
    },
    extend: {
      colors: {
        purple: "#F5EBFF",
        darkPurple: "#665ffa",
        lightgrey: "#393e46",
        linkedIn: "#0076b5",
        facebook: "#1095f5",
        darkgrey: "#222831",
        whitedarktheme: "#EEEEEE",
        orange: "#b55400",
        facebook: "#4267B2",
      },
      inset: {
        timelineCircle: "calc(50% - 0.5em)",
      },
      boxShadow: {
        checkbox: "inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.3)",
        "checkbox-checked": "inset 0.125em 0.125em 0 0.125em rgba(0,0,0,.1)",
        case: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
        "case-hover": "0 10px 28px rgba(0,0,0,.25), 0 8px 10px rgba(0,0,0,.22)",
        link: "inset 0 -4px 0 #6c63ff",
        "link-hover": "inset 0 -18px 0 #6c63ff",
        "link-dark": "inset 0 -4px 0 #b55400",
        "link-dark-hover": "inset 0 -18px 0 #b55400",
      },
      minHeight: {
        "screen-without-nav": "calc(100vh - 4rem)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
              code: { color: theme("colors.blue.400") },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.100"),
            },
            "h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
};
