const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  semi: false,
  tailwindConfig: "tailwind.config.js",
  tailwindAttributes: ["className"],
  tailwindFunctions: ["twMerge"],
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

export default config
