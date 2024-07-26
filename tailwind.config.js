module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        '3xl': '20px 20px 80px 0px rgba(0, 0, 0, 0.16 )',
        '4xl': '30px 30px 40px 0px #1F51FF',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #FFE27D 0%, #FFB543 29%, #61FFD5 73%, #3FB5FF 99%)',
        'custom-gradient-two': 'linear-gradient(90deg, #FF0000 0%, #FFFFFF 29%, #00FF00 73%, #0000FF 99%)',
        'custom-gradient-purple':
          'linear-gradient(180deg, #AA14F0 -42.59%, rgba(0, 0, 0, 0) -42.59%, #AA14F0 -42.58%, rgba(170, 20, 240, 0.18) 4.35%, rgba(151, 60, 68, 0.055) 99.99%, rgba(185, 54, 245, 0) 100%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
}
