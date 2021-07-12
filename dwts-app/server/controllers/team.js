import Team from '../models/team.model.js';

export const addTeam = async (req, res) => {
    const { celeb, pro, season } = req.body;

    try {
        const existingTeam = await Team.findOne({ celeb, pro, season });

        if (existingTeam) return res.status(400).json({ message: "Team already exists" });

        const result = await Team.create({ celeb, pro, season });

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAll = async (req, res) => {
    try {
        const teams = await Team.find();

        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const searchTeams = async (req, res) => {
    const { search } = req.body;

    try {
        // both keep returning empty arrays :(((
        const teams = await Team.find({ $text: { $search: search }})
        //const teams = await Team.find({$or: [ { celeb: { $regex: search, '$options': 'i' }, pro: { $regex: search, '$options': 'i' } } ] });
        
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const updateTeam = async (req, res) => {
    
    try {
        const result = await Team.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error });
    }

}