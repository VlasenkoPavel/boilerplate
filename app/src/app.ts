import './bootstrap';
import { context } from '@application/configuration';

(async () => {
    await context.configure();
    await context.application.run();
})();
