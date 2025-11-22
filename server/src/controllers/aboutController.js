import About from '../models/About.js';

// @desc    Get about content
// @route   GET /api/about
// @access  Public
export const getAbout = async (req, res) => {
    try {
        let about = await About.findOne();

        // Create default if doesn't exist
        if (!about) {
            about = await About.create({
                title: 'About Us',
                subtitle: 'Your Trusted E-Commerce Partner',
                content: 'We are dedicated to providing the best online shopping experience with quality products and excellent customer service.',
                mission: 'Our mission is to make online shopping accessible, affordable, and enjoyable for everyone.',
                vision: 'To become the most trusted e-commerce platform globally.',
                values: [
                    {
                        title: 'Quality',
                        description: 'We ensure all products meet the highest quality standards.',
                    },
                    {
                        title: 'Customer First',
                        description: 'Our customers are at the heart of everything we do.',
                    },
                    {
                        title: 'Innovation',
                        description: 'We continuously improve our platform and services.',
                    },
                ],
            });
        }

        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update about content
// @route   PUT /api/about
// @access  Private/Admin
export const updateAbout = async (req, res) => {
    try {
        let about = await About.findOne();

        if (!about) {
            about = await About.create(req.body);
        } else {
            about = await About.findOneAndUpdate({}, req.body, {
                new: true,
                runValidators: true,
            });
        }

        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
