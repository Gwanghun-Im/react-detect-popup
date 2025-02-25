module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/your-package-name/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // 모든 가능한 조합을 자동으로 생성
    ...["blue", "red", "green", "yellow", "purple", "gray"].flatMap((color) =>
      [
        "50",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
      ].flatMap((shade) => [`bg-${color}-${shade}`, `text-${color}-${shade}`])
    ),
    {
      pattern:
        /(bg|text)-(white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-[50-900])?/,
    },
    {
      pattern: /rounded-(none|sm|md|lg|xl|2xl|3xl|full)/,
    },
    {
      pattern: /p-[0-8]/,
    },
  ],
  // ...
}
