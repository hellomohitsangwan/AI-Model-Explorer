import asyncHandler from "express-async-handler";
import AiModel from "../models/productModel.js";
import User from "../models/AIModel.js";
import cloudinary from "cloudinary";

// @desc  Fetch all AI models
// @route Get /api/aimodels
// @access Public
export const getAiModels = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const aiModels = await AiModel.find({ ...keyword });
    res.json(aiModels);
  });
  
  // @desc  Fetch single AI model
  // @route Get /api/aimodels/:id
  // @access Public
  export const getAiModelById = asyncHandler(async (req, res) => {
    const aiModel = await AiModel.findById(req.params.id);
    if (aiModel) {
      const user = await User.findById(aiModel.user).select("-password");
      if (user) {
        res.json({ aiModel, user });
      } else {
        res.json(aiModel);
      }
    } else {
      res.status(404).json({ message: "AI model not found" });
    }
  });
  
  // @desc  Fetch all AI models created by the admin
  // @route Get /api/aimodels/myaimodels
  // @access Private and only Admin
  export const getAiModelsOfAdmin = asyncHandler(async (req, res) => {
    const aiModels = await AiModel.find({ user: req.user._id });
    res.json(aiModels);
  });
  
  // @desc  Fetch all reviews for a particular Admin's AI model
  // @route Get /api/aimodels/myreviews
  // @access Private and only Admin
  export const getReviewOfAdminAiModel = asyncHandler(async (req, res) => {
    const aiModel = await AiModel.findById(req.body.id);
    if (aiModel) {
      res.json(aiModel.reviews);
    } else {
      res.status(404);
      throw new Error("AI model not found");
    }
  });
  
  // @desc  Delete single AI model
  // @route Delete /api/aimodels/:id
  // @access Admin protected
  export const deleteAiModel = asyncHandler(async (req, res) => {
    const aiModel = await AiModel.findById(req.params.id);
    if (aiModel) {
      await aiModel.remove();
      res.json({ message: "AI model removed successfully" });
    } else {
      res.status(404);
      throw new Error("AI model not found");
    }
  });
