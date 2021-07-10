module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    ignoreComments: true,
    // 'linebreak-style': 0,
    // 'tabWidth': 4,
  },
};
