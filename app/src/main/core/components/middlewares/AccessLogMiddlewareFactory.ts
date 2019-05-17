import { Logger, connectLogger } from 'log4js';

export class AccessLogMiddlewareFactory {
    protected logger!: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public create() {
        return connectLogger(this.logger, {
            level: 'auto',
            /* tslint:disable:max-line-length */
            format:
                ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" :response-time'
            /* tslint:enable:max-line-length */
        });
    }
}
