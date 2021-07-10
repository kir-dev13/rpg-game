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
    ignoreComments: 0,
    'object-curly-newline': 'off',
    // 'linebreak-style': 0,
    // 'tabWidth': 4,
  },
};
