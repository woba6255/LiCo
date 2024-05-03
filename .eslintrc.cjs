module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        '@feature-sliced',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', '.svg', '*/**/lib/**/*', 'out', 'node_modules'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        "no-restricted-imports": ["error", {
            paths: [{
                name: "@mui/material",
                message: "Please use shared/ui instead."
            }, {
                name: "@mui/icons-material",
                message: "Please use shared/ui instead."
            }, {
                name: "@emotion/react",
                message: "Use emotion only in shared/ui."
            }, {
                name: "@emotion/styled",
                message: "Use emotion only in shared/ui."
            }, {
                name: "i18next",
                message: "Use shared/i18n instead."
            }, {
                name: "react-i18next",
                message: "Use shared/i18n instead."
            }]
        }],
        "@typescript-eslint/no-explicit-any": "off",
    },
    overrides: [{
        files: ["*/**/shared/**/*", "*/**/app/**/*"],
        rules: {
            "no-restricted-imports": "off"
        }
    }, {
        files: ["*"],
        rules: {
            "import/order": [
                "error",
                {
                    "pathGroups": [{
                        "pattern": "electron",
                        "group": "builtin",
                        "position": "after"
                    }]
                }
            ]
        }
    }],
}
