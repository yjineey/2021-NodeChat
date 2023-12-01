//내장모듈로 따로 install 하지 않아도 된다, 내장모듈을 활용한 웹서버 띄우기
const http = require('http'); 
http.createServer((request, response)=>{
    response.writeHead(200,{'Context-Type':'text/plain'});
    response.write('Hello Server');
    response.end();
}).listen(3000);