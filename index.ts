import path from 'node:path';
import fs from 'node:fs';
import { mkdir } from 'node:fs/promises';
import crypto from 'node:crypto';
import { concatenateBuffers, parseFileSize } from './helpers';

export async function UploadImage({
  file,
  folder,
  name,
  size,
}: {
  file: any;
  folder: string;
  name: string;
  size: string;
}) {
  if (!file || !file.stream || !file.stream()) {
    return Promise.reject('No file stream or error occurred');
  } else if (!name) {
    return Promise.reject('File name unknown');
  } else if (!folder) {
    return Promise.reject('Invalid folder');
  } else if (!file.type.startsWith('image')) {
    return Promise.reject('Invalid file format');
  }

  const READER = file.stream().getReader();
  const MIME_TYPE: string = file.type.split('/')[1];
  const DIR = path.join(process.cwd(), 'public', folder);
  const UUID: string = crypto.randomUUID();
  const checkFolder = fs.existsSync(DIR).valueOf();

  let TOTAL_BUFFER: Uint8Array = new Uint8Array();

  return new Promise(async (resolve, reject) => {
    const fileName = `${name}_${UUID}.${MIME_TYPE}`;
    const filePath = path.join(DIR, fileName);

    if (!checkFolder) await mkdir(DIR);

    while (true) {
      const { done, value } = await READER.read();

      if (done) break;

      TOTAL_BUFFER = concatenateBuffers(TOTAL_BUFFER, value);
    }

    if (TOTAL_BUFFER) {
      const writeStream = fs.createWriteStream(filePath);

      writeStream.write(TOTAL_BUFFER);

      writeStream.end();

      return resolve({
        file: fileName,
      });
    }

    return reject('File upload is incorrect');
  });
}
