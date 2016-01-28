/// <reference path="..\typings\main.d.ts" />
import * as Docker from 'dockerode';
import * as fs from 'fs';
import * as through2 from 'through2';

export class DockerCat {
    private _docker: Docker;

    constructor(dockerOptions: DockerOptions) {
        this._docker = new Docker(dockerOptions);
    }

    run(image: string, path: string) {
        return new Promise((resolve, reject) => {
            var contents = '';
            var error = '';

            var outStream = through2((chunk, enc, callback) => {
                contents += chunk.toString();
                callback();
            });
            var errStream = through2((chunk, enc, callback) => {
                error += chunk.toString();
                callback();
            });

            this._docker.run(image, ['/bin/cat', path], [outStream, errStream], { Tty: false }, (err, data, container) => {
                if (err) reject(new Error(err))
                else container.remove({ force: true }, (err, data) => {
                    if (err) reject(new Error(err))
                    else if (error) reject(new Error(error))
                    else resolve(contents);
                });

            });
        })
    }
}

export interface DockerOptions {
    host: string,
    port: number,
    ca?: Buffer,
    cert?: Buffer,
    key?: Buffer,
}
