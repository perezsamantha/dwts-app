import User from '../models/user.model.js';

export const getAll = async (req, res) => { // eventually change to just fans?
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong. :("});
    }
}

export const searchFans = async (req, res) => { // eventually change to just fans?
    const { search } = req.body;
    
    try {
        // change to username 
        const users = await User.find({ email: { $regex: search, '$options': 'i' } });

        if (!users) { // not working ?
            return res.status(400).json({ message: "No users match the search" });
        }
        
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. :("});
    }
}