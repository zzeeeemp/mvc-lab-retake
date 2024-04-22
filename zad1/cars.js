const cars = [
    { id: 1, make: "BMW", model: "X5", year: 2018, color: "blue" },
    { id: 2, make: "Chevrolet", model: "Camaro", year: 2015, color: "black" },
    { id: 3, make: "Ford", model: "Mustang", year: 2010, color: "green" },
    { id: 4, make: "Dodge", model: "Charger", year: 2020, color: "silver" },
    { id: 5, make: "Audi", model: "A4", year: 2019, color: "red" }
];

const carsFunctions = {
    getCars: function() {
        return cars;
    },
    getCarInformation: function(id) {
        const car = cars.find(car => car.id === id);
        if (car) {
            const { make, model, year, color } = car;
            return `Make: ${make}, Model: ${model}, Year: ${year}, Color: ${color}.`;
        } else {
            return "Car doesn't exist";
        }
    },
    getCarAge: function(id) {
        const car = cars.find(car => car.id === id);
        if (car) {
            const currentYear = new Date().getFullYear();
            const carAge = currentYear - car.year;
            return `Car is ${carAge} years old.`;
        } else {
            return "Car doesn't exist";
        }
    }
};

module.exports = carsFunctions;
