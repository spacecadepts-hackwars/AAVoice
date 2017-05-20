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
    from: 'spaceadepts@gmail.com',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});

var PNR = generatePNR();

// Message object
var message = {

    // Comma separated list of recipients
    to: '',

    // Subject of the message
    subject: 'Your trip confirmation-' + PNR, 
    // Your trip confirmation-DXTASL 19MAY
};

console.log('Sending Mail');
fs = require('fs');

var email = '';
var sendEmail = function (name, email, issued_date, flight_date, dep_time, dest_time, origin_city, dest_city, origin, dest, fare, taxes, total) {
    //auto generate pnr
    console.log('MAILL');
    fs.readFile('./email.html', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      flt_date = flight_date;
      data = data.replace(/DXTASL/g, PNR);
      data = data.replace(/Gregory Mullinax/g, name);
      data = data.replace(/May 16, 2017/g, issued_date);
      data = data.replace(/Orlando/g, origin_city);      
      data = data.replace(/Dallas[/]Fort Worth/g, dest_city);
      data = data.replace(/Friday, May 19, 2017/g, flight_date);
      data = data.replace(/MCO/g, origin);
      data = data.replace(/DFW/g, dest);
      data = data.replace(/189.02/g, fare);
      data = data.replace(/28.38/g, taxes);
      data = data.replace(/217.40/g, total);
      message.html = data;
      message.to = '<'+email+'>';

        transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        if(info)
        {
            console.log(info);
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });
    });

}

function generatePNR()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.sendEmail = sendEmail;

