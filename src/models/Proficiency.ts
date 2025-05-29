import mongoose, { Document, Schema } from 'mongoose';

export interface IProficiency extends Document {
  id: number;
  skill: string;
  value: number;
  description: string;
}

const ProficiencySchema = new Schema<IProficiency>({
  id: { type: Number, unique: true, required: true },
  skill: { type: String, required: true },
  value: { type: Number, min: 1, max: 100, required: true },
  description: { type: String },
});

export default mongoose.model<IProficiency>('Proficiency', ProficiencySchema); 