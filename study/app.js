const express = require('express');         // express의 내장함수
const nunjucks = require('nunjucks');   //controller에서 데이터 감지 후 프론트로 뿌려주는 _ view엔진 (template으로 html을 뿌려줌)
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');

class App {

    constructor () {
        this.app = express();

        // db 접속
        this.dbConnection();

        // 뷰엔진 셋팅
        this.setViewEngine();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();
    }

    //DB 접속에 성공하면, 에러나면
    dbConnection(){
        // DB authentication
        db.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .then(() => {
            console.log('DB Sync complete.');
            // return db.sequelize.sync(); //테이블생성
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    setMiddleWare (){
        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    setViewEngine (){
        //template = 폴더명, render 위치
        // html 태그가 true일 때는 작동하지 않고, false 일때는 작동 = html 공격을 막아준다 (글쓰기 같은부분)
        //express는 현재 app 파일
        nunjucks.configure('study/template', {
            autoescape: true,
            express: this.app
        });
    }

    setStatic (){
        //url, express에서 정적파일인 uploads라는 폴더를 넣어줘
        this.app.use('/uploads', express.static('study/uploads'));
    }

    setLocals(){
        // 템플릿 변수
        this.app.use( (req, res, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.req_path = req.path;
            next();
        });
    }

    getRouting (){
        this.app.use(require('./controllers'))
    }

    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).render('common/404.html')
        });
    }

    errorHandler() {

        this.app.use( (err, req, res,  _ ) => {
            res.status(500).render('common/500.html')
        });
    }
}

module.exports = new App().app;