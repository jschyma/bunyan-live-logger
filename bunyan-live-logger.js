var Stream = require('stream').Stream
    , util = require('util');
var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');

function BunyanLiveLogger(){
    Stream.call(this);
    this.writable = true;
    // Start WebService
    var router = express();
    var server = http.createServer(router);
    var io = socketio.listen(server,{ log: false });
    
    router.use(express.static(path.resolve(__dirname, 'client')));
    var messages = [];
    var sockets  = [];
    var is_started = false;
    var next_log_nr = 0;
    
    io.on('connection', function (socket) {
        messages.forEach(function (data) {
          socket.emit('message', data);
        });
        is_started = true;
    
        sockets.push(socket);
    
        socket.on('disconnect', function () {
          sockets.splice(sockets.indexOf(socket), 1);
          if(sockets.length==0){
              // Close entire service
              is_started = false;
              server.close();
          }
        });
    
        socket.on('message', function (msg) {
            return;
        });
      });
    function broadcast(event, data) {
        sockets.forEach(function (socket) {
            socket.emit(event, data);
        });
    }
    
    server.listen(0, "127.0.0.1", function(){
      var addr = server.address();
      console.log("Live Logging server listening at", addr.address + ":" + addr.port);
    });
    
    this.newLog = function(log){
        var log_entry = {nr:0,entry:null};
        log_entry.nr = next_log_nr++;
        log_entry.entry = log;
        if(is_started){
            sockets.forEach(function (socket) {
                socket.emit('message', log_entry);
            });
        } else{
            messages.push(log_entry);
        }
    };
};
util.inherits(BunyanLiveLogger, Stream);

BunyanLiveLogger.prototype.write = function (rec) {
    if (!this.writable) throw new Error('failed to write to a closed stream');
    this.newLog(rec);
};
BunyanLiveLogger.prototype.end = function (rec) {
    //if (arguments.length) this.write(rec)
    this.writable = false;
};
BunyanLiveLogger.prototype.destroy = function () {
    this.writable = false;
};

module.exports = function(){return new BunyanLiveLogger()};