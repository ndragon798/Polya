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
var dict=new Map();
var b = 1;
var e = 1001;

var io = require('socket.io').listen(server);
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
                io.sockets.emit('range', datan);
            }
        );
        socket.on('done', function(data) {
            // console.log(typeof data.a);
            // console.log(data.a);
            // console.log(data);
            // for (var [key, value] of data.a) {
            //     dict.set(key, value);
            // }
            console.log(data.b+" "+data.e);
            // console.log(data.a);
            for (var i = 0; i < data.a.length; i++) {
                dict.set(data.b+i,data.a[i]);
            }
            // console.log(dict);
            if (data.m == true) {

                if (b < 1000000000) {
                    var datan = {
                        u: data.u,
                        b: b,
                        e: e
                    };
                    b = e;
                    e = b + 10000;
                    io.sockets.emit('range', datan);
                }
            }
        });

    }
);

setInterval(function() {
    console.log("Checking Map");
    checkmap();
}, 30000);

function prime(n) {
    var ogn = n;
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
        if (dict.get(i)==0) {

            console.log(dict.get(i));
            genlist.push(i);
        }
    }
    console.log(genlist[0]);
    console.log(genlist[genlist.length - 1]);
    console.log("Generating: " + genlist.length + " missed factors");
    for (var i = 1; i < genlist.length; i++) {

        dict.set(i, prime(i));
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
    for (var [key, value] of dict) {
        if (value.length % 2 == 0 || key ==1) {
            even++;
        } else {
            odd++;
        }
        if (even > odd && key != 1) {
            console.log("Winner");
            process.exit();
        }
    }
}