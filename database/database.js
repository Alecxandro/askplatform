const Sequelize = require('sequelize');

const connection = new Sequelize('askplatform','root','password',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;