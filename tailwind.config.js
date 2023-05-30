/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],

  theme: {
    colors: {
      'bg-dark': 'hsl(235, 21%, 11%)' ,
      'dark-li': 'hsl(235, 24%, 19%)',
      'list-dark': "hsl(235, 24%, 19%)",
      'list-font-dark': "hsl(233, 14%, 35%)",
      'color-blue': 'hsl(219.27deg 100% 61.89%)',
      'white' : '#fff',
      'black' : '#000'
    },
    extend: {
      backgroundImage: {
        'bg-desktop-dark': "url('./images/bg-desktop-dark.jpg')",
        'bg-desktop-light': "url('./images/bg-desktop-light.jpg')",
        'bg-mobile-dark': "url('./images/bg-mobile-dark.jpg')",
        'bg-mobile-light': "url('./images/bg-mobile-light.jpg')",
        'check-gradient': 'linear-gradient(to right,hsl(192, 100%, 67%),hsl(280, 87%, 65%))'
        
      }
    },
  },
  plugins: [],
}




// ### Light Theme

//   - Very Light Gray: hsl(0, 0 %, 98 %)
//   - Very Light Grayish Blue: hsl(236, 33 %, 92 %)
//   - Light Grayish Blue: hsl(233, 11 %, 84 %)
//   - Dark Grayish Blue: hsl(236, 9 %, 61%)
//   - Very Dark Grayish Blue: hsl(235, 19 %, 35 %)

// ### Dark Theme

//   - Very Dark Blue: hsl(235, 21 %, 11 %)
//   - Very Dark Desaturated Blue: hsl(235, 24%, 19%)
//   - Light Grayish Blue: hsl(234, 39%, 85%)
//   - Light Grayish Blue(hover): hsl(236, 33%,92%)
//   - Dark Grayish Blue: hsl(234, 11%, 52%)
//   - Very Dark Grayish Blue: hsl(233, 14%, 35%)
//   - Very Dark Grayish Blue: hsl(237, 14%, 26%)

// ## Typography

// ### Body Copy

//   - Font size: 18px

// ### Font

//   - Family: [Josefin Sans](https://fonts.google.com/specimen/Josefin+Sans)
//     - Weights: 400, 700
