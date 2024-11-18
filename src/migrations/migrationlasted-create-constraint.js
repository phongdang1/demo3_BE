module.exports = {
  up: (queryInterface, Sequelize) =>
    new Promise((resolve, reject) => {
      {
        //Users
        queryInterface.addConstraint("Users", {
          type: "foreign key",
          fields: ["companyId"],
          name: "FK_Users_Companies",
          references: {
            table: "Companies",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //Companies
        queryInterface.addConstraint("Companies", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_Companies_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //Notifications
        queryInterface.addConstraint("Notifications", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_Notifications_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //Reports
        queryInterface.addConstraint("Reports", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_Reports_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        queryInterface.addConstraint("Reports", {
          type: "foreign key",
          fields: ["postId"],
          name: "FK_Reports_Posts",
          references: {
            table: "Posts",
            field: "id",
          },
          onUpdate: "CASCADE",
        });

        //Posts
        queryInterface.addConstraint("Posts", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_Posts_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //DetailPosts
        queryInterface.addConstraint("Posts", {
          type: "foreign key",
          fields: ["detailpostId"],
          name: "FK_DetailPosts_Posts",
          references: {
            table: "DetailPosts",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //UserDetails
        queryInterface.addConstraint("UserDetails", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_UserDetails_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //UserSkills
        queryInterface.addConstraint("UserSkills", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_UserSkills_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        queryInterface.addConstraint("UserSkills", {
          type: "foreign key",
          fields: ["skillId"],
          name: "FK_UserSkills_Skills",
          references: {
            table: "Skills",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
      }
    }),

  down: (queryInterface, Sequelize) =>
    new Promise((resolve, reject) => {
      {
        queryInterface.removeConstraint("Companies", "FK_Companies_Users");
        queryInterface.removeConstraint("UserSkills", "FK_Companies_Users");
        queryInterface.removeConstraint("Posts", "FK_Posts_Users");
        queryInterface.removeConstraint("Posts", "FK_Posts_DetailPosts");
        queryInterface.removeConstraint("Accounts", "FK_Accounts_Users");
        queryInterface.removeConstraint("Users", "FK_Users_Companies");
        queryInterface.removeConstraint("UserDetails", "FK_UserDetails_Users");
        queryInterface.removeConstraint("UserSkills", "FK_UserSkills_Users");
      }
    }),
};
