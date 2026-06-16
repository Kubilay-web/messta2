export function sendMessageTemplate(
  body: string,
  subject: string,
  options: {
    headmasterName: string;
    schoolName: string;
    salutation: string;
  }
) {
  // Set default values for options
  const {
    headmasterName = "Dr. James Okello",
    schoolName = "Kampala International School",
    salutation = "Dear Valued School Community,",
  } = options;

  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject || "Important School Reminder"}</title>
        <style>
          /* Base styles */
          body {
            background-color: #f9fafb;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 32px 0;
            color: #374151;
            line-height: 1.5;
          }
          
          /* Container */
          .container {
            max-width: 640px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          /* Header */
          .header {
            background-image: linear-gradient(to right, #1e40af, #3b82f6);
            padding: 40px 32px;
            text-align: center;
          }
          
          .header-title {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            letter-spacing: -0.025em;
          }
          
          .header-subtitle {
            color: #bfdbfe;
            font-size: 18px;
            font-weight: 300;
            margin: 8px 0 0 0;
            letter-spacing: 0.025em;
          }
          
          /* Content */
          .content {
            padding: 40px 32px;
            background-color: #ffffff;
          }
          
          .announcement-title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin: 0 0 16px 0;
            padding-left: 12px;
            border-left: 4px solid #3b82f6;
          }
          
          .salutation {
            font-size: 16px;
            color: #4b5563;
            margin: 0 0 16px 0;
            line-height: 1.6;
          }
          
          .message {
            font-size: 16px;
            color: #4b5563;
            margin: 0 0 32px 0;
            line-height: 1.6;
          }
          
          .button-container {
            text-align: center;
            margin: 32px 0;
          }
          
          .button {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
          }
          
          /* Signature */
          .signature {
            padding: 24px 32px;
            background-color: #f9fafb;
          }
          
          .signature-greeting {
            font-size: 16px;
            color: #4b5563;
            margin: 0 0 4px 0;
            font-weight: 500;
          }
          
          .signature-name {
            font-size: 18px;
            color: #1f2937;
            margin: 0 0 4px 0;
            font-weight: bold;
          }
          
          .signature-title {
            font-size: 16px;
            color: #6b7280;
            margin: 0;
            font-style: italic;
          }
          
          /* Footer */
          .footer {
            padding: 32px;
            background-color: #1f2937;
            text-align: center;
          }
          
          .footer-copyright {
            font-size: 14px;
            color: #d1d5db;
            margin: 0 0 16px 0;
            font-weight: 300;
          }
          
          .footer-address {
            font-size: 14px;
            color: #d1d5db;
            margin: 0 0 8px 0;
          }
          
          .footer-contact {
            font-size: 14px;
            color: #d1d5db;
            margin: 0 0 24px 0;
          }
          
          .footer-contact a {
            color: #93c5fd;
            text-decoration: none;
          }
          
          .footer-divider {
            border: 0;
            border-top: 1px solid #374151;
            margin: 16px 0;
          }
          
          .footer-unsubscribe {
            font-size: 12px;
            color: #9ca3af;
            margin: 16px 0 0 0;
          }
          
          .footer-unsubscribe a {
            color: #9ca3af;
            text-decoration: none;
          }
          
          /* Rich text styles */
          .rich-text h1 {
            font-size: 24px;
            font-weight: 700;
            color: #1e3a8a;
            margin-top: 24px;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .rich-text h2 {
            font-size: 20px;
            font-weight: 600;
            color: #1e40af;
            margin-top: 20px;
            margin-bottom: 12px;
          }
          
          .rich-text h3 {
            font-size: 18px;
            font-weight: 600;
            color: #2563eb;
            margin-top: 16px;
            margin-bottom: 10px;
          }
          
          .rich-text p {
            font-size: 16px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 16px;
          }
          
          .rich-text ul, .rich-text ol {
            margin-top: 12px;
            margin-bottom: 16px;
            padding-left: 24px;
          }
          
          .rich-text li {
            margin-bottom: 8px;
            font-size: 16px;
            line-height: 1.5;
            color: #4b5563;
          }
          
          .rich-text a {
            color: #2563eb;
            text-decoration: underline;
            font-weight: 500;
          }
          
          .rich-text blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 16px;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #6b7280;
          }
          
          .rich-text strong {
            font-weight: 600;
            color: #111827;
          }
          
          .rich-text table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
          }
          
          .rich-text table th {
            background-color: #f3f4f6;
            padding: 8px 12px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border: 1px solid #e5e7eb;
          }
          
          .rich-text table td {
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
          }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <h1 class="header-title">${schoolName}</h1>
                <p class="header-subtitle">Excellence in Education</p>
            </div>
            
            <!-- Main Content -->
            <div class="content">
                <h2 class="announcement-title">${subject || "Important Announcement"}</h2>
                <p class="salutation">${salutation}</p>
                
                <!-- Message Body -->
                <div class="message rich-text">
                    ${body}
                </div>
        
            </div>
            
            <!-- Signature -->
            <div class="signature">
                <p class="signature-greeting">Warm regards,</p>
                <p class="signature-name">${headmasterName}</p>
                <p class="signature-title">Headmaster, ${schoolName}</p>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <p class="footer-copyright">© ${currentYear} ${schoolName}. All rights reserved.</p>
                <p class="footer-address">123 Education Avenue, Kampala, Uganda</p>
                <p class="footer-contact">
                    <a href="tel:+256123456789">+256 123 456 789</a> | 
                    <a href="mailto:info@kampalaschool.edu">info@kampalaschool.edu</a>
                </p>
                
                <hr class="footer-divider">
                
                <p class="footer-unsubscribe">
                    <a href="https://kampalaschool.edu/unsubscribe">Unsubscribe</a> from these notifications
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Example usage
export function getExampleEmail() {
  const exampleBody = `
    <p>I hope this message finds you well. I'm writing to remind you about several <strong>important upcoming events</strong> and deadlines that require your attention.</p>
    
    <h2>Key Dates to Remember</h2>
    <ul>
      <li><strong>May 10th:</strong> End of term examinations begin</li>
      <li><strong>May 15th:</strong> Parent-Teacher conference (2:00 PM - 6:00 PM)</li>
      <li><strong>May 20th:</strong> School sports day</li>
      <li><strong>May 25th:</strong> Term closing ceremony</li>
    </ul>
    
    <p>Please ensure all outstanding assignments are submitted by <strong>May 8th</strong>. Teachers are requested to finalize all grading by <strong>May 22nd</strong>.</p>
    
    <h3>Fee Payment Reminder</h3>
    <p>For parents, please remember to clear any outstanding fees before the end of term. This will ensure a smooth transition into the next academic period.</p>
    
    <blockquote>
      <strong>Note:</strong> The school administration office will remain open during the holiday period on weekdays from 9:00 AM to 3:00 PM for any inquiries.
    </blockquote>
    
    <p>We thank you for your continued support and cooperation in making our school a center of academic excellence. For more information, please visit our <a href="https://kampalaschool.edu">school website</a>.</p>
    
    <table>
      <tr>
        <th>Activity</th>
        <th>Location</th>
      </tr>
      <tr>
        <td>End of term exams</td>
        <td>Main Hall</td>
      </tr>
      <tr>
        <td>Parent-Teacher conference</td>
        <td>School Auditorium</td>
      </tr>
      <tr>
        <td>Sports day</td>
        <td>Sports Field</td>
      </tr>
    </table>
  `;

  return sendMessageTemplate(exampleBody, "End of Term Announcements", {
    headmasterName: "Dr. James Okello",
    schoolName: "Kampala International School",
    salutation: "Dear Parents and Guardians,",
  });
}
