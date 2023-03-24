const debug = require('debug')('app:services:v1:index');

const ExampleService = {

    example: async (req, res) => {
        debug('Executing example method');
        return await res.status(200).json({ status: "Method ok!" });
    }

};

module.exports = ExampleService;