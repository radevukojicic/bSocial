module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("post", {
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      });

    return Post

}