const fs = require('fs')
const dirfile = "../files/";

function moveToMat(oldPath, newPath) {
  fs.rename(oldPath, newPath);
}

fs.readdir(dirfile, (err, files) => {
  files.forEach(file => {
    if((file.toLowerCase().includes("programmering")) || (file.toLowerCase().includes("prog"))) {

    }
    else if ((file.toLowerCase().includes("matematik")) || (file.toLowerCase().includes("mat"))) {

    }
    else if (file.toLowerCase().includes("dansk")) {
      console.log(file);
    }
  });
});
