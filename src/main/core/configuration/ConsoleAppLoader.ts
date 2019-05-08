import { Container, interfaces } from 'inversify';

import { Type } from '../Type';
import { ConsoleApp } from '../ConsoleApp';
import { Provider } from './types';
import { CommonAppLoader } from './CommonAppLoader';
import { IConnector } from '@core/types';

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
