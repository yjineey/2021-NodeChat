var Sequelize = require('sequelize');   //db연결
var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');   //env

dotenv.config(); //LOAD CONFIG

console.log("DATABASE", process.env.DATABASE);
console.log("DB_USER", process.env.DB_USER);
console.log("DB_PASSWORD", process.env.DB_PASSWORD);
console.log("DB_PORT", process.env.DB_PORT);

//mysql 데이터 접속부분이고 app.js에서 설정 .env에서 db정보 가져와서 사용
// const sequelize = new Sequelize( 
//   process.env.DATABASE,
//   process.env.DB_USER, 
//   process.env.DB_PASSWORD,{
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     timezone: '+09:00', //한국 시간 셋팅
//     operatorsAliases: Sequelize.Op,
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
//   });

  //mysql 데이터 접속부분이고 app.js에서 설정 .env에서 db정보 가져와서 사용
  const sequelize = new Sequelize( 
    "fastcampus",
    "root", 
    "12345",{
      host: "localhost",
      dialect: 'mysql',
      timezone: '+09:00', //한국 시간 셋팅
      operatorsAliases: Sequelize.Op,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
  });

let db = [];

fs.readdirSync(__dirname)
    .filter(file => {
      //index.js 파일을 제외하고 파일들을 참조에서 테이블 생성
      return file.indexOf('.js')&& file !== 'index.js'
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname,
            file));
            db[model.name] = model;
    });

    //외부키가 걸린 테이블
Object.keys(db).forEach(modelName => {
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;