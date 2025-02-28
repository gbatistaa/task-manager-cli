import { FlatCompat } from "@eslint/eslintrc";
import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const customNodeConfig = [
  {
    ignores: ["node_modules"],
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      prettier: require("eslint-plugin-prettier"),
      import: require("eslint-plugin-import"),
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "import/extensions": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
        },
      ],
      "max-len": [
        "warn",
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
        },
      ],
      "import/prefer-default-export": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: false,
          trailingComma: "all",
        },
      ],
      quotes: ["error", "double"],
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
];

const eslintConfig = [...customNodeConfig];

export default eslintConfig;
