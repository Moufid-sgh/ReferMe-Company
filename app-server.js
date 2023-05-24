/*********************************************** */
//all of importation
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


/*********************************************** */
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-header"],
        credentials: true
    }
});


/*********************************************** */
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true, optionSuccessStatus: 200 }));


/*********************************************** */
app.get('/', (req, res) => {
    return res.render('/index');
});


io.on('connection', (socket) => {
    //console.log('Socket: ', socket)

    if (socket.handshake.headers.cookie) {
        if (socket.handshake.headers.cookie.includes('accessToken')) {
            const accessToken = socket.handshake.headers.cookie.slice(socket.handshake.headers.cookie.search('accessToken')).split('; ')[0].split('accessToken=')[1]
            //console.log('This user is connected: ', accessToken)
            //console.log('host: ', socket.handshake.headers.host)
            //console.log('AccessToken: ', accessToken)
            //console.log('time: ', socket.handshake.time)
            //console.log('********************************* ')
            //connection
            //io.emit('This user is connected: ', accessToken);
            //notif for order sending

            socket.on('send message', message => {
                //console.log('message: ' + message);
                io.emit('emit message', message);
            });
        }
    }
    //deconnection
    socket.on('disconnect', () => {
        //console.log('a user disconnected: ')
        //console.log('host: ', socket.handshake.headers.host)
        //console.log('AccessToken: ', accessToken)
        //console.log('time: ', socket.handshake.time)
        //console.log('********************************* ')
        io.emit('user disconnected');
    });
});

//###################################################
//Server listening
server.listen(process.env.PORT || 5500, (err) => {
    if (err) throw err
    console.log('=> Server Ready on http://localhost:5500')
})

