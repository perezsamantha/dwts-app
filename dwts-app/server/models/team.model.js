import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    celeb: { type: String, required: true },
    pro: { type: String, required: true },
    season: { type: Number, required: true },
    placement: { type: String }, // because -st, -nd, -rd... would be difficult
    promoPic: { type: String },
    teamName: { type: String },
    numDances: { type: Number, default: 0 },
    numTens: { type: Number, default: 0 },
    numPerfects: { type: Number, default: 0 },
    dances: [{
        style: { type: String },
        score: { type: Number },
    }],
    pictures: { type: [String]},
    //madeFinals: { type: Boolean },
    // socials: [{
    //     instagram: [{
    //         celeb: { type: String },
    //         pro: { type: String }
    //     }],
    //     twitter: [{
    //         celeb: { type: String },
    //         pro: { type: String }
    //     }],
    //     facebook: [{
    //         celeb: { type: String },
    //         pro: { type: String }
    //     }],
    // }]
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
        }
}, {
    timestamps: true,
});

export default mongoose.model('Team', teamSchema);