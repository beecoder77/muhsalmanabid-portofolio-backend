import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  id: number;
  name: string;
  description: string;
  url: string;
  techStack: string[];
  startDate: Date;
  endDate?: Date;
  current: boolean;
}

const ProjectSchema = new Schema<IProject>({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String },
  techStack: [{ type: String }],
  startDate: { type: Date },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
});

export default mongoose.model<IProject>('Project', ProjectSchema); 