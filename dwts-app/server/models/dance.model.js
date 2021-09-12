import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var danceSchema = new Schema({
    pic: { type: String },
    date: { type: String },
    teams: { type: [String], required: true },
    season: { type: Number, required: true },
    week: { type: Number, required: true },
    night: { type: Number },
    theme: { type: String },
    style: { type: String, required: true },
    runningOrder: String,
    scores: [
        {
            judge: { type: String },
            score: { type: Number },
        }
    ],
    isPerfect: { type: Boolean, default: false },
    songTitle: { type: String },
    songArtist: { type: String },
    // song: {
    //     track: { type: String },
    //     artist: { type: String },
    // },
    pictures: { type: [String] },
    link: String,
    extra: String,
    //
    likes: { type: [String], default: [] },
}, {
    timestamps: true,
});

export default mongoose.model('Dance', danceSchema);