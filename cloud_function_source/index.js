/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.sendMail = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  }
  else{
    let dest = req.body.dest;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    let msg = null;
    if(dest === "host"){
      let toEmail = req.body.hostEmail || 'shaikhajwad10@gmail.com';
      let host = req.body.host;
      let guest = req.body.guest;
      let phone = req.body.phone;
      let guestEmail = req.body.guestEmail;
      let checkinTime = req.body.checkinTime;
      msg = {
        to: toEmail,
        from: {
          name: 'Chowkidaar from TheCoolCompany',
          email: 'chowkidaar_tcc@entry-io.org',
        },
        subject: 'A guest just checked in to visit you at TheCoolCompany',
        text: 'Hey ' + host + ', \n' + guest + ' just checked in to visit you at TheCoolCompany. He can be reached at +91' + phone + ' or at ' + guestEmail + '\n\nThanks,\nChowkidaar at TheCoolCompany.',
        html: 'Hey ' + host + ', <br><br><strong>' + guest + '</strong> just checked in to visit you at TheCoolCompany.<br><br>He can be reached at <strong>+91' + phone + '</strong> or at <strong>' + guestEmail + '</strong>.<br><br>Thanks,<br>Chowkidaar at TheCoolCompany.'
      };
    }
    else{
      let toEmail = req.body.guestEmail || 'shaikhajwad10@gmail.com';
      let host = req.body.host;
      let guest = req.body.guest;
      let phone = req.body.phone;
      let hostEmail = req.body.hostEmail;
      let checkinTime = req.body.checkinTime;
      let checkoutTime = req.body.checkoutTime;
      msg = {
        to: toEmail,
        from: {
          name: 'Chowkidaar from TheCoolCompany',
          email: 'chowkidaar_tcc@entry-io.org',
        },
        subject: 'Thank you for visiting ' + host + ' at TheCoolCompany',
        text: 'Hey ' + guest + ', \n' + host + ' is glad to have hosted you at TheCoolCompany. He can be reached at ' + hostEmail + ' for future correspondence.\n\nThanks,\nChowkidaar at TheCoolCompany.',
        html: 'Hey ' + guest + ', <br><br><strong>' + host + '</strong> is glad to have hosted you at TheCoolCompany.<br><br>He can be reached at ' + hostEmail + '</strong> for future correspondence.<br><br>Thanks,<br>Chowkidaar at TheCoolCompany.'
      };
    }
    let message = sgMail.send(msg);
    res.status(200).send(req.rawBody);
  }
};
