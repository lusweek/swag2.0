// src/emailService.js
import emailjs from 'emailjs-com';

emailjs.init('NHoAII_wNiMrUrvQX');

export async function sendEmail(
  subject: string,
  fromMessage: string,
  courseMessage: string,
  priceMessage: string,
  memberPrice: string,
  totalPrice: string,
  to_email: string, 
  userMessage: string,
  student ) {

    console.log(subject,
      fromMessage,
      courseMessage,
      priceMessage,
      memberPrice,
      to_email,
      userMessage,)

  try {
    const templateParams = {
      subject: subject,
      fromMessage: fromMessage,
      courseMessage: courseMessage,
      priceMessage: priceMessage,
      totalPrice: totalPrice,
      memberPrice: memberPrice,
      to_email: to_email,
      userMessage: userMessage,
      student: student
    };
    const response = await emailjs.send(
      'service_xc7o439',
      'template_06a4wj9',
      templateParams
    );
    console.log('Email sent successfully!', response);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}
