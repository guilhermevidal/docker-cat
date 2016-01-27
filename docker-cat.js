var Docker = require('dockerode');
var through2 = require('through2');
var DockerCat = (function () {
    function DockerCat(dockerOptions) {
        this._docker = new Docker(dockerOptions);
    }
    DockerCat.prototype.run = function (image, path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var contents = '';
            var error = '';
            var outStream = through2(function (chunk, enc, callback) {
                contents += chunk.toString();
                callback();
            });
            var errStream = through2(function (chunk, enc, callback) {
                error += chunk.toString();
                callback();
            });
            _this._docker.run(image, ['/bin/cat', path], [outStream, errStream], { Tty: false }, function (err, data, container) {
                if (err)
                    reject(new Error(err));
                else
                    container.remove({ force: true }, function (err, data) {
                        if (err)
                            reject(new Error(err));
                        else if (error)
                            reject(new Error(error));
                        else
                            resolve(contents);
                    });
            });
        });
    };
    return DockerCat;
})();
exports.DockerCat = DockerCat;
//# sourceMappingURL=docker-cat.js.map