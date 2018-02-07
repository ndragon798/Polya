// HTTP Portion
var http = require('http');
// URL module
var url = require('url');
var path = require('path');

// Using the filesystem module
var fs = require('fs');

var server = http.createServer(handleRequest);
server.listen(8080);

console.log('Server started on port 8080');

function handleRequest(req, res) {
    // What did we request?
    res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
    var pathname = req.url;
    console.log(req.connection.remoteAddress);
    // If blank let's ask for index.html
    if (pathname == '/') {
        pathname = '/index.html';
    }

    // Ok what's our file extension
    var ext = path.extname(pathname);

    // Map extension to file type
    var typeExt = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };

    // What is it?  Default to plain text
    var contentType = typeExt[ext] || 'text/plain';

    // User file system module
    fs.readFile(__dirname + pathname,
        // Callback function for reading
        function(err, data) {
            // if there is an error
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + pathname);
            }
            // Otherwise, send the data, the contents of the file
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.end(data);
        }
    );
}
var dict = {};
var b = 1;
var e = 10001;
//var even = 0;
//var odd = 0;
// WebSocket Portion
// WebSockets work with the HTTP server

var io = require('socket.io').listen(server);
//io.set('origins', 'http://f355bce2.ngrok.io:*');
//io.origins('*:*');
// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
    // We are given a websocket object in our function
    function(socket) {

        console.log("We have a new client: " + socket.id);

        // When this user emits, client side: socket.emit('otherevent',some data);
        socket.on('new',
            function(data) {
                // Data comes in as whatever was sent, including objects
                console.log("Received: 'new' " + data.u);

                // Send it to all other clients
                // socket.broadcast.emit('new', data);
                var datan = {
                    u: data.u,
                    b: b,
                    e: e
                };
                // console.log(datan.u);
                // console.log(datan.b);
                // console.log(datan.e);
                b = e;
                b++;
                e = b + 10000;
                io.sockets.emit('range', datan);
            }
        );
        socket.on('done', function(data) {
            // console.log(data.u);
            // console.log(data.a);
            for (var key in data.a) {
                if (data.a.hasOwnProperty(key)) {
                    // console.log(data.a[key]);
                    dict[key] = data.a[key];
                }
            }
            // dict+=data.a;
            // console.log(dict);
            // console.log("EVEN: " + even);
            // console.log("ODD: " + odd);
            var datan = {
                u: data.u,
                b: b,
                e: e
            };
            b = e+1;
            e = b + 10000;
            if (b < 1000000000 ) {
                io.sockets.emit('range', datan);
            } 
            if(b%1000000==0) {
                checkmap();
            }
        });
        // socket.on('new',function(data){
        //   socket.broadcast.emit('new',data);
        // });
        // socket.on('hit',function(data){
        //   socket.broadcast.emit('hit',data);
        // })

        // socket.on('disconnect', function() {
        //     console.log("Client has disconnected");
        //     socket.broadcast.emit('exit');
        // });
    }
);

function checkmap() {
    var even=0;
    var odd=0;
    console.log("CHECKING MAP");
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            if (dict[key].length % 2 == 0) {
                even++;
            } else {
                odd++;
            }
            if (key == 906150257) {
                console.log("Winner");
                process.exit();
            }
            if (even > odd && key != 1) {
                console.log("Winner");
                process.exit();
            }
        }
    }
}
