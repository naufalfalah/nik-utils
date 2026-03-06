const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processLineByLine() {
    const fileStream = fs.createReadStream(path.resolve(__dirname, 'base.csv'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const data = {};

    for await (const line of rl) {
        if (!line.trim()) continue;

        // Some names could have commas, but in base.csv they usually don't or are wrapped in quotes.
        // Let's split by first comma safely.
        let [code, ...nameParts] = line.split(',');
        let name = nameParts.join(',').trim();

        // Remove enclosing quotes if any
        if (name.startsWith('"') && name.endsWith('"')) {
            name = name.slice(1, -1);
        }

        if (/^\d{2}$/.test(code)) {
            // Province
            data[code] = { name, districts: {} };
        } else if (/^\d{2}\.\d{2}$/.test(code)) {
            // Regency / City (Kabupaten / Kota)
            const provCode = code.split('.')[0];
            const kabCode = code.replace('.', '');
            if (data[provCode]) {
                data[provCode].districts[kabCode] = { name, subdistricts: {} };
            }
        } else if (/^\d{2}\.\d{2}\.\d{2}$/.test(code)) {
            // District (Kecamatan, what the NIK uses for digits 5-6)
            const parts = code.split('.');
            const provCode = parts[0];
            const kabCode = parts[0] + parts[1];
            const kecCode = parts[0] + parts[1] + parts[2];

            if (data[provCode] && data[provCode].districts[kabCode]) {
                data[provCode].districts[kabCode].subdistricts[kecCode] = name;
            }
        }
        // We ignore 4-part codes (Villages) because NIK does not use them for coding
    }

    const outputPath = path.resolve(__dirname, 'src/data/area.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Successfully generated area.json');
}

processLineByLine().catch(console.error);
