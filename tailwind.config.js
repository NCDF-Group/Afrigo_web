/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF7F1',
          100: '#D5ECDD',
          200: '#A9D8BB',
          300: '#74BE94',
          400: '#3F9E6C',
          500: '#1B7F4E',
          600: '#0E6A3F',
          700: '#0B5634',
          800: '#0A432A',
          900: '#072E1D',
          950: '#041C12'
        },
        gold: {
          50: '#FDF8E9',
          100: '#FAEEC8',
          200: '#F4DB8C',
          300: '#EDC555',
          400: '#E3B02E',
          500: '#C9971A',
          600: '#A87A12',
          700: '#86600F',
          800: '#664810',
          900: '#4A340D'
        },
        ink: {
          400: '#8B968F',
          500: '#5F6D65',
          700: '#34423A',
          900: '#111A15'
        },
        canvas: '#FAFAF7',
        subtle: '#F3F2EC',
        line: {
          DEFAULT: '#E4E2D9',
          strong: '#CBC8BC'
        },
        success: { DEFAULT: '#15803D', soft: '#DCFCE7' },
        warning: { DEFAULT: '#B45309', soft: '#FEF3C7' },
        danger: { DEFAULT: '#B91C1C', soft: '#FEE2E2' },
        info: { DEFAULT: '#1D4ED8', soft: '#DBEAFE' }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        input: '12px',
        card: '16px',
        sheet: '24px'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(17,26,21,.06)',
        md: '0 4px 16px rgba(17,26,21,.08)',
        lg: '0 16px 40px rgba(17,26,21,.12)'
      },
      maxWidth: {
        site: '1200px',
        app: '1440px'
      }
    }
  },
  plugins: []
}
