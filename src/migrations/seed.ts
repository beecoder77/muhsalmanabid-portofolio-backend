import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Profile from '../models/Profile';
import Experience from '../models/Experience';
import Skill from '../models/Skill';
import Proficiency from '../models/Proficiency';
import Project from '../models/Project';
import Education from '../models/Education';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Hapus seluruh data existing
  console.log('Hapus seluruh data existing');
  await Promise.all([
    User.deleteMany({}),
    Profile.deleteMany({}),
    Experience.deleteMany({}),
    Skill.deleteMany({}),
    Proficiency.deleteMany({}),
    Project.deleteMany({}),
    Education.deleteMany({}),
  ]);

  console.log('Membuat user admin');
  const password = await bcrypt.hash('admin123', 10);
  await User.create({
    username: 'admin',
    password,
    name: 'Muhammad Salman Abid',
    email: 'muhsalmanabid@gmail.com',
    role: 'admin',
  });

  console.log('Membuat profil');
  await Profile.create({
    id: 1,
    name: 'Muhammad Salman Abid',
    title: 'Backend Developer',
    city: 'Jakarta, Indonesia',
    tagline: 'Backend Developer with 5 years of experience in building scalable server-side solutions. Skilled in Node.js, TypeScript, and Golang, with expertise in RESTful APIs, microservices, and blockchain technology. Experienced in developing cryptocurrency and NFT solutions. Passionate about creating efficient, maintainable code and solving complex technical challenges.',
    aboutMe: "Backend Developer with 5 years of professional experience crafting robust and scalable server-side solutions. Throughout my journey, I've developed a deep expertise in building high-performance systems, RESTful APIs, and microservices architectures. My passion lies in solving complex technical challenges and implementing efficient solutions that drive business growth. I specialize in modern technologies like Node.js, TypeScript, and Golang, with a strong foundation in database management and system design. I'm constantly learning and adapting to new technologies while maintaining a focus on writing clean, maintainable, and well-documented code.",
    photo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-09%20at%2013.09.10-tvWPOSeUwOSidDJ5QlfBqr1ZdbaHEt.jpeg',
    phoneNumbers: ['+6285157519229'],
    emails: ['muhsalmanabid@gmail.com'],
    socialMedia: [
      { type: 'linkedin', url: 'https://linkedin.com/in/muhsalmanabid' },
      { type: 'github', url: 'https://github.com/muhsalmanabid' },
      { type: 'github', url: 'https://github.com/beecoder77' },
      { type: 'twitter', url: 'https://twitter.com/muhsalmanabid' },
      { type: 'email', url: 'muhsalmanabid@gmail.com' },
    ],
  });

  console.log('Membuat pengalaman');
  await Experience.create({
    id: 1,
    title: 'Backend Developer',
    company: 'Telkom Indonesia',
    location: 'Jakarta, Indonesia',
    startDate: new Date('2020-08-01'),
    endDate: new Date('2025-03-01'),
    description: [
      'Fitur POI (Point of Interest): Merancang fitur identifikasi lead berbasis Google Maps di seluruh Indonesia, meningkatkan potensi lead sebesar 30% dan memperoleh Jutaan pelanggan UMKM baru.',
      'Fitur Underspec dan Gaul (Gangguan Berulang): Membantu teknisi menganalisis Ratusan tiket gangguan/bulan, mendeteksi masalah jaringan 70% lebih cepat, dan meningkatkan kepuasan pelanggan hingga 90%.',
      'Platform Approval Management: Menyederhanakan proses persetujuan proyek dengan pengurangan waktu approval dari 30 hari → 5 hari, serta meningkatkan koordinasi antar 10+ tim.',
      'Pengembangan Website MyCarrier: Membangun landing page & portal pelanggan yang meningkatkan konversi lead sebesar 25% dan memangkas waktu update konten produk via CMS hingga 50%.',
      'Lead Management System: Berkontribusi pada sistem yang mengkonversi 1000+ lead/tahun menjadi proyek, mendorong pertumbuhan pendapatan Telkom.'
    ],
    current: false,
  });

  console.log('Membuat skills');
  const skillData = [
    { id: 1, name: 'JavaScript', category: 'Programming Languages', level: 5, description: '' },
    { id: 2, name: 'TypeScript', category: 'Programming Languages', level: 5, description: '' },
    { id: 3, name: 'Golang', category: 'Programming Languages', level: 4, description: '' },
    { id: 4, name: 'Node.js', category: 'Backend Technologies', level: 5, description: '' },
    { id: 5, name: 'Express.js', category: 'Backend Technologies', level: 5, description: '' },
    { id: 6, name: 'RESTful APIs', category: 'Backend Technologies', level: 5, description: '' },
    { id: 7, name: 'GraphQL', category: 'Backend Technologies', level: 4, description: '' },
    { id: 8, name: 'MongoDB', category: 'Databases', level: 5, description: '' },
    { id: 9, name: 'MySQL', category: 'Databases', level: 4, description: '' },
    { id: 10, name: 'PostgreSQL', category: 'Databases', level: 4, description: '' },
    { id: 11, name: 'Kafka', category: 'DevOps & Tools', level: 3, description: '' },
    { id: 12, name: 'Elastic', category: 'DevOps & Tools', level: 3, description: '' },
    { id: 13, name: 'Logstash', category: 'DevOps & Tools', level: 3, description: '' },
    { id: 14, name: 'Kibana', category: 'DevOps & Tools', level: 3, description: '' },
    { id: 15, name: 'Datadog', category: 'DevOps & Tools', level: 3, description: '' },
    { id: 16, name: 'Grafana', category: 'DevOps & Tools', level: 3, description: '' },
    { id: 17, name: 'Agile', category: 'Methodologies', level: 5, description: '' },
    { id: 18, name: 'Scrum', category: 'Methodologies', level: 5, description: '' },
    { id: 19, name: 'Microservices Architecture', category: 'Methodologies', level: 4, description: '' },
  ];
  await Skill.insertMany(skillData);

  console.log('Membuat profil keahlian');
  const proficiencyData = [
    { id: 1, skill: 'JavaScript/TypeScript', value: 90, description: '' },
    { id: 2, skill: 'Node.js', value: 85, description: '' },
    { id: 3, skill: 'Golang', value: 80, description: '' },
    { id: 4, skill: 'Database Management', value: 85, description: '' },
    { id: 5, skill: 'System Architecture', value: 75, description: '' },
  ];
  await Proficiency.insertMany(proficiencyData);

  console.log('Membuat proyek');
  await Project.create([
    {
      id: 1,
      name: 'STAR - Automation Bot Builder',
      description: 'AI-based solution for no-code bot creation, accelerating automation by 40%. Integrates NLP and visual interfaces for tasks like data scraping and digital workflows.',
      url: 'https://star.biasaaja.cloud',
      techStack: ['AI', 'NLP', 'RPA', 'Automation'],
      startDate: new Date('2025-01-01'),
      endDate: null,
      current: true,
    },
    {
      id: 2,
      name: 'Mancing Pak',
      description: 'App that combines physical-digital fishing experiences using Motoko and TypeScript, connecting devices with digital interfaces via smart contracts.',
      url: '',
      techStack: ['Motoko', 'TypeScript', 'Smart Contracts', 'ICP'],
      startDate: new Date('2024-08-01'),
      endDate: null,
      current: false,
    },
    {
      id: 3,
      name: 'IRPIN (Irigasi Pintar)',
      description: 'IoT-based irrigation system monitoring groundwater depth in real-time with ±2cm accuracy, featuring prediction algorithms and dashboard.',
      url: '',
      techStack: ['IoT', 'Arduino', 'LoRaWAN', 'Cloud Computing'],
      startDate: new Date('2018-09-01'),
      endDate: new Date('2018-12-01'),
      current: false,
    },
  ]);

  console.log('Membuat pendidikan');
  await Education.create([
    {
      id: 1,
      type: 'education',
      publisher: 'Binus University',
      title: 'Teknik Informatika',
      city: 'Jakarta, Indonesia',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2028-01-01'),
      description: 'Saat ini sedang menempuh pendidikan S1 Teknik Informatika di Binus University (2024-sekarang)',
    },
    {
      id: 2,
      type: 'certification',
      publisher: 'PT Ekipa Agile Consultancy',
      title: 'Certified Indonesia Scrum Master (ISM) I',
      startDate: new Date('2020-01-01'),
      description: 'Sertifikasi ini memperkuat pemahaman saya dalam penerapan metodologi Scrum di lingkungan pengembangan Agile. Dengan pelatihan berbasis studi kasus dunia nyata, saya terlatih untuk memfasilitasi tim multidisiplin, menghilangkan hambatan proses, dan memastikan deliver produk sesuai iterasi yang efisien.',
    },
  ]);

  console.log('Seed data inserted!');
  process.exit(0);
}

seed(); 