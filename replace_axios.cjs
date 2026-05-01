const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('http://localhost:5000')) {
    // Replace the import if axios is imported
    if (content.includes("import axios from 'axios'") || content.includes('import axios from "axios"')) {
      // Find the relative path to api/axios.js
      const depth = filePath.split(path.sep).length - dirPath.split(path.sep).length;
      let apiPath = '../'.repeat(depth - 1) + 'api/axios';
      if (depth === 1) apiPath = './api/axios';
      
      content = content.replace(/import axios from ['"]axios['"];?/g, `import api from '${apiPath}';`);
    }

    // Replace axios.get, axios.post, etc. with api.get, api.post
    content = content.replace(/axios\.([a-z]+)\(['"`]http:\/\/localhost:5000\//g, 'api.$1(\'\/');
    content = content.replace(/axios\.([a-z]+)\(`http:\/\/localhost:5000\//g, 'api.$1(`/');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
};

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(dirPath);
files.forEach(replaceInFile);
