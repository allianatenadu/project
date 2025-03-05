const transporter = require('../config/email');
const { format } = require('date-fns');

class EmailService {
  static async sendAppointmentConfirmation(appointment, customerEmail) {
    const formattedDate = format(new Date(appointment.date), 'MMMM dd, yyyy');
    const formattedTime = format(new Date(appointment.date), 'h:mm a');

    // Send email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      subject: 'Appointment Confirmation',
      html: `
        <h2>Your appointment has been confirmed!</h2>
        <p>Dear ${appointment.customer_name},</p>
        <p>Your appointment has been scheduled for:</p>
        <p>Date: ${formattedDate}</p>
        <p>Time: ${formattedTime}</p>
        <p>Service: ${appointment.service_name}</p>
        <p>Thank you for choosing our services!</p>
      `
    });

    // Send email to business owner
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.BUSINESS_EMAIL,
      subject: 'New Appointment Booking',
      html: `
        <h2>New Appointment Booked</h2>
        <p>Customer: ${appointment.customer_name}</p>
        <p>Email: ${customerEmail}</p>
        <p>Date: ${formattedDate}</p>
        <p>Time: ${formattedTime}</p>
        <p>Service: ${appointment.service_name}</p>
      `
    });
  }
}

module.exports = EmailService;