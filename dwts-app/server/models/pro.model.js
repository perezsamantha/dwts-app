const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const proSchema = new Schema({
    name: { type: String, required: true },
    seasonsAsPro: { type: Number, required: true},
    seasonsOnTroupe: { type: Number, required: true},
}, {
    timstamps: true,
});

const Pro = mongoose.model('Pro', proSchema);

module.exports = Pro;