var express = require('express');
var app = express();
var fs = require('fs');
app.use(express.bodyParser());

app.callMod = function(name) {
    return require(name);
};

global.__fwpath = __dirname;
global.__base = require('path').resolve('./');
global.config = {};

if (fs.existsSync(__base+'/config.json')) {
    config = require(__base+'/config.json');
    console.log('CONFIGURATION FILE FOUND:');
    console.log(config);
}

var bundler = require('bundler');

app.get(/(.*)/, function(req, res) {
    var __params = [app, req, res];
    
    require('router').apply(null, __params);
});

var port = config.listen || 3000;
app.listen(port);
console.log('Iniciado na porta '+ port);