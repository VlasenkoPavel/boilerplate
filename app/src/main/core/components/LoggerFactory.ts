import * as log4js from 'log4js';
import { LogConfig, LogCategoryConfig } from '@c7s/config';

export class LoggerFactory {
    protected readonly logConfig!: LogConfig;
    protected isLoggerLibInitialized = false;

    constructor(consfig: LogConfig) {
        this.logConfig = consfig;
    }

    public create(category: string) {
        if (!this.isLoggerLibInitialized) {
            this.initializeLoggerLib();
        }

        return log4js.getLogger(category);
    }

    protected initializeLoggerLib() {
        if (this.isLoggerLibInitialized) {
            return;
        }

        log4js.configure(this.getLoggerLibConfig());
        this.isLoggerLibInitialized = true;
    }

    protected getLoggerLibConfig() {
        return {
            appenders: {
                everything: this.getAppenderFromConfig(this.logConfig.main),
                access: this.getAppenderFromConfig(this.logConfig.access),
            },
            categories: {
                default: { appenders: ['everything'], level: this.logConfig.main.level },
                db: { appenders: ['everything'], level: this.logConfig.main.level },
                access: { appenders: ['access'], level: this.logConfig.access.level },
            },
        };
    }

    protected getAppenderFromConfig(categoryConfig: LogCategoryConfig) {
        const appenderConfigMap = {
            file: {
                type: 'file',
                filename: categoryConfig.filename,
                maxLogSize: 50 * 1024 * 1024,
                backups: 10,
                compress: true,
            },
            dateFile: {
                type: 'dateFile',
                filename: categoryConfig.filename,
                daysToKeep: 10,
                compress: true,
            },
            console: {
                type: 'console',
            },
        };

        if (undefined === appenderConfigMap[categoryConfig.type]) {
            throw new Error(`Appender config of type ${categoryConfig.type} is not defined`);
        }

        return appenderConfigMap[categoryConfig.type];
    }

}
