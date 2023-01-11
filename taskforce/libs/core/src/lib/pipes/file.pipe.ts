import { Injectable, PipeTransform } from '@nestjs/common';
import { writeFile } from 'fs-extra';
import 'multer';

@Injectable()
export class FileMulterPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform(file: Express.Multer.File): Promise<string> {
    const pathname = `${file.destination}/${file.originalname}`;
    await writeFile(pathname, file.buffer);

    return pathname
  }
}
