/// <reference path="../typings/main.d.ts" />
export declare class DockerCat {
    private _docker;
    constructor(dockerOptions: DockerOptions);
    run(image: string, path: string): Promise<{}>;
}
export interface DockerOptions {
    host: string;
    port: number;
    ca?: Buffer;
    cert?: Buffer;
    key?: Buffer;
}
