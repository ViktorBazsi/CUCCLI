module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
        modules: false, // 💥 ne konvertálja az import/export-ot require/module.exports-re
      },
    ],
  ],
  plugins: ["@babel/plugin-proposal-optional-chaining"],
};
