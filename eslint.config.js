// @ts-check
const { configs } = require("@eslint/js");
const { config, configs: _configs } = require("typescript-eslint");
const { configs: __configs, processInlineTemplates } = require("angular-eslint");

module.exports = config(
  {
    files: ["**/*.ts"],
    extends: [
      configs.recommended,
      // @ts-ignore
      ..._configs.recommended,
      // @ts-ignore
      ..._configs.stylistic,
      // @ts-ignore
      ...__configs.tsRecommended,
    ],
    processor: processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...__configs.templateRecommended,
      ...__configs.templateAccessibility,
    ],
    rules: {},
  }
);
