import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var danceSchema = new Schema({
    pic: { type: String, required: true },
    dancers: { type: Array, required: true },
    season: { type: Number, required: true },
    week: { type: Number, required: true },
    night: { type: Number },
    theme: { type: String },
    style: { type: String, required: true },
    runningOrder: String,
    scores: [
        { 
            judges: { type: Array, required: true },
            values: { type: Array, required: true },
            extra: { type: String },
        }
    ],
    song: [
        { 
            track: { type: String, required: true },
            artist: { type: String, required: true },
        }
    ],
    link: String,
    extra: String,
}, {
    timestamps: true,
});

export default mongoose.model('Dance', danceSchema);