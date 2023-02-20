/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)'
        }
      },
      height: {
        '50vh': '50vh'
      },
      fontSize: {
        xs: "10px",
        sm: "12px"
      }
    },
  },
  daisyui: {
    themes: ["light", "bumblebee", "cyberpunk", "dark", "business", "cupcake", "garden", "retro"],
  }
}
