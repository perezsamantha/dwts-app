import User from '../models/user.model.js';

//import { roles } from '../roles.js';
import ac from '../roles.js';

export const getAll = async (req, res) => { // eventually change to just fans?
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const searchFans = async (req, res, next) => { // eventually change to just fans?
    
    // const permission = ac.can(req.user.role).readAny('fans');
    // //console.log(permission)

    // if (!permission) {
    //     return res.status(401).json({ message: "Invalid permission"});
    // }
    
    const { search } = req.body;
    //console.log(req);
    
    try {
        const users = await User.find({ username: { $regex: search, '$options': 'i' } });

        if (!users) { // not working ?
            return res.status(400).json({ message: "No users match the search" });
        }
        
        res.status(200).json(users);
        next();
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const findFanById = async (req, res, next) => { 
    
    const { id } = req.params;
    
    try {
        const fan = await User.findById(id);

        res.status(200).json(fan);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);

            const permission = ac.can(user.role)[action](resource);
            
            if (!permission.granted) {
                return res.status(401).json({ message: "Invalid permission"});
            }
            next();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    } 
}