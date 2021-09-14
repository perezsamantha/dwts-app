import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    coverPic: { type: String },
    celeb: { type: String, required: true },
    pro: { type: String, required: true },
    season: { type: Number, required: true },
    placement: { type: String }, 
    teamName: { type: String },
    // numDances: { type: Number, default: 0 },
    // numTens: { type: Number, default: 0 },
    // numPerfects: { type: Number, default: 0 },
    // dances: [{
    //     style: { type: String },
    //     score: { type: Number },
    // }],
    celebSocials: {
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
    },
    pictures: { type: [String] },
    likes: { type: [String], default: [] },
}, {
    timestamps: true,
});

export default mongoose.model('Team', teamSchema);