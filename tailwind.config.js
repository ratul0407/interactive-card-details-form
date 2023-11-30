/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors: {
        clr_neutral_100: "hsl(0,0%,100%)",
        clr_neutral_200: "hsl(278, 6%,55%)",
        clr_neutral_400: "hsl(279,6%,55%)",
        clr_neutral_500: "hsl(278,68%,11%)",
        clr_red: "hsl(0,100%,66%)",
        gradient_1: "hsl(249, 99%, 64%)",
        gradient_2: "hsl(278, 94%, 30%)",
      },
    },
    fontFamily: {
      space_grotesk: ["Space Grotesk", "sans-serif"],
    },
  },
  plugins: [],
};

// - Linear gradient (active input border): hsl(249, 99%, 64%) to hsl(278, 94%, 30%)
// - Red (input errors): hsl(0, 100%, 66%)

// ### Neutral

// - White: hsl(0, 0%, 100%)
// - Light grayish violet: hsl(270, 3%, 87%)
// - Dark grayish violet: hsl(279, 6%, 55%)
// - Very dark violet: hsl(278, 68%, 11%)
