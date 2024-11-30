export function formatNewsletterContent(html: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>*|MC:SUBJECT|*</title>
        <style>
          /* Base styles */
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          /* Responsive styles */
          @media only screen and (max-width: 480px) {
            .container {
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${html}
          <!-- Mailchimp footer merge tag -->
          *|IF:REWARDS|* *|HTML:REWARDS|* *|END:IF|*
        </div>
      </body>
    </html>
  `;
} 