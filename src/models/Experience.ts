import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string[];
  current: boolean;
}

const ExperienceSchema = new Schema<IExperience>({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: [String], required: true },
  current: { type: Boolean, default: false },
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema); 