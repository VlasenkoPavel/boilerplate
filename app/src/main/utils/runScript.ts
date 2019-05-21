import { IRunnable } from 'core';
import { context } from '@application/configuration/loaders/infrastructureContext';

export const runScript = async (runnable: IRunnable): Promise<void> => {
    await context.configure();
    const app = context.consoleApp;

    await app.run(runnable);
};
