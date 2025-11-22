import Contact from '../models/Contact.js';
import { sendEmail } from '../services/emailService.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        // Send email to admin
        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: `New Contact Message: ${subject}`,
            text: `From: ${name} (${email})\n\nMessage: ${message}`,
        });

        // Send confirmation to user
        await sendEmail({
            to: email,
            subject: 'We received your message',
            text: `Hi ${name},\n\nThank you for contacting us. We'll get back to you soon!`,
        });

        res.status(201).json({
            message: 'Message sent successfully',
            contact
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact/messages
// @access  Private/Admin
export const getContactMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update contact message status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
