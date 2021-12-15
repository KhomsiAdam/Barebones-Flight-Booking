require('dotenv').config();

const http = require("http");

const Router = require("./app/core/router");

const FlightController = require("./app/controllers/FlightController");
const ReservationController = require("./app/controllers/ReservationController");
const AirportController = require('./app/controllers/AirportController');

const server = http.createServer((req, res) => {

    const router = new Router(req, res);

    router.get('/', AirportController, 'readAll');
    router.get('/index', AirportController, 'readAll');
    router.get('/search', AirportController, 'readAll');
    router.get('/confirmation');
    
    router.post('/search', FlightController, 'search');
    router.post('/reserve', FlightController, 'reserve');
    router.post('/book', ReservationController, 'book');
    
    // router.post('/create', FlightController, 'create');
    
    router.run();

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));