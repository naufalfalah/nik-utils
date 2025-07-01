import { GENDER } from "./constants/common.constant";
import { ERROR } from "./constants/error.constant";

export interface ParsedNIK {
    nik: string;
    isValid: boolean;
    gender: keyof typeof GENDER;
    birthDate: Date | null;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    serialNumber: string;
}

export class NikParser {
    static normalize(nik: string): string {
        return nik.replace(/\s+/g, '');
    }

    static parse(nik: string): ParsedNIK {
        const cleaned = this.normalize(nik);
        if (!/^\d{16}$/.test(cleaned)) {
            return {
                nik: cleaned,
                isValid: false,
                gender: GENDER.UNKNOWN.code,
                birthDate: null,
                provinceCode: "",
                cityCode: "",
                districtCode: "",
                serialNumber: "",
            };
        }

        const provinceCode = cleaned.slice(0, 2);
        const cityCode = cleaned.slice(2, 4);
        const districtCode = cleaned.slice(4, 6);

        const birth = cleaned.slice(6, 12);
        const serialNumber = cleaned.slice(12, 16);

        const day = parseInt(birth.slice(0, 2), 10);
        const isFemale = day > 40;
        const actualDay = isFemale ? day - 40 : day;

        const month = parseInt(birth.slice(2, 4), 10);
        const year = parseInt(birth.slice(4, 6), 10);

        const currentYear = new Date().getFullYear();
        const currentYearLastTwoDigits = currentYear % 100;
        const fullYear = year <= currentYearLastTwoDigits ? 2000 + year : 1900 + year;

        const birthDate = new Date(Date.UTC(fullYear, month - 1, actualDay));
        const isValidDate =
            birthDate.getFullYear() === fullYear &&
            birthDate.getMonth() === month - 1 &&
            birthDate.getDate() === actualDay;

        return {
            nik: cleaned,
            isValid: isValidDate,
            gender: isFemale ? GENDER.FEMALE.code : GENDER.MALE.code,
            birthDate: isValidDate ? birthDate : null,
            provinceCode,
            cityCode,
            districtCode,
            serialNumber,
        };
    }

    static isValid(nik: string): boolean {
        return this.parse(nik).isValid;
    }

    static mask(nik: string): string {
        const parsed = this.parse(nik);
        if (!parsed.isValid) {
            throw new Error(ERROR.INVALID_NIK_FORMAT.message);
        }
        return '************' + parsed.serialNumber;
    }
}
