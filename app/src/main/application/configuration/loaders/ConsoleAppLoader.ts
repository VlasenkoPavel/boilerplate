import { Container, interfaces } from 'inversify';

import { Type } from '@application/configuration/Type';
import { ConsoleApp, IConnector } from 'core';
import { Provider } from '../types';
import { CommonAppLoader } from './CommonAppLoader';

export class ConsoleAppLoader extends CommonAppLoader {
    public load (container: Container) {
        super.load(container);

        container.bind<Provider<ConsoleApp>>(Type.ApplicationProvider).toProvider<ConsoleApp>(
            (context: interfaces.Context) => async () => {
                const connector: IConnector
                    = await this.getComponent<Provider<IConnector>>(context, Type.ProvideConnector)();

                return new ConsoleApp(connector);
            });
    }
}
