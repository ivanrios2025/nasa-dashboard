module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  overrides: [
    {
      files: ['frontend/**/*.{js,jsx,ts,tsx}'],
      plugins: ['react'],
      extends: ['plugin:react/recommended'],
      settings: { react: { version: 'detect' } }
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  },
  env: {
    node: true,
    es6: true,
    browser: true
  }
};
