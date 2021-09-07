const Sequelize = require('sequelize');

const connection = new Sequelize('askplatform','root','2212',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;