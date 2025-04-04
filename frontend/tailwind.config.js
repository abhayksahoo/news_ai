/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Enables Tailwind in all React components
      "./public/index.html"
    ],
    darkMode: 'class', // Enables dark mode via class strategy
    theme: {
      extend: {
        colors: {
          primary: '#2563eb', // Tailwind blue-600
          secondary: '#1e40af', // Tailwind blue-800
          accent: '#f59e0b', // amber-500 for CTA
          muted: '#6b7280', // gray-500 for text
          background: '#f9fafb', // gray-50 light bg
          darkBackground: '#111827', // gray-900 dark bg
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'), // Truncates text neatly in NewsCard
      require('@tailwindcss/forms'), // Improves form input styles
    ],
  }
  