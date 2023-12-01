const app = require('./app');
const port =3000;

//web서버를 띄우기 위해 listen 사용, port 지정 
app.listen(port, () => {
    console.log('express listening on port : ', port)
});



// 터미널에 npm init -y 입력, node_modules 및 package.json 생성
// 다른 사람이 만든 npm 모듈 다운받아 사용하기 / package.json _ dependencies
// npm install express, npm install uuid4
// node_modules 용량이 크므로 빼고 파일들 전송, 전송 받은 파일은 npm install 하면 자동으로 다 생성
// package-lock.json : 해당버전들이 적혀 있고 그 버전을 참조하는 최상의 버전들이 적혀있다, 모듈 충돌 방지
// npm start, npm run dev 실행 (dev를 실행할때는 run 을 같이 입력해야 한다)