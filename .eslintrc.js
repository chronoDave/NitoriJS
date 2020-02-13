module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended'
  ],
  parser: 'babel-eslint',
  rules: {
    // General
    'operator-linebreak': ['error', 'after'],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'no-nested-ternary': 'off',
    'template-curly-spacing': 'off',
    'indent': 'off',
    'prefer-template': 'off', // String formatting
    'no-underscore-dangle': 'off', // NeDB _id
    // Import
    'import/namespace': ['error', { 'allowComputed': true }],
    'import/prefer-default-export': 'off'
  }
}