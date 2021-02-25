

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('join-room', (roomid, peerid, type) => {
        socket.join(roomid);
        socket.to(roomid).broadcast.emit(type === 1 ? "sender-connected" : "receiver-connected", peerid);

        socket.on('disconnect', () => {
            socket.to(roomid).broadcast.emit(type === 1 ? "sender-disconnected" : "receiver-disconnected", peerid);
        });
    });
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



app.get(('/peer.js'), function(req, res){

	res.sendFile(dir.get('../ywork/peer.js'));

})


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



const { PeerServer } = require('peer');

const peerServer = PeerServer({
  port: data.peer_port,
  ssl: {
    key: fs.readFileSync(('c:/dd/virtual_machine/SSL/'+data.ssl_folder+'/ssl/key.key')),
    cert: fs.readFileSync(('c:/dd/virtual_machine/SSL/'+data.ssl_folder+'/ssl/crt.crt'))
  }
});


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
