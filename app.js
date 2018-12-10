

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let users = [];
app.use(require('express').static('public'))

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    res.redirect('/index.html')

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});




io.on('connection',socket=>{
  
  socket.on('login',data=>{
    if(!data){
      console.log(data,222)
      return
    }

  //  let user= users.find(item=>item.username===data.username)
    console.log(data)
    let user = ''
    if(user){

      socket.emit('loginError',{msg:'登录失败'})
      console.log('登录失败')
    }else {
      users.push(data)
      socket.emit('loginSuccess',data)
      console.log('登录成功')

      // 告诉所有用户，有用户加入到了聊天室，广播消息
      // socket.emit:告诉当前用户
      // io.emit: 广播事件
      io.emit('addUser',data)

      // 告诉所有的用户，目前聊天室有多少人
      io.emit('userList',users)
    }
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})