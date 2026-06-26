# ${\color{lightblue}\text{Stylelint}}$

[Description](#description) · [Pros](#pros) · [Cons / Risks](#cons--risks) · [Common Usage](#common-usage) · [Useful Links](#useful-links)

---

## ${\color{lightblue}\text{Description}}$ <a id="description"></a>

Stylelint is a static analysis and linting tool for CSS and CSS-like languages such as SCSS.

Its purpose is to analyze stylesheets for invalid syntax, duplicate selectors, duplicate declarations, inconsistent coding patterns, and other maintainability issues before they become larger problems.

Unlike formatting tools such as Prettier, Stylelint focuses on the correctness and quality of stylesheet code rather than automatically formatting it.

Stylelint is highly configurable through rules and shared configurations, allowing projects to enforce anything from a minimal rule set to a strict stylesheet quality standard.

It supports modern CSS features as well as preprocessors through appropriate configurations and custom syntaxes.

## ${\color{lightgreen}\text{Pros}}$ <a id="pros"></a>

* Helps detect duplicate selectors.
* Helps detect duplicate CSS property declarations.
* Helps catch invalid or suspicious CSS syntax.
* Encourages consistent stylesheet conventions.
* Improves long-term stylesheet maintainability.
* Supports CSS, SCSS, and other stylesheet syntaxes.
* Highly configurable through individual rules and shared configurations.
* Can automatically fix many stylistic issues.
* Works well alongside formatting tools such as Prettier.

## ${\color{salmon}\text{Cons / Risks}}$ <a id="cons--risks"></a>

* Initial configuration can be confusing for larger projects.
* Some rules require experimentation to find a good balance.
* Strict rule sets may generate many warnings in existing projects.
* Certain rules behave differently when using preprocessors such as SCSS.
* Detecting duplicated styling across multiple files is limited and may still require manual refactoring.
* Some rules may be overly strict depending on a project's coding style.
* Duplicate detection primarily focuses on individual stylesheet files rather than identifying repeated styling patterns across multiple files in a project.

## ${\color{plum}\text{Common Usage}}$ <a id="common-usage"></a>

Install Stylelint together with configurations appropriate for Vue Single File Components and SCSS:

```bash
npm install -D \
  stylelint \
  stylelint-config-standard-scss \
  stylelint-config-recommended-vue
```

Create `stylelint.config.mjs`:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss",
  ],

  rules: {
    "declaration-block-no-duplicate-properties": true,
    "keyframe-block-no-duplicate-selectors": true,

    // Primarily intended for CSS.
    // Use carefully in SCSS-heavy projects.
    "no-duplicate-selectors": true,
  },
};
```

Add package scripts:

```json
{
  "scripts": {
    "lint:styles": "stylelint \"src/**/*.{vue,css,scss}\"",
    "lint:styles:fix": "stylelint \"src/**/*.{vue,css,scss}\" --fix"
  }
}
```

Run Stylelint:

```bash
npm run lint:styles
```

Automatically fix supported issues:

```bash
npm run lint:styles:fix
```

Example duplicate property detection:

```scss
.button {
  color: white;
  background: blue;
  color: black;
}
```

Example duplicate selector detection:

```css
.card {
  padding: 16px;
}

.card {
  margin: 12px;
}
```

Example Vue component:

```vue
<template>
  <button class="button">
    Save
  </button>
</template>

<style lang="scss" scoped>
.button {
  color: white;
  color: black;
}
</style>
```

## ${\color{lightblue}\text{Useful Links}}$ <a id="useful-links"></a>

<details>
<summary>📎 Click to expand links</summary>

* [Stylelint Official Website](https://stylelint.io/)
* [Stylelint Documentation](https://stylelint.io/user-guide/get-started/)
* [Stylelint Configuration](https://stylelint.io/user-guide/configure/)
* [Stylelint Rules Reference](https://stylelint.io/user-guide/rules/)
* [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)
* [stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue)

</details>
