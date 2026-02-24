const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Program = require('./models/Program');
const Trainer = require('./models/Trainer');
const Membership = require('./models/Membership');

dotenv.config();

const programs = [
    {
        name: 'Bodybuilding Elite',
        description: 'High-intensity hypertrophy training for maximum muscle growth and definition.',
        image: '/images/bodybuilding.png',
        difficulty: 'Advanced',
    },
    {
        name: 'Shred & Burn',
        description: 'Dynamic cardio and strength circuit designed to torch fat and improve endurance.',
        image: '/images/weightloss.png',
        difficulty: 'Intermediate',
    },
    {
        name: 'CrossFit Power',
        description: 'Functional movements performed at high intensity to build overall athleticism.',
        image: '/images/crossfit.png',
        difficulty: 'Advanced', // Fixed from 'Hardcore'
    },
    {
        name: 'Mobility Pro',
        description: 'Deep stretching and joint stability work to enhance recovery and performance.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop',
        difficulty: 'Beginner',
    },
];

const trainers = [
    {
        name: 'Coach Alex',
        specialty: 'Powerlifting & Strength',
        image: '/images/alex.png',
        bio: '10+ years of experience in competitive powerlifting and strength coaching.',
    },
    {
        name: 'Coach Sarah',
        specialty: 'HIIT & Fat Loss',
        image: '/images/sarah.png',
        bio: 'Specializes in metabolic conditioning and sustainable weight loss nutrition.',
    },
    {
        name: 'Coach Marcus',
        specialty: 'Functional Fitness',
        image: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?q=80&w=2070&auto=format&fit=crop',
        bio: 'CrossFit certified coach focused on building versatile and resilient athletes.',
    },
];

const memberships = [
    {
        title: 'Basic Access',
        price: 29,
        duration: 'month',
        features: ['Gym Floor Access', 'Basic Equipment', 'Locker Room', 'Water Station'],
    },
    {
        title: 'Elite Member',
        price: 59,
        duration: 'month',
        features: ['All Basic Features', 'Group Classes', 'Personalized App', '1 Sauna Session'],
    },
    {
        title: 'Pro Athlete',
        price: 99,
        duration: 'month',
        features: ['All Elite Features', 'Personal Trainer', 'Nutrition Plan', 'Unlimited Recovery'],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await User.deleteMany();
        await Program.deleteMany();
        await Trainer.deleteMany();
        await Membership.deleteMany();

        // Create admin
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@elitegym.com',
            password: 'adminpassword123',
            role: 'admin',
        });
        await adminUser.save();
        console.log('Admin user created.');

        await Program.insertMany(programs);
        console.log('Programs seeded.');

        await Trainer.insertMany(trainers);
        console.log('Trainers seeded.');

        await Membership.insertMany(memberships);
        console.log('Memberships seeded.');

        console.log('Database seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
