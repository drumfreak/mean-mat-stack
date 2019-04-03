const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');
const uploadPath = 'images/profiles';
const UPLOAD_PATH = path.resolve(__dirname, '../', uploadPath);

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if(isValid) {
      error = null;
    }
    mkdirp(UPLOAD_PATH, err = () => {
      cb(error, 'server/' + uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports =  multer({storage: storage}).single('image');
