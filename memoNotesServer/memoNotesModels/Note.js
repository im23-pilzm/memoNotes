module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("Note", {
        note_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        note_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return Note;
};