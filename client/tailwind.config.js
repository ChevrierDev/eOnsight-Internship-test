/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    //extend and create colors to use in my layout
    extend: {
      colors: {
        buttonPrimary: "#F86D1B",// use for button but also used for pie chart Fair bridges status
        pieChartPoor: "#900C3C",//pie chart colors for Poor bridges status
        pieChartBad: "#581A3F",//pie chart colors for Bad bridges status
        pieChartGood: "#F2BF1B",//pie chart colors for Good bridges status
        bodyBg: "#1E1E1E",
        textSecondary: "#EAEAEA",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"]
      }
    },
  },
  plugins: [],
}

