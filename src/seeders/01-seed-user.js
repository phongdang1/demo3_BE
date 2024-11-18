"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        address: "123 Main St",
        phoneNumber: "555-555-5555",
        password: "password123",
        point: 100,
        image: "image1.jpg",
        dob: "1990-01-01",
        roleCode: "user",
        statusCode: "active",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 1,
        isVip: 0,
        companyId: null,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        address: "456 Elm St",
        phoneNumber: "098-765-4321",
        password: "password456",
        point: 200,
        image: "image2.jpg",
        dob: "1985-02-02",
        roleCode: "admin",
        statusCode: "active",
        isUpdate: 1,
        typeLogin: "LOCAL",
        isVerify: 1,
        isVip: 1,
        companyId: null,
      },
      {
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@example.com",
        address: "789 Oak St",
        phoneNumber: "321-654-0987",
        password: "password789",
        point: 150,
        image: "image3.jpg",
        dob: "1995-03-03",
        roleCode: "user",
        statusCode: "inactive",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 0,
        isVip: 0,
        companyId: null,
      },
      {
        firstName: "Alice",
        lastName: "Williams",
        email: "alice.williams@example.com",
        address: "159 Cedar St",
        phoneNumber: "444-222-3333",
        password: "passwordalice",
        point: 120,
        image: "image4.jpg",
        dob: "1988-04-04",
        roleCode: "user",
        statusCode: "active",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 1,
        isVip: 0,
        companyId: null,
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie.brown@example.com",
        address: "753 Pine St",
        phoneNumber: "777-555-8888",
        password: "passwordcharlie",
        point: 170,
        image: "image5.jpg",
        dob: "1992-05-05",
        roleCode: "user",
        statusCode: "inactive",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 0,
        isVip: 1,
        companyId: null,
      },
      {
        firstName: "David",
        lastName: "Clark",
        email: "david.clark@example.com",
        address: "246 Birch St",
        phoneNumber: "111-222-3333",
        password: "passworddavid",
        point: 110,
        image: "image6.jpg",
        dob: "1991-06-06",
        roleCode: "user",
        statusCode: "active",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 1,
        isVip: 0,
        companyId: null,
      },
      {
        firstName: "Emma",
        lastName: "Davis",
        email: "emma.davis@example.com",
        address: "135 Maple St",
        phoneNumber: "555-111-6666",
        password: "passwordemma",
        point: 140,
        image: "image7.jpg",
        dob: "1994-07-07",
        roleCode: "user",
        statusCode: "active",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 1,
        isVip: 1,
        companyId: null,
      },
      {
        firstName: "Frank",
        lastName: "Garcia",
        email: "frank.garcia@example.com",
        address: "987 Aspen St",
        phoneNumber: "888-222-4444",
        password: "passwordfrank",
        point: 160,
        image: "image8.jpg",
        dob: "1993-08-08",
        roleCode: "admin",
        statusCode: "inactive",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 0,
        isVip: 1,
        companyId: null,
      },
      {
        firstName: "Hannah",
        lastName: "Lopez",
        email: "hannah.lopez@example.com",
        address: "321 Cedar St",
        phoneNumber: "444-555-7777",
        password: "passwordhannah",
        point: 180,
        image: "image9.jpg",
        dob: "1987-09-09",
        roleCode: "user",
        statusCode: "active",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 1,
        isVip: 0,
        companyId: null,
      },
      {
        firstName: "Ivy",
        lastName: "Martinez",
        email: "ivy.martinez@example.com",
        address: "432 Walnut St",
        phoneNumber: "333-666-7777",
        password: "passwordivy",
        point: 190,
        image: "image10.jpg",
        dob: "1996-10-10",
        roleCode: "user",
        statusCode: "active",
        typeLogin: "LOCAL",
        isVerify: 1,
        isUpdate: 1,
        isVip: 1,
        companyId: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};