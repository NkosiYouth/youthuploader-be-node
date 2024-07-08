import * as fs from "fs";
import * as path from "path";
import { PDFDocument } from "pdf-lib";
import { Poppler } from 'pdf-poppler';

export default class ImageProcessor{
    // Convert PDF To images
    static async convertPdfToImages(pdfPath: string): Promise<Buffer[]> {
        const filePath = path.resolve(pdfPath);

        // Load the PDF
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const poppler = new Poppler();

        const images: Buffer[] = [];

        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
            const pageNum = i + 1;
            const outputPath = path.resolve(__dirname, `temp_page_${pageNum}.png`);

            // Convert PDF page to PNG using pdf-poppler
            await poppler.pdfToCairo(pdfPath, {
                singleFile: true,
                pngFile: true,
                firstPageToConvert: pageNum,
                lastPageToConvert: pageNum,
                outputFile: outputPath
            });

            // Read the generated PNG file into a Buffer
            const imgData = fs.readFileSync(outputPath);
            images.push(imgData);

            // Clean up the temporary file
            fs.unlinkSync(outputPath);
        }

        return images;
    }

    saveImageToFiles(){

    }

    convertImagesToText(){

    }

    classifyImages(){

    }
}