const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    idType:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nameType:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {timeStamps: false,
   createdAt: false, // don't add createdAt attribute
   updatedAt: false}
 );
};