const multer = require("multer");
const path = require("path");

const configureUpload = (folderLocation) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadFolder = path.join(__dirname, folderLocation);
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const fileName = file.fieldname + "-" + uniqueSuffix + extension;
      cb(null, fileName);
    },
  });

  return multer({ storage });
};

module.exports = configureUpload;