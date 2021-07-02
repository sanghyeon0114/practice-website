import crypto from 'crypto';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { Readable } from 'stream';

export const cipher = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const comparePw = (password: string, encrypted: string) => {
    return bcrypt.compareSync(password, encrypted);
}

export function encryptFile(buffer: Buffer, destination: string, password: string) {
    return new Promise<string>((resolve, reject) => {
        const read = Readable.from(buffer);
        const write = fs.createWriteStream(destination);
        const iv = crypto.randomBytes(16);

        const key = crypto.createHash('sha256').update(password).digest();
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        read.pipe(cipher).pipe(write);

        write.on('finish', () => {
            resolve(iv.toString('base64'));
        })

        write.on('error', (err) => {
            reject(err);
        })
    })
}

export function decryptFile(sourcePath: string, password: string, iv: string) {
    const read = fs.createReadStream(sourcePath);

    const key = crypto.createHash('sha256').update(password).digest();

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'base64'))

    return new Promise<Buffer>((resolve, reject) => {
        const stream = read.pipe(decipher);
        let data = Buffer.alloc(0);

        stream.on('data', (d) => {
            data = Buffer.concat([data, d]);
        });

        stream.on('close', () => {
            resolve(data);
        })

        stream.on('error', (err) => {
            reject(err);
        })
    })
}

export const makeHashCode = (data: Buffer): string => {
    const hashed = crypto.createHash('sha256').update(data).digest('hex');
    return hashed;
}

