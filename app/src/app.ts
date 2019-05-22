import './bootstrap';
import { context } from '@application/configuration/loaders/infrastructureContext';

(async () => {
    await context.configure();
    context.application.run();
})();
