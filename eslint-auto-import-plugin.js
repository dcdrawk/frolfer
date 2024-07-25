import eslintrcAutoImport from './eslintrc-auto-import.mjs'

export default {
  languageOptions: {
    globals: {
      ...eslintrcAutoImport.globals
    }
  }
}