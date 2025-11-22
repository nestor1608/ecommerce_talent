import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'resolved'],
        default: 'new',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
