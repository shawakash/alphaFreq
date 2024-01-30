import * as path from 'path';
import * as fs from 'fs';
import PDFParser from 'pdf-parse';

async function readPDF(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await PDFParser(dataBuffer);

  return data.text;
}

function calculateAlphabetFrequency(text: string): Map<string, number> {
    const frequencyMap = new Map<string, number>();
  
    for (const char of text) {
      if (/[a-zA-Z]/.test(char)) {
        const normalizedChar = char.toLowerCase();
        frequencyMap.set(normalizedChar, (frequencyMap.get(normalizedChar) || 0) + 1);
      }
    }
  
    return frequencyMap;
  }

async function main() {
  const filePath = 'src/pdfs/probability.pdf';

  try {
    const pdfText = await readPDF(filePath);
    const frequencyMap = calculateAlphabetFrequency(pdfText);

    console.log('\nBook name: Hossein Pishro-Nik - Introduction to Probability, Statistics, and Random Processes (2014, Kappa Research, LLC) - libgen.li');
    // frequencyMap.forEach((count, char) => {
    //   console.log(`${char}: ${count}`);
    // });

    const sortedByFrequency = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);
    console.log('\nTop 5 Letters with Max Frequency:');
    for (let i = 0; i < Math.min(5, sortedByFrequency.length); i++) {
      console.log(`${sortedByFrequency[i][0]}: ${sortedByFrequency[i][1]}`);
    }
    console.log("\n");
  } catch (error) {
    console.error('Error reading the PDF file:', error);
  }
}

main();
