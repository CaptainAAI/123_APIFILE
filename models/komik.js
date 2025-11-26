module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define('Komik', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Judul: {
                type: DataTypes.STRING,
                allowNull: false
        },
        Penulis: {
                type: DataTypes.STRING,
                allowNull: false
        },
        deskripsi: {
                type: DataTypes.TEXT,
                allowNull: false
        },
        imageType: DataTypes.STRING,
        imageName: DataTypes.STRING,
        imageData: DataTypes.BLOB('long')
        }, {
            tableName: 'komik',
            freezeTableName: true,
            timestamps: true
        });
        return Komik;
};
