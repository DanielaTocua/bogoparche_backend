import fs from "fs";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import { cloudConfig } from "../cloudConfig";


cloudConfig;
class ImageService {
	

	
	async uploadImage(base64Image: string): Promise<string> {
		


		const filename = "file_"+Date.now() as string ;
		await cloudinary.uploader.upload(base64Image,{public_id: filename, folder: "uploads"});	
		
		
		return filename;
	}

	async getBase64Image(filename: string): Promise<string> {

		return cloudinary.url("uploads/"+filename)
	}

	async deleteImage(filename: string) {
		cloudinary.uploader.destroy("uploads/" + filename, function(error,result) {
			console.log(result, error) });		
	}
}
export default new ImageService();
