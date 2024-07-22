import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import eslintAutoImport from './eslint-auto-import-plugin.js'
import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default [
  eslintAutoImport,
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'no-console': ['warn'],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/semi': ["error", "never"],
      '@stylistic/ts/comma-dangle': ["error", "never"]
      
    }
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  }
]
