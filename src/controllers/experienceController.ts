import { Request, Response } from 'express';
import Experience from '../models/Experience';

export const getExperiences = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [experiences, total] = await Promise.all([
    Experience.find().skip(skip).limit(limit).sort({ startDate: -1 }),
    Experience.countDocuments()
  ]);

  res.json({
    data: experiences,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};

export const addExperience = async (req: Request, res: Response) => {
  const last = await Experience.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
  const experience = new Experience({ ...req.body, id: nextId });
  await experience.save();
  res.status(201).json(experience);
};

export const updateExperience = async (req: Request, res: Response) => {
  const experience = await Experience.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!experience) return res.status(404).json({ message: 'Experience not found' });
  res.json(experience);
};

export const deleteExperience = async (req: Request, res: Response) => {
  const experience = await Experience.findOneAndDelete({ id: req.params.id });
  if (!experience) return res.status(404).json({ message: 'Experience not found' });
  res.json({ message: 'Deleted' });
}; 