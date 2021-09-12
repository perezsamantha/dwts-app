import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    celeb: { type: String, required: true },
    pro: { type: String, required: true },
    season: { type: Number, required: true },
    placement: { type: String }, // because -st, -nd, -rd... would be difficult
    coverPic: { type: String },
    teamName: { type: String },
    numDances: { type: Number, default: 0 },
    numTens: { type: Number, default: 0 },
    numPerfects: { type: Number, default: 0 },
    dances: [{
        style: { type: String },
        score: { type: Number },
    }],
    pictures: { type: [String] },
    socials: {
        instagram: {
            celeb: { type: String, default: "" },
            pro: { type: String, default: "" }
        },
        twitter: {
            celeb: { type: String, default: "" },
            pro: { type: String, default: "" }
        },
        facebook: {
            celeb: { type: String, default: "" },
            pro: { type: String, default: "" }
        },
    },
    likes: { type: [String], default: [] },
}, {
    timestamps: true,
});

export default mongoose.model('Team', teamSchema);