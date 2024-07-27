// server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
// To use environment variables

const app = express();
const port =  5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

app.use(
    cors({
        origin: ["https://houseliv-admin.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);

app.get("/hi", (req, res) => {
    res.send("hello world");
});
app.get("/", (req, res) => {
    res.send("hel world");
});


// Route to handle sending email
app.post("/send-email", async (req, res) => {
    const { email, message, propertyTitle } = req.body;

    try {
        // Create a transporter with nodemailer configuration
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "developerhouseliv@gmail.com", // Your Gmail address (from environment variables)
                pass: "tysqcczvnhiniknh", // Your Gmail password (from environment variables)
            },
        });

        // Define email options
        let mailOptions = {
            from: "developerhouseliv@gmail.com", // Sender address
            to: email, // List of receivers
            subject: `${propertyTitle} has been rejected`, // Subject line
            text: message, // Plain text body
        };

        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email: ", error.message);
        res.status(500).json({ error: "Error sending email" });
    }
});

app.post("/send-delete-email", async (req, res) => {
    const { email, message, propertyTitle } = req.body;

    try {
        // Create a transporter with nodemailer configuration
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "developerhouseliv@gmail.com", // Your Gmail address (from environment variables)
                pass: "tysqcczvnhiniknh", // Your Gmail password (from environment variables)
            },
        });

        // Define email options
        let mailOptions = {
            from: "tysqcczvnhiniknh", // Sender address
            to: email, // List of receivers
            subject: `${propertyTitle} has been deleted`, // Subject line
            text: message, // Plain text body
        };

        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({
            message: "Deletion notification sent successfully",
        });
    } catch (error) {
        console.error("Error sending deletion notification: ", error.message);
        res.status(500).json({ error: "Error sending deletion notification" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
