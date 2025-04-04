module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended', // Add Prettier
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks', // Add react-hooks plugin
    'prettier', // Add Prettier plugin
  ],
  rules: {
    'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Disable prop-types rule if using TypeScript
    'react-hooks/rules-of-hooks': 'error', // Enforce rules of hooks
    'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect
  },
};
