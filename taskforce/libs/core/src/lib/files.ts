import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { ensureDir } from 'fs-extra';

export const multerOptions = {
  limits: {
    fileSize: 512000,
  },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new HttpException(`Invalid file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);

    }

    callback(null, true);
  },
  storage: diskStorage({
    destination: async (_req, _file, callback) => {
      const dir = process.env.FILES_STORAGE_PATH;
      await ensureDir(dir);

      callback(null, dir);
    },
    filename: (_req, file, callback) => {
      callback(null, `${file.originalname}`);
    },
  }),

}
