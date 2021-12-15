const connect = require('../config/database');
const FlightController = require('../controllers/FlightController');

class ReservationModel {
    id;
    flight_id;
    firstname;
    lastname;
    email;
    phone;
    passengers;
    totalprice;
    transport = 0;
    restoration = 0;
    hotel = 0;

    set id(id) { this.id = id }
    set flight_id(flight_id) { this.flight_id = flight_id }
    set firstname(firstname) { this.firstname = firstname }
    set lastname(lastname) { this.lastname = lastname }
    set email(email) { this.email = email }
    set phone(phone) { this.phone = phone }
    set passengers(passengers) { this.passengers = passengers }
    set totalprice(totalprice) { this.totalprice = totalprice }
    set transport(transport) { this.transport = transport }
    set restoration(restoration) { this.restoration = restoration }
    set hotel(hotel) { this.hotel = hotel }

    get id() { return this.id }
    get flight_id() { return this.flight_id }
    get firstname() { return this.firstname }
    get lastname() { return this.lastname }
    get email() { return this.email }
    get phone() { return this.phone }
    get passengers() { return this.passengers }
    get totalprice() { return this.totalprice }
    get transport() { return this.transport }
    get restoration() { return this.restoration }
    get hotel() { return this.hotel }

    async book(table) {

        const sql = `
        INSERT INTO ${table}(
            flight_id,
            firstname,
            lastname,
            email,
            phone,
            passengers,
            totalprice,
            transport,
            restoration,
            hotel
        )
        VALUES(
            '${this.flight_id}',
            '${this.firstname}',
            '${this.lastname}',
            '${this.email}',
            '${this.phone}',
            '${this.passengers}',
            '${this.totalprice}',
            '${this.transport}',
            '${this.restoration}',
            '${this.hotel}'
        )
        `;

        await connect.execute(sql);

        const flight = new FlightController();
        const flightInformations = await flight.readUnique(this.flight_id);

        const details = {
            firstname: this.firstname,
            lastname: this.lastname,
            passengers: this.passengers,
            totalprice: this.totalprice,
            origin: flightInformations[0][0].origin,
            destination: flightInformations[0][0].destination,
            departure_date: flightInformations[0][0].departure_date,
            arrival_date: flightInformations[0][0].arrival_date,
            departure_time: flightInformations[0][0].departure_time,
            arrival_time: flightInformations[0][0].arrival_time,
        }
        
        const content = [details, './public/confirmation.ejs']
        return content;

    }

    async readAll(table) {
        const sql = `SELECT * FROM ${table}`;
        const flights = await connect.execute(sql);
        return flights[0];
    }
}

module.exports = ReservationModel;