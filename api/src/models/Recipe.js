const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      //defaultValue:'https://blog.contraelcancer.es/wp-content/uploads/2020/03/iStock-1017706758-mod.jpg',
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No se ingreso resumen a la receta',
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.STRING,
      defaultValue: 'No se ingresaron los pasos a la receta',
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
