import fs from 'fs';

export default function deleteFile(fileName: string) {
    fs.unlink(`./uploads/${fileName}`, (e) => console.log(e))
}