//tabela usuario
const {DataTypes}=require('sequelize');
const sequelize = require ('../config/conexao');

const Usuario = sequelize.define('Usuario',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull:false
      },
      surname: {
        type: DataTypes.STRING,
        allowNull:false
      },
      email:{
        type: DataTypes.STRING,
        allowNull:false
      },
      password:{
        type: DataTypes.STRING,
        allowNull:false
      },
    },
    {
      timestamps:true, //cria automaticamente as colunas createdAt e updatedAt
});
sequelize.sync()
module.exports = Usuario;