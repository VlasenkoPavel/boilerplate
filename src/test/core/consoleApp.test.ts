import { Tester } from '@test/common/Tester';
import { ConsoleApp, IRunnable } from '@core/.';
import { Type } from '@core/Type';
import { Provider, consoleAppLoaders } from '@core/configuration';
import { getConnection } from 'typeorm';

class ConsoleAppTester extends Tester {
    private app: ConsoleApp;

    public run() {
        beforeAll(async () => {
            const provideApp = this.getComponent<Provider<ConsoleApp>>(Type.ApplicationProvider);
            this.app = await provideApp();
        });

        describe('consoleApp tests', () => {
            it('loading test', () => {
                expect(this.app).toBeInstanceOf(ConsoleApp);
            });

            /* tslint:disable:max-classes-per-file */
            it('is db connected, script has been run and then connection has been closed', async () => {
                let hasBeenRun = false;

                class Script implements IRunnable {
                    public run() {
                        hasBeenRun = true;
                        expect(getConnection().isConnected).toBeTruthy();
                    }
                }

                await this.app.run(new Script());

                expect(hasBeenRun).toBeTruthy();
                expect(getConnection().isConnected).toBeFalsy();
            });
        });
    }
}

new ConsoleAppTester(consoleAppLoaders).run();
