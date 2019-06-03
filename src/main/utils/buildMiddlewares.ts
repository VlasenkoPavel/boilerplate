import { Logger } from 'log4js';
import { ErrorHandlingMiddleware } from '@chaika/app-components';

export const buildMiddlewares = ({ logger }: { logger: Logger }) => {
    ErrorHandlingMiddleware.setLogger(logger);

    return [ErrorHandlingMiddleware];
};
