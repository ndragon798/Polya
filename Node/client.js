var socket;
socket = io.connect();

var e = 0;
var o = 0;

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
var uuid = guid();

function sendconnect(uuid) {
    var data = {
        u: uuid
    };
    console.log("SENT CONNECT");
    socket.emit('new', data);
}



function prime(n) {
    var ogn = n;
    // if (n % 1000 == 0) {
    //     console.log(n);
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
    // if (primfac.length%2==0){

    // }

    return primfac;
}
var cont=true;

function stopprime(){
    cont=false;
}
var b;
var e;
var assocarray = new Map();

console.log("test");
socket.on('range',
    function(data) {
        console.log("RANGE");
        console.log(typeof assocarray);
        for (var [key, value] of assocarray) {
            console.log(key + " "+value);
        }
	document.getElementById("demo").innerHTML=data.b+"-"+data.e;
        //document.write(data.b);
        console.log(data.b);
        console.log(data.e);
        e=data.e;
        b=data.b;
        if (data.u == uuid) {
            for (var i = data.b; i <= data.e; i++) {
                assocarray.set(i,prime(i));
            }
            var data = {
                u: uuid,
                a: assocarray,
                m: cont
            };
            socket.emit('done', data);
        }
    });
sendconnect(uuid);
