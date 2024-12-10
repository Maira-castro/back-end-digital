//carrega variaveis do arquivo .env
require('dotenv').config();

const Sequelize = require('sequelize');

//configurando bd
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

//autentica conexa

sequelize.authenticate()
 .then(() => console.log('conexão com banco de dados bem sucedida'))
 .catch(err => console.error('Não foi possivel fazer conexão:',err));

 module.exports = sequelize;