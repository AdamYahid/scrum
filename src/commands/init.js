const fs = require('fs');
const path = require('path');
const { Sprint } = require('../models/sprint.js');
const homeDir = require('os').homedir();
const configFilePath = path.join(homeDir,'.scrum','config.js');
const configContent = fs.readFileSync(configFilePath, 'utf8');
const { DB_PATH, DB_FILE_NAME } = JSON.parse(configContent);

function init(params, cb) {
  const initData = JSON.stringify([Sprint()]);
  const fullFilePath = path.join(DB_PATH, DB_FILE_NAME);

  const writeFileCb = (err) => {
    if (err) {
      console.log('Failed to write to file ' + err);
      cb(1);
    } else {
      console.log(`db was written to ${fullFilePath}`);
      cb(0);
    }
  }
  const mkFolderCb = (err) => {
    if (err) {
      console.log('Failed to create folder' + err);
      cb(1);
    } else {
      fs.writeFile(fullFilePath, initData, writeFileCb);
    }
  }

  const readFileCb = (err, fd) => {
    if (fd) {
      console.log('db already exists, to override use -f');
      cb(1);
    } else {
      fs.writeFile(fullFilePath, initData, writeFileCb);
    }
  }
  const readdirCb = (err, files) => {
    if (err) {
      fs.mkdir(DB_PATH, mkFolderCb);
    } else {
      fs.open(fullFilePath, 'r', readFileCb);
    }
  }

  fs.readdir(DB_PATH, readdirCb);
}

module.exports = init;