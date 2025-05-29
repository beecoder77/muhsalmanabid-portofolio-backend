import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialMedia {
  type: string;
  url: string;
  username?: string;
}

export interface IProfile extends Document {
  id: number;
  name: string;
  title: string;
  city: string;
  tagline: string;
  aboutMe: string;
  photo: string;
  socialMedia: ISocialMedia[];
  phoneNumbers: string[];
  emails: string[];
}

const SocialMediaSchema = new Schema<ISocialMedia>({
  type: { type: String, required: true },
  url: { type: String, required: true },
  username: { type: String },
});

const ProfileSchema = new Schema<IProfile>({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  city: { type: String, required: true },
  tagline: { type: String, required: true },
  aboutMe: { type: String, required: true },
  photo: { type: String },
  socialMedia: [SocialMediaSchema],
  phoneNumbers: { type: [String], required: true },
  emails: { type: [String], required: true },
});

export default mongoose.model<IProfile>('Profile', ProfileSchema); 