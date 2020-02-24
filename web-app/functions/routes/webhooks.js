const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.format({
        'application/json': function(){
            res.send({msg: 'Welcome to SNO Webhooks'});
        }
    });
});

// https://us-central1-cmpsc-488.cloudfunctions.net/api/webhooks/mailchimp
router.post('/mailchimp', function (req, res) {
    const { type } = req.body
    switch (type) {
        case 'profile':
            console.log("profile")
            console.log(req.body)
            res.send({msg: 'type accepted'});
            break
        default:
            console.log("default")
            console.log(req.body)
            res.send(200)
    }
})

router.get('/mailchimp', function (req, res) {
    res.send(200)
})

module.exports = router