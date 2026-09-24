/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Logo dark green #025344 (brand-600) and logo lime #7CB041 (accent-500)
        brand: {
          50: '#E8F4F0',
          100: '#CBE6DD',
          200: '#9BCFBF',
          300: '#62B39C',
          400: '#2E9278',
          500: '#0B7259',
          600: '#025344',
          700: '#024437',
          800: '#02372D',
          900: '#012A22',
          950: '#011A15'
        },
        accent: {
          50: '#F3F9EC',
          100: '#E4F1D3',
          200: '#C9E3A8',
          300: '#A8D176',
          400: '#8FC155',
          500: '#7CB041',
          600: '#649233',
          700: '#4E7228',
          800: '#3B5620',
          900: '#2A3D18'
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
