import { Application } from '@chaika/application';
import { Server } from 'http';
import { ExpressServer } from '@chaika/app-components';

export function getHttpServer(this: Application): Server {
    const expressServer: ExpressServer =
        [...this.components.values()].find(component => component instanceof ExpressServer) as ExpressServer;

    if (!expressServer) {
        throw new Error('Application has no ExpressServer component');
    }

    return expressServer.getHttpServer();
}
