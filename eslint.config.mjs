import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

export default defineConfig([
  stylistic.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  { name: 'creators/plugins', plugins: { perfectionist: eslintPluginPerfectionist } },
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.node } },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
])
