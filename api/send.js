export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const webhook = "https://discord.com/api/webhooks/1443163480709533847/RujkoDyP5A-KJ_LIgHNM4Hd9RuqPXsB4WXZpxIJCAMbNu6X-BADkQhtLtQ4EJgXejYHO";

    const ip =
        req.headers["x-forwarded-for"] ||
        req.socket?.remoteAddress ||
        "Unknown";

    const { message } = req.body;

    const content = `
📩 New Anonymous Message

Message: ${message}
IP: ${ip}
Time: ${new Date().toLocaleString()}
`;

    try {

        await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content
            })
        });

        res.status(200).json({ success: true });

    } catch (err) {

        res.status(500).json({ error: err.toString() });

    }

}
