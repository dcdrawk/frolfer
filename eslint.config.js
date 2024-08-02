import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintAutoImport from './eslint-auto-import-plugin.js'
import neostandard from 'neostandard'

export default [
  eslintAutoImport,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...neostandard({
    ignores: ['eslintrc-auto-import.mjs', 'auto-imports.d.ts', 'components.d.ts'],
    files: [
      '**/*.vue',
    ],
    filesTs: [
      '**/*.ts',
    ],
    ts: true,
  }),
  {
    files: [
      '**/*.vue',
    ],
    ignores: ['./eslintrc-auto-import.mjs'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: [
      '**/*.{js,mjs,cjs,ts,vue}',
    ],
    ignores: ['./eslintrc-auto-import.mjs'],
    rules: {
      'no-console': [
        'warn',
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          ignoreWhenNoAttributes: false,
          ignoreWhenEmpty: false,
          ignores: [
          ],
          externalIgnores: [
          ],
        },
      ],
      'vue/multiline-html-element-content-newline': [
        'error',
        {
          ignoreWhenEmpty: true,
          ignores: [
          ],
          allowEmptyLines: false,
        },
      ],
    },
  },
]
