import fs from 'fs';
import path from 'path';

export default function fetchNotImplementedEndpoints() {
  return new Promise((resolve, reject) => {
    const relativePath = '../../../Orationi.CommunicationCore/Interfaces/IOrationiApiService.cs';
    const filename = path.join(__dirname, relativePath);

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const endpoints = parse(data, /UriTemplate\s?=\s?"(.*)"/g);
        filter(endpoints).then(resolve);
      });
  });
}

function parse(data, regex) {
  if (!data) return [];
  const res = [];

  let match = regex.exec(data);
  while (match != null) {
    if (match.length > 1) {
      res.push(match[1].toLowerCase().replace(/\$\{/g, '{'));
    }

    match = regex.exec(data);
  }

  return res;
}

function filter(endpoints) {
  return new Promise((resolve, reject) => {
    getImplementedEndpoints().then(
      implemented => {
        // console.log(implemented);
        resolve(endpoints.filter(e => !implemented.filter(i => i === e).length));
      },
      reject
    );
  });
}

function getImplementedEndpoints() {
  return new Promise((resolve, reject) => {
    const relativePath = '../api';
    const dirPath = path.join(__dirname, relativePath);

    fs.readdir(dirPath, (dirErr, files) => {
      if (dirErr) {
        reject();
      }

      let implemented = [];

      files.forEach(file => {
        const fileName = path.join(dirPath, file);
        const data = fs.readFileSync(fileName, 'utf8');
        const fileImplemented = parse(data, /`\$\{API_URL\}\/(.*)`;/gi);
        implemented = implemented.concat(fileImplemented);
      });
      resolve(implemented);
    });
  });
}
