import { ExpressServer } from './components/ExpressServer';
import { IConnector } from './types';

export class Application {
    private connector: IConnector;
    private server: ExpressServer;

    constructor(connector: IConnector, server: ExpressServer) {
        this.connector = connector;
        this.server = server;
    }

    public async run(): Promise<void> {
        await this.beforeRunHook();
        await this.connector.connect();
        await this.server.run();
    }

    public getHttpServer() {
        return this.server.getHttpServer();
    }

    public async stop() {
        await Promise.all([this.connector.closeConnection(), this.server.stop()]);
    }

    private async beforeRunHook() {}
}
