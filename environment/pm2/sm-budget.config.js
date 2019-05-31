'use strict';

module.exports = {
    apps: [
        {
            name: 'sm-budget',
            interpreter: '/bin/bash',
            script: '/opt/sm-budget/current/bin/environment',
            cwd: '/opt/sm-budget/current',
            args: ['node', 'dist/app.js'],
            log: '/opt/sm-budget/shared/logs/sm-budget.log'
        }
    ]
};
