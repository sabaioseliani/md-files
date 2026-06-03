// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import configPrettier from "eslint-config-prettier";
import globals from "globals";
import process from "node:process";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig([
  // ─── Ignored paths ────────────────────────────────────────────────────────
  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  // ─── Base JS rules ────────────────────────────────────────────────────────
  {
    name: "app/js-base",
    files: ["**/*.{vue,js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // ── Variables ──────────────────────────────────────────────────────────

      "no-var": "error",
      // Disallows `var` declarations; enforces block-scoped `let`/`const` instead.

      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Warns on variables that are declared but never read.
      // Args starting with _ are intentionally ignored (common convention).

      "prefer-const": "error",
      // Requires `const` when a variable is never reassigned after declaration.

      "no-use-before-define": ["error", { functions: false, classes: true, variables: true }],
      // Prevents referencing variables/classes before they are declared.
      // Functions are exempt since hoisting makes it safe for them.

      "no-shadow": "warn",
      // Warns when a variable in an inner scope shares a name with one in an outer scope,
      // which can cause confusing bugs.

      // ── Syntax / modernization ─────────────────────────────────────────────

      "prefer-template": "error",
      // Enforces template literals (`Hello ${name}`) over string concatenation.

      "object-shorthand": ["error", "always"],
      // Enforces shorthand syntax for object methods and properties: { foo } over { foo: foo }.

      "no-duplicate-imports": "error",
      // Disallows importing the same module more than once; merge them into one import.

      "prefer-rest-params": "error",
      // Enforces `...args` rest parameters instead of the legacy `arguments` object.

      "prefer-spread": "error",
      // Enforces spread syntax (`fn(...args)`) over `Function.prototype.apply`.

      "prefer-arrow-callback": "error",
      // Requires arrow functions for callbacks, keeping `this` predictable.

      "no-param-reassign": ["warn", { props: false }],
      // Warns when reassigning function parameters, which can cause confusing side effects.
      // Props of parameters are allowed (e.g. modifying an object arg is common in Vue handlers).

      "no-else-return": "error",
      // Disallows an `else` block after an `if` that contains a `return`,
      // since the `else` is unreachable and redundant.

      "arrow-body-style": ["error", "as-needed"],
      // Removes unnecessary curly braces from arrow functions that have a single expression body.

      // ── Safety ─────────────────────────────────────────────────────────────

      "eqeqeq": ["error", "always"],
      // Requires strict equality (`===`) instead of loose equality (`==`) everywhere.

      "curly": ["error", "all"],
      // Requires braces for all control flow blocks (`if`, `for`, etc.),
      // even single-line ones, to prevent bugs from dangling statements.

      "consistent-return": "error",
      // Requires functions to either always or never explicitly return a value,
      // preventing implicit `undefined` returns mixed with explicit ones.

      "no-useless-catch": "error",
      // Disallows catch blocks that only re-throw the caught error with no additional logic.

      "no-throw-literal": "error",
      // Enforces throwing Error objects instead of plain strings or literals.

      "no-promise-executor-return": "error",
      // Disallows returning a value from a Promise executor function, which is almost always a bug.

      "no-await-in-loop": "warn",
      // Warns on `await` inside a loop; usually better to use `Promise.all()` for parallelism.

      "no-return-assign": "error",
      // Disallows assignment inside a `return` statement, which is usually a typo (= vs ==).

      "no-implicit-coercion": ["error", { allow: ["!!"] }],
      // Disallows shorthand type coercions like `+foo` or `"" + foo`.
      // `!!` is allowed as it's an accepted idiom for boolean conversion.

      "no-lonely-if": "error",
      // Disallows an `if` as the only statement inside an `else` block; use `else if` instead.

      "no-unreachable": "error",
      // Disallows code after `return`, `throw`, `break`, or `continue` statements.

      "no-self-compare": "error",
      // Disallows comparing a variable to itself (e.g. `x === x`), which is always a bug.

      "no-constructor-return": "error",
      // Disallows returning a value from a class constructor, which is always a bug.

      "no-nested-ternary": "warn",
      // Warns on nested ternary expressions, which quickly become unreadable.

      // ── Environment-aware ──────────────────────────────────────────────────

      "no-console": isProd ? ["error", { allow: ["warn", "error"] }] : "off",
      // In production, disallows `console.log` etc. (only warn/error allowed).
      // In development, allows all console usage freely.

      "no-debugger": isProd ? "error" : "warn",
      // In production, errors on `debugger` statements (they must not ship).
      // In development, only warns so you notice them without blocking the build.
    },
  },

  // ─── Vue parser setup (flat/base = parser only, zero preset rules) ────────
  ...pluginVue.configs["flat/base"],

  // ─── Vue rules ────────────────────────────────────────────────────────────
  {
    name: "app/vue-rules",
    files: ["**/*.vue"],
    rules: {
      // ── Priority A: Essential (prevent bugs / broken behavior) ─────────────

      "vue/no-mutating-props": "error",
      // Disallows directly mutating component props, which breaks Vue's one-way data flow.

      "vue/no-side-effects-in-computed-properties": "error",
      // Disallows side effects (mutations, async calls) inside computed properties,
      // since they should be pure derivations of state.

      "vue/no-async-in-computed-properties": "error",
      // Disallows async functions inside computed properties; use `watch` or composables instead.

      "vue/no-arrow-functions-in-watch": "error",
      // Disallows arrow functions as watch handlers since they don't bind `this`.

      "vue/no-dupe-keys": "error",
      // Disallows duplicate keys across `data`, `computed`, `methods`, etc.

      "vue/no-dupe-v-else-if": "error",
      // Disallows duplicate conditions in a `v-if` / `v-else-if` chain.

      "vue/no-duplicate-attributes": "error",
      // Disallows the same attribute being listed twice on the same element.

      "vue/no-parsing-error": "error",
      // Disallows invalid HTML inside Vue templates that would cause a parse error.

      "vue/no-ref-as-operand": "error",
      // Disallows using a ref object directly in expressions without `.value`,
      // which silently causes reactivity bugs.

      "vue/no-reserved-component-names": "error",
      // Disallows registering components with names that conflict with built-in HTML
      // elements or Vue's own built-in components.

      "vue/no-reserved-keys": "error",
      // Disallows using Vue-reserved keys (e.g. `$data`, `_init`) as data/prop names.

      "vue/no-shared-component-data": "error",
      // Requires the `data` option in components to be a function, not a plain object,
      // so each instance gets its own copy.

      "vue/no-template-key": "error",
      // Disallows putting `:key` directly on `<template>` tags (it has no effect there).

      "vue/no-textarea-mustache": "error",
      // Disallows `{{ }}` mustache syntax inside `<textarea>`, which doesn't work as expected.

      "vue/no-unused-components": "warn",
      // Warns when a component is registered but never used in the template.

      "vue/no-unused-vars": "warn",
      // Warns on variables declared in `v-for` or slot scopes that are never used.

      "vue/no-use-computed-property-like-method": "error",
      // Disallows calling a computed property as a function (`this.myComputed()`),
      // which doesn't work since computed properties are not methods.

      "vue/no-use-v-if-with-v-for": "error",
      // Disallows `v-if` and `v-for` on the same element, as `v-for` takes priority
      // and `v-if` may not behave as expected.

      "vue/no-useless-template-attributes": "error",
      // Disallows attributes on `<template>` tags that have no effect there.

      "vue/no-v-text-v-html-on-component": "warn",
      // Warns when `v-text` or `v-html` is used on a component rather than a native element,
      // since it overrides the component's default slot.

      "vue/require-component-is": "error",
      // Requires `<component>` tags to always have a `:is` binding.

      "vue/require-v-for-key": "error",
      // Requires a `:key` attribute on elements inside `v-for` loops for stable diffing.

      "vue/require-valid-default-prop": "error",
      // Ensures the `default` value of a prop matches its declared type.

      "vue/return-in-computed-property": "error",
      // Requires every code path in a computed property to have a `return` statement.

      "vue/return-in-emits-validator": "error",
      // Requires emits validators to always return a boolean.

      "vue/valid-attribute-name": "error",
      // Disallows invalid characters in attribute names.

      "vue/valid-define-emits": "error",
      // Ensures `defineEmits()` is called correctly (not duplicated, valid syntax).

      "vue/valid-define-props": "error",
      // Ensures `defineProps()` is called correctly (not duplicated, valid syntax).

      "vue/valid-next-tick": "error",
      // Disallows incorrect usages of `nextTick` (e.g. not awaiting it or not using a callback).

      "vue/valid-template-root": "error",
      // Requires the template to have exactly one root element (Vue 2),
      // or disallows invalid root nodes.

      "vue/valid-v-bind": "error",
      // Disallows invalid `v-bind` directive usage (e.g. missing argument without object syntax).

      "vue/valid-v-for": "error",
      // Disallows invalid `v-for` directive usage.

      "vue/valid-v-if": "error",
      // Disallows invalid `v-if` directive usage (e.g. no expression).

      "vue/valid-v-model": "error",
      // Disallows invalid `v-model` usage (e.g. on read-only elements, missing target).

      "vue/valid-v-on": "error",
      // Disallows invalid `v-on` directive usage (e.g. no event name or expression).

      "vue/valid-v-show": "error",
      // Disallows `v-show` with no expression.

      "vue/valid-v-slot": "error",
      // Disallows invalid `v-slot` usage.

      "vue/valid-v-html": "error",
      // Disallows `v-html` with no expression.

      "vue/valid-v-text": "error",
      // Disallows `v-text` with no expression.

      "vue/valid-v-cloak": "error",
      // Disallows `v-cloak` used incorrectly (e.g. with a value).

      "vue/valid-v-else": "error",
      // Disallows `v-else` elements that are missing a preceding `v-if`.

      "vue/valid-v-else-if": "error",
      // Disallows `v-else-if` elements that are missing a preceding `v-if`.

      "vue/valid-v-once": "error",
      // Disallows `v-once` used with a value or in an unsupported context.

      "vue/valid-v-pre": "error",
      // Disallows `v-pre` used with a value.

      // ── Priority A: Essential for Vue 3 ────────────────────────────────────

      "vue/no-deprecated-data-object-declaration": "error",
      // Disallows the Vue 2 style `data: { ... }` object (must be a function in Vue 3).

      "vue/no-deprecated-destroyed-lifecycle": "error",
      // Disallows the removed `beforeDestroy` / `destroyed` hooks; use `beforeUnmount` / `unmounted`.

      "vue/no-deprecated-dollar-listeners-api": "error",
      // Disallows `$listeners` which was removed in Vue 3.

      "vue/no-deprecated-dollar-scopedslots-api": "error",
      // Disallows `$scopedSlots` which was removed in Vue 3; use `$slots` instead.

      "vue/no-deprecated-events-api": "error",
      // Disallows `$on`, `$off`, `$once` which were removed in Vue 3.

      "vue/no-deprecated-filter": "error",
      // Disallows the `|` filter syntax which was removed in Vue 3.

      "vue/no-deprecated-functional-template": "error",
      // Disallows the `functional` attribute on templates, removed in Vue 3.

      "vue/no-deprecated-html-element-is": "error",
      // Disallows the `is` attribute on plain HTML elements (Vue 2 style); use `<component :is>`.

      "vue/no-deprecated-inline-template": "error",
      // Disallows the `inline-template` attribute, removed in Vue 3.

      "vue/no-deprecated-props-default-this": "error",
      // Disallows using `this` inside prop `default` functions (removed in Vue 3).

      "vue/no-deprecated-scope-attribute": "error",
      // Disallows the `scope` attribute on `<template>` (use `v-slot` instead).

      "vue/no-deprecated-slot-attribute": "error",
      // Disallows the `slot` attribute (use `v-slot` instead).

      "vue/no-deprecated-slot-scope-attribute": "error",
      // Disallows the `slot-scope` attribute (use `v-slot` instead).

      "vue/no-deprecated-v-bind-sync": "error",
      // Disallows `.sync` modifier on `v-bind`; use `v-model:propName` in Vue 3.

      "vue/no-deprecated-v-on-native-modifier": "error",
      // Disallows `.native` modifier on `v-on`, which was removed in Vue 3.

      "vue/no-expose-after-await": "error",
      // Disallows calling `defineExpose()` after an `await`, as it won't work correctly.

      "vue/no-lifecycle-after-await": "error",
      // Disallows registering lifecycle hooks after an `await` inside `setup()`.

      "vue/no-watch-after-await": "error",
      // Disallows calling `watch()` after an `await` inside `setup()`, as it won't be cleaned up.

      "vue/prefer-import-from-vue": "error",
      // Enforces importing Vue APIs from `vue` rather than `@vue/runtime-core` etc.

      "vue/valid-define-options": "error",
      // Ensures `defineOptions()` is called correctly (not duplicated, valid syntax).

      "vue/valid-v-memo": "error",
      // Disallows invalid `v-memo` usage (e.g. empty array or no expression).

      // ── Priority B: Strongly recommended ──────────────────────────────────

      "vue/attribute-hyphenation": ["warn", "always"],
      // Enforces kebab-case for attribute names in templates (e.g. `:my-prop` not `:myProp`).

      "vue/component-definition-name-casing": ["warn", "PascalCase"],
      // Enforces PascalCase for component name definitions in the `name` option and `<script setup>`.

      "vue/html-end-tags": "warn",
      // Requires explicit closing tags for non-void HTML elements in templates.

      "vue/no-template-shadow": "error",
      // Disallows variable names in `v-for` or slot scopes that shadow variables
      // from an outer scope, preventing confusing overwrites.

      "vue/prop-name-casing": ["warn", "camelCase"],
      // Enforces camelCase for prop names in component definitions.

      "vue/require-default-prop": "warn",
      // Requires a `default` value for non-required props.

      "vue/require-prop-types": "warn",
      // Requires a `type` declaration for every prop.

      "vue/v-bind-style": ["warn", "shorthand"],
      // Enforces the shorthand `:foo` over `v-bind:foo`.

      "vue/v-on-style": ["warn", "shorthand"],
      // Enforces the shorthand `@click` over `v-on:click`.

      "vue/v-slot-style": ["warn", "shorthand"],
      // Enforces the shorthand `#slotName` over `v-slot:slotName`.

      "vue/require-explicit-emits": "error",
      // Requires all emitted events to be declared in the `emits` option or `defineEmits()`.

      "vue/v-on-event-hyphenation": ["warn", "always"],
      // Enforces kebab-case for custom event names in templates (e.g. `@my-event`).

      // ── Priority C: Recommended ────────────────────────────────────────────

      "vue/attributes-order": "warn",
      // Enforces a consistent order for attributes on elements
      // (e.g. definition → list rendering → conditionals → binding → events → content).

      "vue/block-order": ["warn", { order: ["script", "template", "style"] }],
      // Enforces a consistent block order inside `.vue` files.

      "vue/no-lone-template": "error",
      // Disallows a bare `<template>` wrapper with no directive, since it has no effect.

      "vue/no-multiple-slot-args": "error",
      // Disallows passing more than one argument to a scoped slot (use an object instead).

      "vue/no-v-html": "warn",
      // Warns on `v-html` since it can introduce XSS vulnerabilities if the content is user input.

      "vue/this-in-template": "error",
      // Disallows using `this` inside Vue templates; template context is implicit.

      "vue/no-required-prop-with-default": "warn",
      // Warns when a prop is declared as `required: true` but also has a `default`,
      // which is contradictory.

      // ── Uncategorized / optional but useful ────────────────────────────────

      "vue/multi-word-component-names": "off",
      // Off intentionally: not everything can or should be a multi-word name.

      "vue/html-button-has-type": "error",
      // Requires all `<button>` elements to have an explicit `type` attribute,
      // preventing accidental form submissions (default type is "submit").

      "vue/no-empty-component-block": "warn",
      // Warns on empty `<template>`, `<script>`, or `<style>` blocks.

      "vue/no-ref-object-reactivity-loss": "error",
      // Disallows patterns that cause a ref to lose reactivity, e.g. destructuring it
      // outside of a reactive context.

      "vue/no-setup-props-reactivity-loss": "error",
      // Disallows patterns in `setup()` that cause props to lose their reactivity,
      // such as destructuring props directly.

      "vue/no-template-target-blank": "error",
      // Disallows `target="_blank"` without `rel="noopener noreferrer"` — a tab-napping risk.

      "vue/no-unused-emit-declarations": "warn",
      // Warns on events declared in `emits` or `defineEmits` that are never actually emitted.

      "vue/no-unused-refs": "warn",
      // Warns on template refs (`ref="foo"`) that are defined but never accessed in the script.

      "vue/no-useless-mustaches": "warn",
      // Warns on `{{ 'literal string' }}` mustache expressions that could just be plain text.

      "vue/no-useless-v-bind": "warn",
      // Warns on `:foo="'literal'"` v-bind expressions that could just be static attributes.

      "vue/prefer-define-options": "warn",
      // Prefers `defineOptions()` over the `export default { name, inheritAttrs }` workaround
      // in `<script setup>` files.

      "vue/prefer-true-attribute-shorthand": "warn",
      // Enforces `:foo` shorthand over `:foo="true"` for boolean props.

      "vue/no-child-content": "error",
      // Disallows child content inside elements that have `v-html` or `v-text`,
      // since the directive will overwrite it anyway.

      "vue/no-computed-properties-in-data": "error",
      // Disallows referencing computed properties inside the `data()` function,
      // since computed values aren't available at that point.

      "vue/no-export-in-script-setup": "error",
      // Disallows `export` statements inside `<script setup>`, which is invalid syntax.

      "vue/no-import-compiler-macros": "error",
      // Disallows manually importing compiler macros like `defineProps` or `defineEmits`
      // since they are automatically available inside `<script setup>`.
    },
  },

  // ─── Prettier (disables conflicting ESLint formatting rules — always last) ─
  configPrettier,
]);
