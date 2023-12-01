const express = require('express');

const app = express();
const port = 3000;


app.get('/', ( _ ,res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen( port, () => {
    console.log('Express listening on port', port);
});

//소켓서버 : 비동기 이벤트 방식으로 "실시간"으로 간단하게 데이터를 주고받을 수 있게 만든 라이브러리
const listen = require('socket.io');
const io = listen(server);

//임의의 사용자
const color = [
  "yellow",
  "green",
  "red",
  "blue",
  "white",
  "black",
]

//index.html에서 넘어오는 client message 받을 준비
io.on('connection', (socket) => { 

  //사용자 랜덤으로 할당
  const username = color[ Math.floor(Math.random() * 6) ];

  //내꺼는 볼 필요가 없으니까... ex) 임의의 사용자가 join으로 입장했습니다
  socket.broadcast.emit( 'join',  {  username  } );
  
  //io.emit =  연결된 모든 사람에게 뿌리기(server message)
  //채팅내용을 나도 봐야 하니까 io.emit 사용 / 반대) broadcast.emit
  socket.on('client message', (data) => {
      io.emit('server message', {
        username ,
        message : data.message
    });
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', { username });
  });
});