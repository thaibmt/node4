const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    title: String,
    price: {
        type: String,
        default: 0
    },
    description: String,
});

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
