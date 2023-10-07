import { spawn } from 'child_process';
import FormData from 'form-data';
import path from 'path';
var fs = require('fs');

class ScriptReader {
  async convertXmlToJson(data: any): Promise<JSON | undefined> {
    const jsonConverted = await new Promise((resolve, reject) => {
      let jsonBuilder = '';

      const scriptPython = spawn('python3', [
        './scripts/convert/convert.py',
        JSON.stringify({ minify: data.minify, file: data.file, fileName: data.file.name }),
      ]);

      scriptPython.stdout.on('data', (res) => {
        jsonBuilder += res;
        console.log(`${res}`);
      });

      scriptPython.stderr.on('data', (res) => {
        console.log(`error script: ${res}`);
        reject(undefined);
      });

      scriptPython.on('close', (res) => {
        console.log('script closed');
        const jsonBuilderSplited = jsonBuilder.split('json converted:');
        try {
          if (jsonBuilderSplited[jsonBuilderSplited.length - 1].length > 0) {
            resolve(JSON.parse(jsonBuilderSplited[jsonBuilderSplited.length - 1]));
          } else {
            resolve(undefined);
          }
        } catch (error) {
          resolve(undefined);
        }
      });
    });

    if (jsonConverted) {
      return jsonConverted as JSON;
    }
  }
}

export const scriptReader = new ScriptReader();
