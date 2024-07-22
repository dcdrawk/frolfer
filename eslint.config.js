import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintAutoImport from './eslint-auto-import-plugin.js'
import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default [
  eslintAutoImport,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: [
      '**/*.vue'
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    files: [
      '**/*.{js,mjs,cjs,ts,vue}'
    ],
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'no-console': [
        'warn'
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@stylistic/array-bracket-newline': [
        'error', 'always'
      ],
      '@stylistic/array-bracket-spacing': [
        'error', 'always', {
          'objectsInArrays': false
        }
      ],
      '@stylistic/array-element-newline': [
        'error', 'consistent'
      ],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error', {
          'max': 1
        }
      ],
      '@stylistic/comma-style': [
        'error', 'last'
      ],
      '@stylistic/no-trailing-spaces': 'warn',
      '@stylistic/object-curly-newline': [
        'error', {
          'ObjectExpression': 'always',
          'ObjectPattern': 'always'
        }
      ],
      '@stylistic/object-curly-spacing': [
        'error', 'always'
      ],
      '@stylistic/object-property-newline': 'error',
      '@stylistic/quotes': [
        'error', 'single'
      ],
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/ts/block-spacing': [
        'warn', 'always'
      ],
      '@stylistic/ts/brace-style': [
        'warn', '1tbs'
      ],
      '@stylistic/ts/comma-dangle': [
        'error', 'never'
      ],
      '@stylistic/ts/comma-spacing': 'error',
      '@stylistic/ts/indent': [
        'error', 2
      ],
      '@stylistic/ts/semi': [
        'error', 'never'
      ],
      'vue/singleline-html-element-content-newline': [
        'error', {
          'ignoreWhenNoAttributes': false,
          'ignoreWhenEmpty': false,
          'ignores': [
          ],
          'externalIgnores': [
          ]
        }
      ],
      'vue/multiline-html-element-content-newline': [
        'error', {
          'ignoreWhenEmpty': true,
          'ignores': [
          ],
          'allowEmptyLines': false
        }
      ]
    }
  }
]
