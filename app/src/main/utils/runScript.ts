import { IRunnable } from '@chaika/core';
import { context } from '@application/configuration';

export const runScript = async (runnable: IRunnable): Promise<void> => {
    await context.configure();
    const app = context.consoleApp;

    await app.run(runnable);
};
