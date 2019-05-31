import { TestCommand, test } from '@chaika/test';
import { Class, ICommand, Application } from '@chaika/application';
import { buildConsoleApp } from '@main/utils/buildConsoleApp';

const commands: Class<ICommand>[] = [];

export class DbIntegrationTester extends TestCommand {
    protected commands: Class<ICommand>[];
    protected app: Application;

    constructor(commands: Class<ICommand>[]) {
        super();
        this.commands = commands;
    }

    protected async setUp(): Promise<void> {
        this.app = await buildConsoleApp(this.commands);
    }

    @test()
    protected firstTest() {
        expect(true).toBeTruthy();
    }

    protected async tearDown(): Promise<void> {
        await this.app.stop();
    }
}

new DbIntegrationTester(commands).execute();
