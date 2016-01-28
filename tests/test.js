var docker_cat_1 = require('../dist/docker-cat');
var fs = require('fs');
var path = require('path');

var cat = new docker_cat_1.DockerCat({
    host: 'http://192.168.99.100',
    port: 2376,
    ca: fs.readFileSync(path.join('keys', 'ca.pem')),
    cert: fs.readFileSync(path.join('keys', 'cert.pem')),
    key: fs.readFileSync(path.join('keys', 'key.pem')),
});

cat.run('busybox', '/etc/mtab')
    .then(function (data) { console.log(data); })
    .catch(function (error) { console.error(error); });
