import { describe, it, expect } from "vitest";

import { NikParser } from "../src/index";
import { GENDER } from "../src/constants/common.constant";
import { ERROR } from "../src/constants/error.constant";

describe("NikParser", () => {
    it("should return valid data for a male NIK", () => {
        const result = NikParser.parse("32 76 01 12 03 02 0001");

        expect(result.isValid).toBe(true);
        expect(result.gender).toBe(GENDER.MALE.code);
        expect(result.birthDate?.getFullYear()).toBe(2002);
        expect(result.birthDate?.getMonth()).toBe(2); // March (0-based)
        expect(result.birthDate?.getDate()).toBe(12);
        expect(result.provinceCode).toBe("32");
        expect(result.cityCode).toBe("76");
        expect(result.districtCode).toBe("01");
        expect(result.serialNumber).toBe("0001");
    });

    it("should return valid data for a female NIK", () => {
        const result = NikParser.parse("32 76 01 52 03 02 0001"); // 12 Maret 2002 perempuan

        expect(result.isValid).toBe(true);
        expect(result.gender).toBe(GENDER.FEMALE.code);
        expect(result.birthDate?.getFullYear()).toBe(2002);
        expect(result.birthDate?.getMonth()).toBe(2);
        expect(result.birthDate?.getDate()).toBe(12);
    });

    it("should mark NIK with invalid format as invalid", () => {
        const result = NikParser.parse("123"); // too short

        expect(result.isValid).toBe(false);
        expect(result.gender).toBe(GENDER.UNKNOWN.code);
        expect(result.birthDate).toBeNull();
    });

    it("should detect invalid date (e.g. 31 Feb)", () => {
        const result = NikParser.parse("3276013102020001"); // 31 Feb → tidak valid

        expect(result.isValid).toBe(false);
        expect(result.birthDate).toBeNull();
    });

    it("isValid() should return correct value", () => {
        expect(NikParser.isValid("3276015203020001")).toBe(true);
        expect(NikParser.isValid("invalid_nik_123")).toBe(false);
    });
    
    it("mask() should mask NIK correctly", () => {
        const masked = NikParser.mask("32 76 01 52 03 02 0001");
        expect(masked).toBe("************0001");
    });

    it("mask() should return error for invalid NIK", () => {
        expect(() => NikParser.mask('invalid-nik')).toThrowError(ERROR.INVALID_NIK_FORMAT.message);
    });
});
