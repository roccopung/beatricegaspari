/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,vue,js}"],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    colors: {
      'gray-100': 'rgb(244, 244, 244)',
      'gray-200': 'rgb(218, 218, 218)',
      'orange-100': 'rgb(255, 166, 128)',
      'orange-200': 'rgb(255, 142, 38)',
      'yellow-accent': 'rgb(255, 240, 104)',
      'yellow-dark': 'rgb(255, 204, 74)',
    },
    fontFamily: {
      body: ['Arial Narrow', 'Arial', 'sans-serif'],
      headings: ['Piscolabis Regular', 'Arial Narrow', 'Arial', 'sans-serif'],
    },
    extend: {
      spacing: {
        '100': '5px',
        '200': '1rem',
        '300': '4rem',
        '400': '5.8rem',
      }
    }
  }
}