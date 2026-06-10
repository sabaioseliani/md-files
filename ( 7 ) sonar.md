# ${\color{lightblue}\text{SonarJS}}$

[ESLint Plugin](#eslint-plugin) · [VS Code Extension](#vs-code-extension) · [Standalone Library](#standalone-library) · [What SonarJS Catches Best](#sonarjs-catches) · [Overlap vs. Added Value](#overlap-analysis)

---

# ${\color{lightblue}\text{ESLint Plugin}}$ <a id="eslint-plugin"></a>

## ${\color{lightblue}\text{Description}}$

`eslint-plugin-sonarjs` integrates SonarSource's JavaScript and TypeScript static analysis rules directly into ESLint.

It focuses on identifying code smells, maintainability issues, cognitive complexity, logic bugs, duplicated branches, suspicious expressions, and various security-related patterns that are often not covered by standard ESLint configurations.

As of v2.x, the plugin ships with the full SonarJS rule set and supports modern ESLint Flat Config setups.

It is generally the most practical way to use SonarJS within modern Vue, React, Next.js, and TypeScript projects.

## ${\color{lightgreen}\text{Pros}}$

* Integrates directly into existing ESLint workflows.
* Works with ESLint v8 and v9.
* Fully local analysis.
* Strong support for JavaScript and TypeScript.
* Detects cognitive complexity issues.
* Detects duplicated branches and suspicious logic.
* Works alongside Vue and TypeScript ESLint plugins.
* Easy adoption through recommended configurations.

## ${\color{salmon}\text{Cons}}$

* Can generate a large number of warnings on legacy codebases.
* Some overlap exists with TypeScript ESLint rules.
* Recommended configuration may feel aggressive initially.
* v2 introduced many additional rules compared to earlier releases.
* May require rule tuning to reduce noise.

## ${\color{lightblue}\text{Useful Links}}$ <a id="eslint-plugin-links"></a>

<details>
<summary>📎 Click to expand links</summary>

* https://www.npmjs.com/package/eslint-plugin-sonarjs
* https://github.com/SonarSource/SonarJS

</details>

---

# ${\color{lightblue}\text{VS Code Extension}}$ <a id="vs-code-extension"></a>

## ${\color{lightblue}\text{Description}}$

The SonarQube for IDE extension (formerly SonarLint) provides real-time code analysis directly inside Visual Studio Code.

Issues are displayed while writing code through editor diagnostics and the Problems panel.

The extension runs SonarJS analysis locally and can operate completely offline without requiring a SonarQube server or SonarCloud account.

It supports JavaScript, TypeScript, Vue, Python, Java, C#, PHP, CSS, and additional languages.

## ${\color{lightgreen}\text{Pros}}$

* Real-time feedback while coding.
* No manual lint execution required.
* Detailed explanations for detected issues.
* Supports multiple programming languages.
* Can run entirely locally.
* Free to use.
* Helpful for learning Sonar rules and best practices.

## ${\color{salmon}\text{Cons}}$

* Requires a Java Runtime Environment (JRE).
* Heavier than a simple ESLint extension.
* Uses a separate configuration system from ESLint.
* Telemetry is enabled by default.
* Can feel redundant if ESLint already runs inside the editor.

## ${\color{lightblue}\text{Useful Links}}$ <a id="vs-code-extension-links"></a>

<details>
<summary>📎 Click to expand links</summary>

* https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
* https://github.com/SonarSource/sonarlint-vscode
* https://docs.sonarsource.com/sonarqube-for-ide/vs-code/

</details>

---

# ${\color{lightblue}\text{Standalone Library}}$ <a id="standalone-library"></a>

## ${\color{lightblue}\text{Description}}$

The `sonarjs` package contains the underlying analysis engine used by both the ESLint plugin and the VS Code extension.

Direct usage is primarily intended for custom tooling, internal developer platforms, CI integrations, and advanced static analysis workflows.

Most frontend projects will typically use the ESLint plugin instead of interacting with the library directly.

## ${\color{lightgreen}\text{Pros}}$

* Direct access to the SonarJS analyzer.
* Useful for custom tooling development.
* Can be integrated into specialized CI workflows.
* Does not require ESLint.

## ${\color{salmon}\text{Cons}}$

* Requires manual integration work.
* Not intended for typical frontend projects.
* Sparse documentation compared to plugin usage.
* Significantly more complex than the ESLint integration.

## ${\color{lightblue}\text{Useful Links}}$ <a id="standalone-library-links"></a>

<details>
<summary>📎 Click to expand links</summary>

* https://github.com/SonarSource/SonarJS
* https://rules.sonarsource.com/javascript/

</details>

---

# ${\color{lightblue}\text{What SonarJS Catches Best}}$ <a id="sonarjs-catches"></a>

These are patterns SonarJS is specifically built to detect that standard ESLint (`js.configs.recommended`), `eslint-plugin-vue`, and Prettier will not flag.

---

### Duplicated branches

Every branch does the same thing. ESLint passes this silently.

```js
// ❌ sonarjs/no-all-duplicated-branches
function getLabel(status) {
  if (status === 'active') {
    return 'Active';
  } else {
    return 'Active'; // identical — unreachable distinct logic
  }
}
```

---

### Identical expressions on both sides of an operator

```js
// ❌ sonarjs/no-identical-expressions
if (user.role === user.role) { // always true
  doSomething();
}

const result = value || value; // redundant
```

---

### Ignored return values

Common in Vue components where array methods are called but the result is discarded.

```js
// ❌ sonarjs/no-ignored-return
const items = ['a', 'b', 'c'];
items.filter(i => i !== 'a'); // return value never used — likely a bug
items.map(i => i.toUpperCase()); // same
```

---

### Cognitive complexity

A function that technically lints fine but is deeply nested and hard to maintain.

```js
// ❌ sonarjs/cognitive-complexity (exceeds threshold)
function process(data) {
  if (data) {
    for (const item of data) {
      if (item.active) {
        if (item.type === 'A') {
          if (item.value > 0) {
            return item.value * 2;
          }
        } else if (item.type === 'B') {
          if (item.value < 0) {
            return item.value * -1;
          }
        }
      }
    }
  }
}
```

---

### Collapsible nested ifs

```js
// ❌ sonarjs/no-collapsible-if
if (isLoggedIn) {
  if (hasPermission) { // these two can be &&-collapsed
    proceed();
  }
}
```

---

### Redundant boolean patterns

```js
// ❌ sonarjs/no-redundant-boolean
const isValid = value !== null ? true : false; // just: Boolean(value)

// ❌ sonarjs/prefer-single-boolean-return
function check(x) {
  if (x > 0) {
    return true;
  } else {
    return false; // just: return x > 0
  }
}
```

---

# ${\color{lightblue}\text{Overlap vs. Added Value}}$ <a id="overlap-analysis"></a>


---

### Where SonarJS adds nothing

**Prettier** owns all formatting. SonarJS has zero formatting rules — no conflict, no overlap.

**`js.configs.recommended`** already covers basic correctness errors:

```js
// Already caught — no added value from SonarJS here
const x = undeclaredVariable; // no-undef
if (true) { }                 // no-constant-condition
var a = a;                    // no-self-assign
```

---

### Where SonarJS genuinely adds coverage

These patterns pass `js.configs.recommended` and `eslint-plugin-vue` cleanly but are caught by SonarJS:

```js
// ✅ passes js.configs.recommended — ❌ caught by sonarjs/no-ignored-return
items.map(i => transform(i));

// ✅ passes js.configs.recommended — ❌ caught by sonarjs/no-all-duplicated-branches
if (flag) { return 'x'; } else { return 'x'; }

// ✅ passes js.configs.recommended — ❌ caught by sonarjs/cognitive-complexity
function deeply() { if(a){if(b){if(c){if(d){ return 1; }}}} }

// ✅ passes js.configs.recommended — ❌ caught by sonarjs/no-identical-expressions
const y = someValue && someValue;
```

---

### Where overlap is real but tolerable

Without `@typescript-eslint` rule collision is minimal. What does exist is narrow:

| Pattern | Covered by | SonarJS equivalent |
|---|---|---|
| Unused variables | `js.configs.recommended` (`no-unused-vars`) | Not duplicated |
| Unreachable code | `js.configs.recommended` (`no-unreachable`) | `sonarjs/no-unreachable` — minor overlap |
| Self-comparison | `js.configs.recommended` (`no-self-compare`) | `sonarjs/no-identical-expressions` — partial overlap |

The overlap is narrow enough that duplicate warnings in practice would be rare.

---

### Verdict for your setup

without the use of `@typescript-eslint` (the main source of SonarJS overlap), the ESLint plugin adds genuine non-redundant coverage — particularly `cognitive-complexity`, `no-ignored-return`, `no-all-duplicated-branches`, and `no-identical-expressions`. These are the rules most likely to surface real issues in a legacy Vue codebase.

Recommended starting config — use `warn` instead of the full `sonarjs.configs.recommended` to avoid a flood of errors on existing legacy files:

```js
// eslint.config.js
import { defineConfig } from 'eslint/config';
import sonarjs from 'eslint-plugin-sonarjs';

export default defineConfig([
  // ... your existing config entries
  {
    plugins: { sonarjs },
    rules: {
      'sonarjs/cognitive-complexity': ['warn', 15],
      'sonarjs/no-all-duplicated-branches': 'warn',
      'sonarjs/no-ignored-return': 'warn',
      'sonarjs/no-identical-expressions': 'warn',
      'sonarjs/no-collapsible-if': 'warn',
    },
  },
]);
```

---
