import { Request, Response } from 'express';
import Review from '../models/Review.model.js';

/* ---------------- CREATE REVIEW ---------------- */
export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create review' });
  }
};

/* ---------------- GET ALL REVIEWS ---------------- */
export const getReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

/* ---------------- GET REVIEW BY ID ---------------- */
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch review' });
  }
};

/* -------------- GET REVIEWS BY PRODUCT ------------ */
export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product reviews' });
  }
};

/* ---------------- UPDATE REVIEW (ADMIN) ---------------- */
export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update review' });
  }
};

/* ---------------- DELETE REVIEW (ADMIN) ---------------- */
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete review' });
  }
};
