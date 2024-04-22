const http = require('http');
const carsFunctions = require('./cars');
const htmlGenerator = require('./htmlGenerator');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/') {
        const cars = carsFunctions.getCars();
        
        console.log(cars);
        res.write(htmlGenerator.getHTMLDocumentStart());
        res.write('<body>');
        
        cars.forEach(car => {
            const carInfo = carsFunctions.getCarInformation(car.id);
            res.write(`<p>${carInfo}</p>`);
        });
        cars.forEach(car => {
            const carAge = carsFunctions.getCarAge(car.id);
            res.write(`<p>${carAge}</p>`);
        });

        res.write('</body>');
        res.write(htmlGenerator.getHTMLDocumentEnd());
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});
