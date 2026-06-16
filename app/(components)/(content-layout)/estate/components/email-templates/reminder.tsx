export function sendReminder(body: string, subject: string, name: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background-color: #0070f3; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f8f8f8; padding: 20px; text-align: center; }
            img { max-width: 100%; height: auto; }
            .button { background-color: #0070f3; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block; }
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; }
            }
        </style>
    </head>
    <body  style="background-color:#f3f3f5;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="border-radius:5px 5px 0 0;display:flex;flex-direciont:column;background-color:#2b2d6e">
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td
                            data-id="__react-email-column"
                            style="padding:20px 30px 15px">
                            <h1
                              style="color:#fff;font-size:27px;font-weight:bold;line-height:27px">
                              Find what you want, faster
                            </h1>
                            <p
                              style="font-size:17px;line-height:24px;margin:16px 0;color:#fff">
                              Tips and tricks for searching on Stack Overflow
                            </p>
                          </td>
                          <td
                            data-id="__react-email-column"
                            style="padding:30px 10px">
                            <img
                              src="https://react-email-demo-2jmpohtxd-resend.vercel.app/static/stack-overflow-header.png"
                              style="display:block;outline:none;border:none;text-decoration:none;max-width:100%"
                              width="340" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
        <div class="container">
            <div class="header">
                <h2 style="color: #ffffff; margin: 0;">${subject}</h2>
            </div>
            <div class="content">
            <h4 style="color: #333333;">Dear ${name},</h4>
                <div style="margin-bottom: 20px;">
                    ${body}
                </div>
            </div>
            <div class="footer">
                <p style="margin: 0; color: #666666; font-size: 14px;">Looking forward to helping you transform your freelance business!</p>
                <p style="margin: 10px 0 0; color: #666666; font-size: 12px;">&copy; ${new Date().getFullYear()} Desishub. All rights reserved.</p>
                
            </div>
        </div>
    </body>
    </html>
  `;
}
