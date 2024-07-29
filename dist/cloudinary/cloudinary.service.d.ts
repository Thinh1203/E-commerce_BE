import { CloudinaryResponse } from './cloudinary-response';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File, width: number, height: number): Promise<CloudinaryResponse>;
}
