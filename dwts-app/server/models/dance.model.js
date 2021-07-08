import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var danceSchema = new Schema({
    pic: { type: String, required: true },
    dancers: { type: [String], required: true },
    season: { type: Number, required: true },
    week: { type: Number, required: true },
    night: { type: Number },
    theme: { type: String },
    style: { type: String, required: true },
    runningOrder: String,
    scores: [
        { 
            judges: { type: [String], required: true },
            values: { type: [Number], required: true },
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
    //
    likes: { type: [String], default: [] },
}, {
    timestamps: true,
});

export default mongoose.model('Dance', danceSchema);