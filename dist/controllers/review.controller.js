import Review from '../models/Review.model.js';
// Create review
export const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create review', error: err });
    }
};
// Get all reviews
export const getReviews = async (_req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: err });
    }
};
// Get review by ID
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review)
            return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch review', error: err });
    }
};
