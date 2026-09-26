/** @type {import('tailwindcss').Config} */
const token = name => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Logo dark green #025344 (brand-600) and logo lime #7CB041 (accent-500)
        brand: {
          50: token('brand-50'),
          100: token('brand-100'),
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
          400: token('ink-400'),
          500: token('ink-500'),
          700: token('ink-700'),
          900: token('ink-900')
        },
        canvas: token('canvas'),
        surface: token('surface'),
        subtle: token('subtle'),
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong')
        },
        success: { DEFAULT: token('success'), soft: token('success-soft') },
        warning: { DEFAULT: token('warning'), soft: token('warning-soft') },
        danger: { DEFAULT: token('danger'), soft: token('danger-soft') },
        info: { DEFAULT: token('info'), soft: token('info-soft') }
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
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'none' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } }
      },
      animation: {
        rise: 'rise .5s cubic-bezier(.2,.8,.2,1) both',
        shimmer: 'shimmer 1.6s linear infinite'
      },
      maxWidth: {
        site: '1200px',
        app: '1440px'
      }
    }
  },
  plugins: []
}
