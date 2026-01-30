import Review from '../models/Review.model.js';
export const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create review' });
    }
};
export const getReviews = async (_req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
};
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch review' });
    }
};
export const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId,
        }).sort({ createdAt: -1 });
        res.json(reviews);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch product reviews' });
    }
};
export const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update review' });
    }
};
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete review' });
    }
};
//# sourceMappingURL=review.controller.js.map