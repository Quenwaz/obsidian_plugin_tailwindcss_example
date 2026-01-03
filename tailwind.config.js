/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('autoprefixer'),require('@headlessui/tailwindcss') // 关键：生成 ui-open:* 等修饰符
  ],
  // prefix: 'zkh-',
  corePlugins: { preflight: false }
}