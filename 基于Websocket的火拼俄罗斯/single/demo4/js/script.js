var socket = io("ws://193.112.48.106:3000/");
var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting', function(str) {
    document.getElementById('waiting').innerHTML = str;
});