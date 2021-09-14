import mongoose from 'mongoose';
import Pro from '../models/pro.model.js';
import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4'

export const addPro = async (req, res) => {
    const { name } = req.body;

    try {
        const existingPro = await Pro.findOne({ name });

        if (existingPro) return res.status(400).json({ message: "Pro already exists" });

        const result = await Pro.create(req.body);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAll = async (req, res) => {
    try {
        const pros = await Pro.find();

        res.status(200).json(pros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findProById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const pro = await Pro.findById(id);

        res.status(200).json(pro);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const searchPros = async (req, res) => {
    const { search } = req.body;

    try {
        var pros = await Pro.find({ name: { $regex: search, '$options': 'i' } });

        res.status(200).json(pros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePro = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No pro with id: ${id}`);

        const result = await Pro.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setProPic = async (req, res) => {
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
            
            const result = await Pro.findByIdAndUpdate(req.params.id, req.body = { coverPic: publicUrl }, { new: true });

            res.status(200).json(result);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePro = async (req, res) => {
    try {
        await Pro.findByIdAndRemove(req.params.id);

        res.status(200).json({ message: "Pro successfully deleted."});
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
            
            const result = await Pro.findByIdAndUpdate(req.params.id, { $push: { "pictures": publicUrl } }, { new: true });
            
            res.status(200).json(result);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const likePro = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: "Unauthenticated" });
        }
    
        const pro = await Pro.findById(id);
    
        const index = pro.likes.findIndex((id) => id === String(req.userId));
    
        if (index === -1) {
            pro.likes.push(req.userId);
        } else {
            pro.likes = pro.likes.filter((id) => id !== String(req.userId));
        }
    
        const result = await Pro.findByIdAndUpdate(id, pro, { new: true });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getFavoritePros = async (req, res, next) => {
    const { userId } = req;

    try {
        const pros = await Pro.find({ likes: { $in: userId } });

        res.status(200).json(pros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}