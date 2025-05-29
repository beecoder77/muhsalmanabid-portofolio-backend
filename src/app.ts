import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import experienceRoutes from './routes/experience';
import skillsRoutes from './routes/skills';
import proficiencyRoutes from './routes/proficiency';
import projectsRoutes from './routes/projects';
import educationRoutes from './routes/education';
import healthRoutes from './routes/health';
import visitorRoutes from './routes/visitor';

dotenv.config();

const app = express();

// Enable CORS for specific origins
app.use(cors({
  origin: ['http://localhost:6969', 'https://muhsalmanabid.xyz', 'https://muhsalmanabid.tech'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Added credentials: true as it's often needed when specifying origins
}));

app.use(express.json());

// Public routes
app.use('/health', healthRoutes);

// Protected routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/proficiency', proficiencyRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/visitor', visitorRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  }); 