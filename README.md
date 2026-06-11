# nik-utils

[![npm version](https://badge.fury.io/js/nik-utils.svg)](https://badge.fury.io/js/nik-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Parse, validate, mask, and generate Indonesian NIK (Nomor Induk Kependudukan) — with built-in geographic verification against real Indonesian regional data.

## Why

Every Indonesian citizen has a 16-digit national ID number (NIK) that encodes their province, city, district, gender, and birthdate. Validating one correctly means checking not just the format, but whether the embedded date is real and whether the region codes map to an actual place in Indonesia. `nik-utils` handles all of that in a single zero-dependency package that works in Node.js, Next.js, React, Vue, and any browser-based environment.

## Features

- **Parse** a NIK into structured data: gender, birth date, province, city, and district names
- **Validate** deeply — format, date logic, and region authenticity against a built-in Indonesian geographic dataset
- **Mask** a NIK for safe display in logs or UI, exposing only the 4-digit serial number
- **Generate** fully valid, randomized NIKs for testing and database seeding — with optional constraints on gender, birth date, and region
- **Whitespace-tolerant** — strips spaces automatically, so `"32 76 01 12 03 02 0001"` parses cleanly
- **Zero dependencies** — no runtime packages required
- **Isomorphic** — works in Node.js and all modern browsers

## Installation

```bash
npm install nik-utils
# or
yarn add nik-utils
# or
pnpm add nik-utils
```

## Usage

```typescript
import { NikParser, NikGenerator } from 'nik-utils';

// Parse a NIK
const result = NikParser.parse('3276011203020001');
console.log(result);
// {
//   nik: '3276011203020001',
//   isValid: true,
//   gender: 'MALE',
//   birthDate: 2002-03-12T00:00:00.000Z,
//   provinceCode: '32',   provinceName: 'JAWA BARAT',
//   cityCode: '76',       cityName: 'KOTA DEPOK',
//   districtCode: '01',   districtName: 'Pancoran Mas',
//   serialNumber: '0001'
// }

// Validate
NikParser.isValid('3276011203020001'); // true
NikParser.isValid('9999999999999999'); // false

// Mask for safe display
NikParser.mask('3276011203020001'); // '************0001'

// Generate a fully random valid NIK
const nik = NikGenerator.generate();

// Generate with constraints
const customNik = NikGenerator.generate({
  gender: 'FEMALE',
  birthDate: '1995-08-17',  // YYYY-MM-DD
  provinceCode: '32',
  cityCode: '76',
  districtCode: '01',
});
```

## API Reference

### `NikParser.parse(nik: string): ParsedNIK`

Parses a NIK string into structured data. Strips whitespace automatically. Always returns a `ParsedNIK` object — check `isValid` to determine whether the NIK is legitimate.

```typescript
NikParser.parse('3276011203020001');
// → { isValid: true, gender: 'MALE', birthDate: Date, provinceName: 'JAWA BARAT', ... }

NikParser.parse('123'); // too short
// → { isValid: false, gender: 'UNKNOWN', birthDate: null, ... }
```

---

### `NikParser.isValid(nik: string): boolean`

Returns `true` if the NIK passes format, date, and geographic validation.

```typescript
NikParser.isValid('3276011203020001'); // true
NikParser.isValid('9999999999999999'); // false
```

---

### `NikParser.mask(nik: string): string`

Masks the first 12 digits, keeping only the 4-digit serial number visible. Throws if the NIK is invalid.

```typescript
NikParser.mask('3276011203020001'); // '************0001'
NikParser.mask('invalid');          // throws Error('Invalid NIK Format')
```

---

### `NikGenerator.generate(options?: GeneratedNikOptions): string`

Generates a 16-character NIK that passes full validation. All options are optional — omitting any field randomizes that component.

| Option | Type | Description |
|---|---|---|
| `gender` | `'MALE' \| 'FEMALE'` | Encodes gender into the birth day digit |
| `birthDate` | `string` | Birth date in `YYYY-MM-DD` format |
| `provinceCode` | `string` | 2-digit province code |
| `cityCode` | `string` | 2-digit city/regency code |
| `districtCode` | `string` | 2-digit district code |

Throws if the provided region code combination does not exist in Indonesian regional data.

```typescript
NikGenerator.generate();
// → '3201011505900042'  (random each time)

NikGenerator.generate({ gender: 'FEMALE', birthDate: '1990-06-15' });
// → a valid NIK with day digit > 40 and birth year 90
```

---

### `NikGenerator.getRandomBirthDate(): string`

Returns a random date string (`YYYY-MM-DD`) between 17 August 1945 and today.

```typescript
NikGenerator.getRandomBirthDate(); // '1978-04-23'
```

---

### `ParsedNIK` interface

```typescript
interface ParsedNIK {
  nik: string;
  isValid: boolean;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  birthDate: Date | null;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  provinceName: string | null;
  cityName: string | null;
  districtName: string | null;
  serialNumber: string;
}
```

## Contributing

1. Fork the repository and clone it locally
2. Install dependencies: `npm install`
3. Make your changes in `src/`
4. Run the test suite before opening a PR: `npm test`

Bug reports and feature requests are welcome via GitHub Issues.

## License

MIT — see [LICENSE](https://opensource.org/licenses/MIT) for details.
