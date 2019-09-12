module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      env: {
        jest: true,
      },
    },
  ],
};
