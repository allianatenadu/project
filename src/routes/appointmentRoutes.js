const express = require('express');
const { body } = require('express-validator');
const AppointmentController = require('../controllers/appointmentController');

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
  AppointmentController.createAppointment
);

router.get('/', AppointmentController.getAppointments);

module.exports = router;