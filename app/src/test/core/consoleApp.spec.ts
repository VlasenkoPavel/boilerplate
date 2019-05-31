import { TestCommand, test } from '@chaika/test';
import { execute } from '@main/utils/execute';

/* tslint:disable:max-classes-per-file */
class ConsoleAppTester extends TestCommand {
    @test()
    protected async isDBConnectionEstablished() {
        let isConnectionEstablished = false;

        class FirstCommand {
            public execute() { isConnectionEstablished = true; }
        }

        await execute(FirstCommand);

        expect(isConnectionEstablished).toBe(true);
    }

    @test()
    protected async isCommandExecuted() {
        let isFirstCommandExecuted = false;
        let isSecondCommandExecuted = false;

        class FirstCommand {
            public execute() { isFirstCommandExecuted = true; }
        }

        class SecondCommand {
            public execute() { isSecondCommandExecuted = true; }
        }

        await execute(FirstCommand, SecondCommand);

        expect(isFirstCommandExecuted).toBeTruthy();
        expect(isSecondCommandExecuted).toBeTruthy();
    }
}

new ConsoleAppTester().execute();
