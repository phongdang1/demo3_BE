module.exports = {
  up: (queryInterface, Sequelize) =>
    new Promise((resolve, reject) => {
      {
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
        //NopCVs
        queryInterface.addConstraint("NopCvs", {
          type: "foreign key",
          fields: ["postId"],
          name: "FK_NopCv_Posts",
          references: {
            table: "Posts",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        queryInterface.addConstraint("NopCvs", {
          type: "foreign key",
          fields: ["cvId"],
          name: "FK_NopCv_Cvs",
          references: {
            table: "Cvs",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //CVs
        queryInterface.addConstraint("Cvs", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_Cvs_Users",
          references: {
            table: "Users",
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
        queryInterface.addConstraint("DetailPosts", {
          type: "foreign key",
          fields: ["postId"],
          name: "FK_DetailPosts_Posts",
          references: {
            table: "Posts",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //OrderPackagesPosts
        queryInterface.addConstraint("OrderPackagePosts", {
          type: "foreign key",
          fields: ["packagePostId"],
          name: "FK_OrderPackagePosts_PackagePosts",
          references: {
            table: "PackagePosts",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        queryInterface.addConstraint("OrderPackagePosts", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_OrderPackagePosts_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //OrderPackagesMembers
        queryInterface.addConstraint("OrderPackageMembers", {
          type: "foreign key",
          fields: ["packageMemberId"],
          name: "FK_OrderPackageMembers_PackageMembers",
          references: {
            table: "PackageMembers",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        queryInterface.addConstraint("OrderPackageMembers", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_OrderPackageMembers_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //OrderPackagesView
        queryInterface.addConstraint("OrderPackageViews", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_OrderPackageViews_Users",
          references: {
            table: "Users",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        queryInterface.addConstraint("OrderPackageViews", {
          type: "foreign key",
          fields: ["packageViewId"],
          name: "FK_OrderPackageViews_PackageViews",
          references: {
            table: "PackageViews",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        //Notes
        queryInterface.addConstraint("Notes", {
          type: "foreign key",
          fields: ["postId"],
          name: "FK_Notes_Posts",
          references: {
            table: "Posts",
            field: "id",
          },
          onUpdate: "CASCADE",
        });
        queryInterface.addConstraint("Notes", {
          type: "foreign key",
          fields: ["userId"],
          name: "FK_Notes_Users",
          references: {
            table: "Users",
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
        queryInterface.removeConstraint("Cvs", "FK_Cvs_Posts");
        queryInterface.removeConstraint("Cvs", "FK_Cvs_Users");
        queryInterface.removeConstraint("Posts", "FK_Posts_Users");
        queryInterface.removeConstraint("Posts", "FK_Posts_DetailPosts");
        queryInterface.removeConstraint(
          "OrderPackages",
          "FK_OrderPackages_PackagePosts"
        );
        queryInterface.removeConstraint(
          "OrderPackages",
          "FK_OrderPackages_Users"
        );
        queryInterface.removeConstraint("Accounts", "FK_Accounts_Users");
        queryInterface.removeConstraint("Users", "FK_Users_Companies");
        queryInterface.removeConstraint("Notes", "FK_Notes_Posts");
        queryInterface.removeConstraint("Notes", "FK_Notes_Users");
        queryInterface.removeConstraint("UserDetails", "FK_UserDetails_Users");
      }
    }),
};
