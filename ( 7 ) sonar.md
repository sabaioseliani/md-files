# ${\color{lightblue}\text{SonarJS}}$

[ESLint Plugin](#eslint-plugin) · [VS Code Extension](#vs-code-extension) · [Standalone Library](#standalone-library)

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
