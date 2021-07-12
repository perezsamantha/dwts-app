import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    celeb: { type: String, required: true },
    pro: { type: String, required: true },
    season: { type: Number, required: true },
    placement: { type: String }, // because -st, -nd, -rd... would be difficult
    promoPic: { type: String },
    teamName: { type: String },
    numDances: { type: Number },
    numTens: { type: Number },
    numPerfects: { type: Number },
    dances: [{
        style: { type: String },
        score: { type: Number },
    }],
    pictures: { type: [String]},
    madeFinals: { type: Boolean }
}, {
    timestamps: true,
});

export default mongoose.model('Team', teamSchema);