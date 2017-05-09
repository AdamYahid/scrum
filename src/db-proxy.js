const fs = require('fs');
const path = require('path');
const homeDir = require('os').homedir();
const configFilePath = path.join(homeDir,'.scrum','config.js');
const configContent = fs.readFileSync(configFilePath, 'utf8');
const { DB_PATH, DB_FILE_NAME } = JSON.parse(configContent);
const fullFilePath = path.join(DB_PATH, DB_FILE_NAME);


function readDb() {
  return new Promise((resolve, reject) => {
    fs.readFile(fullFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    })
  });
};

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
  const data = readDb().then(data => {
    const currentSprint = data[data.length - 1];
    const updatedSprint = Object.assign({}, currentSprint, { retrospective: newRetro });
    const updatedData = data.slice(0, data.length - 1).concat(updatedSprint);
    flushDataToDb(updatedData, cb);
  });
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