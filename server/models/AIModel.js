import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const aiModelSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    // You can add more specific properties for an AI model here
    framework: {
      type: String,
      required: true,
    },
    version: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    // You can add more properties based on the characteristics of an AI model
    accuracy: {
      type: Number,
      default: 0,
    },
    trainingData: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AiModel = mongoose.model("AiModel", aiModelSchema);

export default AiModel;
