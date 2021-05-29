const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing/')

const app = express();

app.listen(process.env.PORT || 3000, () => console.log("server is initialised"));

app.use(express.static(__dirname));
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");
})
app.use(express.urlencoded({ extended: true }));
mailchimp.setConfig({
    apiKey: "bc0648e82539d33b0537f715901f7b5d-us6",
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


// api keys=bc0648e82539d33b0537f715901f7b5d-us6
// list id= 28bfbfbfd1