//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String,
        unique: false,
        minlength: 3
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //id: { type: String },
    profilePic: { type: String },
    emailVerified: { type: Boolean },
    watchingSince: { type: Number },
    socials: [
        {
            twitter: String,
            instagram: String,
        }
    ]
}, {
    timestamps: true,
});

//const User = mongoose.model('User', userSchema);

//module.exports = User;

export default mongoose.model('User', userSchema);