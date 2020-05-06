const fs = require('fs')
const dirfile = "../files/";

fs.readdir(dirfile, (err, files) => {
  files.forEach(file => {
    if((file.toLowerCase().includes("programmering")) || (file.toLowerCase().includes("prog"))) {
      console.log(file);
    }
    else if ((file.toLowerCase().includes("matematik")) || (file.toLowerCase().includes("mat"))) {
      console.log(file);
    }
    else if (file.toLowerCase().includes("dansk")) {
      console.log(file);
    }
  });
});
