import type { Config } from 'tailwindcss'
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default <Partial<Config>>{
  content: {
    files: [
      /* ... */
    ],
    extract
  },
  plugins: [fluid],
  theme: {
    screens,
    fontSize,
    extend: {
      fontFamily: {
        sans: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        gallery: {
          '50': '#f8f8f8',
          '100': '#efefef',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929'
        },
        'web-orange': {
          '50': '#fffbea',
          '100': '#fff4c5',
          '200': '#ffe787',
          '300': '#ffd548',
          '400': '#ffc01e',
          '500': '#fca311',
          '600': '#df7500',
          '700': '#b95104',
          '800': '#963e0a',
          '900': '#7b330c',
          '950': '#471901'
        },
        'red-orange': {
          '50': '#fff1f1',
          '100': '#ffe0df',
          '200': '#ffc6c5',
          '300': '#ff9f9d',
          '400': '#ff6764',
          '500': '#ff3c38',
          '600': '#ed1915',
          '700': '#c8110d',
          '800': '#a5120f',
          '900': '#881614',
          '950': '#4b0504'
        }
      }
    }
  }
}
