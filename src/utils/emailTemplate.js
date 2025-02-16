import sendMail from "./sendEmail";
export const sendBookingConfirmationEmail = (email, name, bookingDetails) => {
  const {
    propertyTitle,
    checkIn,
    checkOut,
    totalPrice,
    currency,
    bookingId,
    hostName,
    propertyLocation
  } = bookingDetails;

  const formattedTotalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(totalPrice);

  const emailTemplate = {
    emailTo: email,
    subject: `✅ Booking Confirmed: ${propertyTitle}`,
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="margin: 0;">Booking Confirmed</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin-top: 20px;">
          <h2>Hello ${name},</h2>
          
          <p>Your booking for <strong>${propertyTitle}</strong> has been confirmed. Below are the details of your reservation:</p>
          
          <div style="background-color: #fff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
            <p style="margin: 5px 0;"><strong>Check-In:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Check-Out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Total Price:</strong> ${formattedTotalPrice}</p>
            <p style="margin: 5px 0;"><strong>Host:</strong> ${hostName}</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> ${propertyLocation}</p>
          </div>
          
          <p>We hope you enjoy your stay! If you have any questions or need assistance, feel free to contact your host or reply to this email.</p>
          
          <p style="margin-top: 20px;">
            <a href="#" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Booking Details
            </a>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
          <p>This is an automated message from your rental booking platform.</p>
          <p>If you need any assistance, please reply to this email.</p>
        </div>
      </div>
    `
  };

  sendMail(emailTemplate);
};

export const sendNewBookingNotificationEmail = (email, name, bookingDetails) => {
  const {
    propertyTitle,
    checkIn,
    checkOut,
    totalPrice,
    currency,
    bookingId,
    renterName,
    renterEmail,
    renterPhone
  } = bookingDetails;

  const formattedTotalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(totalPrice);

  const emailTemplate = {
    emailTo: email,
    subject: `📅 New Booking: ${propertyTitle}`,
    message: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 8px;">
          <h1 style="margin: 0;">New Booking</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin-top: 20px;">
          <h2>Hello ${name},</h2>
          
          <p>You have a new booking for <strong>${propertyTitle}</strong>. Below are the details:</p>
          
          <div style="background-color: #fff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
            <p style="margin: 5px 0;"><strong>Check-In:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Check-Out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Total Price:</strong> ${formattedTotalPrice}</p>
            <p style="margin: 5px 0;"><strong>Renter Name:</strong> ${renterName}</p>
            <p style="margin: 5px 0;"><strong>Renter Email:</strong> ${renterEmail}</p>
            <p style="margin: 5px 0;"><strong>Renter Phone:</strong> ${renterPhone}</p>
          </div>
          
          <p>Please ensure the property is ready for the renter's arrival. If you have any questions, feel free to contact the renter directly or reply to this email.</p>
          
          <p style="margin-top: 20px;">
            <a href="#" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Booking Details
            </a>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
          <p>This is an automated message from your rental booking platform.</p>
          <p>If you need any assistance, please reply to this email.</p>
        </div>
      </div>
    `
  };

  sendMail(emailTemplate);
};