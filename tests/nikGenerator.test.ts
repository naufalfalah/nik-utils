import { describe, it, expect } from 'vitest';

import { NikGenerator } from '../src/nikGenerator';
import { GENDER } from '../src/constants/common.constant';

describe('NikGenerator', () => {
    it('should generate a valid NIK', () => {
        const options = {
            gender: GENDER.MALE.code,
            birthDate: '1990-05-15',
            provinceCode: '32',
            cityCode: '01',
            districtCode: '01',
        };

        const nik = NikGenerator.generate(options);

        // Assert that the NIK is 16 characters long
        expect(nik).toHaveLength(16);

        // Assert that the NIK is valid
        const parsed = NikGenerator.parse(nik);
        expect(parsed.isValid).toBe(true);
    });

    it('should generate a NIK that can be parsed', () => {
        const options = {
            gender: GENDER.FEMALE.code,
            birthDate: '1985-12-25',
            provinceCode: '32',
            cityCode: '01',
            districtCode: '01',
        };

        const nik = NikGenerator.generate(options);

        // Parse the generated NIK
        const parsed = NikGenerator.parse(nik);

        // Assert that the parsed NIK matches the input options
        expect(parsed.isValid).toBe(true);
        expect(parsed.gender).toBe(GENDER.FEMALE.code);
        expect(parsed.birthDate).toEqual(new Date('1985-12-25'));
    });

    it('should generate a random birth date within the correct range', () => {
        const randomBirthDate = NikGenerator.getRandomBirthDate();

        const start = new Date(1945, 7, 17); // 17 Agustus 1945
        const end = new Date(); // Tanggal hari ini
        const generatedDate = new Date(randomBirthDate);

        // Assert that the random birth date is within the range
        expect(generatedDate >= start).toBe(true);
        expect(generatedDate <= end).toBe(true);
    });

    it('should retry generating NIK if the first one is invalid', () => {
        const options = {
            gender: GENDER.MALE.code,
            birthDate: '2000-01-01',
            provinceCode: '00', // Invalid province code
            cityCode: '00',
            districtCode: '00',
        };

        const nik = NikGenerator.generate(options);

        // Assert that the NIK is valid despite invalid input
        const parsed = NikGenerator.parse(nik);
        expect(parsed.isValid).toBe(true);
    });
});