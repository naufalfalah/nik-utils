# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.2] - 2026-03-06

### Added
- `LICENSE` file (MIT).
- CI via GitHub Actions (`.github/workflows/ci.yml`): runs `npm test` and `npm run build` on every push and pull request, with a status badge in the README.
- `CONTRIBUTING.md` with setup, development workflow, and commit message conventions.
- **Key Technical Decisions** section in the README covering the `parse()`/`mask()` error-handling asymmetry, the retry-on-invalid approach in `NikGenerator.generate()`, and the in-memory region data structure.
- **Data provenance** section in the README documenting how `src/data/area.json` was generated.

### Changed
- Rewrote the README with full API reference documentation, usage examples, and feature list.

### Removed
- `base.csv` and `convert.js` from the repository root — both were one-time inputs already used to generate `src/data/area.json` and aren't needed at runtime or build time.

## [1.0.1] - 2026-03-06

### Added
- Full Indonesian administrative region dataset (`src/data/area.json`), generated from a raw CSV of provinces, cities/regencies, and districts.
- Geographic validation: `NikParser.parse()` now checks that the province/city/district codes embedded in a NIK correspond to a real region, in addition to date validation.
- `provinceName`, `cityName`, and `districtName` fields on the `ParsedNIK` result.
- `NikGenerator.generate()` now defaults to a random *valid* region code combination (via `getRandomValidAreaCode()`) instead of a hardcoded `'00'`, and validates any region codes passed in via options, throwing on an invalid combination.

### Changed
- `NikParser.parse()`'s `isValid` now reflects both date validity and region validity.

## [1.0.0] - 2025-07-01

### Added
- Initial release: `NikParser` (`parse`, `isValid`, `mask`, `normalize`) and `NikGenerator` (`generate`, `getRandomBirthDate`).
- Zero-dependency, isomorphic NIK parsing, format/date validation, masking, and randomized generation with optional gender/birth date/region constraints.

[Unreleased]: https://github.com/naufalfalah/nik-utils/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/naufalfalah/nik-utils/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/naufalfalah/nik-utils/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/naufalfalah/nik-utils/releases/tag/v1.0.0
