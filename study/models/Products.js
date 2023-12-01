const moment = require('moment');

// products 테이블 생성 및 연결
module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name : { type: DataTypes.STRING },
            price : { type: DataTypes.INTEGER },
            description : { type: DataTypes.TEXT }
        }
    );

    Products.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD')
    );

    return Products;
}