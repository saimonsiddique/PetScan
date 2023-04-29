const appointmentMail = (sender, receiver, subject, clientName) => {
  return {
    from: sender,
    to: receiver,
    subject: subject,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Appointment Confirmed!</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.2;
            color: #222222;
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body
      style="background-color: #f7f7f7; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;"
      >
        <table width="100%" border="0" cellspacing="0" cellpadding="0"
        margin: 0 auto;
        >
          <tr>
            <td align="center">
              <table
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="max-width: 600px; width: 100%; margin: 0 auto"
              >
                <tr>
                  <td
                    style="
                      background-color: #ffffff;
                      border-top-left-radius: 10px;
                      border-bottom-left-radius: 10px;
                      padding: 40px;
                    "
                  >
                    <img
                      src="https://res.cloudinary.com/dru7kzv3i/image/upload/v1681975750/logo_f5x3hk.png"
                      alt="Logo"
                      style="max-width: 100%; display: block; margin: 0 auto"
                    />
                  </td>
                  <td
                    style="
                      background-color: #053129;
                      color: #ffffff;
                      border-top-right-radius: 10px;
                      border-bottom-right-radius: 10px;
                      padding: 40px;
                      font-family: Arial, sans-serif;
                    "
                  >
                    <h1
                      style="
                        font-size: 24px;
                        margin-bottom: 16px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      Appointment Confirmed!
                    </h1>
                    <p
                      style="
                        font-size: 16px;
                        margin-bottom: 16px;
                        text-align: center;
                        color: #ff0789;
                      "
                    >
                      Thank you <strong>"${clientName}"</strong> for using PetScan.
                    </p>
                    <p
                      style="
                        font-size: 18px;
                        margin-bottom: 16px;
                        text-align: center;
                        color: #ffffff;
                        font-weight: bold;
                      "
                    >
                      Your appointment has been confirmed.
                    </p>
                    <p
                      style="
                        font-size: 16px;
                        margin-bottom: 4px;
                        text-align: center;
                        font-weight: lighter;
                      "
                    >
                      For more details please check your email from Calendly.
                    </p>
                    <p
                      style="
                        font-size: 16px;
                        margin-bottom: 10px;
                        text-align: center;
                        font-weight: lighter;
                      "
                    >
                      We look forward to seeing you soon.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };
};

const prescriptionMail = (sender, receiver, subject, prescription, vetName) => {
  return {
    from: sender,
    to: receiver,
    subject: subject,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Prescription</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.2;
            color: #222222;
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="max-width: 600px; width: 100%; margin: 0 auto"
              >
                <tr>
                  <td
                    style="
                      background-color: #ffffff;
                      border-top-left-radius: 10px;
                      border-bottom-left-radius: 10px;
                      padding: 40px;
                    "
                  >
                    <img
                      src="https://res.cloudinary.com/dru7kzv3i/image/upload/v1681975750/logo_f5x3hk.png"
                      alt="Logo"
                      style="max-width: 100%; display: block; margin: 0 auto"
                    />
                  </td>
                  <td
                    style="
                      background-color: #053129;
                      color: #ffffff;
                      border-top-right-radius: 10px;
                      border-bottom-right-radius: 10px;
                      padding: 40px;
                      font-family: Arial, sans-serif;
                    "
                  >
                    <h1
                      style="
                        font-size: 20px;
                        margin-bottom: 16px;
                        font-weight: bold;
                        text-align: center;
                      "
                    >
                      HERE IS YOUR PRESCRIPTION
                    </h1>
                    <p
                      style="
                        font-size: 16px;
                        margin-bottom: 10px;
                        line-height: 1.4;
                        text-align: center;
                        color: #ffffff;
                      "
                    >
                      Thanks for beleiving in us. <br />
                      Here is your prescription:
                    </p>
                    <p
                      style="
                        font-size: 14px;
                        margin-bottom: 10px;
                        text-align: center;
                        color: #ffffff;
                      "
                    >
                      Given By :
                      <span
                        style="
                          font-size: 16px;
                          margin-bottom: 10px;
                          text-align: center;
                          color: #eaeaea;
                          font-weight: bold;
                        "
                      >
                        ${vetName}
                      </span>
                    </p>
                    <p
                      style="
                        font-size: 18px;
                        margin-bottom: 16px;
                        text-align: center;
                        font-weight: bold;
                        color: #ff0789;
                      "
                    >
                      ${prescription}.
                    </p>
                    <p
                      style="
                        font-size: 16px;
                        margin-bottom: 10px;
                        text-align: center;
                        font-weight: lighter;
                      "
                    >
                      Thanks for using our service.
                    </p>
                    <p
                      style="
                        font-size: 12px;
                        margin-bottom: 10px;
                        text-align: center;
                        font-weight: lighter;
                      "
                    >
                      &copy Petscan. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };
};

module.exports = { appointmentMail, prescriptionMail };
