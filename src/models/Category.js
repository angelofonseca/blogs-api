module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
    {
      timestamps: false,
      underscored: true,
      tableName: 'categories',
    });
  return Categories;
}