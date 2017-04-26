const { readDb } = require('../db-proxy.js');

function print(params, cb) {
  const data = readDb();
  let dataToPrint;
  if (params.indexOf('-last-sprint') > -1) {
    dataToPrint = data[data.length - 1];
  } else {
    dataToPrint = data;
  }
  console.log(JSON.stringify(dataToPrint, null, 2));
  cb(0);
}

module.exports = print;