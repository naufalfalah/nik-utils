# Contributing to nik-utils

Thanks for considering a contribution. This project is small and zero-dependency by design — keep that in mind when proposing changes.

## Getting started

```bash
git clone https://github.com/naufalfalah/nik-utils.git
cd nik-utils
npm install
```

## Development workflow

- Source lives in `src/`; `NikParser` and `NikGenerator` are the two public entry points.
- Run tests: `npm test` (Vitest, watch mode by default; use `npm test -- --run` for a single pass).
- Run the linter: `npm run lint`.
- Build the package: `npm run build` (tsup — emits CJS, ESM, and type declarations to `dist/`).
- Run all three (lint, test, build) before opening a PR — CI runs test and build on every push and PR.

## Making changes

1. Fork the repository and create a branch off `main`.
2. Add or update tests in `tests/` for any behavior change — `NikParser` and `NikGenerator` should stay fully covered.
3. Keep the library dependency-free. If a change seems to need a runtime dependency, open an issue to discuss it first.
4. If you touch region data (`src/data/area.json`), explain the source and how it was derived in the PR description — see the "Data provenance" section in the README for how the original dataset was generated.
5. Update the README's API Reference section if you change a public method's signature or behavior.

## Commit messages

This repo uses short, lowercase, type-prefixed commit messages, e.g.:

```
feature: add district-level validation
fix: correct leap year handling in parser
test: cover generator retry path
chore: bump dependency versions
doc: update API reference
```

## Reporting bugs / requesting features

Open a GitHub Issue with:
- For bugs: the NIK input (or a synthetic equivalent — avoid posting real NIKs), expected vs. actual output, and package version.
- For features: the use case, not just the desired API shape.

## Code of conduct

Be respectful and constructive. Disagreements about implementation are fine; personal attacks are not.
