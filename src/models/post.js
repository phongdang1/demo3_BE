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
      //Cv_post - Post
      Post.belongsToMany(models.User, { through: models.CvPost });
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
    }
  }
  Post.init(
    { 
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      timeEnd: DataTypes.STRING,
      isHot: DataTypes.TINYINT,
      timePost: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
