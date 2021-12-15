const connect = require('../config/database');

const AirportController = require('../controllers/AirportController');

class FlightModel {
    id;
    type;
    origin;
    destination;
    departure_date;
    arrival_date;
    departure_time;
    arrival_time;
    seats;
    price;

    set id(id) { this.id = id }
    set type(type) { this.type = type }
    set origin(origin) { this.origin = origin }
    set destination(destination) { this.destination = destination }
    set departure_date(departure_date) { this.departure_date = departure_date }
    set arrival_date(arrival_date) { this.arrival_date = arrival_date }
    set departure_time(departure_time) { this.departure_time = departure_time }
    set arrival_time(arrival_time) { this.arrival_time = arrival_time }
    set seats(seats) { this.seats = seats }
    set price(price) { this.price = price }

    get id() { return this.id }
    get type() { return this.type }
    get origin() { return this.origin }
    get destination() { return this.destination }
    get departure_date() { return this.departure_date }
    get arrival_date() { return this.arrival_date }
    get departure_time() { return this.departure_time }
    get arrival_time() { return this.arrival_time }
    get seats() { return this.seats }
    get price() { return this.price }


    async create(table) {

        const sql = `
        INSERT INTO ${table}(
            type,
            origin,
            destination,
            departure_date,
            arrival_date,
            departure_time,
            arrival_time,
            seats,
            price
        )
        VALUES(
            '${this.type}',
            '${this.origin}',
            '${this.destination}',
            '${this.departure_date}',
            '${this.arrival_date}',
            '${this.departure_time}',
            '${this.arrival_time}',
            '${this.seats}',
            '${this.price}'
        )
        `;

        const flight = await connect.execute(sql);
        return flight;
    }

    async readAll(table) {
        const sql = `SELECT * FROM ${table}`;
        const flights = await connect.execute(sql);
        return flights[0];
    }

    async updateSeats(table, updatedSeats) {
        const sql = `UPDATE ${table} SET seats = ${updatedSeats}
        WHERE id = ${this.id}`;
        const flights = await connect.execute(sql);
        return flights[0];
    }

    async readUnique(table, id) {
        const sql = `SELECT * FROM ${table} WHERE id = '${id}'`;
        const flight = await connect.execute(sql);
        const content = [flight[0], './public/search.ejs']
        return content;
    }

    async reserve(table) {
        const sql = `SELECT * FROM ${table} WHERE id = '${this.id}'`;
        const flight = await connect.execute(sql);
        const content = [flight[0], './public/reserve.ejs']
        return content;
    }

    async search(table) {

        let sql;

        if (this.origin !== '' && this.destination !== '' && this.departure_date !== '' && this.seats !== '') {
            sql = `
            SELECT * FROM ${table}
            WHERE origin = '${this.origin}'
            AND destination = '${this.destination}'
            AND departure_date = '${this.departure_date}'
            AND seats >= ${this.seats}
            `;
        } else if (this.origin !== '' && this.destination !== '' && this.departure_date !== '') {
            sql = `
            SELECT * FROM ${table}
            WHERE origin = '${this.origin}'
            AND destination = '${this.destination}'
            AND departure_date = '${this.departure_date}'
            `;
        } else if (this.origin !== '' && this.destination !== '') {
            sql = `
            SELECT * FROM ${table}
            WHERE origin = '${this.origin}'
            AND destination = '${this.destination}'
            `;
        } else {
            sql = `SELECT * FROM ${table}`;
        }

        const flights = await connect.execute(sql);

        const entries = new AirportController();
        const airports = await entries.readAll();

        const data = [airports, flights[0]]

        const content = [data, './public/search.ejs']
        return content;
    }
}

module.exports = FlightModel;