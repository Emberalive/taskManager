import fs from "fs"

try {

    console.log("reading file as binary")
    const pdfBuffer = fs.readFileSync("./files/Ashcliffe-claimsense-invoice.pdf");

    const binaryData = pdfBuffer.toString("binary")
    console.log("file successfully read as binary")
    console.log(binaryData.length)

    console.log("restoring the file to its original state")

    fs.writeFileSync("./files/restored.pdf", pdfBuffer)

    console.log("PDF restored successfully")

} catch (e) {
    console.error(`error reading file as binary: ${e.message}`)
}