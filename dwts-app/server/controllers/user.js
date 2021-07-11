import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

export const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, process.env.SECRET_STRING, { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. :(" });
    }
}

export const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({$or: [ {username}, {email}] });

        if (existingUser) return res.status(400).json({ message: "User with this username/email already exists." });

        if (password != confirmPassword) return res.status(400).json({ message: "Passwords do not match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ username: username, email: email, password: hashedPassword });

        const token = jwt.sign({ username: result.username, email: result.email, id: result._id }, process.env.SECRET_STRING, { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: "Something went wrong. :(" });
    }
}