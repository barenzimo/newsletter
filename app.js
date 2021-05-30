const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing/')
const app = express();

require('dotenv').config();

app.listen(process.env.PORT || 3000, () => console.log("server is initialised"));

app.use(express.static(__dirname));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");
})

const api = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));
mailchimp.setConfig({
    apiKey: api,
    server: "us6",
})

app.post("/", function (req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const subscribingUser = { firstName: fName, lastName: lName, email: email }


    const run = async () => {
        const response = await mailchimp.lists.addListMember("28bfbfbfd1", {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        res.sendFile(__dirname + "/success.html");


    };
    run().catch(e => res.sendFile(__dirname + "/fail.html"));
})


