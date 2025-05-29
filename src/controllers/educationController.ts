import { Request, Response } from 'express';
import Education from '../models/Education';

export const getEducations = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [educations, total] = await Promise.all([
    Education.find().skip(skip).limit(limit).sort({ startDate: -1 }),
    Education.countDocuments()
  ]);

  res.json({
    data: educations,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};

export const addEducation = async (req: Request, res: Response) => {
  const last = await Education.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
  const education = new Education({ ...req.body, id: nextId });
  await education.save();
  res.status(201).json(education);
};

export const updateEducation = async (req: Request, res: Response) => {
  const education = await Education.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!education) return res.status(404).json({ message: 'Education not found' });
  res.json(education);
};

export const deleteEducation = async (req: Request, res: Response) => {
  const education = await Education.findOneAndDelete({ id: req.params.id });
  if (!education) return res.status(404).json({ message: 'Education not found' });
  res.json({ message: 'Deleted' });
}; 