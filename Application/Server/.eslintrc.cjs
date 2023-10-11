module.exports = {
  root: true,
  env: {
    es2023: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended', 'plugin:import/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    // 0 - OFF, 1 - WARN, 2 - ERROR
    // radix: 0,
    // 'new-cap': 0,
    // 'no-undef': 2,
    // 'no-alert': 0,
    // 'no-shadow': 0,
    // 'no-console': 1,
    // 'func-names': 0,
    // 'no-plusplus': 0,
    // 'comma-dangle': 0,
    // 'no-unused-vars': 0,
    // 'prettier/prettier': 0,
    // 'no-param-reassign': 0,
    // 'consistent-return': 0,
    // 'no-use-before-define': 0,
    // 'no-underscore-dangle': 0,
    // 'class-methods-use-this': 0,
    // 'arrow-body-style': 0,
    // IMPORT
    'import/extensions': [2, 'ignorePackages'],
    // 'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    // 'import/no-extraneous-dependencies': 0,
  },
};
