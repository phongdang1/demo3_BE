"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await executeTransactionWithRetry(async () => {
      await queryInterface.createTable("CvPost", {
        postId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Posts",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        file: {
          type: Sequelize.BLOB("long"),
          allowNull: true,
        },
        isChecked: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CvPost");
  },
};

async function executeTransactionWithRetry(callback) {
  const maxRetries = 5;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sequelize.transaction(async (t) => {
        await callback();
      });
      break; // Thoát khỏi vòng lặp nếu thành công
    } catch (error) {
      if (error.name === 'SequelizeDatabaseError' && error.parent.code === 'ER_LOCK_DEADLOCK') {
        console.log(`Deadlock detected. Retrying... Attempt ${attempt}`);
        if (attempt === maxRetries) throw error; // Ném lỗi nếu đạt giới hạn retry
      } else {
        throw error; // Ném lỗi khác
      }
    }
  }
}