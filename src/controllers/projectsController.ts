import { Request, Response } from 'express';
import Project from '../models/Project';

export const getProjects = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find().skip(skip).limit(limit).sort({ startDate: -1 }),
    Project.countDocuments()
  ]);

  res.json({
    data: projects,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};

export const addProject = async (req: Request, res: Response) => {
  const last = await Project.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
  const project = new Project({ ...req.body, id: nextId });
  await project.save();
  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const project = await Project.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  const project = await Project.findOneAndDelete({ id: req.params.id });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Deleted' });
}; 