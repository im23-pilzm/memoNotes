const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("memonotedb", "postgres", "MLsGoTERuMFS_9", {
    host: "localhost",
    dialect: "postgres"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.TODO = require("./TODO")(sequelize, Sequelize);
db.Note = require("./Note")(sequelize, Sequelize);

db.User.hasMany(db.TODO, {foreignKey: "user_id", onDelete: "CASCADE"});
db.TODO.belongsTo(db.User, {foreignKey: "user_id"});

db.User.hasMany(db.Note, {foreignKey: "user_id", onDelete: "CASCADE"});
db.TODO.belongsTo(db.User, {foreignKey: "user_id"});

module.exports = db