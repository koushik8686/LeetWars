/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        leetcode: {
          orange: '#FFA116',
          dark: '#1A1A1A',
          darker: '#151515',
          gray: '#2C2C2C',
          text: '#EFEFEF'
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};