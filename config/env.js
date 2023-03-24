const debug = require('debug')('app:config:env');
const dotenv = require('dotenv');
dotenv.config();

debug('Loading environment');

const env = name => process.env[name.toUpperCase()];

module.exports = {
    NODE_ENV: env('node_env') || 'development',
    PORT: env('port') || 3000,
    PROVIDER: env('provider') || 'HTTP://127.0.0.1:7545'
}