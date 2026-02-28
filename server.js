const express = require("express");
const fetch = require("node-fetch");
const app = express();

const WEBHOOK = "https://discord.com/api/webhooks/1443163480709533847/RujkoDyP5A-KJ_LIgHNM4Hd9RuqPXsB4WXZpxIJCAMbNu6X-BADkQhtLtQ4EJgXejYHO";

app.use(express.json());
app.use(express.static(__dirname));

app.post("/send", async (req, res) => {

    const ip =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;

    const message = req.body.message;

    const content = `
📩 New Anonymous Message

Message: ${message}
IP: ${ip}
Time: ${new Date().toLocaleString()}
`;

    await fetch(WEBHOOK, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            content: content
        })
    });

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});