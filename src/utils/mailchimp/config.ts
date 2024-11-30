import mailchimp from "@mailchimp/mailchimp_marketing";

// Mailchimp configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // örn: 'us21'
});

export default mailchimp;
