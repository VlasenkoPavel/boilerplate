import { Class } from '@chaika/application';
import { ICommand } from '@chaika/app-components';
import { buildConsoleApp } from './buildConsoleApp';

export const execute = async (...commands: Class<ICommand>[]): Promise<void> => {
    const app = await buildConsoleApp(commands);
    await app.start();
    await app.stop();
};
