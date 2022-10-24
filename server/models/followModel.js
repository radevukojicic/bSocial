module.exports = (sequelize, DataTypes) => {

    const Follow = sequelize.define("follow", {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        followingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      });

    return Follow

}