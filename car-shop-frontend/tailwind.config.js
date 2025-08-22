// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- NEW LIGHT THEME PALETTE ---
        'primary-red': '#E60000',     // Red stays the same, it works on light backgrounds.
        
        'light-bg': '#F9FAFB',        // A very light gray for the main background (Tailwind's gray-50).
        'card-bg': '#FFFFFF',         // Pure white for cards and sections to make them pop.
        
        'dark-text': '#111827',        // A very dark gray for primary text (Tailwind's gray-900).
        'secondary-text': '#6B7281', // A medium gray for subtitles, etc. (Tailwind's gray-500).
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};