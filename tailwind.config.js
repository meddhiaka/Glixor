/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './.storybook/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#00f0ff',
          secondary: '#ff007f',
          alert: '#ff003c',
          warning: '#ffea00',
          success: '#00e676',
          dark: '#0a0b10',
          darkSurface: '#12141e',
          darkSurfaceSub: '#1a1d2d',
          darkSurfaceTert: '#22273b',
          darkInput: '#12141e',
          light: '#ffffff',
          lightSurface: '#ffffff',
          lightSurfaceSub: '#f4f6fb',
          lightSurfaceTert: '#e9edf5',
          lightInput: '#ffffff',
        },
      },
      animation: {
        'glitch-jitter': 'glitchJitter 0.25s infinite linear',
        'glitch-stretch': 'glitchStretch 2s infinite ease-in-out alternate',
        scanline: 'scanline 2s linear infinite',
      },
    },
  },
  plugins: [],
};
