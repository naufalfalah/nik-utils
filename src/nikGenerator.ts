import { NikParser  } from "./nikParser";
import { GENDER } from "./constants/common.constant";

export interface GeneratedNikOptions {
    gender?: keyof typeof GENDER;
    birthDate?: string;
    provinceCode?: string;
    cityCode?: string;
    districtCode?: string;
}

export class NikGenerator extends NikParser {
    static getRandomBirthDate(): string {
        const start = new Date(1945, 7, 17); // 17 August 1945
        const end = new Date(); // Today

        const randomBirthDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomBirthDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    }

    static generate(options: GeneratedNikOptions): string {
        const {
            provinceCode = '00',
            cityCode = '00',
            districtCode = '00',
            birthDate = this.getRandomBirthDate(),
            gender = Math.random() < 0.5 ? GENDER.MALE : GENDER.FEMALE,
        } = options;

        const [year, month, day] = birthDate.split('-').map(Number);

        const genderDay = gender === GENDER.FEMALE.code ? day + 40 : day;

        const randomSerialNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // 4 digit serial number

        const randomNik = `${provinceCode}${cityCode}${districtCode}${String(genderDay).padStart(2, '0')}${String(month).padStart(2, '0')}${String(year % 100).padStart(2, '0')}${randomSerialNumber}`;

        const parsed = this.parse(randomNik);
        if (!parsed.isValid) {
            return this.generate(options); // Retry if the generated NIK is invalid
        }

        return randomNik;
    }
}