import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'About Us',
    },
    subtitle: {
        type: String,
        default: 'Learn more about our company',
    },
    content: {
        type: String,
        required: true,
        default: 'We are a leading e-commerce platform...',
    },
    mission: {
        type: String,
        default: 'Our mission is to provide the best products...',
    },
    vision: {
        type: String,
        default: 'Our vision is to become the most trusted...',
    },
    values: [{
        title: String,
        description: String,
    }],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update timestamp on save
aboutSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const About = mongoose.model('About', aboutSchema);

export default About;
