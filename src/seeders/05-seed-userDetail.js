"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("UserDetails", [
      {
        userId: 1,
        addressCode: "AnGiang", // Địa chỉ: An Giang
        salaryJobCode: "3-5tr",
        experienceJobCode: "1Nam",
        genderCode: "M",
        categoryJobCode: "congNgheThongTin",
        jobLevelCode: "nhanVien",
        workTypeCode: "fullTime",
        isTakeMail: 1,
        isFindJob: 1,
        file: null, // có thể thay đổi nếu cần
      },
      {
        userId: 2,
        addressCode: "HCM", // Địa chỉ: Hồ Chí Minh
        salaryJobCode: "10-15tr",
        experienceJobCode: "2Nam",
        genderCode: "FE",
        categoryJobCode: "congNgheThongTin",
        jobLevelCode: "truongPhong",
        workTypeCode: "partPime",
        isTakeMail: 0,
        isFindJob: 1,
        file: null,
      },
      {
        userId: 3,
        addressCode: "DaNang", // Địa chỉ: Đà Nẵng
        salaryJobCode: "thoaThuan",
        experienceJobCode: "3Nam",
        genderCode: "M",
        categoryJobCode: "luat",
        jobLevelCode: "giamDoc",
        workTypeCode: "remote",
        isTakeMail: 1,
        isFindJob: 0,
        file: null,
      },
      {
        userId: 4,
        addressCode: "HaNoi", // Địa chỉ: Hà Nội
        salaryJobCode: "thoaThuan",
        experienceJobCode: "1Nam",
        genderCode: "M",
        categoryJobCode: "kinhTe",
        jobLevelCode: "nhanVien",
        workTypeCode: "fullTime",
        isTakeMail: 1,
        isFindJob: 1,
        file: null,
      },
      {
        userId: 5,
        addressCode: "HaiPhong", // Địa chỉ: Hải Phòng
        salaryJobCode: "3-5tr",
        experienceJobCode: "2Nam",
        genderCode: "FE",
        categoryJobCode: "batDongSan",
        jobLevelCode: "truongPhong",
        workTypeCode: "partPime",
        isTakeMail: 0,
        isFindJob: 1,
        file: null,
      },
      {
        userId: 6,
        addressCode: "CanTho", // Địa chỉ: Cần Thơ
        salaryJobCode: "10-15tr",
        experienceJobCode: "3Nam",
        genderCode: "M",
        categoryJobCode: "quanLyNhanSu",
        jobLevelCode: "giamDoc",
        workTypeCode: "remote",
        isTakeMail: 1,
        isFindJob: 0,
        file: null,
      },
      {
        userId: 7,
        addressCode: "CaMau", // Địa chỉ: Cà Mau
        salaryJobCode: "thoaThuan",
        experienceJobCode: "1Nam",
        genderCode: "M",
        categoryJobCode: "truyenThong",
        jobLevelCode: "nhanVien",
        workTypeCode: "fullTime",
        isTakeMail: 1,
        isFindJob: 1,
        file: null,
      },
      {
        userId: 8,
        addressCode: "KonTum", // Địa chỉ: Kon Tum
        salaryJobCode: "3-5tr",
        experienceJobCode: "2Nam",
        genderCode: "FE",
        categoryJobCode: "congNgheThongTin",
        jobLevelCode: "truongPhong",
        workTypeCode: "partPime",
        isTakeMail: 0,
        isFindJob: 1,
        file: null,
      },
      {
        userId: 9,
        addressCode: "BinhDuong", // Địa chỉ: Bình Dương
        salaryJobCode: "10-15tr",
        experienceJobCode: "3Nam",
        genderCode: "M",
        categoryJobCode: "luat",
        jobLevelCode: "giamDoc",
        workTypeCode: "remote",
        isTakeMail: 1,
        isFindJob: 0,
        file: null,
      },
      {
        userId: 10,
        addressCode: "BinhThuan", // Địa chỉ: Bình Thuận
        salaryJobCode: "thoaThuan",
        experienceJobCode: "1Nam",
        genderCode: "FE",
        categoryJobCode: "kinhTe",
        jobLevelCode: "nhanVien",
        workTypeCode: "fullTime",
        isTakeMail: 1,
        isFindJob: 1,
        file: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserDetails", null, {});
  },
};
