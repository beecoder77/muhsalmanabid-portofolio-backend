import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  id: number;
  name: string;
  category: string;
  level: number;
  description: string;
}

const SkillSchema = new Schema<ISkill>({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, min: 1, max: 5, required: true },
  description: { type: String },
});

export default mongoose.model<ISkill>('Skill', SkillSchema); 