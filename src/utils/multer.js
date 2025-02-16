import multer from "multer";
import path from "path";

const fileUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();

    // Allowed file types
    const allowedImageTypes = [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".tif",
      ".webp",
      ".bmp",
      ".tiff",
      ".svg", 
      ".heic",
      ".heif", 
    ];

    const allowedDocumentTypes = [
      ".pdf", 
      ".doc", 
      ".docx", 
      ".xls", 
      ".xlsx", 
      ".ppt", 
      ".pptx", 
      ".txt", 
      ".csv",
    ];

    // Combine all allowed file types
    const allowedTypes = [...allowedImageTypes, ...allowedDocumentTypes];

    if (!allowedTypes.includes(ext)) {
      return cb(new Error("Invalid file type. Only images and documents are allowed."), false);
    }

    cb(null, true);
  },
});

export default fileUpload;