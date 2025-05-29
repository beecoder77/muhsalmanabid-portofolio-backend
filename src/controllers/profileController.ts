import { Request, Response } from 'express';
import Profile from '../models/Profile';

export const getProfile = async (req: Request, res: Response) => {
  const profile = await Profile.findOne({});
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json(profile);
};

export const updateProfile = async (req: Request, res: Response) => {
  // Find by id if provided, otherwise update the first profile
  let profile;
  if (req.params.id) {
    profile = await Profile.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  } else {
    profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
  }
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json(profile);
};

export const addProfile = async (req: Request, res: Response) => {
  const last = await Profile.findOne().sort({ id: -1 });
  const nextId = last ? last.id + 1 : 1;
  const profile = new Profile({ ...req.body, id: nextId });
  await profile.save();
  res.status(201).json(profile);
};

export const deleteProfile = async (req: Request, res: Response) => {
  const profile = await Profile.findOneAndDelete({ id: req.params.id });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json({ message: 'Deleted' });
};

export const getContactCounts = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const counts = {
      emails: profile.emails?.length || 0,
      phoneNumbers: profile.phoneNumbers?.length || 0,
      socialMedia: profile.socialMedia?.length || 0,
      total: (profile.emails?.length || 0) + 
             (profile.phoneNumbers?.length || 0) + 
             (profile.socialMedia?.length || 0)
    };

    res.json(counts);
  } catch (error) {
    console.error('Error getting contact counts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateContactCounts = async (req: Request, res: Response) => {
  try {
    const { type, count } = req.body;
    
    if (!type || typeof count !== 'number' || count < 0) {
      return res.status(400).json({ 
        message: 'Invalid request. Type and count (non-negative number) are required.' 
      });
    }

    const validTypes = ['emails', 'phoneNumbers', 'socialMedia'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        message: 'Invalid type. Must be one of: emails, phoneNumbers, socialMedia' 
      });
    }

    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update the specific contact type array
    const update: any = {};
    update[type] = Array(count).fill('').map((_, index) => 
      type === 'socialMedia' ? { type: '', url: '' } : ''
    );

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: profile._id },
      { $set: update },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Failed to update profile' });
    }

    // Return updated counts
    const counts = {
      emails: updatedProfile.emails?.length || 0,
      phoneNumbers: updatedProfile.phoneNumbers?.length || 0,
      socialMedia: updatedProfile.socialMedia?.length || 0,
      total: (updatedProfile.emails?.length || 0) + 
             (updatedProfile.phoneNumbers?.length || 0) + 
             (updatedProfile.socialMedia?.length || 0)
    };

    res.json({
      message: `Updated ${type} count to ${count}`,
      counts
    });
  } catch (error) {
    console.error('Error updating contact counts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 