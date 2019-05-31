import './bootstrap';
import { buildApp } from '@main/utils/buildApp';

(async () => {
    const app = await buildApp();
    await app.init();
    await app.start();
})();
