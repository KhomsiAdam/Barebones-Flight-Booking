import './components/index.js';

import { scrollToTop } from "./modules/scrolltotop.js";
import { themeToggle } from "./modules/themetoggler.js";
import { regexInputs, regexEmail } from './modules/regex.js';
import { addError, regexError, regexEmailError, removeError } from './modules/error.js';


document.addEventListener('DOMContentLoaded', () => {
    // Generate a scroll to top button
    scrollToTop(document.body, 900);

    // Theme toggler (light/dark)
    if (document.querySelector("#theme-toggler")) {
        const themeToggler = document.querySelector("#theme-toggler");
        themeToggle(themeToggler);
    }

    if (document.getElementById('search')) {
        const origin = document.getElementById('origin');
        const destination = document.getElementById('destination');
        const departureDate = document.getElementById('departure_date');
        const seats = document.getElementById('seats');
        const searchError = document.getElementById('search-error');

        document.getElementById('search').addEventListener('click', (e) => {
            e.preventDefault();
            // Check for empty values
            if (origin.value === '' || destination.value === '') {
                searchError.innerHTML = 'Origin and destination must be filled.';
                addError(origin);
                addError(destination);
            } else {
                // Check for special characters
                if (regexInputs(origin.value) && regexInputs(destination.value) && regexInputs(departureDate.value) && regexInputs(seats.value)) {
                    if (document.querySelector('.hero__form')) document.querySelector('.hero__form').submit();
                    if (document.querySelector('.search__form')) document.querySelector('.search__form').submit();
                } else if (!regexInputs(origin.value) || !regexInputs(destination.value) || !regexInputs(departureDate.value) || !regexInputs(seats.value)) {
                    searchError.innerHTML = 'Enter valid characters.';
                    regexError(origin);
                    regexError(destination);
                    regexError(departureDate);
                    regexError(seats);
                }
            }
        })
        removeError(origin, searchError);
        removeError(destination, searchError);
        removeError(departureDate, searchError);
        removeError(seats, searchError);
    }

    if (document.querySelector('.book__form')) {
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const passengers = document.getElementById('passengers');
        const bookError = document.getElementById('book-error');
        const seats = parseInt(document.getElementById('seats').innerHTML);
        console.log(seats);

        document.getElementById('book').addEventListener('click', (e) => {
            e.preventDefault();
            // Check for empty values
            if (firstname.value === '' || lastname.value === '' || email.value === '' || phone.value === '' || passengers.value === '') {
                bookError.innerHTML = 'All fields must be filled<br>(Accomodations are optional).';
                addError(firstname);
                addError(lastname);
                addError(email);
                addError(phone);
                addError(passengers);
            } else {
                // Check for special characters
                if (regexInputs(firstname.value) && regexInputs(lastname.value) && regexEmail(email.value) && regexInputs(phone.value) && regexInputs(passengers.value)) {
                    // Check for available seats
                    if (passengers.value > seats) {
                        bookError.innerHTML = 'Not enough seats for this number of passengers.';
                        addError(passengers);
                    } else if (passengers.value <= seats) {
                        document.querySelector('.book__form').submit();
                    }
                } else if (!regexInputs(firstname.value) || !regexInputs(lastname.value) || !regexEmail(email.value) || !regexInputs(phone.value) || !regexInputs(passengers.value)) {
                    bookError.innerHTML = 'Enter valid characters.';
                    regexError(firstname);
                    regexError(lastname);
                    regexEmailError(email);
                    regexError(phone);
                    regexError(passengers);
                }
            }
        })
        removeError(firstname, bookError);
        removeError(lastname, bookError);
        removeError(email, bookError);
        removeError(phone, bookError);
        removeError(passengers, bookError);
    }


    if (document.getElementById('ticket')) {
        const element = document.getElementById('ticket');
        const opt = {
            margin: 0,
            filename: 'flight-ticket.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        if (document.getElementById('download')) {
            document.getElementById('download').addEventListener('click', () => {
                console.log('test');
                html2pdf(element, opt);
            })
        }
    }
})