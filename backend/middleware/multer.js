import multer from "multer";

// Store uploaded file in memory as a Buffer (not saved to disk)
const storage = multer.memoryStorage();

// Middleware to handle single file upload with field name "file"
const uploadFile = multer({ storage }).single("file");

export default uploadFile;
