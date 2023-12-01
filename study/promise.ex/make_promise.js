  const waitSeconds = new Promise((resolve, reject) => {
    console.log('시작')
    // reject(console.log('에러'));    //if문 돌려서 사용가능
    setTimeout(() => {
      resolve(console.log('1초뒤에 찍는다!!'));  //1초뒤에 resolve를 찾아가고
    },1000)
  });
  waitSeconds.then(() => {
    console.log("프라미스 이행완료!")
  })
