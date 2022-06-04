const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'No se ingreso resumen a la receta',
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      default: 'No se indico el puntaje de salubridad',
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: true,
      default: 'No se ingresaron los pasos a la receta',
    }
  });
};
