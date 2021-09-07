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