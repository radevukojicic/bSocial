module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("comments", {
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      });

    return Comments

}