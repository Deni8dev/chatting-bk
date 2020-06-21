const express = require('express');
const fs = require('fs');
const router = express.Router();
const debug = require('debug')('chatting-bk:server');

const FILE_PATH = './dev/big.file';

/* GET Streaming File. */
router.get('/', (req, res, next) => {
   debug('>> Reading file');
   res.send('Hello Socket.io');
});

/* GET Streaming File. */
router.get('/big-file', (req, res, next) => {
   debug('>> Reading file');
   fs.readFile(FILE_PATH, (err, data) => {
      if (err)
         res.end("No file found. Please Use POST request to write a file.\n Example: << curl POST http://localhost:3000/big-file >>");
      else
         res.end(data);
   });
});

/* POST, Save Streaming File. */
router.post('/big-file', (req, res, next) => {
   debug('>> Writing file');
   const file = fs.createWriteStream(FILE_PATH);

   for (let i = 0; i <= 1e6; i++) {
      file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
   }

   debug('>> File wrote successfully');
   file.end();
   res.send('File wrote successfully');
});

module.exports = router;
