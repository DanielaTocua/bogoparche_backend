import fs from "fs";
import path from "path";
class ImageService {
	async uploadImage(base64Image: string): Promise<string> {

		const buffer = Buffer.from(base64Image.split(",")[1], "base64");
		const fileExtension = base64Image.split(";")[0].split("/")[1];
        console.log(fileExtension)
		const filename = `file_${Date.now()}.${fileExtension}`;
		const destinationFolder = "../uploads";
		const filePath = path.join(__dirname, destinationFolder, filename);
		fs.writeFileSync(filePath, buffer);

		return filename;
	}

	async getBase64Image(filename: string): Promise<string> {
		const filePath = path.join(__dirname, "../uploads", filename);
		console.log(filePath);
		const buffer = fs.readFileSync(filePath);
		const base64Image = buffer.toString("base64");
		return `data:image/${path
			.extname(filename)
			.slice(1)};base64,${base64Image}`;
	}

	deleteImage(filename: string) {
		const filePath = path.join(__dirname, "../uploads", filename);
        console.log(filePath)
		fs.unlinkSync(filePath);
        console.log("jay")
	}
}
export default new ImageService();
