// HTTP Portion
var http = require('http');
// URL module
var url = require('url');
var path = require('path');

// Using the filesystem module
var fs = require('fs');

var server = http.createServer(handleRequest);
server.listen(7659);

console.log('Server started on port 7659');

function handleRequest(req, res) {
    // What did we request?
    res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
    var pathname = req.url;
    // console.log(req.connection.remoteAddress);
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
var e = 1001;

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
                // b = e;
                // b++;
                // e = b + 10000;
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
            if (data.m == true) {

                if (b < 1000000000) {
                    var datan = {
                        u: data.u,
                        b: b,
                        e: e
                    };
                    // console.log("OLD B: " + b);
                    b = e;
                    // console.log("NEW B: " + b);
                    // console.log("OLD E: " + e);
                    e = b + 10000;
                    // console.log("NEW E: " + e);
                    io.sockets.emit('range', datan);
                }
            }else{
                console.log(e);
                e=e-10000;
                console.log(e);
            }

        });
    }
);
setInterval(function() {
    console.log("Checking Map");
    checkmap();
}, 60000);

function prime(n) {
    var ogn = n;
    // if (n % 1000 == 0) {
    //     // console.log(n);
    // }
    var primfac = [];
    var d = 2;
    while (d * d <= n) {
        while ((n % d) == 0) {
            primfac.push(d);
            Math.floor(n /= d);
        }
        d += 1;
    }
    if (n > 1) {
        primfac.push(n);
    }
    return primfac;
}

function checkforcompmap() {
    // var large;
    // var small;
    var genlist = [];
    console.log("LARGEST KEY: " + e);
    for (var i = 1; i <= e; i++) {
        if (!(i in dict)) {
            // console.log(dict[i]);
            genlist.push(i);
        }
    }
    console.log(genlist[0]);
    console.log(genlist[genlist.length - 1]);
    console.log("Generating: " + genlist.length + " missed factors");
    for (var i = 1; i < genlist.length; i++) {
        dict[i] = prime(i);
        // console.log(dict[i]);
    }
    // return dict;
}

function checkmap() {
    var even = 0;
    var odd = 0;
    var prev = 0;
    // console.log(dict);
    console.log("CHECKING MAP");
    checkforcompmap();
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            if (dict[key].length % 2 == 0) {
                even++;
            } else {
                odd++;
            }
            // if (key == 906150257) {
            //     console.log("Winner");
            //     process.exit();
            // }
            if (even > odd && key != 1) {
                console.log("Winner");
                process.exit();
            }
        }
    }
}