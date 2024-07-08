import * as fs from "fs";
import * as path from "path";
import { PDFDocument } from "pdf-lib";
import * as pdfToImg from  "pdf-to-img";
import ImageProcessor from "./image-processor";

class AIScript {
    fileName: string;
    filePath: string;
    cohort: string;

    constructor(fileName: string, filePath: string, cohort: string) {
        this.fileName = fileName;
        this.filePath = path.resolve(filePath); // Resolve the full path
        this.cohort = cohort;
    }

    async execute(){
        console.log('㊙️ Executing the script...');
        let images = await ImageProcessor.convertPdfToImages(this.filePath);
        console.log(images);
    }
}

// Construct the proper path using __dirname
const relativePath = "../../../uploads/A10-0207241311084.pdf";
const absolutePath = path.join(__dirname, relativePath);

const script = new AIScript("exampleFile", absolutePath, "cohort1");
script.execute();