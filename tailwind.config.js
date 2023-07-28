/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/pages/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}", "src/app/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        geologica: ["Geologica", "sans-serif"],
        bowlby: ["Bowlby One"],
        roboto: ["Roboto", "sans-serif"],
        "permanent-marker": ["Permanent Marker", "cursive"],
        rowdies: ["Rowdies", "cursive"]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        pallet: {
          0: "black",
          1: "var(--pallet-1)",
          2: "var(--pallet-2)",
          3: "var(--pallet-3)",
          4: "var(--pallet-4)"
        },
        table: {
          "header-bg": "#74dbe7",
          "header-fg": "Black",
          "header-hover-bg": "#74dbe7",
          "header-hover-fg": "Black",
          "header-button-bg": "",
          "header-button-fg": "Black",
          "header-button-hover-bg": "#2569d0",
          "header-button-hover-fg": "White",
          "row-bg": "#f2f2f2",
          "row-fg": "",
          "row-hover-bg": "#cfdff7",
          "row-hover-fg": "",
          "dropdown-button-bg": "#74dbe7",
          "dropdown-button-fg": "",
          "dropdown-button-hover-bg": "#2569d0",
          "dropdown-button-hover-fg": "White",
          "dropdown-bg": "White",
          "dropdown-fg": "",
          "dropdown-hover-bg": "#cfdff7",
          "dropdown-hover-fg": ""
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
