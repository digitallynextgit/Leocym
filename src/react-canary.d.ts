/**
 * Switches on the React canary type declarations for the whole project.
 *
 * The App Router runs on a React canary build - Next bundles it, we do not
 * install it - so `<ViewTransition>` exists at runtime but is declared in
 * @types/react's `canary.d.ts`, which is off by default.
 *
 * A triple-slash reference rather than `import {} from "react/canary"` inside
 * the component that needs it: that import form is erased by TypeScript but
 * NOT by the bundler, which tries to resolve a module that has no runtime
 * counterpart and fails the build. This file has no emit and no resolution.
 *
 * It is not listed in tsconfig's `types` array because setting that array at
 * all would switch off automatic @types inclusion for everything else.
 */

/// <reference types="react/canary" />
