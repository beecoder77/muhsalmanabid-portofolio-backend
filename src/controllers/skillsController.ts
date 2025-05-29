import { Request, Response } from 'express';
import Skill from '../models/Skill';

export const getSkills = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const category = req.query.category as string | undefined;

  const filter: any = {};
  if (category) {
    filter.category = category;
  }

  const [skills, total] = await Promise.all([
    Skill.find(filter).skip(skip).limit(limit).sort({ category: 1, name: 1 }),
    Skill.countDocuments(filter)
  ]);

  res.json({
    data: skills,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};

export const addSkill = async (req: Request, res: Response) => {
  const last = await Skill.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
  const skill = new Skill({ ...req.body, id: nextId });
  await skill.save();
  res.status(201).json(skill);
};

export const updateSkill = async (req: Request, res: Response) => {
  const skill = await Skill.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!skill) return res.status(404).json({ message: 'Skill not found' });
  res.json(skill);
};

export const deleteSkill = async (req: Request, res: Response) => {
  const skill = await Skill.findOneAndDelete({ id: req.params.id });
  if (!skill) return res.status(404).json({ message: 'Skill not found' });
  res.json({ message: 'Deleted' });
}; 