const Feedback = require('../models/Feedback');

exports.createFeedback = async (data) => await Feedback.create(data);


exports.getAll = async (filter, sort) => {
  const query = filter?.rating ? { rating: filter.rating } : {};
  return Feedback.find(query).sort({ createdAt: sort === 'desc' ? -1 : 1 });
};


exports.addComment = async (id, comment) => {
  return Feedback.findByIdAndUpdate(id, { comment }, { new: true });
};

exports.deleteFeedbackById = async (id) => {
  const feedback = await Feedback.findById(id);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  return await Feedback.findByIdAndDelete(id);
};