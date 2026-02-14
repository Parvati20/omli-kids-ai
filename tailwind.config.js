/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink-light': '#FFF5F7',
        'pink-medium': '#FFD6E0',
        'purple-deep': '#9B59B6',
      },
    },
  },
  plugins: [],
}
