import { createWriteStream, readFileSync } from 'fs';
import { join, basename } from 'path';
import fetch from "node-fetch";



const inputFile = 'input/link.txt'; // Replace with your input file containing URLs
const outputDirectory = 'output'; // Replace with your desired output directory

async function downloadFile(url, savePath) {
    try {
        await fetch(url)
            .then(res =>
                res.body.pipe(createWriteStream(savePath))
            )

        console.log(`Downloaded: ${url} -> ${savePath}`);
    } catch (error) {
        console.error(`Failed to download: ${url}`, error);
    }
}

async function main() {

    try {
        const data = readFileSync(inputFile, 'utf-8').split('\n');
        for (const url of data) {
            let fileName = join(outputDirectory, basename(url));
            let arr = fileName.split(".");
            fileName = arr[0] + ".jpeg"
            await downloadFile(url, fileName);
        }
    } catch (error) {
        console.error(`Error reading file: ${inputFile}`, error);
    }
}

main();
