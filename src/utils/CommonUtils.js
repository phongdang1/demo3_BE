import JWT from "jsonwebtoken";
require("dotenv").config();
const pdfParse = require("pdf-parse");
const keywordExtractor = require("keyword-extractor");
let encodeToken = (userId) => {
  return JWT.sign(
    {
      iss: "Anh Tuan",
      sub: userId,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    process.env.SECRET_STRING
  );
};
let pdfToString = async (file) => {
  try {
    if (typeof file !== "string") {
      file = file.toString();
    }
    if (file.startsWith("data:application/pdf;base64,")) {
      file = file.replace("data:application/pdf;base64,", "");
    }

    let buffer = Buffer.from(file, "base64");
    const pdfData = await pdfParse(buffer);
    const text = pdfData.text;

    let words = text
      .replace(/[\n\r]+/g, "\n") // Giữ lại dấu xuống dòng
      .toLowerCase()
      .split(/,|\n|:/) // Tách văn bản dựa trên dấu phẩy, dấu xuống dòng và dấu hai chấm
      .map((word) => word.trim()) // Loại bỏ khoảng trắng thừa ở đầu và cuối cụm từ
      .filter((word) => /^[\p{L}\s]+$/u.test(word)); // Lọc chỉ lấy từ có ký tự là chữ cái (bao gồm cả ký tự Unicode)

    let uniqueWords = [...new Set(words)]; // Lọc ra các từ duy nhất

    return uniqueWords;
  } catch (err) {
    console.error("Error extracting PDF data:", err);
    return null;
  }
};

let getAllKeyWords = (text) => {
  let options = {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  };
  let listKeyWord = keywordExtractor.extract(text, options);
  let mapListKeyWord = new Map();
  for (let i = 0; i < listKeyWord.length; i++) {
    mapListKeyWord.set(i, listKeyWord[i]);
  }

  return mapListKeyWord;
};
let flatAllString = (string) => {
  try {
    let output = string
      .toLocaleLowerCase() // Chuyển chuỗi thành chữ thường
      .normalize("NFD") // Chuẩn hóa chuỗi để loại bỏ dấu
      .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu tiếng Việt

    // Thay thế các ký tự có dấu thành không dấu (tiếng Việt)
    output = output
      .replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, "a")
      .replace(/[éèẻẽẹêếềểễệ]/g, "e")
      .replace(/[iíìỉĩị]/g, "i")
      .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o")
      .replace(/[úùủũụưứừửữự]/g, "u")
      .replace(/[ýỳỷỹỵ]/g, "y")
      .replace(/[đ]/g, "d");

    // Loại bỏ các dấu câu không cần thiết (dấu phẩy, dấu hai chấm) và tách từ
    const wordsArray = output
      .split(/,|:/) // Tách chuỗi dựa trên dấu phẩy và dấu hai chấm
      .map((word) => word.trim()) // Loại bỏ khoảng trắng thừa
      .filter((word) => word.length > 0); // Loại bỏ phần tử trống

    return wordsArray; // Trả về mảng từ đã tách
  } catch (err) {
    console.error("Error processing string:", err);
    return null;
  }
};

module.exports = {
  encodeToken: encodeToken,
  pdfToString: pdfToString,
  getAllKeyWords: getAllKeyWords,
  flatAllString: flatAllString,
};
