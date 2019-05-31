const path = require('path');
const pathToRoot = '../../';

module.exports = {
    host: "127.0.0.1",
    port: 3005,
    controllers: path.resolve(__dirname, pathToRoot, './dist/main/application/controllers/*.js'),
    public: path.resolve(__dirname, pathToRoot, './public/static'),
};
