import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var danceSchema = new Schema({
    pic: { type: String },
    date: { type: String },
    dancers: { type: [String] },
    season: { type: Number },
    week: { type: Number },
    night: { type: Number },
    theme: { type: String },
    style: { type: String },
    runningOrder: String,
    scores: [
        {
            judges: { type: String },
            values: { type: Number },
            extra: { type: String },
        }
    ],
    isPerfect: { type: Boolean },
    song: {
        track: { type: String },
        artist: { type: String },
    },
    pictures: { type: [String] },
    link: String,
    extra: String,
    //
    likes: { type: [String], default: [] },
}, {
    timestamps: true,
});

export default mongoose.model('Dance', danceSchema);