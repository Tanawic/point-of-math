import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:   '#0A0A0A',
        paper: '#F8F5F0',
        muted: '#7A7672',
        rule:  '#E3DED8',
      },
      fontFamily: {
        sans:  ['var(--font-sans)', 'Noto Sans Thai', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono:  ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      borderRadius: {
        sm:      '2px',
        DEFAULT: '2px',
        md:      '2px',
        lg:      '2px',
      },
      letterSpacing: {
        widest: '0.18em',
      },
    },
  },
  plugins: [],
}

export default config
