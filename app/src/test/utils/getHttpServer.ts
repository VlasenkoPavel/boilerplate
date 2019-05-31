import { Application, Optional } from '@chaika/application';
import { Server } from 'http';

export function getHttpServer(this: Application): Optional<Server> {
    return this.context['expressServer'] ? this.context['expressServer'].getHttpServer() as Server : undefined;
}
