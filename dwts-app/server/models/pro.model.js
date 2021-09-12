import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var proSchema = new Schema({
    name: { type: String, required: true },
    seasonsPro: { type: Number },
    seasonsTroupe: { type: Number },
    firstSeason: { type: Number },
    coverPic: { type: String },
    birthday: { type: Date },
    //numPerfects: { type: Number, required: false },
    socials: {
        twitter: String,
        instagram: String,
        facebook: String
    },
    //
    likes: { type: [String], default: [] },
}, {
    timestamps: true,
});

export default mongoose.model('Pro', proSchema);