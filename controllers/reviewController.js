const mongoose = require('mongoose');

const Review = require('../models/reviewModel');

// Controller to write a review
const writeReview = async (req, res) => {
  try {
    const { userName, description, rating, supplierId } = req.body;

    // Check if description is provided
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    // Check if rating is provided
    if (!rating) {
      return res.status(400).json({ message: 'Rating is required' });
    }

    // Create a new review instance
    const newReview = new Review({
      userName,
      description,
      rating,
      supplierId
    });

    // Save the review to the database
    await newReview.save();

    //get saved review to the console
    console.log('Review added successfully:', newReview);

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error('Error writing review:', error);
    res.status(500).json({ message: 'Failed to write review', error: error.message });
  }
};

module.exports = { writeReview };