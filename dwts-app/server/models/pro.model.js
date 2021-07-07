import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var proSchema = new Schema({
    name: { type: String, required: true }, // do we want to break up into first and last name
    seasonsPro: { type: Number, required: true},
    seasonsTroupe: { type: Number, required: true},
    firstSeason: { type: Number, required: true },
    promoPic: { type: String, required: true },
    //numPerfects: { type: Number, required: false },
    socials: [
        {
            twitter: String,
            instagram: String,
            facebook: String
        }
    ]
}, {
    timestamps: true,
});

//var Pro = mongoose.model('Pro', proSchema);

//module.exports = Pro;

export default mongoose.model('Pro', proSchema);