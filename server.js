const express = require('express');
const path = require('path');
const http = require('http');
const ejs = require('ejs');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', (path.join(__dirname, 'public')));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let boxMessages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.on('sendMessage', data => {
        boxMessages.push(data);
        socket.broadcast.emit('receveidMessage', data);
    });

});

server.listen(3000);