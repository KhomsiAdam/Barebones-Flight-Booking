const FlightModel = require('../models/FlightModel');

class FlightController {

    table = 'flights';

    async create(data) {

        const model = new FlightModel();

        model.type = data.type;
        model.origin = data.origin;
        model.destination = data.destination;
        model.departure_date = data.departure_date;
        model.arrival_date = data.arrival_date;
        model.departure_time = data.departure_time;
        model.arrival_time = data.arrival_time;
        model.seats = data.seats;
        model.price = data.price;

        return await model.create(this.table);
    }

    async search(data) {
        const model = new FlightModel();

        model.origin = data.origin;
        model.destination = data.destination;
        model.departure_date = data.departure_date;
        model.seats = data.seats;

        return await model.search(this.table);
    }

    async readAll() {
        const model = new FlightModel();
        return await model.readAll(this.table);
    }

    async readUnique(id) {
        const model = new FlightModel();
        return await model.readUnique(this.table, id);
    }

    async updateSeats(id, currentSeats, passengers) {
        const model = new FlightModel();
        model.id = id;
        const updatedSeats = currentSeats - passengers;
        return await model.updateSeats(this.table, updatedSeats);
    }

    async reserve(data) {
        const model = new FlightModel();
        model.id = data.id;
        return await model.reserve(this.table);
    }

}

module.exports = FlightController;