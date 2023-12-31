import { Schema, Types, model } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    service: { type: Types.ObjectId, ref: 'TourismService', required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export const Review = model<IReview>('Review', reviewSchema);
