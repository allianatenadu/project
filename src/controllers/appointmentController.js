const store = require('../models/store');
const EmailService = require('../services/emailService');
const { validationResult } = require('express-validator');

class AppointmentController {
  static async createAppointment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        customer_name,
        customer_email,
        service_id,
        date,
        notes
      } = req.body;

      // Find the service
      const service = store.services.find(s => s.id === service_id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Create the appointment
      const appointment = {
        id: Date.now().toString(),
        customer_name,
        customer_email,
        service_id,
        service_name: service.name,
        date,
        notes,
        status: 'scheduled',
        created_at: new Date().toISOString()
      };

      store.appointments.push(appointment);

      // Send confirmation emails
      await EmailService.sendAppointmentConfirmation(appointment, customer_email);

      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  }

  static async getAppointments(req, res) {
    try {
      // Sort appointments by date
      const appointments = [...store.appointments].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  }
}

module.exports = AppointmentController;