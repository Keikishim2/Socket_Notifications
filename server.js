const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');

app.use(session({
    secret: 'masocket',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.static(__dirname + '/static'));
app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function (socket) {
    socket.on("id", function(id){
        socket.id = socket.id;
        io.emit('online', '🟢' + socket.id + ' joined us!!');
    });
    socket.on('disconnect', function(id) {
        io.emit('online', '⚪' + socket.id + ' left us!.');
    })
    socket.on('chat', function(id) {
        io.emit('chat', '<strong>' + socket.id + '</strong>: ' + 'triggered a notification!');
    });
});
const server = http.listen(8000, function() {
    console.log('Listening on port 8000');
});