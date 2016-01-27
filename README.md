# docker-cat
Show contents of file inside a docker image

``` js
var DockerCat = require('docker-cat')

var cat = new DockerCat({}).run;
cat('busybox', '/etc/mtab')
    .then(function (data) { console.log(data); })
    .catch(function (error) { console.error(error); });
```

## License

MIT / Apache2