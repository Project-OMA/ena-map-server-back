import multer from "multer";
import crypto from "crypto";
import path from "path";
import AppError from "../errors/AppError";

export default multer({
    dest: path.resolve(__dirname, '..', 'uploads/tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path.resolve('./uploads/'));
        },
        filename: (req, file, cb) =>{
            crypto.randomBytes(16, (err: any, hash) =>{
                if (err) cb (err, "");
                
                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        } 
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) =>{
        const allowedMimes = [
            'text/csv'
        ];
        
        if(file != undefined && allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new AppError(400, "Erro! Tipo de arquivo inválido"));
        }
    }
    
})