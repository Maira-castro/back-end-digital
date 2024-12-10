const sequelize = require('../config/conexao'); // Certifique-se de que o caminho esteja correto
const { DataTypes } = require('sequelize');
const produto = require('./tabelaProduto'); // Certifique-se de que o caminho esteja correto

const ImagensProduto = sequelize.define('imagensProduto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: produto,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
});

ImagensProduto.belongsTo(produto, { as: 'produto', foreignKey: 'product_id' });
produto.hasMany(ImagensProduto, { as: 'imagensProduto', foreignKey: 'product_id' });


sequelize.sync({ alter: true })
    .then(() => {
        console.log('Tabelas imagensProduto sincronizadas.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabelas:', err);
    });

module.exports = ImagensProduto;