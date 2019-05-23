import { AppTester } from '@test/common';
import { Application } from '@chaika/core';
import { AppRequester } from '@test/common/Requester';

class ApplicationTester extends AppTester {
    protected test() {
        describe('Application tests', () => {
            it('loading test', () => {
                expect(this.app).toBeInstanceOf(Application);
                expect(this.requester).toBeInstanceOf(AppRequester);
            });
        });
    }
}

new ApplicationTester().run();
