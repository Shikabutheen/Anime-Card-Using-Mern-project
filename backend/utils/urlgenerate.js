import DataURIParser from "datauri/parser.js";
import path from "path";

// Converts uploaded file into a Base64 URL (Data URI)
const getDataUrl = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  const dataUri = parser.format(extName, file.buffer);
  return dataUri.content; // return only the Base64 content
};

export default getDataUrl;


