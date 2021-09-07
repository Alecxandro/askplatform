const Sequelize = require('sequelize');
const connection = require('./database');

const Questions = connection.define('questions',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Questions.sync({force: false}).then(()=>{
    console.log('Table questions created!')
}).catch((err)=>{
    console.log(err);
})

module.exports = Questions;
