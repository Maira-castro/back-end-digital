const sequelize = require('../config/conexao');
const { DataTypes } = require('sequelize');
const Produtos = require('./tabelaProduto'); 
const Categoria = require('./tabelaCategoria');

const CategoriaProduto = sequelize.define('categoriaProduto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produtos_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produtos,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    categoria_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id'
        },
        onDelete: 'CASCADE'
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
}, {
    tableName: 'categoriaProduto' 
});

CategoriaProduto.belongsTo(Produtos, { as: 'produto', foreignKey: 'produtos_id' });
Produtos.hasMany(CategoriaProduto, { as: 'categoriaProduto', foreignKey: 'produtos_id' });

CategoriaProduto.belongsTo(Categoria, { as: 'categoria', foreignKey: 'categoria_id' });
Categoria.hasMany(CategoriaProduto, { as: 'categoriaProduto', foreignKey: 'categoria_id' });

module.exports = CategoriaProduto;