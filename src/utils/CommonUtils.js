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
      .replace(/[\n\r]+/g, " ") // Thay thế dấu xuống dòng bằng khoảng trắng
      .toLowerCase()
      .split(/\s+/) // Tách văn bản thành mảng từ
      .map((word) => word.replace(/[.,;!?]+$/, "")) // Loại bỏ dấu câu ở cuối từ
      .filter((word) => /^[\p{L}]+$/u.test(word)); // Lọc chỉ lấy từ có ký tự là chữ cái (bao gồm cả ký tự Unicode)

    let uniqueWords = [...new Set(words)];
    let twoWordCombinations = [];
    let threeWordCombinations = [];
    let fourWordCombinations = [];

    for (let i = 0; i < uniqueWords.length; i++) {
      // Ghép 2 từ
      if (i < uniqueWords.length - 1) {
        twoWordCombinations.push(`${uniqueWords[i]} ${uniqueWords[i + 1]}`);
      }
      // Ghép 3 từ
      if (i < uniqueWords.length - 2) {
        threeWordCombinations.push(
          `${uniqueWords[i]} ${uniqueWords[i + 1]} ${uniqueWords[i + 2]}`
        );
      }
      // Ghép 4 từ
      if (i < uniqueWords.length - 3) {
        fourWordCombinations.push(
          `${uniqueWords[i]} ${uniqueWords[i + 1]} ${uniqueWords[i + 2]} ${
            uniqueWords[i + 3]
          }`
        );
      }
    }

    // Kết hợp các chuỗi mới vào mảng uniqueWords
    uniqueWords = uniqueWords.concat(
      twoWordCombinations,
      threeWordCombinations,
      fourWordCombinations
    );

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
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    output = output
      .replace(/[áàảãạ]/g, "a")
      .replace(/[ÁÀẢÃẠ]/g, "A")
      .replace(/[éèẻẽẹ]/g, "e")
      .replace(/[ÉÈẺẼẸ]/g, "E")
      .replace(/[iíìỉĩị]/g, "i")
      .replace(/[ÍÌỈĨỊ]/g, "I")
      .replace(/[óòỏõọ]/g, "o")
      .replace(/[ÓÒỎÕỌ]/g, "O")
      .replace(/[ôồốổỗộ]/g, "o")
      .replace(/[ÔỒỐỔỖỘ]/g, "O")
      .replace(/[ơờớởỡợ]/g, "o")
      .replace(/[ƠỜỚỞỠỢ]/g, "O")
      .replace(/[úùủũụ]/g, "u")
      .replace(/[ÚÙỦŨỤ]/g, "U")
      .replace(/[ưừứửữự]/g, "u")
      .replace(/[ƯỪỨỬỮỰ]/g, "U")
      .replace(/[ýỳỷỹỵ]/g, "y")
      .replace(/[ÝỳỶỸỴ]/g, "Y")
      .replace(/[đ]/g, "d")
      .replace(/[Đ]/g, "D");

    // Thay thế các ký tự không phải chữ cái hoặc khoảng trắng
    output = output.replace(/[^a-zA-Z\s]/g, " ");
    // Tách các từ thành mảng và loại bỏ phần tử trống
    const wordsArray = output.split(/\s+/).filter((word) => word.length > 0);

    // Tạo ra các tổ hợp từ
    const combine = (start, depth, combination, combinations) => {
      if (depth === 0) {
        combinations.push(combination.join(" "));
        return;
      }
      for (let i = start; i <= wordsArray.length - depth; i++) {
        combination.push(wordsArray[i]);
        combine(i + 1, depth - 1, combination, combinations);
        combination.pop();
      }
    };

    // Tạo các chuỗi từ 2, 3 và 4 từ
    const resultCombinations = [];
    for (let depth = 2; depth <= 4; depth++) {
      combine(0, depth, [], resultCombinations);
    }

    const allCombinations = [...new Set(resultCombinations)];
    const uniqueWords = [...new Set([...wordsArray, ...allCombinations])];

    return uniqueWords;
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
