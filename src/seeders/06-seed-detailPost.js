"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("DetailPosts", [
      {
        id: 10,
        name: "Frontend Developer",
        description: "Develop and maintain the front-end of web applications.",
        amount: 3,
        categoryJobCode: "congNgheThongTin", // Category Job
        addressCode: "HCM", // Address
        salaryJobCode: "thoaThuan", // Salary
        jobLevelCode: "nhanVien", // Job Level
        workTypeCode: "fullTime", // Work Type
        experienceJobCode: "1Nam", // Experience
        genderPostCode: "caHai", // Gender
      },
      {
        id: 11,
        name: "Backend Developer",
        description: "Create and manage server-side application logic.",
        amount: 2,
        categoryJobCode: "congNgheThongTin",
        addressCode: "DaNang",
        salaryJobCode: "thoaThuan",
        jobLevelCode: "nhanVien",
        workTypeCode: "fullTime",
        experienceJobCode: "2Nam",
        genderPostCode: "caHai",
      },
      {
        id: 12,
        name: "Project Manager",
        description: "Oversee and manage project development and teams.",
        amount: 1,
        categoryJobCode: "quanLyNhanSu",
        addressCode: "HaNoi",
        salaryJobCode: "thoaThuan",
        jobLevelCode: "truongPhong",
        workTypeCode: "remote",
        experienceJobCode: "3Nam",
        genderPostCode: "caHai",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DetailPosts", null, {});
  },
};
