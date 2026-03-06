# 🇮🇩 NIK Utils

[![npm version](https://badge.fury.io/js/nik-utils.svg)](https://badge.fury.io/js/nik-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**NIK Utils** is a lightweight, zero-dependency, and isomorphic (Node.js & Browser compatible) TypeScript utility library that helps you validate, parse, mask, and generate Indonesian NIK (Nomor Induk Kependudukan) — the official 16-digit identification number.

It includes a highly accurate, built-in directory of Indonesian regions (Provinces, Regencies/Cities, and Districts) to ensure that the NIKs actually map to real, legitimate geographic areas.

---

## ✨ Features

- 🧠 **Parse NIK**: Extract gender, birth date, and precise region names (Province, City, District).
- ✅ **Deep Validation**: Validates format, birthdate logic, and checks region codes against genuine Indonesian regional data.
- 🔒 **Mask NIKs**: Securely mask NIK strings for logging or UI display.
- 🎲 **Generate Valid NIKs**: Generate random yet 100% valid NIKs for testing and database seeding purposes.
- 🌐 **Isomorphic**: Runs perfectly on server environments (Node.js) and client web frameworks (Next.js, React, Vue, Vite, etc).

---

## 📥 Installation

```bash
npm install nik-utils
# or
yarn add nik-utils
# or
pnpm add nik-utils
```

---

## 🚀 Usage

### 1. Parsing a NIK (`NikParser.parse`)

Extract comprehensive information from a given NIK string. It ignores whitespaces automatically.

```typescript
import { NikParser } from 'nik-utils';

const parsed = NikParser.parse('3276011203020001');
console.log(parsed);

/*
Output:
{
  nik: '3276011203020001',
  isValid: true,
  gender: 'MALE', 
  birthDate: 2002-03-12T00:00:00.000Z, // Date Object
  provinceCode: '32',
  cityCode: '76',
  districtCode: '01',
  provinceName: 'JAWA BARAT',
  cityName: 'KOTA DEPOK',
  districtName: 'Pancoran Mas',
  serialNumber: '0001'
}
*/
```

### 2. Validating a NIK (`NikParser.isValid`)

Simply returns a boolean indicating whether the NIK is valid. It verifies length, algorithmic date correctness, and region authenticity.

```typescript
import { NikParser } from 'nik-utils';

const isValid = NikParser.isValid('3276011203020001'); // true
const isFake = NikParser.isValid('9999999999999999'); // false
```

### 3. Masking a NIK (`NikParser.mask`)

Masks the first 12 digits, exposing only the 4-digit serial number. Throws an error if the NIK format is invalid.

```typescript
import { NikParser } from 'nik-utils';

const masked = NikParser.mask('3276011203020001'); 
// "************0001"
```

### 4. Generating a NIK (`NikGenerator.generate`)

Generates a fully valid, randomized NIK. Extremely useful for unit testing or seeding dummy data. You can pass options, or let it fully randomize everything (including a valid geographical area).

```typescript
import { NikGenerator } from 'nik-utils';

// Fully random NIK
const randomNik = NikGenerator.generate();

// Generate NIK with specific criteria
const customNik = NikGenerator.generate({
    gender: 'FEMALE',       // 'FEMALE' or 'MALE'
    birthDate: '1995-08-17',    // YYYY-MM-DD format
    provinceCode: '32',         // Jawa Barat
    cityCode: '76',             // Kota Depok
    districtCode: '01',         // Pancoran Mas
});
```

> **Note:** If you pass specific region codes, they must be a valid combination in Indonesia, otherwise the generator will throw an error to prevent generating broken NIKs.

---

## 🏗️ Return Types

**`ParsedNIK`**
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

---

## 🧑‍💻 Contributing

Contributions are welcome! If you find bugs or have feature requests, feel free to open an issue or submit a pull request on the repository.

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests before submitting PR: `npm run test`

## 📄 License

This project is licensed under the MIT License.
