import defaultTheme from 'tailwindcss/defaultTheme'
import animations from "@midudev/tailwind-animations";
import { addDynamicIconSelectors } from '@iconify/tailwind';
import scrollDrivenAnimations from "@adam.plesnik/tailwindcss-scroll-driven-animations"
import animate from 'tailwindcss-animate'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ['robotolight_italic', 'sans-serif'],
        adelia: ['ADELIA', 'cursive'],
        montserrat: ['Montserrat Variable', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
        ibm: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          '50': '#edfaff',
          '100': '#d6f3ff',
          '200': '#b5ebff',
          '300': '#83e1ff',
          '400': '#48ceff',
          '500': '#1eb0ff',
          '600': '#0693ff',
          '700': '#007fff',
          '800': '#0861c5',
          '900': '#0d549b',
          '950': '#0e335d',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dce9fd',
          200: '#c1d9fc',
          300: '#96c2fa',
          400: '#64a1f6',
          500: '#407ef1',
          600: '#2a60e6',
          700: '#224bd3',
          800: '#223eab',
          900: '#213887',
          950: '#17224d',
        },
        accent: {
          50: '#eefffc',
          100: '#c6fff9',
          200: '#8dfff5',
          300: '#4cfcef',
          400: '#17e9e1',
          500: '#00cdc8',
          600: '#00a5a4',
          700: '#028283',
          800: '#076668',
          900: '#0c5455',
          950: '#003034',
        },
        success: {
          50: '#f0fff7',
          100: '#d9ffe9',
          200: '#a8ffcb',
          300: '#6fffa4',
          400: '#3ff07b',
          500: '#1dd95e',
          600: '#0fbf4b',
          700: '#0a9d3e',
          800: '#0a7f3a',
          900: '#0a6537',
          950: '#003022',
        },
        warning: {
          50: '#fffdf2',
          100: '#fff8d9',
          200: '#ffedaa',
          300: '#ffe06f',
          400: '#ffd13e',
          500: '#ffbb0f',
          600: '#e6a400',
          700: '#c88e00',
          800: '#a47400',
          900: '#855e00',
          950: '#4d3a00',
        },
        danger: {
          50: '#fff7f7',
          100: '#ffdfdf',
          200: '#ffbdbd',
          300: '#ff8f8f',
          400: '#ff5f5f',
          500: '#ff2f2f',
          600: '#e60000',
          700: '#c80000',
          800: '#a40000',
          900: '#840000',
          950: '#4d0000',
        },
        shank: {
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
          950: '#222222',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    animations,
    animate,
    scrollDrivenAnimations,
  addDynamicIconSelectors(),
  ({ addComponents }) => {
    addComponents({
      ".bg-gradient-text": {
        background: "linear-gradient(90deg, #4f46e5, #007fff, #17e9e1)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".bg-gradient-text-secondary": {
        background: "linear-gradient(90deg, #407ef1, #17e9e1)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".bg-gradient-text-accent": {
        background: "linear-gradient(90deg, #17e9e1, #00a5a4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".bg-gradient-text-danger": {
        background: "linear-gradient(90deg, #ff2f2f, #ffbb0f)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".bg-gradient-text-warning": {
        background: "linear-gradient(90deg, #ffbb0f, #ff2f2f)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".bg-gradient-text-success": {
        background: "linear-gradient(90deg, #1dd95e, #00cdc8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".bg-gradient-text-shank": {
        background: "linear-gradient(90deg, #6d6d6d, #00cdc8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    });
  }
  ],
}