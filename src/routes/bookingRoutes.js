const express = require('express');
const { body } = require('express-validator');
const BookingController = require('../controllers/bookingController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  [
    body('customer_name').notEmpty().trim(),
    body('customer_email').isEmail(),
    body('service_id').notEmpty(),
    body('date').isISO8601(),
    body('notes').optional().trim()
  ],
  BookingController.createBooking
);

router.get('/', protect, admin, BookingController.getBookings);
router.patch('/:id/status', protect, admin, BookingController.updateBookingStatus);

module.exports = router;