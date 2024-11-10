import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        // Light
        NunitoExtraLight: ['Nunito-ExtraLight', 'sans-serif'],
        NunitoExtraLightItalic: ['Nunito-ExtraLightItalic', 'sans-serif'],
        NunitoLight: ['Nunito-Light', 'sans-serif'],
        NunitoLightItalic: ['Nunito-LightItalic', 'sans-serif'],
        // Regular
        NunitoItalic: ['Nunito-Italic', 'sans-serif'],
        NunitoRegular: ['Nunito-Regular', 'sans-serif'],
        // Medium
        NunitoMedium: ['Nunito-Medium', 'sans-serif'],
        NunitoMediumItalic: ['Nunito-MediumItalic', 'sans-serif'],
        // Bold
        NunitoSemiBold: ['Nunito-SemiBold', 'sans-serif'],
        NunitoSemiBoldItalic: ['Nunito-SemiBoldItalic', 'sans-serif'],
        NunitoBold: ['Nunito-Bold', 'sans-serif'],
        NunitoBoldItalic: ['Nunito-BoldItalic', 'sans-serif'],
        NunitoExtraBold: ['Nunito-ExtraBold', 'sans-serif'],
        NunitoExtraBoldItalic: ['Nunito-ExtraBoldItalic', 'sans-serif']
      },
      colors: {
        shark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#222222'
        },
        'red-orange': {
          50: '#fff1f1',
          100: '#ffdfdf',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#ff6464',
          500: '#ff3434',
          600: '#ed1515',
          700: '#c80d0d',
          800: '#a50f0f',
          900: '#881414',
          950: '#4b0404'
        }
      }
    }
  }
}
