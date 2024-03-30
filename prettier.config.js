/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  semi: false,
  // tailwindConfig: "/tailwind.config.js",
  tailwindAttributes: ["className"],
  tailwindFunctions: ["twMerge"],
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  trailingComma: "es5",
}
