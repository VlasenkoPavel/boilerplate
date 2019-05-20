import './bootstrap';
import { context } from '@application/configuration/loaders/infrastructureContext';

const run = async () => {
    await context.configure();
    context.application.run();
};

run();
