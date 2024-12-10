const {DataTypes} = require('sequelize')
const sequelize = require('../config/conexao')

const Categoria = sequelize.define('categoria',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    name:{
        type: DataTypes.STRING,
        allwNull: false,
    },
    slug:{
        type: DataTypes.STRING,
        allwNull: false, 
    },
    use_in_menu:{
        type:DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:false,
    },
},{
    timestamps:true,

});


module.exports = Categoria;