# Prettier

## Description

Prettier is an automated code formatting tool for JavaScript, TypeScript, HTML, CSS, JSON, Markdown, and many other file formats commonly used in modern frontend projects.

Its purpose is to enforce consistent code formatting automatically across an entire project. Instead of manually deciding formatting styles such as spacing, indentation, line wrapping, semicolon usage, or quote styles, Prettier formats code according to a standardized ruleset.

Prettier focuses on formatting consistency rather than code correctness or code quality analysis. It is commonly used together with tools such as ESLint.

Automated formatting helps reduce formatting-related discussions, improves readability consistency across teams and files, and simplifies long-term maintenance.

## Pros

- Provides consistent formatting across the entire codebase.
- Reduces formatting-related inconsistencies between files and contributors.
- Improves readability and visual consistency.
- Removes the need for manual formatting decisions.
- Can automatically format many file types commonly used in frontend projects.
- Integrates well with modern editors, CI pipelines, Git hooks, and ESLint setups.
- Helps reduce noise in Git diffs caused by inconsistent formatting.
- Simplifies onboarding and collaboration in larger projects.
- Widely adopted and actively maintained within the JavaScript ecosystem.

## Cons / Risks

- May conflict with existing formatting preferences or coding styles.
- Initial adoption can create very large formatting-related Git diffs.
- Some developers may dislike opinionated formatting decisions.
- Requires configuration coordination with ESLint to avoid rule conflicts.
- Automatic formatting can occasionally reduce readability in edge cases.
- Existing legacy codebases may require gradual adoption strategies.

## Common Usage

Prettier is commonly installed as a development dependency and integrated into:

- Editor auto-formatting.
- ESLint configurations.
- Git pre-commit hooks.
- CI formatting checks.
- Package.json formatting scripts.

