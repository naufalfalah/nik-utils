import areaDataJson from '../data/area.json';

export interface AreaData {
    [provCode: string]: {
        name: string;
        districts: {
            [kabCode: string]: {
                name: string;
                subdistricts: {
                    [kecCode: string]: string;
                }
            }
        }
    }
}

const areaData = areaDataJson as unknown as AreaData;

export function isValidArea(provinceCode: string, cityCode: string, districtCode: string): boolean {
    const kabCode = provinceCode + cityCode;
    const kecCode = kabCode + districtCode;

    return !!(areaData[provinceCode] &&
        areaData[provinceCode].districts[kabCode] &&
        areaData[provinceCode].districts[kabCode].subdistricts[kecCode]);
}

export function getAreaNames(provinceCode: string, cityCode: string, districtCode: string) {
    const kabCode = provinceCode + cityCode;
    const kecCode = kabCode + districtCode;

    const province = areaData[provinceCode];
    const city = province?.districts[kabCode];
    const districtName = city?.subdistricts[kecCode];

    return {
        provinceName: province?.name || null,
        cityName: city?.name || null,
        districtName: districtName || null,
    };
}

export function getRandomValidAreaCode(): { provinceCode: string, cityCode: string, districtCode: string } {
    const provCodes = Object.keys(areaData);
    const provCode = provCodes[Math.floor(Math.random() * provCodes.length)];

    const kabCodes = Object.keys(areaData[provCode].districts);
    const kabCode = kabCodes[Math.floor(Math.random() * kabCodes.length)];
    const cityCode = kabCode.slice(2, 4);

    const kecCodes = Object.keys(areaData[provCode].districts[kabCode].subdistricts);
    const kecCode = kecCodes[Math.floor(Math.random() * kecCodes.length)];
    const districtCode = kecCode.slice(4, 6);

    return { provinceCode: provCode, cityCode, districtCode };
}
