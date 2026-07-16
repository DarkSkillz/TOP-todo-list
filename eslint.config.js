import js from '@eslint/js';
import globals from 'globals';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import html from '@html-eslint/eslint-plugin';

export default defineConfig([
    // Lint JS
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
    // Lint CSS
    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended'],
    },
    // Lint HTML
    {
        files: ['**/*.html'],
        plugins: { html },
        language: 'html/html',
        rules: {
            'html/no-duplicate-class': 'error',
            'html/no-duplicate-attrs': 'error',
        },
    },
]);
