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

/*

2020 LT2 Going
GET lists/7f5d3fde05/segments/46905

2020 LT3 Going
GET lists/7f5d3fde05/segments/47813

no-bus
GET lists/7f5d3fde05/segments/47921

GLT RSVP
48005

* */


router.post('/sync/mailchimp', function (req, res) {
    let options = {
        'method': 'GET',
        'url': mailchimpURL + 'lists/7f5d3fde05/segments/48005/members?count=100',
        'headers': {
            'Authorization': 'Bearer ' + apiKey
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const data = JSON.parse(body)
        data.members.forEach(member => {
            const attendee = {
                id: member.id,
                email: member.email_address,
                firstName: member.merge_fields.FNAME,
                lastName: member.merge_fields.LNAME,
                phone: member.merge_fields.PNUMBER,
                tags: ["2020 GLT RSVP"]
            }

            admin.firestore()
                .collection('events')
                .doc('n8HFZTwo9lHtdgOPKZT8')
                .collection('attendees')
                .doc(member.email_address)
                .set(attendee)
                .then(doc => console.log("attendee added with " + doc))
                .catch(err => console.log(err))
        })
        res.sendStatus(200)
    });
});

module.exports = router;