````md id="sonarjs"

# ${\color{gold}\text{SonarJS}}$

[Overview](#overview) •
[ESLint Plugin](#eslint-plugin) •
[VS Code Extension](#vs-code-extension-extension) •
[Standalone Library](#standalone-library) •
[Tool Overlap](#tool-overlap) •
[Recommendation](#recommendation) •
[References](#references)

---

## ${\color{cyan}\text{Overview}}$

SonarJS is a static analysis engine developed by SonarSource for JavaScript and TypeScript.

Unlike traditional linting tools that primarily focus on syntax, style, and common mistakes, SonarJS focuses on:

- Code smells
- Logic bugs
- Security vulnerabilities
- Maintainability issues
- Cognitive complexity

It can be used locally through:

1. ESLint Plugin
2. VS Code Extension (SonarQube for IDE)
3. Standalone NPM Library

No SonarQube Server or SonarCloud account is required for local usage.

---

## ${\color{plum}\text{ESLint Plugin}}$

### Description

`eslint-plugin-sonarjs` integrates SonarJS rules directly into your existing ESLint configuration.

Recommended for most Vue, React, Next.js, and TypeScript projects.

### Useful For

- Legacy codebases
- Large frontend applications
- Reducing technical debt
- Detecting logic mistakes
- Enforcing maintainability standards

### ${\color{lightgreen}\text{Pros}}$

✅ Works directly inside ESLint

✅ Fully local

✅ Flat-config compatible

✅ Vue + TypeScript support

✅ Easy installation

### ${\color{salmon}\text{Cons / Risks}}$

⚠ Large rule set may generate significant noise initially

⚠ Some overlap with `@typescript-eslint`

⚠ Recommended preset can be aggressive on older projects

### Setup

```bash
npm install eslint-plugin-sonarjs --save-dev
````

```js
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  sonarjs.configs.recommended
];
```

---

## ${\color{plum}\text{VS Code Extension}}$

### Description

Formerly SonarLint.

Now known as SonarQube for IDE.

Provides real-time analysis directly inside VS Code.

### Useful For

* Instant feedback
* Editor diagnostics
* Developer onboarding
* Learning Sonar rules

### ${\color{lightgreen}\text{Pros}}$

✅ Issues appear while typing

✅ No server required

✅ Detailed explanations

✅ Security analysis

✅ Free

### ${\color{salmon}\text{Cons / Risks}}$

⚠ Requires Java Runtime (JRE)

⚠ Heavier than ESLint-only setups

⚠ Separate configuration system

⚠ Telemetry enabled by default

---

## ${\color{plum}\text{Standalone Library}}$

### Description

The underlying SonarJS analyzer used by both the ESLint plugin and VS Code extension.

Intended primarily for:

* Custom tooling
* CI integrations
* Internal platforms
* AST-based workflows

### ${\color{lightgreen}\text{Pros}}$

✅ Full analyzer access

✅ Maximum flexibility

### ${\color{salmon}\text{Cons / Risks}}$

⚠ Manual integration required

⚠ Limited practical value for typical frontend projects

⚠ Sparse documentation

---

## ${\color{orange}\text{Tool Overlap}}$

| Concern        | Existing Tool     | SonarJS         |
| -------------- | ----------------- | --------------- |
| Formatting     | Prettier          | No overlap      |
| Type Safety    | TypeScript ESLint | Partial overlap |
| Vue Rules      | eslint-plugin-vue | No overlap      |
| Duplicate Code | jscpd             | Partial overlap |
| Dead Code      | Knip              | No overlap      |

### Where SonarJS Adds Value

* Cognitive Complexity
* Identical Expressions
* Duplicate Branch Detection
* Ignored Return Values
* Security Rules

---

## ${\color{yellow}\text{Recommendation}}$

For a Vue + TypeScript legacy codebase:

1. Install `eslint-plugin-sonarjs`
2. Start with selected rules
3. Use warnings initially
4. Evaluate noise level
5. Gradually increase enforcement

Recommended starter rules:

```js
{
  'sonarjs/cognitive-complexity': ['warn', 15],
  'sonarjs/no-all-duplicated-branches': 'warn',
  'sonarjs/no-identical-expressions': 'warn',
  'sonarjs/no-ignored-return': 'warn'
}
```

---

## ${\color{skyblue}\text{References}}$

<details>
<summary>Documentation & External Resources</summary>

* SonarJS NPM Package
* SonarJS GitHub Repository
* SonarQube for IDE
* Sonar Rule Catalog
* SonarSource Documentation

</details>

```
```
