import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
  	colors: {
  		white: '#fff',
  		darkGray: '#4d4d4d',
  		green: {
  			'500': '#00C165',
  			'600': '#16a34a'
  		},
  		red: {
  			'500': '#ef4444'
  		},
  		black: '#000',
  		blue: {
  			'500': '#3b82f6',
  			'600': '#2563eb',
  			'700': '#1d4ed8'
  		},
  		gray: {
  			'100': '#f3f4f6',
  			'300': '#d1d5db',
  			'600': '#4b5563',
  			'700': '#374151',
  			'900': '#111827'
  		},
  		indigo: {
  			'600': '#4f46e5',
  			'700': '#4338ca'
  		}
  	},
  	extend: {
  		transitionProperty: {
  			colors: 'background-color, border-color, color, fill, stroke',
  			opacity: 'opacity',
  			transform: 'transform'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  variants: {
    extend: {
      transitionProperty: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
