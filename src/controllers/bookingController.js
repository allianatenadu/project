const Booking = require('../models/Booking');
const Service = require('../models/Service');
const EmailService = require('../services/emailService');
const { validationResult } = require('express-validator');

class BookingController {
  static async createBooking(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { customer_name, customer_email, service_id, date, notes } = req.body;

      const service = await Service.findById(service_id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const booking = await Booking.create({
        customer: {
          name: customer_name,
          email: customer_email
        },
        service: service_id,
        date,
        notes
      });

      const populatedBooking = await booking.populate('service');

      // Send confirmation emails
      await EmailService.sendAppointmentConfirmation({
        customer_name,
        customer_email,
        service_name: service.name,
        date
      });

      res.status(201).json(populatedBooking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create booking' });
    }
  }

  static async getBookings(req, res) {
    try {
      const bookings = await Booking.find()
        .populate('service')
        .sort({ date: 1 });
      
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  }

  static async updateBookingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const booking = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate('service');

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking' });
    }
  }
}

module.exports = BookingController;