const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cars', require('./routes/cars'));

app.use('/', require('./routes/home'));

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
