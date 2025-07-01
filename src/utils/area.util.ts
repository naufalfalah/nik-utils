import * as fs from 'fs';
import * as path from 'path';

export interface Area {
    code: string;
    name: string;
    type: string;
    parentCode?: string;
}

export function getAreaData(): Area {
    const filePath = path.resolve(__dirname, 'datas/area.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const areas = JSON.parse(jsonData);

    return areas;
}
