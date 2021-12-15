const connect = require('../config/database');

class AirportModel {
    id;
    code;
    city;
    country;

    set id(id) { this.id = id }
    set code(code) { this.code = code }
    set city(city) { this.city = city }
    set country(country) { this.country = country }

    get id() { return this.id }
    get code() { return this.code }
    get city() { return this.city }
    get country() { return this.country }

    async readAll(table) {
        const sql = `SELECT * FROM ${table}`;

        const airports = await connect.execute(sql);
        return airports[0];
    }
}

module.exports = AirportModel;