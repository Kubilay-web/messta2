export type EstateReminderMailData = {
  recipientName: string;
  subject:       string;
  message:       string;
  agencyName:    string;
  fromLabel:     string; // "Yönetim", "Danışman" etc.
};

export function generateEstateReminderEmail(data: EstateReminderMailData): string {
  const { recipientName, subject, message, agencyName, fromLabel } = data;

  const sentDate = new Date().toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric",
  });

  const primaryColor  = "#1D4ED8"; // blue-700
  const accentColor   = "#2563EB"; // blue-600
  const primaryLight  = "#EFF6FF"; // blue-50
  const borderColor   = "#DBEAFE"; // blue-100
  const textDark      = "#1E293B";
  const textMedium    = "#334155";
  const textLight     = "#64748B";

  return `<!DOCTYPE html>
<html dir="ltr" lang="tr">
<head>
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="background-color:#EBF3FF;margin:0;padding:40px 16px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;">
    ${agencyName} — ${subject}
  </div>

  <!-- Wrapper -->
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="max-width:600px;margin:0 auto;">
    <tbody>
      <tr><td>

        <!-- Header -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
          style="background:linear-gradient(135deg,${primaryColor} 0%,${accentColor} 100%);border-radius:12px 12px 0 0;padding:28px 32px;">
          <tbody><tr>
            <td>
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.7);text-transform:uppercase;">
                Emlak Ofisi İletişim
              </p>
              <h1 style="margin:6px 0 0;font-size:24px;font-weight:700;color:#FFFFFF;line-height:1.3;">
                ${agencyName}
              </h1>
            </td>
            <td style="text-align:right;vertical-align:middle;">
              <div style="background:rgba(255,255,255,0.2);border-radius:50%;width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;">
                <span style="font-size:24px;">🏢</span>
              </div>
            </td>
          </tr></tbody>
        </table>

        <!-- Body -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
          style="background:#FFFFFF;padding:32px;border-left:1px solid ${borderColor};border-right:1px solid ${borderColor};">
          <tbody>
            <!-- Tarih -->
            <tr><td style="padding-bottom:20px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:${primaryLight};border-radius:8px;padding:12px 16px;border-left:4px solid ${accentColor};">
                <tbody><tr><td>
                  <p style="margin:0;font-size:13px;color:${accentColor};font-weight:600;">
                    📅 Gönderilme Tarihi: ${sentDate}
                  </p>
                </td></tr></tbody>
              </table>
            </td></tr>

            <!-- Selam -->
            <tr><td style="padding-bottom:16px;">
              <p style="margin:0;font-size:16px;color:${textDark};font-weight:600;">
                Sayın ${recipientName},
              </p>
            </td></tr>

            <!-- Konu -->
            <tr><td style="padding-bottom:20px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#F8FAFC;border-radius:10px;padding:20px 24px;border:1px solid ${borderColor};">
                <tbody>
                  <tr><td style="padding-bottom:10px;">
                    <p style="margin:0;font-size:13px;font-weight:600;color:${textLight};text-transform:uppercase;letter-spacing:1px;">
                      Konu
                    </p>
                    <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:${primaryColor};">
                      ${subject}
                    </p>
                  </td></tr>
                  <tr><td>
                    <hr style="border:none;border-top:1px solid ${borderColor};margin:12px 0;" />
                    <p style="margin:0;font-size:15px;color:${textMedium};line-height:1.7;white-space:pre-wrap;">
                      ${message.replace(/\n/g, "<br/>")}
                    </p>
                  </td></tr>
                </tbody>
              </table>
            </td></tr>

            <!-- Gönderen -->
            <tr><td style="padding-bottom:4px;">
              <p style="margin:0;font-size:14px;color:${textLight};">
                Saygılarımızla,<br/>
                <strong style="color:${textDark};">${fromLabel}</strong><br/>
                <span style="color:${accentColor};">${agencyName}</span>
              </p>
            </td></tr>
          </tbody>
        </table>

        <!-- Footer -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
          style="background:#F1F5F9;border-radius:0 0 12px 12px;border:1px solid ${borderColor};border-top:none;padding:20px 32px;">
          <tbody><tr><td style="text-align:center;">
            <p style="margin:0;font-size:12px;color:${textLight};line-height:1.6;">
              Bu e-posta <strong>${agencyName}</strong> tarafından gönderilmiştir.<br/>
              &copy; ${new Date().getFullYear()} ${agencyName}. Tüm hakları saklıdır.
            </p>
          </td></tr></tbody>
        </table>

      </td></tr>
    </tbody>
  </table>
</body>
</html>`;
}
