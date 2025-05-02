const router = require('express').Router();
const feedbackController = require('../controllers/feedbackController');
const { verifyToken, verifyRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/submit', verifyToken, upload.single('image'), feedbackController.submit);
router.get('/all', verifyToken, verifyRole('admin'), feedbackController.getAll);
router.put('/comment/:id', verifyToken, verifyRole('admin'), feedbackController.addComment);
router.delete('/:id', verifyToken, feedbackController.deleteFeedback);


module.exports = router;
