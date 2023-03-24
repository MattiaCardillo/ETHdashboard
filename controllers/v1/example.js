const debug = require('debug')('app:controllers:v1:example');

const ExampleService = require('../../services/v1/example');

const ExampleController = {

    index: async (req, res, next) => {
        debug('Executing index action');
        return ExampleService.example(req, res);
    }
};

module.exports = ExampleController;