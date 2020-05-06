var path = require("path"), fs = require('fs')

var oldPath = '../files/HTX MAT A Dec2019.pdf'
var oldPathFile = oldPath.split("files/").pop();
var newPath = '../files/newfolder/HTX MAT A Dec2019.pdf'
var newPathFile = newPath.split("..").pop();

fs.rename(oldPath, newPath, function (err) {
  if (err) throw err
  console.log('Moved \'' + oldPathFile + '\' to '+ newPathFile)

})
