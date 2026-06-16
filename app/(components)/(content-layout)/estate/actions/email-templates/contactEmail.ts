export type ContactMail = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  schoolName: string;
};

export function generateContactFormEmail(data: ContactMail) {
  // Set defaults for any missing data
  const {
    name = "John Doe",
    email = "johndoe@example.com",
    phone = "+256 700 123 456",
    subject = "Admission Inquiry",
    message = "Hello, I would like to inquire about the admission process for the upcoming academic year. Could you please provide me with more information about the requirements and deadlines? Thank you.",
    schoolName = "Your School Name",
  } = data;

  // Format the current date
  const submittedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Set colors
  const primaryColor = "#1E3A8A";
  const accentColor = "#2563EB";
  const primaryLight = "#F0F7FF";
  const borderColor = "#E2E8F0";
  const textDark = "#1E293B";
  const textMedium = "#334155";
  const textLight = "#64748B";

  return `
<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>New Contact Form Submission</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      * {
        font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        box-sizing: border-box;
      }
      
      body {
        background-color: #EBF3FF;
        margin: 0;
        padding: 40px 20px;
      }
      
      .hover-button:hover {
        background-color: ${primaryColor} !important;
        opacity: 0.9;
      }
    </style>
  </head>
  <body style="background-color: #EBF3FF; padding: 40px 20px; margin: 0;">
    <div style="display: none; overflow: hidden; line-height: 1px; opacity: 0;">
      New contact form submission from ${name}
    </div>
    
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
      style="background-color: #FFFFFF; border-radius: 12px; margin: 0 auto; padding: 30px; max-width: 600px; border-top: 5px solid ${primaryColor}; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      <tbody>
        <tr style="width: 100%">
          <td>
            <!-- Header -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 24px;">
              <tbody>
                <tr>
                  <td style="text-align: center;">
                    <h1 style="font-size: 26px; font-weight: 700; color: ${primaryColor}; margin: 0 0 8px 0; line-height: 1.3;">
                      New Contact Form Submission
                    </h1>
                    <p style="font-size: 16px; color: ${textMedium}; margin: 0 0 24px 0; line-height: 1.5;">
                      You have received a new message from your school website's contact form.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Submission Date -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
              style="background-color: ${primaryLight}; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px; border-left: 4px solid ${accentColor};">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size: 15px; color: ${accentColor}; margin: 0; line-height: 1.5; font-weight: 600;">
                      Submitted on: ${submittedDate}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Contact Details -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
              style="margin-bottom: 24px; background-color: #F8FAFC; border-radius: 10px; padding: 24px; border: 1px solid ${borderColor};">
              <tbody>
                <tr>
                  <td>
                    <h2 style="font-size: 20px; font-weight: 700; color: ${primaryColor}; margin: 0 0 16px 0;">
                      Contact Details
                    </h2>
                    
                    <!-- Name -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 12px;">
                      <tbody>
                        <tr>
                          <td width="120" style="vertical-align: top;">
                            <p style="font-size: 15px; font-weight: 600; color: ${textMedium}; margin: 0; line-height: 1.6; padding-right: 10px;">
                              Name:
                            </p>
                          </td>
                          <td>
                            <p style="font-size: 15px; color: ${textDark}; margin: 0; line-height: 1.6; font-weight: 500;">
                              ${name}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Email -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 12px;">
                      <tbody>
                        <tr>
                          <td width="120" style="vertical-align: top;">
                            <p style="font-size: 15px; font-weight: 600; color: ${textMedium}; margin: 0; line-height: 1.6; padding-right: 10px;">
                              Email:
                            </p>
                          </td>
                          <td>
                            <p style="font-size: 15px; color: ${textDark}; margin: 0; line-height: 1.6; font-weight: 500;">
                              ${email}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Phone -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 0;">
                      <tbody>
                        <tr>
                          <td width="120" style="vertical-align: top;">
                            <p style="font-size: 15px; font-weight: 600; color: ${textMedium}; margin: 0; line-height: 1.6; padding-right: 10px;">
                              Phone:
                            </p>
                          </td>
                          <td>
                            <p style="font-size: 15px; color: ${textDark}; margin: 0; line-height: 1.6; font-weight: 500;">
                              ${phone}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Message -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 24px;">
              <tbody>
                <tr>
                  <td>
                    <h2 style="font-size: 20px; font-weight: 700; color: ${primaryColor}; margin: 0 0 16px 0;">
                      Message
                    </h2>
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
                      style="background-color: #F8FAFC; border-radius: 10px; padding: 24px; border: 1px solid ${borderColor};">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size: 15px; font-weight: 600; color: ${textMedium}; margin: 0 0 8px 0; line-height: 1.5;">
                              Subject:
                            </p>
                            <p style="font-size: 17px; color: ${textDark}; font-weight: 600; margin: 0 0 16px 0; line-height: 1.5;">
                              ${subject}
                            </p>
                            <hr style="border-width: 1px; border-color: ${borderColor}; margin-top: 0; margin-bottom: 16px; width: 100%; border: none; border-top: 1px solid ${borderColor};" />
                            <p style="font-size: 15px; color: ${textMedium}; white-space: pre-wrap; margin: 0; line-height: 1.6;">
                              ${message}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Reply Button -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="text-align: center; margin-bottom: 30px;">
              <tbody>
                <tr>
                  <td>
                    <a class="hover-button" href="mailto:${email}" 
                      style="background-color: ${accentColor}; color: #FFFFFF; font-weight: 600; padding: 14px 28px; border-radius: 6px; text-decoration: none; text-align: center; display: inline-block; font-size: 16px; text-transform: none;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Notification -->
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
              style="background-color: ${primaryLight}; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px; border-left: 4px solid ${accentColor};">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size: 14px; color: ${textMedium}; margin: 0; line-height: 1.6;">
                      This is an automated notification. Please respond to this inquiry
                      promptly to ensure excellent communication with potential students and parents.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Footer -->
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 30px auto 0; text-align: center;">
      <tbody>
        <tr style="width: 100%">
          <td>
            <p style="font-size: 13px; color: ${textLight}; margin: 0 0 10px 0; line-height: 1.5;">
              &copy; ${new Date().getFullYear()} ${schoolName}. All rights reserved.
            </p>
            <p style="font-size: 13px; color: ${textLight}; margin: 0; line-height: 1.5;">
              <a href="#" style="color: ${textLight}; text-decoration: underline; font-weight: 500;">
                Unsubscribe
              </a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;
}
