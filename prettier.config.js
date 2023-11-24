module.exports = {
  semi: false,
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  tailwindConfig: "tailwind.config.js",
  tailwindAttributes: ["className"],
  tailwindFunctions: ["twMerge"],
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
