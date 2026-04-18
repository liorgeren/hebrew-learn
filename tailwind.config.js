/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hebrew: ['"Noto Sans Hebrew"', '"Frank Ruhl Libre"', 'serif'],
        display: ['"Fredoka One"', 'cursive'],
      },
      colors: {
        world1: { bg: '#FFF3CD', border: '#F5A623', btn: '#F5A623' },
        world2: { bg: '#D4EDDA', border: '#28A745', btn: '#28A745' },
        world3: { bg: '#CCE5FF', border: '#007BFF', btn: '#007BFF' },
        world4: { bg: '#F8D7DA', border: '#DC3545', btn: '#DC3545' },
      },
      keyframes: {
        wiggle: {
          '0%,100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        bounce2: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-8px)' },
          '40%,80%': { transform: 'translateX(8px)' },
        },
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-80px) scale(1.5)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.4s ease-in-out',
        bounce2: 'bounce2 0.6s ease-in-out',
        pop: 'pop 0.3s ease-in-out',
        shake: 'shake 0.4s ease-in-out',
        floatUp: 'floatUp 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}

