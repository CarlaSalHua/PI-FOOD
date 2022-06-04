const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    // idType:{
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    // },
    nameType:{
        type: DataTypes.STRING,
        allowNull: false,
    }
 });
};