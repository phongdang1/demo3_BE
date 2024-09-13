"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Skills", [
      // Công nghệ thông tin
      { id: 1, name: "Reactjs", categoryJobCode: "congNgheThongTin" },
      { id: 2, name: "Nextjs", categoryJobCode: "congNgheThongTin" },
      { id: 8, name: "Java", categoryJobCode: "congNgheThongTin" },
      { id: 9, name: "Nodejs", categoryJobCode: "congNgheThongTin" },
      { id: 10, name: "JS", categoryJobCode: "congNgheThongTin" },
      {
        id: 11,
        name: "Amazon Web Service",
        categoryJobCode: "congNgheThongTin",
      },
      { id: 12, name: "C#", categoryJobCode: "congNgheThongTin" },
      { id: 13, name: "MySQL", categoryJobCode: "congNgheThongTin" },
      { id: 14, name: "MSSQL", categoryJobCode: "congNgheThongTin" },
      { id: 15, name: "Spring Boot", categoryJobCode: "congNgheThongTin" },
      { id: 17, name: "CSS", categoryJobCode: "congNgheThongTin" },
      { id: 18, name: "HTML", categoryJobCode: "congNgheThongTin" },
      { id: 19, name: "Problem solving", categoryJobCode: "congNgheThongTin" },
      { id: 26, name: "Adobe", categoryJobCode: "congNgheThongTin" },
      { id: 28, name: "Vuejs", categoryJobCode: "congNgheThongTin" },
      { id: 29, name: "Angular", categoryJobCode: "congNgheThongTin" },
      { id: 30, name: "AI", categoryJobCode: "congNgheThongTin" },
      { id: 31, name: "Machine Learning", categoryJobCode: "congNgheThongTin" },
      { id: 32, name: ".NET", categoryJobCode: "congNgheThongTin" },
      { id: 33, name: "MVC", categoryJobCode: "congNgheThongTin" },
      { id: 34, name: "SPA", categoryJobCode: "congNgheThongTin" },
      { id: 35, name: "Restful API", categoryJobCode: "congNgheThongTin" },
      { id: 36, name: "Agile", categoryJobCode: "congNgheThongTin" },
      { id: 37, name: "Scrum", categoryJobCode: "congNgheThongTin" },
      { id: 38, name: "Python", categoryJobCode: "congNgheThongTin" },
      { id: 39, name: "Blockchain", categoryJobCode: "congNgheThongTin" },
      { id: 40, name: "Figma", categoryJobCode: "congNgheThongTin" },
      { id: 41, name: "Jira", categoryJobCode: "congNgheThongTin" },
      { id: 42, name: "Knockoutjs", categoryJobCode: "congNgheThongTin" },
      { id: 43, name: "MVVM", categoryJobCode: "congNgheThongTin" },
      { id: 44, name: "Kotlin", categoryJobCode: "congNgheThongTin" },
      { id: 45, name: "Swift", categoryJobCode: "congNgheThongTin" },
      { id: 46, name: "Docker", categoryJobCode: "congNgheThongTin" },
      { id: 47, name: "Kubernetes", categoryJobCode: "congNgheThongTin" },
      { id: 48, name: "GraphQL", categoryJobCode: "congNgheThongTin" },
      { id: 49, name: "Redis", categoryJobCode: "congNgheThongTin" },
      { id: 50, name: "Django", categoryJobCode: "congNgheThongTin" },
      { id: 51, name: "TensorFlow", categoryJobCode: "congNgheThongTin" },
      {
        id: 52,
        name: "Natural Language Processing",
        categoryJobCode: "congNgheThongTin",
      },
      { id: 53, name: "SaaS", categoryJobCode: "congNgheThongTin" },
      { id: 54, name: "UI/UX Design", categoryJobCode: "congNgheThongTin" },

      // Giáo viên
      { id: 5, name: "Lý", categoryJobCode: "giaoVien" },
      { id: 21, name: "Giải quyết vấn đề", categoryJobCode: "giaoVien" },
      { id: 72, name: "Classroom Management", categoryJobCode: "giaoVien" },
      { id: 73, name: "Curriculum Development", categoryJobCode: "giaoVien" },
      { id: 74, name: "Educational Technology", categoryJobCode: "giaoVien" },

      // Luật
      { id: 6, name: "Đàm phán", categoryJobCode: "luat" },
      { id: 16, name: "Luật dân sự", categoryJobCode: "luat" },
      { id: 23, name: "Giải quyết vấn đề", categoryJobCode: "luat" },
      { id: 63, name: "Legal Compliance", categoryJobCode: "luat" },
      { id: 64, name: "Corporate Law", categoryJobCode: "luat" },
      { id: 65, name: "Contract Law", categoryJobCode: "luat" },

      // Kinh tế
      { id: 7, name: "Excel", categoryJobCode: "kinhTe" },
      { id: 22, name: "Giải quyết vấn đề", categoryJobCode: "kinhTe" },
      { id: 66, name: "Market Analysis", categoryJobCode: "kinhTe" },
      { id: 67, name: "Financial Forecasting", categoryJobCode: "kinhTe" },
      { id: 68, name: "Investment Strategy", categoryJobCode: "kinhTe" },

      // Bất động sản
      { id: 20, name: "Giải quyết vấn đề", categoryJobCode: "batDongSan" },
      { id: 69, name: "Real Estate Investment", categoryJobCode: "batDongSan" },
      { id: 70, name: "Property Valuation", categoryJobCode: "batDongSan" },
      { id: 71, name: "Urban Planning", categoryJobCode: "batDongSan" },

      // Quản lý nhân sự
      { id: 24, name: "Giải quyết vấn đề", categoryJobCode: "quanLyNhanSu" },
      { id: 59, name: "Project Management", categoryJobCode: "quanLyNhanSu" },
      { id: 60, name: "Talent Acquisition", categoryJobCode: "quanLyNhanSu" },
      { id: 61, name: "Employee Relations", categoryJobCode: "quanLyNhanSu" },
      { id: 62, name: "Payroll Management", categoryJobCode: "quanLyNhanSu" },

      // Truyền thông
      { id: 25, name: "Giải quyết vấn đề", categoryJobCode: "truyenThong" },
      { id: 27, name: "Adobe", categoryJobCode: "truyenThong" },
      { id: 55, name: "Digital Marketing", categoryJobCode: "truyenThong" },
      { id: 56, name: "SEO", categoryJobCode: "truyenThong" },
      { id: 57, name: "Content Creation", categoryJobCode: "truyenThong" },
      { id: 58, name: "Public Relations", categoryJobCode: "truyenThong" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Skills", null, {});
  },
};
