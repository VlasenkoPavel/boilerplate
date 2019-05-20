
import { ConsoleApp } from 'core';
import { CommonAppContext } from './CommonAppContext';

export class ConsoleAppContext extends CommonAppContext {
    get consoleApp() {
        return new ConsoleApp(this.dbConnector);
    }
}
