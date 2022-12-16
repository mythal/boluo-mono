module.exports = {
  plugins: ["formatjs"],
  extends: ["next", "custom"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
