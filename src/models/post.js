"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //User;
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userPostData",
      });
      //DetailPost
      Post.hasOne(models.DetailPost, {
        foreignKey: "postId",
        as: "postDetailData",
      });
      //Note
      Post.hasMany(models.Note, {
        foreignKey: "postId",
        as: "postNoteData",
      });
      //NopCv
      Post.belongsToMany(models.Cv, { through: models.NopCv });
    }
  }
  Post.init(
    {
      status: DataTypes.STRING,
      timeEnd: DataTypes.STRING,
      timePost: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isHot: DataTypes.TINYINT,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
