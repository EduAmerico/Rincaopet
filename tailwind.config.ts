import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        ink: '#0B7A4B',
        muted: '#3C7A5A',
        border: '#E4E7EC',
        primary: {
          DEFAULT: '#0B7A4B',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FBBF24',
          foreground: '#FFFFFF',
        },
        'soft-green': '#EAF7F0',
        'soft-gold': '#FFF5DF',
        success: '#22C55E',
        // legacy aliases used in some components during migration
        'pet-green': '#0B7A4B',
        'pet-orange': '#F59E0B',
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        chip: '12px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(23, 33, 43, 0.06)',
        elevated: '0 4px 12px rgba(23, 33, 43, 0.08)',
      },
    },
  },
  plugins: [],
}
export default config
