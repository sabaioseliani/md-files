# ${\color{lightblue}\text{Refactoring Infrastructure}}$

[Description](#description) · [Reusable Vue Composables](#reusable-vue-composables) · [Centralized State Management](#centralized-state-management) · [Query-Based Data Management](#query-based-data-management) · [Reusable Infrastructure and Abstractions](#reusable-infrastructure-and-abstractions) · [Component Extraction](#component-extraction) · [Code Generation and Templates](#code-generation-and-templates) · [Storybook and Isolated Component Development](#storybook-and-isolated-component-development) · [JSDoc for Utilities and Composables](#jsdoc-for-utilities-and-composables) · [Project Structure and Architectural Cleanup](#project-structure-and-architectural-cleanup) · [Code Splitting and Lazy Loading](#code-splitting-and-lazy-loading) · [Duplicate Detection and Copy-Paste Analysis](#duplicate-detection-and-copy-paste-analysis) · [Dead Code and Unused Export Detection](#dead-code-and-unused-export-detection) · [Structural Code Search](#structural-code-search) · [Automated Codebase Transformations](#automated-codebase-transformations) · [Path Aliases](#path-aliases) · [Recommended Approach](#recommended-approach) · [Post-Refactoring Verification](#post-refactoring-verification) · [Useful Links](#useful-links)

-----

## ${\color{lightblue}\text{Description}}$ <a id="description"></a>

As frontend applications grow, repeated logic, fragmented state handling, inconsistent architectural patterns, duplicated asynchronous workflows, and ad-hoc implementations gradually increase maintenance difficulty over time.

Refactoring infrastructure focuses on improving long-term maintainability, reducing duplication, simplifying future development, and making architectural patterns more consistent without changing intended application behavior.

The goal is not to rewrite the application unnecessarily, but to improve the surrounding systems, abstractions, workflows, organizational consistency, and reusable infrastructure that the application depends on.

## ${\color{plum}\text{Reusable Vue Composables}}$ <a id="reusable-vue-composables"></a>

Composable-based architecture helps reduce repeated reactive logic, centralize reusable frontend behavior, coordinate shared workflows, and keep component implementations smaller and easier to reason about as applications grow.

This becomes increasingly useful once similar reactive patterns begin appearing repeatedly across multiple parts of the application.

### ${\color{lightgreen}\text{Pros}}$

- Reduces duplicated reactive logic.
- Improves separation between logic and rendering.
- Keeps components smaller and easier to maintain.
- Encourages reusable frontend workflows.
- Makes repeated behavior easier to standardize.
- Helps reduce repeated watcher/computed/ref orchestration.

### ${\color{salmon}\text{Cons / Risks}}$

- Overly generic composables can become difficult to understand.
- Excessive abstraction may reduce readability instead of improving it.
- Poorly scoped composables can accidentally create tightly coupled logic.

## ${\color{plum}\text{Centralized State Management}}$ <a id="centralized-state-management"></a>

Centralized state management becomes increasingly useful once frontend applications begin accumulating repeated reactive state handling, deeply nested prop passing, synchronized client-side workflows, persistence requirements, or coordinated asynchronous behavior.

Even when application state is not heavily global, centralizing reactive orchestration outside of page-level components can still improve readability, organization, and long-term maintainability by separating state coordination from rendering logic.

This also helps reduce prop drilling scenarios where parent and descendant components require access to the same state while intermediate layers do not.

When combined with persistence layers and query-management systems such as Pinia Colada, centralized state systems can also help standardize caching, synchronization, invalidation, persisted client-side state, and repeated asynchronous workflows.

### ${\color{lightgreen}\text{Pros}}$

- Centralizes reactive state orchestration.
- Improves readability by reducing large page-level reactive declarations.
- Reduces prop drilling between distant component layers.
- Improves consistency across related workflows.
- Simplifies persisted client-side state handling.
- Helps reduce localStorage synchronization and race-condition issues.
- Helps coordinate asynchronous flows more consistently.
- Integrates naturally with query-management systems.
- Improves debugging visibility through centralized state inspection.
- Helps separate state coordination from rendering concerns.

### ${\color{salmon}\text{Cons / Risks}}$

- Over-centralization can make state ownership harder to reason about.
- Not all local component state belongs in shared stores.
- Poorly organized stores can gradually become overly large or tightly coupled.
- Excessive cross-store dependencies can reduce maintainability.

## ${\color{plum}\text{Query-Based Data Management}}$ <a id="query-based-data-management"></a>

As applications grow, repeated asynchronous request handling often creates duplicated loading states, caching logic, refresh logic, invalidation behavior, synchronization concerns, and repeated request orchestration patterns.

Query-based data management helps standardize server-state handling and reduce repeated asynchronous infrastructure throughout the application.

This becomes especially useful once asynchronous flows repeatedly require post-mutation refreshes, cache invalidation, optimistic updates, deduplicated requests, or synchronized refresh behavior.

### ${\color{lightgreen}\text{Pros}}$

- Reduces repeated request boilerplate.
- Standardizes loading and error handling patterns.
- Improves caching and request synchronization.
- Simplifies refresh and invalidation flows.
- Helps separate server state from local UI state.
- Reduces repeated manual post-request refresh logic.
- Helps coordinate asynchronous workflows more consistently.
- Simplifies repeated create/update/delete synchronization patterns.

### ${\color{salmon}\text{Cons / Risks}}$

- Adds another architectural layer to understand.
- Smaller applications may not require dedicated query abstractions.
- Poor cache invalidation strategies can create stale-state issues.

## ${\color{plum}\text{Reusable Infrastructure and Abstractions}}$ <a id="reusable-infrastructure-and-abstractions"></a>

Repeated implementation patterns often indicate opportunities for reusable infrastructure rather than repeatedly rebuilding similar systems with slightly different implementations.

This can include reusable workflows, configuration-driven systems, repeated interaction patterns, shared rendering logic, reusable asynchronous flows, and common application behaviors.

### ${\color{lightgreen}\text{Pros}}$

- Reduces repeated implementation patterns.
- Improves consistency across the application.
- Centralizes repeated logic and workflows.
- Simplifies future feature development.
- Makes repeated systems easier to maintain long-term.
- Helps standardize implementation approaches.

### ${\color{salmon}\text{Cons / Risks}}$

- Over-generalized abstractions can become harder to maintain than direct implementations.
- Flexible edge cases still require escape hatches.
- Excessive abstraction layers may reduce code discoverability.

## ${\color{plum}\text{Component Extraction}}$ <a id="component-extraction"></a>

As frontend systems evolve, repeated visual structures and interaction patterns can gradually be consolidated into reusable components with shared behavior and styling conventions.

This improves consistency while reducing duplicated implementation effort.

### ${\color{lightgreen}\text{Pros}}$

- Improves visual consistency.
- Reduces repeated template code.
- Centralizes shared UI behavior.
- Simplifies maintenance of repeated interface patterns.
- Encourages cleaner separation of responsibilities.
- Makes repeated interaction patterns easier to standardize.

### ${\color{salmon}\text{Cons / Risks}}$

- Excessive component fragmentation can reduce readability.
- Components require carefully designed APIs to remain flexible.
- Deeply nested abstraction layers can become difficult to trace.

## ${\color{plum}\text{Code Generation and Templates}}$ <a id="code-generation-and-templates"></a>

Projects that repeatedly create similar modules, composables, utilities, stores, components, or architectural patterns can benefit from automated code generation and reusable templates.

This helps reduce repetitive setup work while improving implementation consistency across the project.

### ${\color{lightgreen}\text{Pros}}$

- Reduces repetitive boilerplate creation.
- Improves consistency across generated structures.
- Speeds up repetitive development workflows.
- Helps enforce architectural conventions.
- Reduces copy-paste mistakes.
- Makes repeated implementation patterns easier to standardize.

### ${\color{salmon}\text{Cons / Risks}}$

- Templates require maintenance as conventions evolve.
- Poor templates can reproduce poor implementation patterns repeatedly.
- Excessive generation can encourage unnecessary abstraction.

## ${\color{plum}\text{Storybook and Isolated Component Development}}$ <a id="storybook-and-isolated-component-development"></a>

As reusable UI systems grow, isolated component development and documentation workflows become increasingly useful for maintaining consistency, testing variations, and improving collaboration around shared interface systems.

### ${\color{lightgreen}\text{Pros}}$

- Improves reusable component documentation.
- Simplifies isolated component testing.
- Makes UI variants easier to review.
- Helps standardize shared design systems.
- Improves collaboration around reusable components.
- Encourages reusable UI architecture.

### ${\color{salmon}\text{Cons / Risks}}$

- Adds additional setup and maintenance overhead.
- Smaller projects may not benefit significantly from dedicated component workshop tooling.
- Component examples can drift away from real application behavior if not maintained.

## ${\color{plum}\text{JSDoc for Utilities and Composables}}$ <a id="jsdoc-for-utilities-and-composables"></a>

As utility layers and composable systems grow, selectively documenting reusable logic can improve readability and maintainability without requiring excessive inline explanation throughout the codebase.

JSDoc is especially useful for JavaScript utility functions and Vue composables where behavior, arguments, or return structures may not be immediately obvious.

### ${\color{lightgreen}\text{Pros}}$

- Improves readability of reusable logic.
- Helps clarify composable behavior and utility usage.
- Improves editor hover documentation and hints.
- Helps communicate intent for reusable abstractions.
- Useful for functions with non-obvious behavior.

### ${\color{salmon}\text{Cons / Risks}}$

- Excessive documentation can create visual noise.
- Documentation can become outdated if not maintained.
- Over-documenting obvious behavior reduces usefulness.

## ${\color{plum}\text{Project Structure and Architectural Cleanup}}$ <a id="project-structure-and-architectural-cleanup"></a>

As projects evolve, routes, folders, modules, naming conventions, and architectural boundaries may gradually drift away from how the application is conceptually organized.

Refactoring structural organization helps restore consistency between architecture, workflows, and implementation patterns.

### ${\color{lightgreen}\text{Pros}}$

- Improves architectural clarity.
- Simplifies project navigation.
- Better separates responsibilities between modules.
- Reduces structural inconsistencies over time.
- Improves long-term maintainability.
- Makes application boundaries easier to reason about.

### ${\color{salmon}\text{Cons / Risks}}$

- Structural refactors can affect imports, routing, and deployment assumptions.
- Existing integrations may require careful migration.
- Large structural changes may temporarily reduce development velocity.

## ${\color{plum}\text{Code Splitting and Lazy Loading}}$ <a id="code-splitting-and-lazy-loading"></a>

As frontend bundles grow larger, selectively loading application code only when required can improve loading performance and reduce unnecessary upfront resource usage.

Modern tooling ecosystems such as Vite provide native support for these optimization patterns.

### ${\color{lightgreen}\text{Pros}}$

- Reduces initial bundle size.
- Improves perceived loading performance.
- Allows applications to load functionality incrementally.
- Works well with route-level and feature-level splitting.
- Helps optimize large frontend applications.

### ${\color{salmon}\text{Cons / Risks}}$

- Excessive fragmentation can complicate loading behavior.
- Smaller applications may not benefit significantly from manual optimization.
- Poor split boundaries can reduce caching efficiency.

-----

## ${\color{plum}\text{Duplicate Detection and Copy-Paste Analysis}}$ <a id="duplicate-detection-and-copy-paste-analysis"></a>

In projects where the DRY principle has been consistently broken over time, duplicate logic may be spread across dozens of files without any clear inventory of where repetition exists or how severe it is.

Duplicate detection tooling generates reports that map exactly which blocks of code are duplicated, how many times, and across which files — giving a prioritized starting point for extraction rather than relying on manual code reading.

### jscpd

**jscpd** (JavaScript Copy-Paste Detector) is the primary tool for this. It supports Vue single-file components natively and produces HTML reports showing duplicated blocks side by side with file paths and line numbers.

```bash
npx jscpd src/ --reporters html --output report/
```

This should be run once at the start of any refactoring effort to produce a full duplication map. The highest-duplication functions become the first candidates for composable or utility extraction. Re-running after each round of extraction measures concrete progress.

Additional useful flags:

```bash
# Set a minimum token threshold to avoid flagging trivial matches
npx jscpd src/ --min-tokens 50 --reporters html --output report/

# Ignore specific folders
npx jscpd src/ --ignore "src/vendor/**" --reporters html --output report/
```

### ${\color{lightgreen}\text{Pros}}$

- Makes the full scope of duplication visible immediately without manually reading files.
- Prioritizes what to extract first based on actual data rather than guesswork.
- Produces shareable HTML reports useful for team alignment.
- Supports Vue SFCs, JS, and TS out of the box.
- Helps measure improvement over time by re-running after extractions.
- Low effort — runs without any configuration changes to the project.
- Configurable minimum token threshold avoids noise from trivial matches.

### ${\color{salmon}\text{Cons / Risks}}$

- Reports duplication structurally, not semantically — similar logic with different variable names may not always be flagged.
- Requires human judgment to determine which duplicates are worth extracting.
- Does not suggest where to move extracted code, only where duplication exists.

-----

## ${\color{plum}\text{Dead Code and Unused Export Detection}}$ <a id="dead-code-and-unused-export-detection"></a>

In large projects with years of accumulated copy-paste patterns, not all duplicated code is even actively used. Dead files, unused exports, and unimported utilities add to the apparent complexity of the codebase and make it harder to reason about what actually matters.

Removing dead code before refactoring reduces the surface area that needs to be understood and extracted, and prevents wasted effort on consolidating logic that nothing depends on.

### Knip

**Knip** is the recommended tool for this. It statically analyzes the entire project and produces a report of unused exports, unused files, unused dependencies, and unresolved imports. It has Vue support and understands modern module resolution.

```bash
npx knip
```

Knip produces a structured report grouping issues by category — unused files, unused exports, unlisted dependencies — making it straightforward to decide what to delete before beginning extraction work.

### unimported

**unimported** is a focused alternative that specifically identifies files that are never imported anywhere in the project. It is simpler than Knip and faster to run, but covers a narrower scope.

```bash
npx unimported
```

Useful as a quick first pass to identify entirely orphaned files before running a more comprehensive Knip analysis.

### ${\color{lightgreen}\text{Pros}}$

- Reduces refactoring surface area by removing code that doesn’t need to be touched at all.
- Prevents wasted effort consolidating logic that nothing actually uses.
- Identifies orphaned files that have been forgotten and accumulate silently over time.
- Helps shrink bundle size as a side effect of removal.
- Knip covers unused exports, files, and dependencies in a single report.
- unimported is fast and zero-config for a quick initial pass.

### ${\color{salmon}\text{Cons / Risks}}$

- Dynamic imports and runtime-constructed module paths can produce false positives.
- Requires verification before deletion — not all flagged exports are necessarily safe to remove.
- Entry points and externally consumed exports need to be configured to avoid incorrect reports.

-----

## ${\color{plum}\text{Structural Code Search}}$ <a id="structural-code-search"></a>

Before refactoring a duplicated function, it is necessary to find every location in the codebase where that function or pattern appears — not just by name, but by structure. Text-based search with grep misses variations in spacing, variable naming, and formatting. Structural search understands the code as syntax rather than text.

### ast-grep

**ast-grep** (`sg`) searches and optionally rewrites code using AST (Abstract Syntax Tree) pattern matching. This means it finds all usages of a pattern regardless of variable name variations, whitespace, or minor structural differences — something grep fundamentally cannot do.

Finding all arrow functions that call a specific pattern:

```bash
sg --pattern 'const $FUNC = () => { $$$BODY }' --lang js src/
```

Finding all places a specific function signature is used:

```bash
sg --pattern 'fetchUserData($ARG)' --lang js src/
```

This is especially useful before extracting a composable — running a structural search first gives a complete list of every file that will need to be updated after extraction, preventing missed replacements.

ast-grep also supports rewrite rules, allowing bulk replacement of a pattern with a new form across the whole codebase in a single command.

### ${\color{lightgreen}\text{Pros}}$

- Finds all usages of a code pattern structurally, not just textually.
- Works despite variable name differences, whitespace variations, and minor formatting differences.
- Supports rewrite rules for bulk replacement across the entire codebase.
- Significantly faster than jscodeshift for simple find-and-replace transformations.
- Helps produce a complete impact list before starting any extraction.
- Supports JS, TS, Vue, and other languages.

### ${\color{salmon}\text{Cons / Risks}}$

- Pattern syntax has a learning curve compared to plain grep.
- Complex patterns can be harder to express than simple text searches.
- Rewrite rules require careful testing before running across a large codebase.

-----

## ${\color{plum}\text{Automated Codebase Transformations}}$ <a id="automated-codebase-transformations"></a>

Once a duplicated function has been identified and its extraction target decided, manually updating every file that contains a copy is slow, error-prone, and easy to miss. Codemod tooling automates these bulk transformations by operating on the AST directly, making changes that are structurally correct rather than text-substitution-based.

### jscodeshift

**jscodeshift** is the standard tool for writing and running codemods — programmatic transformations that modify JavaScript and Vue files based on AST patterns. A codemod is a script that finds a pattern and replaces it with something else, run across every matching file in the project at once.

Example use cases for a copy-paste-heavy project:

- Replace every inline copy of a utility function with an import and call to the extracted version
- Add a missing import statement to every file that uses a composable
- Rename a function across all files simultaneously
- Convert repeated inline patterns to use a shared abstraction

Running a codemod:

```bash
npx jscodeshift -t my-transform.js src/
```

Codemods are especially powerful when combined with ast-grep — use ast-grep to confirm the full list of files affected, then write a jscodeshift transform to update all of them at once.

### ${\color{lightgreen}\text{Pros}}$

- Automates bulk changes that would take hours to do manually across many files.
- Operates on AST rather than text, so transformations are structurally correct.
- Can handle variable name differences and formatting variations that text replace cannot.
- Prevents missed replacements that cause subtle bugs after extraction.
- Reusable — the same transform can be run again if the pattern reappears.
- Community codemod library available for common migration patterns.

### ${\color{salmon}\text{Cons / Risks}}$

- Writing transforms requires understanding the AST structure of the code being changed.
- Incorrectly written transforms can silently produce malformed output.
- Transforms must be tested on a small subset of files before running across the entire project.
- Higher upfront investment than manual editing for simple one-off changes.

-----

## ${\color{plum}\text{Path Aliases}}$ <a id="path-aliases"></a>

Configuring a `@/` path alias in `vite.config.js` or `vue.config.js` replaces relative import chains like `../../../composables/useSomething` with `@/composables/useSomething`. This makes imports resilient to file moves during refactoring and significantly easier to read across large files.

-----

## ${\color{gold}\text{Recommended Approach}}$ <a id="recommended-approach"></a>

- Prioritize reducing repeated infrastructure before rewriting major features.
- Start with the most duplicated logic and architectural patterns first.
- Run **jscpd** once at the start to produce a full duplication map and prioritize extraction targets.
- Run **Knip** or **unimported** to remove dead code before beginning extraction work.
- Use **ast-grep** to find every usage of a pattern before extracting it, so no replacements are missed.
- Use **jscodeshift** to automate bulk replacements after extraction rather than updating files manually.
- Prefer incremental refactoring over full rewrites whenever possible.
- Introduce abstractions only when repeated patterns are genuinely established.
- Keep reusable systems flexible instead of excessively generic.
- Use centralized state management when it improves organization, readability, synchronization, or state orchestration rather than only for heavily global state.
- Standardize asynchronous workflows where repetition becomes common.
- Use code generation for repeated implementation patterns rather than repeated manual setup.
- Continuously validate that abstractions reduce complexity rather than hiding it.

## ${\color{gold}\text{Post-Refactoring Verification}}$ <a id="post-refactoring-verification"></a>

- Existing application behavior remains unchanged.
- Shared abstractions remain understandable and maintainable.
- Refactored systems still support necessary flexibility.
- Architectural consistency improves rather than becoming more fragmented.
- Development workflows become simpler rather than more complicated.
- Reusable systems genuinely reduce duplication and maintenance overhead.
- Refactoring improves readability rather than introducing unnecessary abstraction layers.
- Re-running jscpd after each extraction round confirms measurable reduction in duplication.

## ${\color{lightblue}\text{Useful Links}}$ <a id="useful-links"></a>

<details>
<summary>📎 Vue and Composables</summary>

- [Vue Composables](https://vuejs.org/guide/reusability/composables)
- [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq)

</details>

<details>
<summary>📎 State Management</summary>

- [Pinia Official Website](https://pinia.vuejs.org/)
- [Pinia Introduction](https://pinia.vuejs.org/introduction.html)
- [Pinia Core Concepts](https://pinia.vuejs.org/core-concepts/)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)

</details>

<details>
<summary>📎 Query / Server State Management</summary>

- [Pinia Colada Quick Start](https://pinia-colada.esm.dev/quick-start.html)
- [Pinia Colada Queries](https://pinia-colada.esm.dev/guide/queries.html)
- [Pinia Colada GitHub](https://github.com/posva/pinia-colada)

</details>

<details>
<summary>📎 Code Generation</summary>

- [Hygen GitHub](https://github.com/jondot/hygen)
- [Hygen Documentation](https://www.hygen.io/)

</details>

<details>
<summary>📎 Component Documentation</summary>

- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook for Vue and Vite](https://storybook.js.org/docs/get-started/frameworks/vue3-vite)

</details>

<details>
<summary>📎 JSDoc</summary>

- [JSDoc Official Website](https://jsdoc.app/)

</details>

<details>
<summary>📎 Duplicate Detection</summary>

- [jscpd GitHub](https://github.com/kucherenko/jscpd)

</details>

<details>
<summary>📎 Dead Code Detection</summary>

- [Knip GitHub](https://github.com/webpro/knip)
- [Knip Documentation](https://knip.dev/)
- [unimported GitHub](https://github.com/smeijer/unimported)

</details>

<details>
<summary>📎 Structural Code Search</summary>

- [ast-grep GitHub](https://github.com/ast-grep/ast-grep)
- [ast-grep Documentation](https://ast-grep.github.io/)

</details>

<details>
<summary>📎 Automated Codemods</summary>

- [jscodeshift GitHub](https://github.com/facebook/jscodeshift)
- [jscodeshift Codemods Collection](https://github.com/codemod-com/codemod-registry)

</details>