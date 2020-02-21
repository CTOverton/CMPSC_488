const mailchimp = require("../config/config");
const express = require('express');
const router = express.Router();
const request = require('request');

const admin = require("firebase-admin");

const serviceAccount = require("../config/cmpsc-488-firebase-adminsdk-5mzof-c276aa2afa");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cmpsc-488.firebaseio.com"
});



// MailChimp
const apiKey = mailchimp.apiKey;
const mailchimpURL = 'https://us16.api.mailchimp.com/3.0/'

router.get('/', function (req, res) {
    res.format({
        'application/json': function(){
            res.send({msg: 'Welcome to SNO API'});
        }
    });
});


router.post('/sync/mailchimp', function (req, res) {
    let options = {
        'method': 'GET',
        'url': mailchimpURL + 'lists/7f5d3fde05/segments/46373/members?count=100',
        'headers': {
            'Authorization': 'Bearer ' + apiKey
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const data = JSON.parse(body)
        res.send(200)
        data.members.forEach(member => {
            const attendee = {
                id: member.id,
                email: member.email_address,
                firstName: member.merge_fields.FNAME,
                lastName: member.merge_fields.LNAME,
            }

            admin.firestore()
                .collection('attendees')
                .doc(member.email_address)
                .set(attendee)
                .then(doc => console.log("attendee added with " + doc))
                .catch(err => console.log(err))

        })
    });
});

module.exports = router;