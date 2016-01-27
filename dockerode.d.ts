declare module "dockerode" {
    class Docker {
        constructor(options?: Docker.DockerOptions);

        run(Image: string, CMD: string[], stream: (NodeJS.ReadWriteStream | NodeJS.ReadWriteStream[]), options: {}, callback: (err: any, data: any, container: Docker.Container) => void): void
    }

    module Docker {
        interface DockerOptions {
            host: string,
            port: number,
            ca?: Buffer,
            cert?: Buffer,
            key?: Buffer,
        }

        interface DataCallback {
            (err: any, data: any): void;
        }

        interface Container {
            remove(options: Container.RemoveOptions, callback: DataCallback): void;
        }
        module Container {
            interface RemoveOptions {
                force: boolean
            }
        }
    }
    export = Docker;
}