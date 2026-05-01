const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  let modified = false;
  
  // Fix template literals broken by previous script
  // e.g., api.put('/shifts/${id}`) -> api.put(`/shifts/${id}`)
  const newContent = content.replace(/api\.([a-z]+)\('\/([^']+)\$\{([^}]+)\}`\)/g, 'api.$1(`/$2${$3}`)');
  if (newContent !== content) {
    content = newContent;
    modified = true;
  }

  // Also fix api.post('/subscriptions", ...) -> api.post('/subscriptions', ...)
  const newContent2 = content.replace(/api\.post\('\/subscriptions",/g, 'api.post(\'/subscriptions\',');
  if (newContent2 !== content) {
    content = newContent2;
    modified = true;
  }

  // And api.put('/employees/${id}`, ...)
  const newContent3 = content.replace(/api\.([a-z]+)\('\/([^']+)\$\{([^}]+)\}`/g, 'api.$1(`/$2${$3}`');
  if (newContent3 !== content) {
    content = newContent3;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed quotes in ${filePath}`);
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
