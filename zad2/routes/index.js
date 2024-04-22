const fs = require('fs');
const querystring = require('querystring');

const homeView = require('../views/home');
const carView = require('../views/car');
const addCarView = require('../views/add-car');

function handleHome(response) {
    response.setHeader('Content-Type', 'text/html');
    response.write(homeView.renderPage());
    response.end();
}


function handleAddCar(method, request, response) {
    if (method === 'GET') {
        response.setHeader('Content-Type', 'text/html');
        response.write(addCarView.renderPage());
        response.end();
    } else if (method === 'POST') {
        let postData = '';
        
        request.on('data', (chunk) => {
            postData += chunk.toString();
        });

        request.on('end', () => {
            const formData = querystring.parse(postData);
            
            console.log('Received form data:', formData);

            fs.writeFile('formData.json', JSON.stringify(formData), (err) => {
                if (err) {
                    console.error(err);
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Internal Server Error');
                } else {
                    response.writeHead(302, { 'Location': '/car' });
                    response.end();
                }
            });
        });
    } else {
        response.writeHead(405, { 'Content-Type': 'text/plain' });
        response.end('Method Not Allowed');
    }
}

function handleCar(response) {
    fs.readFile('formData.json', (err, data) => {
        if (err) {
            console.error(err);
            response.statusCode = 500;
            response.end();
        } else {
            response.setHeader('Content-Type', 'text/html');
            response.write(carView.renderPage(data));
            response.end();
        }
    });
}


function handlePageNotFound(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write('404 Page Not Found');
    response.end();
}

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
};
