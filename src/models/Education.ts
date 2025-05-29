import mongoose, { Document, Schema } from 'mongoose';

export interface IEducation extends Document {
  id: number;
  type: 'education' | 'certification';
  publisher: string;
  title: string;
  city?: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}

const EducationSchema = new Schema<IEducation>({
  id: { type: Number, unique: true, required: true },
  type: { type: String, enum: ['education', 'certification'], required: true },
  publisher: { type: String, required: true },
  title: { type: String, required: true },
  city: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String, required: true },
});

export default mongoose.model<IEducation>('Education', EducationSchema); 