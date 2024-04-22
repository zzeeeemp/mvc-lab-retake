const express = require('express');
const router = express.Router();
const path = require('path');
const cheerio = require('cheerio');

let cars = [];
let nextId = 1;
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/car.html'));
});

router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/add-car.html'));
});

router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/cars-list.html'));
});

function generateCarHTML() {
    let html = '';
    if (cars.length === 0) {
        html = 'No cars has been found.';
    } else {
        html += '<h2>Cars</h2>';
        html += '<ul>';
        cars.forEach(car => {
            html += '<li>';
            html += `<p><span class="bold">Make:</span> ${car.make}</p>`;
            html += `<p><span class="bold">Model:</span> ${car.model}</p>`;
            html += `<p><span class="bold">Year:</span> ${car.year}</p>`;
            html += `<p><span class="bold">Color:</span> ${car.color}</p>`;
            html += '</li>';
        });
        html += '</ul>';
    }
    return html;
}

router.post('/add', (req, res) => {
    const { make, model, year, color } = req.body;

    const newCar = {
        id: nextId,
        make,
        model,
        year,
        color
    };

    nextId++;

    cars.push(newCar);

    res.redirect('/car');
});

router.use((req, res, next) => {
    const carsHTML = generateCarHTML();
    const $ = cheerio.load('<div class="cars"></div>');
    $('.cars').html(carsHTML);
    res.send($.html());
});

module.exports = router;
