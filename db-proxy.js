const fs = require('fs');
const path = require('path');
const { DB_PATH, DB_FILE_NAME } = require('./config.js');
const fullFilePath = path.join(DB_PATH, DB_FILE_NAME);

function readDb() {
  let data = null;
  try {
    data = JSON.parse(fs.readFileSync(fullFilePath, 'utf8'));
  } catch (e) {
    console.log(`failed reading db - ${e}`);
  }
  return data;
}

function flushDataToDb(data, cb){
  const writeFileCb = (err) => {
    if (err) {
      console.log('Failed to write to file ' + err);
      cb(1);
    } else {
      console.log(`db was written to ${fullFilePath}`);
      cb(0);
    }
  }
  fs.writeFile(fullFilePath, JSON.stringify(data), writeFileCb);
} 

function updateCurrentRetro(newRetro, cb) {
  const data = readDb();
  const currentSprint = data[data.length - 1];
  const updatedSprint = Object.assign({}, currentSprint, { retrospective: newRetro });
  const updatedData = data.slice(0, data.length - 1).concat(updatedSprint);
  flushDataToDb(updatedData, cb);
}

function addNewSprint(newSprint, cb) {
  const data = readDb();
  const newData = data.concat(newSprint);
  flushDataToDb(newData, cb);
}

module.exports = {
  readDb,
  updateCurrentRetro,
  addNewSprint
}