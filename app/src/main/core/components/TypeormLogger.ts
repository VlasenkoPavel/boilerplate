import { Logger } from 'typeorm';
import { Logger as Log4jsLogger } from 'log4js';

/**
 * Message formatting code copy-pasted from typeorm/src/logger/FileLogger
 */
export class TypeormLogger implements Logger {
    protected logger!: Log4jsLogger;

    constructor(logger: Log4jsLogger) {
        this.logger = logger;
    }

    public logQuery(query: string, parameters: any[] | undefined) {
        this.logger.debug(`[QUERY]: ${this.getSql(query, parameters)}`);
    }

    public logQueryError(error: string, query: string, parameters: any[] | undefined) {
        this.logger.error(`[FAILED QUERY]: ${this.getSql(query, parameters)}`);
        this.logger.error(`[QUERY ERROR]: ${error}`);
    }

    public logQuerySlow(time: number, query: string, parameters?: any[] | undefined) {
        this.logger.warn(`[SLOW QUERY: ${time} ms]: ${this.getSql(query, parameters)}`);
    }

    public logSchemaBuild(message: string) {
        this.logger.debug(message);
    }

    public logMigration(message: string) {
        this.logger.info(message);
    }

    public log(level: 'log' | 'info' | 'warn', message: any) {
        this.logger.log(level, message);
    }

    private getSql(query: string, parameters: any[] | undefined) {
        return query + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : '');
    }
}
