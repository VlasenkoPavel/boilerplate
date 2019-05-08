import { IRunable, IConnector } from './types';

export class ConsoleApp {
    private connector: IConnector;

    constructor(connector: IConnector) {
        this.connector = connector;
    }

    public async run(runable: IRunable) {
        await this.connector.connect();

        try {
            await runable.run();
        } finally {
            await this.end();
        }
    }

    public async end() {
        await this.connector.closeConnection();
    }
}
