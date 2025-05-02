const FeedbackService = require('../services/feedbackService');

exports.submit = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const feedback = await FeedbackService.createFeedback({
      user: req.user.id,
      text: req.body.text,
      rating: req.body.rating,
      image
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { stars, sort } = req.query;
    const feedbacks = await FeedbackService.getAll({ rating: stars }, sort);

    // Construct full image URLs
    const hostUrl = 'https://xianclientportal-backend.onrender.com';
    const updatedFeedbacks = feedbacks.map(fb => ({
      ...fb._doc,
      image: fb.image ? `${hostUrl}/uploads/${fb.image}` : null
    }));

    res.json(updatedFeedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addComment = async (req, res) => {
  try {
    const feedback = await FeedbackService.addComment(req.params.id, req.body.comment);
    if (!feedback) return res.status(404).json({ message: 'Not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteFeedback = async (req, res) => {
  try {
    await FeedbackService.deleteFeedbackById(req.params.id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error.message);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
