// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default withNuxt(
    {
        files: ['app/**/*.vue'],
        languageOptions: {
            parser: (await import('vue-eslint-parser')).default,
            parserOptions: {
                parser: (await import('@typescript-eslint/parser')).default,
                sourceType: 'module'
            }
        }
    },
    {
        files: ['app/**/*.ts'],
        languageOptions: {
            parser: (await import('@typescript-eslint/parser')).default,
            parserOptions: {
                sourceType: 'module'
            }
        }
    },
    {
        // The core rule doesn't understand TypeScript, e.g. it flags parameter names in function types
        files: ['app/**/*.ts', 'app/**/*.vue'],
        plugins: { '@typescript-eslint': tseslint.plugin },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error'
        }
    },
    eslintPluginPrettierRecommended
);
