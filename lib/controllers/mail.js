var nodemailer = require('nodemailer');

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'spaceadepts@gmail.com',
        pass:  'hwadepts'
    },
    debug: true // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'spaceadepts@gmaiil.com',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});

console.log('SMTP Configured');

















// Message object
var message = {

    // Comma separated list of recipients
    to: '<harrib4@gmail.com>',

    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔ #', //

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html: '',
    // An array of attachments
    attachments: [

        // String attachment
        {
            filename: 'notes.txt',
            content: 'Some notes about this e-mail',
            contentType: 'text/plain' // optional, would be detected from the filename
        }
    ]
};

console.log('Sending Mail');
fs = require('fs');

var email = '';
var sendEmail = function (name,email,date,origin,destination,fare,taxes,total) {
    //auto generate pnr
    fs.readFile('./email.html', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/Harrison Bornstein/g, 'Kevin Chi');
      message.html = data;

        transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });
    });

}

exports.sendEmail = sendEmail;




