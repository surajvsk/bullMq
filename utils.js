const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
function processUploadedImages(job) {
  const imageFileData = Buffer.from(job.image.data);
  const imageName = job.image.name
  console.log('JSOB::::::::::::', job.image.name, imageName)

  console.log('imageFileData:::::::::', imageName,imageFileData)
  fs.writeFile(imageName, imageFileData, async function(err, data) {
   console.log('Data', data)
});



}

module.exports = { processUploadedImages };