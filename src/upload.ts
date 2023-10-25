import { existsSync, mkdirSync } from "fs";
import path from "path";

const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    console.log(`Received req dest ${req}`)
    var dir = __dirname + '/uploads';
    if (!existsSync(dir)) mkdirSync(dir, 0o744);

    cb(null, path.join(dir));
  },
  filename: (req: any, file: any, cb: any) => {
    console.log(`Received req filename ${req}`)
    cb(null, Date.now() + '' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
