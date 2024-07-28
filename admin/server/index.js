const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use(bodyParser.json());
const accountSid = ""; // Your Account SID from www.twilio.com/console
const authToken = ""; // Your Auth Token from www.twilio.com/console
const client = twilio(accountSid, authToken);

app.post("/send-whatsapp", (req, res) => {
    const { phoneNumber, message } = req.body;

    client.messages
        .create({
            body: message,
            from: "whatsapp:", // Your Twilio Sandbox WhatsApp number
            to: `whatsapp:+91${phoneNumber}`,
        })
        .then((message) => res.json({ success: true, messageSid: message.sid }))
        .catch((err) =>
            res.status(500).json({ success: false, error: err.message })
        );
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
