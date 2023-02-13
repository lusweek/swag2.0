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
      }
    },
  },
  daisyui: {
    themes: ["light", "bumblebee", "cyberpunk",],
  }
  // themes: [
  //   {
  //     mytheme: {

  //       "primary": "#fde047",

  //       "secondary": "#D926AA",

  //       "accent": "#1FB2A5",

  //       "neutral": "#111827",

  //       "base-100": "#2A303C",

  //       "info": "#3ABFF8",

  //       "success": "#36D399",

  //       "warning": "#f59e0b",

  //       "error": "#F87272",
  //     }
  //   },
  // ],


  
}
