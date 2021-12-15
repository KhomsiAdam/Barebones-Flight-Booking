const AirportModel = require('../models/AirportModel');

class AirportController {

    table = 'airports';

    async readAll() {
        const model = new AirportModel();
        return await model.readAll(this.table);
    }
}

module.exports = AirportController;