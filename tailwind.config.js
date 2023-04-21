/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/Components/**/*.{js,jsx,ts,tsx}',
    './src/PageComponents/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
    plugins: [require("daisyui")],
    // daisyUI config (optional)
    daisyui: {
      styled: true,
      themes: true,
      base: true,
      utils: true,
      logs: true,
      rtl: false,
      prefix: "",
      darkTheme: "dark",
    },
}

