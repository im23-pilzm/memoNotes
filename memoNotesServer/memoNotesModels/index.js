const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;

User = require("./User")(sequelize, Sequelize);
TODO = require("./TODO")(sequelize, Sequelize);
Note = require("./Note")(sequelize, Sequelize);

const db = {
    User,
    TODO,
    Note,
    sequelize,
    Sequelize
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.User.hasMany(db.TODO, {foreignKey: "user_id", onDelete: "CASCADE"});
db.TODO.belongsTo(db.User, {foreignKey: "user_id"});

db.User.hasMany(db.Note, {foreignKey: "user_id", onDelete: "CASCADE"});
db.Note.belongsTo(db.User, {foreignKey: "user_id"});

module.exports = db