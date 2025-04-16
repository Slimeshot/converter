import { globalIgnores } from 'eslint/config';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    rules: {
      // Общие правила для всех файлов
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'es5',
          printWidth: 120,
        },
      ],

      // Общие правила JavaScript/TypeScript
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      curly: ['error', 'all'],

      // Vue-специфичные правила
      'vue/no-unused-components': 'error',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
      'vue/multi-word-component-names': 'off',
      'vue/order-in-components': [
        'error',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'model',
            'props',
            'propsData',
            'emits',
            'setup',
            'asyncData',
            'data',
            'computed',
            'watch',
            'methods',
            ['template', 'render'],
            'renderError',
          ],
        },
      ],

      // TypeScript-специфичные правила
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  // Правила для .ts и .tsx файлов (точки с запятой)
  {
    name: 'typescript/semi',
    files: ['**/*.{ts,tsx}'],
    rules: {
      'prettier/prettier': [
        'error',
        { singleQuote: true, semi: true, trailingComma: 'es5' },
      ],
      semi: ['error', 'always'],
      '@typescript-eslint/semi': ['error', 'always'],
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  prettierConfig
);
