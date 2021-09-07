const Sequelize = require('sequelize');
const connection = require('./database');

const Answers = new connection.define('answers',{
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})