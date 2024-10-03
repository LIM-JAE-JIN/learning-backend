import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUplode {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUplode): Promise<string[]> {
    // 1. 파일을 클라우드 스토리지에 저장하는 로직
    const watiedFiles = await Promise.all(files);
    console.log(watiedFiles);

    // 1-1) 스토리지 셋팅하기
    const bucket = 'jj-file-storage';
    const storage = new Storage({
      projectId: 'linear-reporter-437203-g8',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기
    const results = await Promise.all(
      watiedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    console.log(results);
    console.log('파일 전송이 완료되었습니다.');
    return results;
  }
}
