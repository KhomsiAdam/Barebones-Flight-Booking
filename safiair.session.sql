-- @block
CREATE TABLE airports (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    code VARCHAR(128) NOT NULL,
    city VARCHAR(128) NOT NULL,
    country VARCHAR(128) NOT NULL
);
-- @block
CREATE TABLE flights (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    type VARCHAR(128) NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    departure_date DATE NOT NULL,
    arrival_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    stopover VARCHAR(128),
    price INT NOT NULL,
    seats INT NOT NULL
);
-- @block
CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    flight_id INT NOT NULL,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phone VARCHAR(128) NOT NULL,
    passengers INT NOT NULL,
    totalprice INT NOT NULL,
    transport INT,
    restoration INT,
    hotel INT,
    FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE
);
-- @block
INSERT INTO airports (
        code,
        city,
        country
    )
VALUES (
        'AGA',
        'Agadir',
        'Morocco'
    ),
    (
        'AHU',
        'Al Hoceima',
        'Morocco'
    ),
    (
        'CAS',
        'Casablanca',
        'Morocco'
    ),
    (
        'FEZ',
        'Fes',
        'Morocco'
    ),
    (
        'RAK',
        'Marrakesh',
        'Morocco'
    ),
    (
        'OZZ',
        'Ouarzazate',
        'Morocco'
    ),
    (
        'OUD',
        'Oujda',
        'Morocco'
    ),
    (
        'RBA',
        'Rabat',
        'Morocco'
    ),
    (
        'TNG',
        'Tanger',
        'Morocco'
    );
    
-- @block
INSERT INTO flights (
        type,
        origin,
        destination,
        departure_date,
        arrival_date,
        departure_time,
        arrival_time,
        stopover,
        price,
        seats
    )
VALUES (
        'Stopover',
        'CAS',
        'TNG',
        '2021-04-24',
        '2021-04-24',
        '06:00:00',
        '07:00:00',
        'RBA',
        '100',
        '20'
    ),
    (
        'Direct',
        'FEZ',
        'RAK',
        '2021-04-24',
        '2021-04-25',
        '06:00:00',
        '06:00:00',
        '',
        '50',
        '20'
    ),
    (
        'Stopover',
        'AGA',
        'AHU',
        '2021-04-24',
        '2021-04-25',
        '06:00:00',
        '06:00:00',
        'FEZ',
        '300',
        '20'
    ),
    (
        'Direct',
        'OZZ',
        'OUD',
        '2021-04-24',
        '2021-04-25',
        '06:00:00',
        '06:00:00',
        '',
        '150',
        '20'
    );