const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/browser"),
  ],
  ignorePatterns: [
    "node_modules",
    "dist",
    ".eslintrc.cjs",
    "vite.config.ts",
    "vite-env.d.ts",
    "src/lib",
    "/**/*.d.ts",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["react-refresh"],
  rules: {
    "jsx-a11y/no-autofocus": "off",
    "react/function-component-definition": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "type",
          "unknown",
        ],
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        distinctGroup: false,
        "newlines-between": "always",
      },
    ],
    "import/no-named-as-default": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
