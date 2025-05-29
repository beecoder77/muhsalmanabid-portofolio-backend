import { Request, Response } from 'express';
import Proficiency from '../models/Proficiency';

export const getProficiencies = async (req: Request, res: Response) => {
  const profs = await Proficiency.find();
  res.json(profs);
};

export const addProficiency = async (req: Request, res: Response) => {
  const last = await Proficiency.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
  const prof = new Proficiency({ ...req.body, id: nextId });
  await prof.save();
  res.status(201).json(prof);
};

export const updateProficiency = async (req: Request, res: Response) => {
  const prof = await Proficiency.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!prof) return res.status(404).json({ message: 'Proficiency not found' });
  res.json(prof);
};

export const deleteProficiency = async (req: Request, res: Response) => {
  const prof = await Proficiency.findOneAndDelete({ id: req.params.id });
  if (!prof) return res.status(404).json({ message: 'Proficiency not found' });
  res.json({ message: 'Deleted' });
}; 