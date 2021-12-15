const ReservationModel = require('../models/ReservationModel');
const FlightController = require('../controllers/FlightController');
const fs = require('fs');
const ejs = require('ejs');

const nodemailer = require("nodemailer");

class ReservationController {

    table = 'reservations';

    async book(data) {
        console.log(data);

        const model = new ReservationModel();

        model.flight_id = data.id;
        model.firstname = data.firstname;
        model.lastname = data.lastname;
        model.email = data.email;
        model.phone = data.phone;
        model.passengers = data.passengers;
        model.totalprice = parseInt(data.totalprice);

        if (data.transport) model.transport = parseInt(data.transport);
        if (data.restoration) model.restoration = parseInt(data.restoration);
        if (data.hotel) model.hotel = parseInt(data.hotel);

        model.totalprice += model.transport;
        model.totalprice += model.restoration;
        model.totalprice += model.hotel;

        const flight = new FlightController();
        const flightInformations = await flight.readUnique(model.flight_id);

        console.log(flightInformations);

        const details = {
            firstname: model.firstname,
            lastname: model.lastname,
            email: model.email,
            passengers: model.passengers,
            totalprice: model.totalprice,
            origin: flightInformations[0][0].origin,
            destination: flightInformations[0][0].destination,
            departure_date: flightInformations[0][0].departure_date,
            arrival_date: flightInformations[0][0].arrival_date,
            departure_time: flightInformations[0][0].departure_time,
            arrival_time: flightInformations[0][0].arrival_time,
        }

        flight.updateSeats(data.id, data.seats, data.passengers);

        this.mail(details);

        return await model.book(this.table);
    }

    async mail(data) {
        async function main(data) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Safi Airlines" <safiairlinestest@gmail.com>', // sender address
                to: data.email, // list of receivers
                subject: "Flight booking confirmation", // Subject line
                text: "Flight booking confirmation", // plain text body
                html: `<p>Hi ${data.firstname},</p><p>Your flight is confirmed from ${data.origin} to ${data.destination} at ${data.departure_time} ${data.departure_date}, destined to arrive at ${data.arrival_time} ${data.arrival_date}.</p> <p>Thank your for trusting our airlines!</p>`
            });

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        main(data).catch(console.error);
    }

}


module.exports = ReservationController;