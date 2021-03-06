import * as express from 'express';
import * as path from 'path';
import { Logger } from 'log4js';
import { createExpressServer, useContainer } from 'routing-controllers';
import { interfaces } from 'inversify';
import { Server } from 'http';

import { ServerConfig } from './config-validators/ServerConfig';
// import { DebugForm } from 'sm_common/src/debugForm';

export class ExpressServer {
    public readonly express: express.Application;
    private logger: Logger;
    private server: Server;
    private config: ServerConfig;

    constructor(
        config: ServerConfig,
        middlewares: string[] | Function[],
        logger: Logger,
        container?: interfaces.Context['container']
    ) {
        this.logger = logger;
        this.config = config;
        const controllers = [this.makePath(this.config.controllers)];

        useContainer(container);
        this.express = createExpressServer({
            controllers,
            middlewares,
            defaultErrorHandler: false
        });
    }

    public async start() {
        const { host, port } = this.config;

        // if (env != 'prod') {
        //     this.addDebugPanel();
        // }

        try {
            await new Promise<void>((resolve, reject) => {
                this.server = this.express.listen(port, host, (err: any) => {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                })
                .on('error', err => {
                    reject(err);
                });
            });
        } catch (e) {
            this.logger.error(e);
            process.exitCode = 1;
            await this.start();

            return;
        }

        this.logger.info(`Server started at http://${host}:${port}`);
    }

    public getHttpServer() {
        if (!this.server) {
            throw new Error('Server not started');
        }

        return this.server;
    }

    public stop() {
        this.server.close();
    }

    // private addDebugPanel() {
    //     const PUBLIC_PATH = this.makePath(this.config.public);
    //     const docPath = `${PUBLIC_PATH}/doc`;
    //     const debugForm = new DebugForm({
    //         docPath,
    //         disableVersioning: true
    //     });
    //     this.express.use('/', debugForm.router);
    //     this.express.use(express.static(PUBLIC_PATH));
    // }

    private makePath(filePath: string) {
        return path.resolve(__dirname, '../../../', filePath);
    }
}
