const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const ejs = require('ejs');


app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/public',express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.render('index1.ejs');
});

app.get('/index2',function(req,res){
    res.render('index2');
});


server.listen(3000);
console.log('now comming...');


io.sockets.on('connection',function(socket){
    //画像をindex1からindex2へと渡す
    socket.on('send_img',function(data){
        console.log(data);
        io.sockets.emit('send_img',data);
    });
});
