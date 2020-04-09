# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/angeloashmore/react-lunr/compare/v0.5.0...v1.0.0) (2020-04-09)


### ⚠ BREAKING CHANGES

* The Lunr component has been removed. It was limited in
functionality and relied on some React anti-patterns.

If you are using a React version >= 16.8, migrating from the Lunr
component to the `useLunr` hook is highly recommended.

If you cannot convert to the hook, please lock your version of this
package to your currently installed version.

### Features

* allow direct object arguments ([187f21b](https://github.com/angeloashmore/react-lunr/commit/187f21b305ae2f324220c4b1dee1a878b170d45a))
* allow direct object props ([ecc2099](https://github.com/angeloashmore/react-lunr/commit/ecc209937c83145feeeb261ef863cf4b6cfc30d3))
* convert to TypeScript ([#6](https://github.com/angeloashmore/react-lunr/issues/6)) ([25dc3e9](https://github.com/angeloashmore/react-lunr/commit/25dc3e90fa7cc555d1ccde10e1c58dd599788604))
