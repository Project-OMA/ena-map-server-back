import { NextFunction, Request, Response } from 'express';
import { normalizeFileName } from '../utils/fileUtil';

export const handlerFileMap = (req: Request, res: Response, next: NextFunction) => {
  const { files } = req;

  if(files) {
    const handled_files = ((files as Express.Multer.File[]) || []).map((file) => ({
      name: normalizeFileName(file.originalname.split('.').slice(0, -1).join('')) + '-' + new Date().getTime(),
      type: file.mimetype,
      content: file.buffer,
      size: file.size,
      extension: file.originalname.split('.').pop() || '',
      category: 'Arquivo Mapa',
      main: 0,
    }));
  
    req.body.files = handled_files;
  }


  return next();
};
