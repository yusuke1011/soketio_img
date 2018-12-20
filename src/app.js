const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
const ejs = require('ejs');

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/public',express.static(__dirname+'/public'));

app.get('/', (req,res) => {
    res.render('index.ejs');
});

io.on('connection', (socket) => {
    console.log('connect');
    socket.on('img send', (img) => {
        socket.broadcast.emit('img send', img);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
