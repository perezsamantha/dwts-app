import mongoose from 'mongoose';
import Dance from '../models/dance.model.js';
import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4'

export const addDance = async (req, res) => {
    //const {  } = req.body;

    try {
        // check for existing dance?
        //const existingDance = await Dance.findOne({ celeb, pro, season });

        //if (existingDance) return res.status(400).json({ message: "Dance already exists" });

        const result = await Dance.create(req.body);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAllDances = async (req, res) => {
    try {
        const dances = await Dance.find();

        res.status(200).json(dances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findDanceById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const dance = await Dance.findById(id);

        res.status(200).json(dance);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const searchDances = async (req, res) => {
    const { search } = req.body;

    try {
        // search by style, song, team, uhm
        // for now, just searching by style
        var dances = await Dance.find({ extra: { $regex: search, '$options': 'i' } });

        res.status(200).json(dances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDance = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No dance with id: ${id}`);

        const result = await Dance.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setDancePic = async (req, res) => {
    const storage = new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
    });
    
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);
    
    try {
        const blob = bucket.file(req.file.originalname);

        let uuid = UUID();

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid
                }
            }
        })

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            
            const result = await Dance.findByIdAndUpdate(req.params.id, req.body = { pic: publicUrl }, { new: true });

            res.status(200).json(result);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteDance = async (req, res) => {
    try {
        await Dance.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: "Dance successfully deleted."});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addPic = async (req, res) => {
    const storage = new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
    });
    
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);
    
    try {
        const blob = bucket.file(req.file.originalname);

        let uuid = UUID();

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid
                }
            }
        })

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            
            const result = await Team.findByIdAndUpdate(req.params.id, { $push: { "pictures": publicUrl } }, { new: true });
            
            res.status(200).json(result);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const likeDance = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: "Unauthenticated" });
        }
    
        const dance = await Dance.findById(id);
    
        const index = dance.likes.findIndex((id) => id === String(req.userId));
    
        if (index === -1) {
            dance.likes.push(req.userId);
        } else {
            dance.likes = dance.likes.filter((id) => id !== String(req.userId));
        }
    
        const result = await Dance.findByIdAndUpdate(id, dance, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getFavoriteDances = async (req, res, next) => {
    const { userId } = req;

    try {
        const dances = await Dance.find({ likes: { $in: userId } });

        res.status(200).json(dances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}