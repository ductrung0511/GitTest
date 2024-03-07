/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        "color-primary" : '#d7fdf0', //
        "color-primary-light" : '#f9dcc4',
        "color-primary-dark" : '#fcd5ce',
        'color-secondary' : '#1B263B', //
        'color-secondary-dark': '#40916c',
        'color-accent' : '#0165FC',// //  #0165FC
        'color-vibrant' : '#ffc8dd'//  '#B74F6F',
        

      }
      

    },
    container:{
      center: true
    }
  },
  plugins: [],
}

