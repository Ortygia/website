module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    project: './tsconfig.eslint.json'
  },
  rules: {
    'no-void': 0,
    'no-var': 'error',
    'vue/component-api-style': [
      'error',
      ['script-setup', 'composition'] // "script-setup", "composition", "composition-vue2", or "options"
    ],
    'vue/no-multi-spaces': [
      'error',
      {
        ignoreProperties: false
      }
    ]
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
